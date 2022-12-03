import * as dotenv from 'dotenv';
import { dotEnvOptions } from './dotenv_option.helper';

// Make sure dbConfig is imported only after dotenv.config

dotenv.config(dotEnvOptions);
import * as dbConfig from '../config/database.config';

module.exports = dbConfig.default;