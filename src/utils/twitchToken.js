import axios from "axios";
import { getCache, setCache } from "./cache";

const TWITCH_TOKEN_KEY = "twitchAccessToken";

export const getTwitchToken = async () => {
  const cachedToken = getCache(TWITCH_TOKEN_KEY);
  if (cachedToken) {
    return cachedToken;
  }

  const url = process.env.TWITCH_TOKEN_URL;
  const params = {
    client_id: process.env.IGDB_CLIENT_ID,
    client_secret: process.env.IGDB_CLIENT_SECRET,
    grant_type: "client_credentials",
  };

  const response = await axios.post(url, null, { params });

  const token = response.data.access_token;
  const tokenExpiry = Date.now() + response.data.expires_in * 1000;

  // For test purposes
  // console.log("token: ", token);

  setCache(TWITCH_TOKEN_KEY, token, tokenExpiry);

  return token;
};
