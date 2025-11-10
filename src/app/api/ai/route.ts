import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface Filters {
  genre?: string;
  mood?: string;
  platform?: string;
}

interface GameSuggestion {
  title: string;
}

const getGameSuggestions = async (
  filters: Filters
): Promise<GameSuggestion[]> => {
  try {
    const prompt = `Suggest 10 games max fitting these preferences: ${JSON.stringify(
      filters
    )}. Return the results as JSON array with objects containing {title}.`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // cheapest model
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300, // keep response short to save costs
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.choices[0].message.content;

    try {
      return JSON.parse(text);
    } catch {
      console.warn("Failed to parse JSON, returning raw text");
      return [{ title: text }]; // Fallback to raw text
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("OpenAI API error:", error.response?.data || error.message);
    }
    throw error;
  }
};

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const genre = url.searchParams.get("genre") || "";
  const mood = url.searchParams.get("mood") || "";
  const platform = url.searchParams.get("platform") || "";

  const filters: Filters = { genre, mood, platform };

  try {
    const suggestions = await getGameSuggestions(filters);
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error fetching game suggestions:", error);
    return NextResponse.json(
      { error: "Failed to fetch game suggestions" },
      { status: 500 }
    );
  }
};
