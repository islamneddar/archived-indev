import { Module } from '@nestjs/common';
import { ConfigEnvService } from './config_env.service';

@Module({
  providers: [
    {
      provide : ConfigEnvService,
      useValue: new ConfigEnvService(`env/${process.env.NODE_ENV || 'development'}.env`),
    }
  ],
  exports : [ConfigEnvService]
})
export class ConfigEnvModule {}
