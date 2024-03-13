import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined");
}
const stripe = new Stripe(stripeSecretKey);

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        // payment_method_types: ["card"],
        // line_items: req?.body?.items ?? [],
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1Otoj8AUCR58YXE60ouYQFlV",
            quantity: 1,
          },
        ],
        // success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        // cancel_url: `${req.headers.origin}/cart`,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      res.status(200).json(session);
    } catch (err) {
      const errorResponse = new Response(
        JSON.stringify({
          statusCode: 500,
          message: "Error creating checkout session",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
      return errorResponse;
    }
  } else {
    res.setHeader("Allow", "POST");
    const errorResponse = new Response(
      JSON.stringify({ statusCode: 405, message: "Method Not Allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      },
    );
    return errorResponse;
  }
}
