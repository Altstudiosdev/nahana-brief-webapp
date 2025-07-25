import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://n8n-service-pafl.onrender.com/webhook/brief-processor";
const N8N_API_KEY = process.env.N8N_API_KEY;

// Test mode: if n8n is not configured, return a mock response
const USE_TEST_MODE = process.env.USE_N8N_TEST_MODE === "true" || !process.env.N8N_WEBHOOK_URL;

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

    // Test mode - return mock formatted brief
    if (USE_TEST_MODE) {
      console.log("Running in test mode - n8n webhook not configured");

      const mockFormattedBrief = `
**PROJECT BRIEF**

**Overview:**
${briefInput}

**Key Objectives:**
- Define clear project goals and deliverables
- Establish timeline and milestones
- Identify key stakeholders and responsibilities

**Scope:**
Based on your input, this project involves creating a comprehensive solution that addresses the stated requirements.

**Timeline:**
- Phase 1: Planning and Design (Week 1-2)
- Phase 2: Implementation (Week 3-6)
- Phase 3: Testing and Refinement (Week 7-8)
- Phase 4: Deployment and Launch (Week 9)

**Success Criteria:**
- Meet all functional requirements
- Deliver on schedule
- Achieve quality standards
- Ensure stakeholder satisfaction

**Note:** This is a test response. To enable real AI-powered brief formatting, please configure your n8n webhook.
`;

      return NextResponse.json({
        success: true,
        formattedBrief: mockFormattedBrief.trim(),
        testMode: true,
      });
    }

    // Send request to n8n webhook
    console.log("Sending request to n8n webhook:", N8N_WEBHOOK_URL);

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

    const responseText = await response.text();

    if (!response.ok) {
      console.error(`n8n webhook error: ${response.status} - ${responseText}`);

      if (response.status === 404) {
        throw new Error("n8n webhook not found. Please ensure your n8n workflow is active and the webhook URL is correct.");
      }

      throw new Error(`n8n webhook returned ${response.status}: ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      // If response is not JSON, treat it as plain text
      data = { formattedBrief: responseText };
    }

    return NextResponse.json({
      success: true,
      formattedBrief: data.formattedBrief || data,
    });
  } catch (error) {
    console.error("Error processing brief:", error);

    const errorMessage = error instanceof Error ? error.message : "Failed to process brief";

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error : undefined
      },
      { status: 500 }
    );
  }
} 