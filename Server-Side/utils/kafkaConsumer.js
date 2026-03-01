import { Kafka } from "kafkajs";
import sendEmail from "./sendEmail.js";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({
    clientId: "email-service",
    brokers: [`${process.env.KAFKA_BROKER}`],
});


const consumer = kafka.consumer({ groupId: "email-group" });

await consumer.connect();
await consumer.subscribe({ topic: "email-topic", fromBeginning: false });

await consumer.run({
    eachMessage: async ({ message }) => {
        const data = JSON.parse(message.value.toString());

        if (data.type === "EMAIL_VERIFICATION") {
            const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${data.verificationToken}`;

            await sendEmail({
            to: data.email,
            subject: "Verify Your Email",
            html: `
            <h2>Email Verification</h2>
            <p>Click the link below to verify your account:</p>
            <a href="${verifyUrl}"><b>Click Here</b></a>
            `,
            });
            console.log("message sent");
        }
    },
});