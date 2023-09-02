import {Injectable, Logger} from '@nestjs/common';
import {PutObjectCommand, S3} from '@aws-sdk/client-s3';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class S3AppService {
  private LOG = new Logger(S3AppService.name);

  private s3Client: S3;

  private readonly bucketName: string;
  constructor(private configService: ConfigService) {
    const awsAccessKeyId = configService.get<string>('AWS_ACCESS_KEY_ID');
    const awsSecretAccessKey = configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    const awsS3Endpoint = configService.get<string>('AWS_S3_ENDPOINT');

    console.log(awsS3Endpoint);
    this.s3Client = new S3({
      endpoint: awsS3Endpoint,
      region: 'ams3',
      credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
      },
    });

    this.bucketName = configService.get<string>('AWS_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File, acl: string, prefixFile: string) {
    const base64Data = file.buffer;
    const fileKey = `${prefixFile}/${Date.now()}-${file.originalname}`;
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

    try {
      await this.s3Client.send(new PutObjectCommand(params));
      return `https://${bucketName}.ams3.cdn.digitaloceanspaces.com/${fileKey}`;
    } catch (e) {
      this.LOG.error(e);
      throw new Error('Error while uploading file');
    }
  }
}
