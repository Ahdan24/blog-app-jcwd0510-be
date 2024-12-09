import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_SECRETFORGOT_PASSWORD = process.env.JWT_SECRETFORGOT_PASSWORD;
export const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
export const BASE_URL_FE = process.env.BASE_URL_FE;
