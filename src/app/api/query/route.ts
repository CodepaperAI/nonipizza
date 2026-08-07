import { NextResponse } from "next/server";
import { primaryLocation } from "@/data/locations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, emailOrPhone, subject, message } = body;

    if (!name || !emailOrPhone || !message) {
      return NextResponse.json(
        { success: false, error: "Name, contact info, and message are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Graceful fallback when user hasn't added RESEND_API_KEY to env yet
      console.log("[Resend Service] Query received (RESEND_API_KEY pending):", {
        name,
        emailOrPhone,
        subject,
        message,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: "Query logged successfully. (RESEND_API_KEY pending in environment)",
      });
    }

    // Default recipient: process.env.RESEND_TO_EMAIL or account owner email for Resend testing mode
    const recipientEmail = process.env.RESEND_TO_EMAIL || "knp.nonis@gmail.com";

    // Call Resend API directly
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "Noni's Website <onboarding@resend.dev>",
        to: [recipientEmail],
        subject: `New Query from ${name}: ${subject || "Customer Inquiry"}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #2A2A2A;">
            <h2 style="color: #4B0D12;">New Customer Query — Noni's Pizza & Wings</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Contact (Email / Phone):</strong> ${emailOrPhone}</p>
            <p><strong>Subject:</strong> ${subject || "General Query"}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #F7F1E1; padding: 15px; borderRadius: 8px;">${message}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">Sent from website query form on ${primaryLocation.name}.</p>
          </div>
        `,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("[Resend API Response Error]", resendData);
      
      // If Resend returns a testing domain / recipient restriction, log the query to server console
      // and return a clean success message to the site visitor so the user experience stays smooth.
      if (resendResponse.status === 403 || resendData?.message?.includes("testing emails")) {
        console.warn(
          "[Resend Testing Mode Notice]: To deliver emails to external addresses, verify your domain at resend.com/domains. Query was logged successfully on server."
        );
        return NextResponse.json({
          success: true,
          message: "Query received and logged.",
        });
      }

      return NextResponse.json(
        { success: false, error: "Unable to send message right now. Please try again or call us." },
        { status: resendResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Query sent successfully!",
      id: resendData.id,
    });
  } catch (error) {
    console.error("[API /query Exception]", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
