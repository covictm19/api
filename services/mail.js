'use strict';

const Sendmail = dependencies => {
  const {
    handlebars,
    fs,
    path,
    transportMail,
    mjml2html: mjml,
    mail: {user:from, alert:bcc}
  } = dependencies;
  
  const templatePath = path.resolve('./templates');
  const loadTemplate = templateFile => new Promise((resolve, reject) => 
    fs.readFile(templateFile, 'UTF-8', (err, template) => 
      err ? reject(err) : resolve(template)
    ));
  
  const processTemplate = (value, template) => 
    mjml(handlebars.compile(template)(value));

  const send = (subject, emailAddress, html, bcc) => transportMail.sendMail({
    to: emailAddress,
    bcc: bcc || null,
    from,
    subject,
    html,
  });

  return {
    welcome: (user) => new Promise(async (resolve, reject) => {
      const {
        email,
        name,
      } = user;

      try {
        const template = await loadTemplate(`${templatePath}/welcome_user.mjml`);
        const { html } = processTemplate({ name }, template);
        const result = await send('Obrigado por compartilhar', email, html, bcc);

        return resolve(result);
      } catch(error) {
        return reject(error);
      }
    }),
    resetPassword: (name, emailInfo) => new Promise((resolve, reject) => {
      loadTemplate(`${templatePath}/reset_password.mjml`, async (err, templateUser) => {
        if (err) return reject(err);

        const { emailAddress } = emailInfo;
        const { html } = processTemplate({ name }, templateUser);
        const result = await send({
          subject: 'Recuperação de senha!',
          emailAddress,
          html
        });

        return resolve(result);
      });
    }),
  }
};

module.exports = Sendmail;