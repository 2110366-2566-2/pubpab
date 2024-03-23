import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined");
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    // Handle non-POST requests (e.g., return a 405 Method Not Allowed error)
    return NextResponse.json({
      statusCode: 405,
      message: "Method Not Allowed",
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment", // Payment mode
      payment_method_types: ["card"], // Accepted payment methods (e.g., card)
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1Otoj8AUCR58YXE60ouYQFlV",
          quantity: 1,
        },
      ], // Dynamically set line items from request body
      success_url:
        process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL ||
        "http://localhost:3000/register/host", // Set success URL dynamicaler (consider environment variables)
      cancel_url:
        process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL ||
        "http://localhost:3000/register/traveler", // Set cancel URL dynamically (consider environment variables)
    });
    console.log(session);
    return NextResponse.redirect(session.url as string);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({
      statusCode: 500,
      message: "Error creating checkout session",
    });
  }
}
