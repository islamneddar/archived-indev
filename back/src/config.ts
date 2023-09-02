export const SALT_ROUND = Number(process.env.SALT_ROUND) || 11;
export const JWT_SECRET = process.env.JWT_SECRET || '0_JWT_SECRET';

export const ADMIN_AI_TOOL_CREATION_SECRET =
  process.env.ADMIN_AI_TOOL_CREATION_SECRET;

export const AWS_S3_ENDPOINT = process.env.AWS_S3_ENDPOINT;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
