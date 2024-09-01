import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

class PaymentService {
  constructor() {
    // Initialize other services if needed
  }

  // CREATE PAYMENT
  public async createPayment(amount: number): Promise<any> {
    try {
      // CREATE STRIPE PAYMENT INTENT
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Convert to cents
        currency: "cad",
        receipt_email: "ybandhara@gmail.com",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      console.log(paymentIntent);
      // RETURN SUCCESS RESPONSE
      return {
        clientSecret: paymentIntent.client_secret,
      };
    } catch (error) {
      // LOG AND RETURN ERRORS
      console.error("Payment error:", error);
      return { error: error };
    }
  }
}

export default PaymentService;
