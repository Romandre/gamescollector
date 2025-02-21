import axios from "axios";

export async function getGames(query: string) {
  const response = await axios.get("/api/games", { params: { query } });
  return response.data;
}
