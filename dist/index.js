"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const secrets_1 = require("./secrets");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const error_1 = require("./middleware/error");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mailer_1 = require("./mailer");
const app = (0, express_1.default)();
const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.uat';
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, envFile) });
app.use(express_1.default.json());
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL] // PROD ENV
    : '*'; // Allow all origins in DEV ENV
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins === '*' || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies and Authorization headers, if any.
};
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions));
app.post('/form', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name = "", phone = "", collegeName = "", message = "" } = req.body;
    yield (0, mailer_1.sendEmail)(secrets_1.NODEMAILER_SENDER_ADDRESS, 'Enquiry', `
       <p>Name: ${name}</p>
       <p>Phone: ${phone}</p>
       <p>College Name: ${collegeName}</p>
       <p>Message: ${message}</p>
    `);
    res.status(200).json({
        success: true,
        message: 'Email sent successfully'
    });
})));
app.use(error_1.errorHandler);
app.listen(secrets_1.PORT, () => {
    console.log(`Started Your Application on Port ${secrets_1.PORT}`);
});
