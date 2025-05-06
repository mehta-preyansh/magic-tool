import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export type graph = 'bar-chart' | 'pie-chart' | 'line-chart';
export interface DashboardData {
  dashboard_name: string;
  description: string;
  data_entries: {
    fields: Array<{
      label: string;
      description?: string;
    }>;
    data_points: Array<{
      label: string;
      value: string;
    }>;
  };
  recommended_visualizations: graph[];
  sorting?: string[]
}

interface ErrorResponse {
  error: string;
  details?: string;
}

export async function POST(request: Request) {
  try {
    const { userPrompt }: { userPrompt: string } = await request.json();

    if (!userPrompt || typeof userPrompt !== "string") {
      throw new Error("Invalid user prompt");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const structuredPrompt = `
      Generate a strict JSON for a dashboard about: ${userPrompt}.
      Use this schema:
      {
        "dashboard_name": string, // A basic tool name
        "description": string,  // A short description of the tool
        "data_entries": {
          "fields": DataField[], //Fields for the dashboard
          "data_points": DataPoint[] //Mock data
        },
        "recommended_visualizations": string[], // A list of recommended visualizations for the dashboard out of 'bar-chart' | 'pie-chart' | 'line-chart'.
        "sorting": string[] | null // Optional: A list of fields on which the dashboard should be able to sort
      }
      Additional info:
        interface DataField {
          label: string;
          description?: string;
        }
        interface DataPoint {
          label: string;
          value: string;
        }
      Return ONLY the JSON, without markdown or additional text.
    `;

    const result = await model.generateContent(structuredPrompt);
    const response = result.response;
    const text = response.text();

    // Clean and parse JSON
    const jsonString = text.trim().replace(/^```json|```$/g, "").trim();
    const parsedData: DashboardData = JSON.parse(jsonString);

    // Validate structure (optional, using type assertion)
    if (
      !parsedData.dashboard_name ||
      !parsedData.data_entries?.fields.length
    ) {
      throw new Error("Invalid JSON structure from Gemini");
    }

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate dashboard", details: error instanceof Error ? error.message : "Unknown error" } as ErrorResponse,
      { status: 500 }
    );
  }
}