"use client";

// Hooks
import { useQuery } from "@tanstack/react-query";

// Components
import { Grid } from "./design";
import { GameCard } from "./blocks";
import Skeleton from "react-loading-skeleton";

// Utils
import { getGames } from "@/utils/getGames";

// Types
import { Game } from "@/types";

// Styles
import { css } from "../../styled-system/css";

const timeNow = Math.floor(Date.now() / 1000);

export function ComingSoonPage() {
  const comingSoonQuery = `fields name, first_release_date, cover.*, platforms.*; where first_release_date > ${timeNow} & hypes > 5; sort first_release_date asc; limit 500;`;
  const { data, isLoading /*  isError, error */ } = useQuery({
    queryKey: ["comingSoon", [comingSoonQuery]],
    queryFn: () => getGames(comingSoonQuery),
  });
  const games = data?.games;

  return <GridView games={games} isLoading={isLoading} />;
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
        [...Array(Number(12)).keys()].map((item) => (
          <Skeleton key={item} className={css({ pt: "120%" })} />
        ))}
    </Grid>
  );
};
