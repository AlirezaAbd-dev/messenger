import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   tls: {
      rejectUnauthorized: true,
   },
   auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
   },
});

export default transport;
