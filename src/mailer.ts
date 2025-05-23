import nodemailer from 'nodemailer';
import {
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_SENDER_ADDRESS,
  NODEMAILER_GMAIL_APP_PASSWORD
} from './secrets';

let transport = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: Number(NODEMAILER_PORT),
  secure: true,
  auth: {
    user: NODEMAILER_SENDER_ADDRESS,
    pass: NODEMAILER_GMAIL_APP_PASSWORD
  }
});

// TODO: we need to have some robust approach here => What changes are we expecting?
export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: NODEMAILER_SENDER_ADDRESS,
    to,
    subject,
    html: text
  };

  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log('Mail sent successfully');
    }
  });
};
