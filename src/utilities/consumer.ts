/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Kafka } from "kafkajs";

// Initialize Kafka consumer
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"], // Replace with your Kafka broker address
});

const consumer = kafka.consumer({ groupId: "my-group" }); // Replace with your group ID

async function consumeMessages() {
  await consumer.connect();
  await consumer.subscribe({ topic: "order-topic" });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Process each message here
      console.log(
        {
          partition,
          offset: message.offset,
          value: message?.value?.toString(),
        },
        "hellooo>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      );

      // Example: Handle message processing (e.g., save to database)
      try {
        // const orderData = JSON.parse(message.value.toString());
        // Implement your logic here based on the message data
      } catch (error) {
        console.error("Error processing message:", error);
      }
    },
  });
}

// Start consuming messages
// consumeMessages().catch((error) => {
//   console.error('Error consuming messages:', error);
// });

export default consumeMessages;
