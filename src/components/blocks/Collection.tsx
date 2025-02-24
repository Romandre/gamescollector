"use client";
import { supabaseClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

// Components
import { Grid } from "../design";
import { GameCard } from "./GameCard";
import Skeleton from "react-loading-skeleton";

// Hooks
import { useQuery } from "@tanstack/react-query";

// Utils
import { getGames } from "@/utils/getGames";

// Types
import { type User } from "@supabase/supabase-js";
import { Game, GamesCollection } from "@/types";

// Styles
import { css } from "../../../styled-system/css";
import { grid } from "../../../styled-system/patterns";

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
      enabled: !!favourites,
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
        setMessage(
          "Error occured on retrieving your collection. Try again later."
        );
        console.log(error);
        throw error;
      }

      if (data && !data.length) {
        setMessage("You don't have any games in your collection.");
      }

      if (data && data.length) {
        setFavourites(data);
      }
    } catch (error) {
      setMessage("Something went wrong. Try again later.");
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
    <div className={css({ animation: "fade-in 0.2s" })}>
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
  const gridClass = grid({
    w: "100%",
    columns: { base: 2, sm: 3, lg: 4, xl: 5, "2xl": 6 },
    gap: { base: 2.5, sm: 2 },
  });

  return (
    <Grid className={gridClass}>
      {games &&
        games?.length &&
        games?.map((game) => <GameCard key={game.id} game={game} />)}
      {!games &&
        isLoading &&
        [...Array(Number(12)).keys()].map((item) => (
          <Skeleton key={item} className={css({ pt: "120%" })} />
        ))}
    </Grid>
  );
};
