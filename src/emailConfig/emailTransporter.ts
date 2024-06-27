import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  '920962818240-tt4okktldmpk833miidgsuamnj91o6ni.apps.googleusercontent.com', // Replace with your client ID
  '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', // Replace with your client secret
  'https://developers.google.com/oauthplayground' // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: '1//04vCQV4vztgTCCgYIARAAGAQSNwF-L9Ir391gHZHOOuJmZ8r7EfqfoiHv2PfKjOZlXbeHRTrv5AqTXnfXVCVzP8PLBnTKlyPO2_o' // Replace with your refresh token
});

async function createTransporter() {
    try {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'ybandhara@gmail.com',
      clientId: '920962818240-tt4okktldmpk833miidgsuamnj91o6ni.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken: '1//04vCQV4vztgTCCgYIARAAGAQSNwF-L9Ir391gHZHOOuJmZ8r7EfqfoiHv2PfKjOZlXbeHRTrv5AqTXnfXVCVzP8PLBnTKlyPO2_o',
      accessToken: accessToken.token || '',
    },
  } as nodemailer.TransportOptions);

  return transporter;
} catch (error) {
    console.error('Error creating transporter:', error);
    throw new Error('Failed to create transporter');
  }
}

export default createTransporter;
