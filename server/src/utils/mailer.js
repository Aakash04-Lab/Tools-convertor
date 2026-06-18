import nodemailer from 'nodemailer';

export const sendOtpEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: `MERN Tools Suite <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset OTP',
    html: `<h2>Your OTP is ${otp}</h2><p>This OTP is valid for 10 minutes.</p>`
  });
};
