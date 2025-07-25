import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://n8n-service-pafl.onrender.com/webhook/brief-processor";
const N8N_API_KEY = process.env.N8N_API_KEY;

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the brief content from request body
    const body = await request.json();
    const { briefInput } = body;

    if (!briefInput) {
      return NextResponse.json({ error: "Brief input is required" }, { status: 400 });
    }

    // Send request to n8n webhook
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(N8N_API_KEY && { "X-N8N-API-KEY": N8N_API_KEY }),
      },
      body: JSON.stringify({
        briefInput,
        userId,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook returned ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      formattedBrief: data.formattedBrief || data,
    });
  } catch (error) {
    console.error("Error processing brief:", error);
    return NextResponse.json(
      { error: "Failed to process brief" },
      { status: 500 }
    );
  }
} 