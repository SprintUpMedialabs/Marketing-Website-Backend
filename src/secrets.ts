import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const PORT = process.env.PORT!;
export const NODEMAILER_HOST = process.env.NODEMAILER_HOST!;
export const NODEMAILER_SENDER_ADDRESS = process.env.NODEMAILER_SENDER_ADDRESS!;
export const NODEMAILER_PORT = process.env.NODEMAILER_PORT!;
export const NODEMAILER_GMAIL_APP_PASSWORD = process.env.NODEMAILER_GMAIL_APP_PASSWORD!;