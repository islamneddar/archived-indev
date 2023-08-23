import {Injectable} from '@nestjs/common';
import AWS from 'aws-sdk';
import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET_NAME,
  AWS_S3_ENDPOINT,
  AWS_SECRET_ACCESS_KEY,
} from '@/config';

@Injectable()
export class S3AppService {
  private s3 = new AWS.S3({
    endpoint: AWS_S3_ENDPOINT,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });

  private bucketName = AWS_BUCKET_NAME;

  constructor() {}

  async uploadFile(file, acl: string, prefixFile: string) {
    const base64Data = Buffer.from(file.data, 'binary');
    const fileKey = `${prefixFile}/${file.name}-${Date.now()}`;
    return await this.s3Upload(base64Data, this.bucketName, fileKey, acl);
  }

  async s3Upload(
    fileBuffer: Buffer,
    bucketName: string,
    fileKey: string,
    acl: string,
  ) {
    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: fileBuffer,
      ACL: acl,
    };

    return await this.s3
      .upload(params, {
        partSize: 10 * 1024 * 1024,
        queueSize: 10,
      })
      .promise();
  }
}
