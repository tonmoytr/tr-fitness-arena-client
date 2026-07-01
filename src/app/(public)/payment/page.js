import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getClassById } from "@/lib/actions/classes";
import PaymentClient from "@/components/payment/PaymentClient";

export const metadata = {
  title: "Secure Checkout | TR Fitness Arena",
  description: "Securely book your professional training class with Stripe.",
};

export default async function PaymentPage({ searchParams }) {
  const { classId } = await searchParams;

  if (!classId) {
    redirect("/classes");
  }

  // 1. Authenticate user
  const session = await auth.api.getSession({ headers: await headers() });
  const currentUser = session?.user;

  if (!currentUser) {
    // Redirect to login if user session is absent
    redirect(`/signIn?callbackUrl=/payment?classId=${classId}`);
  }

  // 2. Fetch class details from DB actions
  const { data: fitnessClass, error } = await getClassById(classId);

  if (error || !fitnessClass) {
    redirect("/classes");
  }

  return (
    <PaymentClient
      fitnessClass={fitnessClass}
      currentUser={currentUser}
    />
  );
}
