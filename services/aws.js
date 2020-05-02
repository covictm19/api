'use strict';

const awsService = dependencies => {
  const {
    awsSDK,
    config: {
      aws: {
        awsKeyId,
        awsAccessKey,
        bucketName,
        region
      },
    },
  } = dependencies;

  const s3 = new awsSDK.S3({
    accessKeyId: awsKeyId,
    secretAccessKey: awsAccessKey
  });

  const params = {
    Bucket: bucketName,
    ACL: 'public-read',
    CreateBucketConfiguration: {
      LocationConstraint: region
    }
  };

  const upload = (name, files) => {
    params.Key = name;
    params.Body = files;
    params.ContentType = 'image/jpeg';
    params.ContentLength = files.length;

    return new Promise((resolve, reject) =>
      s3.upload(params,
        (err, data) =>
          err ? reject(err) : resolve(data.Location)));
  }

  return {
    upload,
  }
};

module.exports = awsService;