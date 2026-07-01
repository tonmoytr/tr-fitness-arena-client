import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe"; // Keeps your exact stripe instance import intact

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // 1. EXTRACT INBOUND PARAMETERS: Capture the runtime options from your client fetch trigger
    const { classId, className, price, image, userId } = await req.json();

    if (!classId || !price || !userId) {
      return NextResponse.json(
        { error: "Missing required booking payload constraints." },
        { status: 400 },
      );
    }

    // Ensure image URL is absolute (Stripe requirement)
    let imageUrls = [];
    if (image) {
      if (image.startsWith("http://") || image.startsWith("https://")) {
        imageUrls = [image];
      } else if (image.startsWith("/")) {
        imageUrls = [`${origin}${image}`];
      } else {
        imageUrls = [`${origin}/${image}`];
      }
    }

    // 2. CREATE CHECKOUT SESSION: Modified with inline product generation and tracking identifiers
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: className,
              images: imageUrls, // Absolute URL string array fallback
            },
            // Stripe demands integer calculation values scaled completely in cents ($15.00 -> 1500)
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",

      // 3. PERSIST THE TRANSACTION DATA: Pass essential metadata context strings so Stripe records it
      metadata: {
        classId: classId,
        userId: userId,
      },

      // Redirect handles matching your configuration paths layout tree
      success_url: `${origin}/dashboard/booked?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/classes/${classId}`,
    });

    // 4. RETURN REDIRECT PAYLOAD: Respond with the session URL so your client handler can redirect smoothly
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Gateway Allocation Failure:", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
