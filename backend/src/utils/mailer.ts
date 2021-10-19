const nodemailer = require("nodemailer");
require('dotenv').config();

export default async function mailer(info: Object) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
      },
    });

    await transporter.sendMail(info);

  } catch (error: any) {
    throw new Error(error);
  }

}
