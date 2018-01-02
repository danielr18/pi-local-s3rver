const AWS = require('aws-sdk')
const S3rver = require('s3rver')
const fs = require('fs')

const s3rver = new S3rver({
  port: 4569,
  hostname: '0.0.0.0',
  silent: false,
  indexDocument: '',
  errorDocument: '',
  directory: '/tmp/files',
  cors: true
})

s3rver.run((err, hostname, port, directory) => {
  if (err) {
    return console.log('Error starting server', err)
  }
  const config = {
    accessKeyId: '123',
    secretAccessKey: 'abc',
    endpoint: `${hostname}:${port}`,
    sslEnabled: false,
    s3ForcePathStyle: true,
    cors: true
  }
  AWS.config.update(config)
  const s3Client = new AWS.S3()
  s3Client.endpoint = new AWS.Endpoint(config.endpoint)

  // fs.mkdir(directory, (err) => {
  //   s3Client.createBucket({ Bucket: 'test-bucket' }, (err, data) => {
  //     if (err) {
  //       return console.log(err)
  //     }

  //     console.log(data)
  //   })
  // })
})
