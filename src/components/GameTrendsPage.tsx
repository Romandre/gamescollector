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
import { grid } from "../../styled-system/patterns";

export function GameTrendsPage({ query }: { query: string }) {
  const { data, isLoading /*  isError, error */ } = useQuery({
    queryKey: ["comingSoon", [query]],
    queryFn: () => getGames(query),
    enabled: !!query,
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
