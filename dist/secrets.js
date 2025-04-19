"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODEMAILER_GMAIL_APP_PASSWORD = exports.NODEMAILER_PORT = exports.NODEMAILER_SENDER_ADDRESS = exports.NODEMAILER_HOST = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
exports.PORT = process.env.PORT;
exports.NODEMAILER_HOST = process.env.NODEMAILER_HOST;
exports.NODEMAILER_SENDER_ADDRESS = process.env.NODEMAILER_SENDER_ADDRESS;
exports.NODEMAILER_PORT = process.env.NODEMAILER_PORT;
exports.NODEMAILER_GMAIL_APP_PASSWORD = process.env.NODEMAILER_GMAIL_APP_PASSWORD;
