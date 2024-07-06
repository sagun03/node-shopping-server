import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: 'your-client-id',
  brokers: ['localhost:9092'], // Your Kafka broker address
});

const producer = kafka.producer();

const sendMessage = async (topic: string, message: string) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: message }],
  });
  await producer.disconnect();
};

export default sendMessage;
