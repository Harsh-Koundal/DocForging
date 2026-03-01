import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({
    clientId:"auth-service",
    brokers:[`${process.env.KAFKA_BROKER}`],
});

const producer = kafka.producer();

export const connectProducer = async()=>{
    await producer.connect();
}

export const sendEmailEvent = async(payload) =>{
    await producer.send({
        topic:"email-topic",
        messages:[
            {
                value:JSON.stringify(payload),
            },
        ],
    });
};