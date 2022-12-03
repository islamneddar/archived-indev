import { existsSync } from 'fs';
import { resolve } from 'path';
import {Logger} from "@nestjs/common";

const LOG = new Logger("env.helper")

export function getEnvPath(dest: string): string {
    const env: string | undefined = process.env.NODE_ENV;
    const fallback: string = resolve(`${dest}/.env`);
    const filename: string = env ? `${env}.env` : 'development.env';
    let filePath: string = resolve(`${dest}/${filename}`);
    LOG.debug(filePath)
    if (!existsSync(filePath)) {
        filePath = fallback;
    }

    return filePath;
}