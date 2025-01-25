import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { getTwitchToken } from "@/utils/twitchToken";

const getOptions = async (query: string | null) => {
  const token = await getTwitchToken();
  const url = `${process.env.NEXT_PUBLIC_IGDB_GAMES_URL!}/multiquery`;

  try {
    const filterOptions = await axios.post(url, query, {
      headers: {
        "Client-ID": `${process.env.IGDB_CLIENT_ID}`,
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
    });

    return filterOptions.data[0].result;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
    }
    throw error;
  }
};

const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");

  try {
    const games = await getOptions(query);
    return Response.json(games);
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return Response.json({ error: "Failed to fetch filter options" });
  }
};

export { GET };
