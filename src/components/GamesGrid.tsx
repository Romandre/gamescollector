"use client";
import { useRouter } from "next/navigation";

// Components
import { GameSorting } from "./GameSorting";
import { GameCard } from "./GameCard";
import { Grid } from "./design/Grid";
import { InView } from "react-intersection-observer";
import { Tiles, PlatformsIcons, StarsRating } from "./design";
import Image from "next/image";

// Context
import { useGamesContext } from "@/context";

// Add-ons
import Skeleton from "react-loading-skeleton";

// Styles
import { css } from "../../styled-system/css";
import "react-loading-skeleton/dist/skeleton.css";

export function GamesGrid() {
  const { games, view, loadMore, isError, emptyData, error, isLoading } =
    useGamesContext();

  if (!!isError) return <div>Error fetching games: {error.message}</div>;

  return (
    <>
      <GameSorting />
      {view === "grid" && <GridView />}
      {view === "list" && <ListView />}
      {view === "list-min" && <ListMinView />}
      {!!games.length && !isLoading && (
        <div className={css({ position: "relative" })}>
          <InView
            as="div"
            delay={100}
            onChange={(inView) => {
              if (inView) loadMore();
            }}
            className={css({ position: "absolute", bottom: 0, h: "80vh" })}
          />
        </div>
      )}
      {emptyData && <p>No games found</p>}
    </>
  );
}

const GridView = () => {
  const { games, offset, limit, isLoading, isFetching } = useGamesContext();

  return (
    <Grid>
      {!!games.length &&
        games?.map((game) => <GameCard key={game.id} game={game} />)}
      {(isLoading ||
        isFetching ||
        (!!games.length && games.length <= offset)) &&
        [...Array(Number(limit)).keys()].map((item) => (
          <Skeleton key={item} className={css({ pt: "120%" })} />
        ))}
    </Grid>
  );
};

const ListView = () => {
  const { games, offset, limit, isLoading, isFetching } = useGamesContext();
  const router = useRouter();

  return (
    <ul>
      {!!games.length &&
        games?.map((game) => (
          <li
            key={game.id}
            onClick={() => router.push(`/game/${game.id}`)}
            className={`tile ${css({ display: "flex", mb: 2, p: 2, h: "190px", cursor: "pointer" })}`}
          >
            <div
              className={css({
                position: "relative",
                display: "inline-block",
                h: "100%",
                aspectRatio: "3/4",
              })}
            >
              {!!game?.cover?.url ? (
                <Image
                  src={`https:${game?.cover?.url?.replace("t_thumb", "t_cover_big_2x")}`}
                  alt={game.cover?.id}
                  fill
                  style={{ objectFit: "cover", animation: "fade-in 0.8s" }}
                  sizes="(max-width: 700px) 100vw, 700px"
                  className={css({
                    height: "100vh",
                  })}
                  loading="lazy"
                />
              ) : (
                <Image
                  src="/no-image.jpg"
                  alt="no-image"
                  fill
                  style={{ objectFit: "cover", animation: "fade-in 0.8s" }}
                  sizes="(max-width: 700px) 100vw, 700px"
                  className={css({
                    height: "100vh",
                  })}
                  loading="lazy"
                />
              )}
            </div>
            <div
              className={css({
                display: "inline-grid",
                gridTemplateRows: isNaN(game.total_rating)
                  ? "auto auto 1fr"
                  : "auto auto auto 1fr",
                verticalAlign: "top",
                mx: 3,
              })}
            >
              <div className={css({ fontSize: 20, mb: 2 })}>{game.name}</div>
              <StarsRating
                rating={game.total_rating}
                className={css({ ml: 1, scale: 1.1, justifySelf: "baseline" })}
              />
              <PlatformsIcons
                platforms={game.platforms}
                className={css({ my: 4 })}
              />
              <div className={css({ alignSelf: "end" })}>
                <Tiles array={game.genres?.map((genre) => genre.name).sort()} />
              </div>
            </div>
          </li>
        ))}
      {(isLoading ||
        isFetching ||
        (!!games.length && games.length <= offset)) &&
        [...Array(Number(limit)).keys()].map((item) => (
          <Skeleton key={item} height="190px" className={css({ mb: 2 })} />
        ))}
    </ul>
  );
};

const ListMinView = () => {
  const { games, offset, limit, isLoading, isFetching } = useGamesContext();

  return (
    <ul>
      {!!games.length &&
        games?.map((game) => (
          <li
            key={game.id}
            onClick={() => router.push(`/game/${game.id}`)}
            className={`tile ${css({ mb: 2, py: 2, px: 4, cursor: "pointer" })}`}
          >
            {game.name}
          </li>
        ))}
      {(isLoading ||
        isFetching ||
        (!!games.length && games.length <= offset)) &&
        [...Array(Number(limit)).keys()].map((item) => (
          <Skeleton key={item} className={css({ mb: 2 })} />
        ))}
    </ul>
  );
};
