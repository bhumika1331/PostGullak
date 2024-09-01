"use client"; // Mark this as a Client Component

import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dashboard route
    router.replace("/post"); // Replace this with your actual dashboard route
  }, [router]);

  return null; // No need to render anything as the user is being redirected
}
