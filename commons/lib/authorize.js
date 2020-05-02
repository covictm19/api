'use strict';

const authorize = ({ jwt }) => async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(' ');
    req.authorizationInfo = await jwt.verify(token);
    return next();
  } catch(err) {
    return res.status(401).send({
      message: 'invalid token'
    });
  }
};

module.exports = authorize;