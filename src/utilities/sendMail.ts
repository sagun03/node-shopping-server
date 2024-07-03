import createTransporter from "../emailConfig/emailTransporter";
import { generateOrderEmail } from "./emailMapper";

async function sendEmail(order: any,recipient:string) {
    const { text, html } = generateOrderEmail(order);
    const mailOptions = {
      from: 'ybandhara@gmail.com',
      to: recipient,
      subject: 'Order Confirmation',
      text,
      html,
    };
  
    try {
      const transporter = await createTransporter();
      return transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  export default sendEmail;