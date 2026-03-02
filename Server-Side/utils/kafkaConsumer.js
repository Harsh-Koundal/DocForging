import { Kafka } from "kafkajs";
import sendEmail from "./sendEmail.js";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({
    clientId: "email-service",
    brokers: [`${process.env.KAFKA_BROKER}`],
});


const consumer = kafka.consumer({ groupId: "email-group" });

console.log("Connecting consumer...");

await consumer.connect();
console.log("Consumer connected");

await consumer.subscribe({ topic: "email-topic", fromBeginning: true });
console.log("Subscribed to topic");

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log("Message received:");
    console.log(message.value.toString());

    try {
      const data = JSON.parse(message.value.toString());

      if (data.type === "EMAIL_VERIFICATION") {
        console.log("Processing email verification...");

        const verifyUrl = `${process.env.SERVER_URL}/api/auth/verify/${data.verificationToken}`;

        await sendEmail({
          to: data.email,
          subject: "Verify Your Email",
          html: `<h2>Email Verification</h2>
                 <a href="${verifyUrl}">Click Here</a>`,
        });

        console.log("Email sent successfully");
      }
    } catch (err) {
      console.error("Email processing error:", err);
    }
  },
});