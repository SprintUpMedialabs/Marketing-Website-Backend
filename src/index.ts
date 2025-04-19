import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { NODEMAILER_SENDER_ADDRESS, PORT } from './secrets';
import cors from 'cors';
import path from 'path';
import { errorHandler } from './middleware/error';
import expressAsyncHandler from 'express-async-handler';
import { sendEmail } from './mailer';

const app = express();

const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.uat';
dotenv.config({ path: path.resolve(__dirname, envFile) });

app.use(express.json());

const allowedOrigins =
    process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL] // PROD ENV
        : '*'; // Allow all origins in DEV ENV

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean | string) => void) => {
        if (!origin || allowedOrigins === '*' || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies and Authorization headers, if any.
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.post('/form', expressAsyncHandler(async (req: Request, res: Response) => {
    const { name = "",
        phone = "",
        collegeName = "",
        message = ""
    } = req.body;
    await sendEmail(NODEMAILER_SENDER_ADDRESS, 'Enquiry', `
       <p>Name: ${name}</p>
       <p>Phone: ${phone}</p>
       <p>College Name: ${collegeName}</p>
       <p>Message: ${message}</p>
    `);
    res.status(200).json({
        success: true,
        message: 'Email sent successfully'
    });
}));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Started Your Application on Port ${PORT}`);
});
