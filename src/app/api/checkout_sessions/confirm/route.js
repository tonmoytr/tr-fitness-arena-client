import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";

export async function POST(req) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing sessionId parameter." },
        { status: 400 },
      );
    }

    // 1. Fetch checkout session directly from Stripe for validation
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment verification failed. Session status is unpaid." },
        { status: 400 },
      );
    }

    // 2. Extract transaction identifiers and client metadata
    const { classId, userId } = session.metadata;
    const amountPaid = session.amount_total / 100; // Stripe cents back to dollars
    const transactionId = session.payment_intent; // Stripe PaymentIntent ID

    if (!classId || !userId) {
      return NextResponse.json(
        { error: "Missing user/class metadata in Stripe transaction record." },
        { status: 400 },
      );
    }

    // 3. Make secure server-to-server call to your Express API backend
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${BASE_URL}/bookings/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classId,
        userId,
        amountPaid,
        transactionId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Forward the error message from the Express backend
      return NextResponse.json(
        { error: data.message || "Failed to confirm booking on the backend." },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Slot reservation successfully secured!",
      booking: data.booking,
    });
  } catch (err) {
    console.error("Stripe payment confirmation logic crashed:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal server error during confirmation." },
      { status: 500 },
    );
  }
}
