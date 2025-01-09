import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { getTwitchToken } from "@/utils/twitchToken";

const getGames = async (query: string | null) => {
  const token = await getTwitchToken();
  const url = `${process.env.NEXT_PUBLIC_IGDB_GAMES_URL!}`;

  try {
    if (query?.includes("popularity_type")) {
      const games = await axios.post(`${url}/popularity_primitives`, query, {
        headers: {
          "Client-ID": `${process.env.IGDB_CLIENT_ID}`,
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain",
        },
      });

      return { games: games.data };
    } else {
      const games = await axios.post(`${url}/games`, query, {
        headers: {
          "Client-ID": `${process.env.IGDB_CLIENT_ID}`,
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain",
        },
      });

      const count = await axios.post(`${url}/games/count`, query, {
        headers: {
          "Client-ID": `${process.env.IGDB_CLIENT_ID}`,
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain",
        },
      });

      return { games: games.data, ...count.data };
    }
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
    const games = await getGames(query);
    return Response.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    return Response.json({ error: "Failed to fetch games" });
  }
};

export { GET };
