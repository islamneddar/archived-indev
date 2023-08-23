import {Injectable} from '@nestjs/common';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class S3AppService {
  private s3Client: S3Client;

  private bucketName: string;
  constructor(private configService: ConfigService) {
    const awsAccessKeyId = configService.get<string>('AWS_ACCESS_KEY_ID');
    const awsSecretAccessKey = configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    const awsS3Endpoint = configService.get<string>('AWS_S3_ENDPOINT');
    this.s3Client = new S3Client({
      endpoint: awsS3Endpoint,
      region: 'us-east-1',
      credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
      },
    });

    this.bucketName = configService.get<string>('AWS_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File, acl: string, prefixFile: string) {
    const base64Data = file.buffer;
    const fileKey = `${prefixFile}/${Date.now()}-${file.originalname}}`;
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

    console.log(this.s3Client.config.credentials());

    return await this.s3Client.send(new PutObjectCommand(params));
  }
}
