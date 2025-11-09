"use client";
import { InView } from "react-intersection-observer";

// Components
import { GameCard, GameSorting, PlatformIcons, StarsRating } from "./";
import { Grid, Tiles } from "../design";
import Image from "next/image";
import Link from "next/link";

// Context
import { useGamesContext } from "@/context";

// Add-ons
import Skeleton from "react-loading-skeleton";

// Styles
import { css } from "../../../styled-system/css";
import "react-loading-skeleton/dist/skeleton.css";

export function GamesGrid() {
  const { games, view, loadMore, isError, emptyData, error, isLoading } =
    useGamesContext();

  if (!!isError) return <div>Error fetching games: {error?.message}</div>;

  return (
    <div>
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
    </div>
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

  return (
    <ul className={css({ display: "inline-block", w: "full" })}>
      {!!games.length &&
        games?.map((game) => (
          <li
            key={game.id}
            className={`tile ${css({
              mb: 2,
              cursor: "pointer",
              userSelect: "none",
            })}`}
          >
            <Link
              className={css({
                display: "flex",
                w: "full",
                h: "190px",
                p: 2,
                transition: "opacity .2s",
                _focus: {
                  opacity: 0.55,
                },
                _active: {
                  opacity: 0.55,
                },
                animation: "fade-in .6s",
              })}
              href={`/game/${game.id}`}
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
                  gridTemplateRows: !game.total_rating
                    ? "auto auto 1fr"
                    : "auto auto auto 1fr",
                  verticalAlign: "top",
                  mx: 3,
                })}
              >
                <div className={css({ fontSize: 20, mb: 2 })}>{game.name}</div>
                <StarsRating
                  rating={game.total_rating}
                  size={18}
                  className={css({
                    ml: 1,
                    my: 1,
                    scale: 1.1,
                    justifySelf: "baseline",
                  })}
                />
                <PlatformIcons
                  platforms={game.platforms}
                  className={css({ mt: 3 })}
                />
                {!!game.genres && (
                  <div
                    className={css({
                      display: { base: "none", sm: "block" },
                      alignSelf: "end",
                    })}
                  >
                    <Tiles
                      array={game.genres.map((genre) => genre.name).sort()}
                    />
                  </div>
                )}
              </div>
            </Link>
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
    <ul className={css({ display: "inline-block", w: "full" })}>
      {!!games.length &&
        games?.map((game) => (
          <li
            key={game.id}
            className={`tile ${css({ mb: 2, cursor: "pointer", userSelect: "none" })}`}
          >
            <Link
              href={`/game/${game.id}`}
              className={css({
                display: "block",
                w: "full",
                py: 2,
                px: 4,
                transition: "opacity .2s",
                _focus: {
                  opacity: 0.55,
                },
                _active: {
                  opacity: 0.55,
                },
                animation: "fade-in .6s",
              })}
            >
              {game.name}
            </Link>
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
