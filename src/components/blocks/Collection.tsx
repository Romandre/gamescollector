"use client";
import axios from "axios";
import { type User } from "@supabase/supabase-js";
import { supabaseClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

// Components
import { Grid } from "../design";
import { GameCard } from "./GameCard";
import Skeleton from "react-loading-skeleton";

// Types
import { Game, GamesCollection } from "@/types";

// Styles
import { css } from "../../../styled-system/css";
import { useQuery } from "@tanstack/react-query";

const getGames = async (query: string) => {
  const response = await axios.get("/api/games", { params: { query } });
  return response.data;
};

export function Collection({ user }: { user: User | null }) {
  const supabase = supabaseClient();
  const [favourites, setFavourites] = useState<GamesCollection[] | null>(null);
  const [games, setGames] = useState(null);
  const [dbIsLoading, setDbIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const gameIds = favourites?.map((item) => item.game_id).join(",");
  const query = `fields *, genres.name, platforms.name, release_dates.*, cover.url; where id = (${gameIds});`;
  const { data: gamesFromApi, isLoading: apiIsLoading /* isError, error */ } =
    useQuery({
      queryKey: ["game", gameIds],
      queryFn: () => getGames(query),
    });

  const isLoading = apiIsLoading || dbIsLoading;

  const getFavourites = useCallback(async () => {
    setDbIsLoading(true);
    try {
      const { data, error, status } = await supabase
        .from("favourites")
        .select(`*`)
        .eq("user_id", user?.id);

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFavourites(data);
      }
    } catch (error) {
      setMessage("You don't have any games in your collection.");
      console.log(error);
    } finally {
      setDbIsLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getFavourites();
  }, [getFavourites]);

  useEffect(() => {
    if (gamesFromApi) setGames(gamesFromApi.games);
  }, [gamesFromApi]);

  return (
    <div>
      {!games && !isLoading ? (
        !!message ? (
          <div>{message}</div>
        ) : (
          <div>Something went wrong</div>
        )
      ) : (
        <GridView games={games} isLoading={isLoading} />
      )}
    </div>
  );
}

const GridView = ({
  games,
  isLoading,
}: {
  games: Game[] | null;
  isLoading: boolean;
}) => {
  return (
    <Grid>
      {games &&
        games?.length &&
        games?.map((game) => <GameCard key={game.id} game={game} />)}
      {!games &&
        isLoading &&
        [...Array(Number(6)).keys()].map((item) => (
          <Skeleton key={item} className={css({ pt: "120%" })} />
        ))}
    </Grid>
  );
};
