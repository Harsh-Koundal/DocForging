import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
});

const sendEmail = async ({ to, subject, html }) => {
    if (!to || typeof to !== "string") {
        throw new Error("Invalid recipient email");
    }
    await transporter.sendMail({
        from:`DocForging <${process.env.ADMIN_MAIL}>`,
        to, subject,
        html,
    });
};

export default sendEmail;