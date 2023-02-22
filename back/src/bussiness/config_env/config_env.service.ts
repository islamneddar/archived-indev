import { Injectable } from '@nestjs/common';
import IEnvConfigInterface from './env_config.interface';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';
import Joi from 'joi';

@Injectable()
export class ConfigEnvService {
  private readonly envConfig: IEnvConfigInterface;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  public getTypeORMConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.envConfig.DB_HOST,
      username: this.envConfig.DB_USERNAME,
      password: this.envConfig.DB_PASSWORD,
      database: this.envConfig.DB_NAME,
      port: Number.parseInt(this.envConfig.DB_PORT, 10),
      logging: false,
    };
  }

  /*
        Ensures all needed variables are set, and returns the validated JavaScript object
        including the applied default values.
    */
  private validateInput(envConfig: IEnvConfigInterface): IEnvConfigInterface {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'test')
        .default('development'),
      HTTP_PORT: Joi.number().required(),
    }).unknown(true);

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
