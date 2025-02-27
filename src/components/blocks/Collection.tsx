"use client";
import { useEffect, useState, useCallback } from "react";

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
import { useFavourite } from "@/hooks";

export function Collection({ user }: { user: User | null }) {
  const [favourites, setFavourites] = useState<GamesCollection[] | null>(null);
  const [games, setGames] = useState(null);
  const { message, isCollectionLoading, getCollection } = useFavourite(
    user?.id
  );

  const gameIds = favourites?.map((item) => item.game_id).join(",");
  const query = `fields *, genres.name, platforms.name, release_dates.*, cover.url; where id = (${gameIds});`;
  const { data: gamesFromApi, isLoading: apiIsLoading /* isError, error */ } =
    useQuery({
      queryKey: ["game", gameIds],
      queryFn: () => getGames(query),
      enabled: !!favourites,
    });

  const isLoading = apiIsLoading || isCollectionLoading;

  const formCollection = useCallback(async () => {
    const favourites = await getCollection();
    if (favourites.length) {
      setFavourites(favourites);
    }
  }, [getCollection]);

  useEffect(() => {
    formCollection();
  }, [formCollection]);

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
