import { config } from 'dotenv';
import twilio from 'twilio';
import { EventEmitter } from 'events';

const myEmitter = new EventEmitter();
config();
// Increase the max listeners limit for this emitter
myEmitter.setMaxListeners(20);

// Event listener example
myEmitter.on('smsSent', (messageSid) => {
  console.log(`SMS successfully sent: ${messageSid}`);
});

// Error listener example
myEmitter.on('smsError', (error) => {
  console.error('Error sending SMS:', error);
});


const accountSid: string = process.env.TWILIO_ACCOUNT_SID as string;
const authToken: string = process.env.TWILIO_AUTH_TOKEN as string;
const twilioPhoneNumber: string = process.env.TWILIO_PHONE_NUMBER as string;

const client = twilio(accountSid, authToken);

const sendSms = (phone: string, message: string): void => {
    const messageData = {
        body: message,
        from: twilioPhoneNumber,
        to: phone,
      };
    
      client.messages
        .create(messageData)
        .then((message) => {
          console.log(`Message sent: ${message.sid}`);
          myEmitter.emit('smsSent', message.sid); // Emit success event
        })
        .catch((error) => {
          console.error('Error sending SMS:', error);
          myEmitter.emit('smsError', error); // Emit error event
        });
}

export default sendSms;
