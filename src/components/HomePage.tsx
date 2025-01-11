"use client";
import axios from "axios";

// Components
import Image from "next/image";
import Link from "next/link";

// Hooks
import { useQuery } from "@tanstack/react-query";

// Types
import { Game } from "@/types";

// Styles
import { css } from "../../styled-system/css";

const getGames = async (query: string) => {
  const response = await axios.get("/api/games", { params: { query } });
  return response.data;
};

const getTimestampTwoMonthsAgo = () => {
  const now = new Date();
  now.setMonth(now.getMonth() - 2);
  return Math.floor(now.getTime() / 1000);
};

const timeNow = Math.floor(Date.now() / 1000);
const twoMonthsAgo = getTimestampTwoMonthsAgo();

export function HomePage({ randomImgNumber }: { randomImgNumber: number }) {
  const mostAnticipatedQuery = `fields name, first_release_date, cover, cover.*, platforms, platforms.*; where first_release_date > ${timeNow}; sort hypes desc; limit 4;`;
  const comingSoonQuery = `fields name, first_release_date, cover, cover.*; where first_release_date > ${timeNow} & hypes > 50; sort first_release_date asc; limit 4;`;
  const popularNowQuery = `fields name, first_release_date, cover, cover.*; where first_release_date > ${twoMonthsAgo} & first_release_date < ${timeNow}; sort hypes desc; limit 4;`;

  const { data: mostAnticipated /* isLoading, isError, error */ } = useQuery({
    queryKey: ["anticipated", [mostAnticipatedQuery]],
    queryFn: () => getGames(mostAnticipatedQuery),
  });
  const { data: comingSoon /* isLoading, isError, error */ } = useQuery({
    queryKey: ["comingSoon", [comingSoonQuery]],
    queryFn: () => getGames(comingSoonQuery),
  });
  const { data: popularNow /* isLoading, isError, error */ } = useQuery({
    queryKey: ["popular", [popularNowQuery]],
    queryFn: () => getGames(popularNowQuery),
  });
  const mostAnticipatedGames = mostAnticipated?.games || [];
  const comingSoonGames = comingSoon?.games || [];
  const popularNowGames = popularNow?.games || [];
  console.log(twoMonthsAgo);

  return (
    <div
      className={css({
        animation: "fade-in 0.8s",
      })}
    >
      <PageBackground randomImgNumber={randomImgNumber} />
      <div
        className={css({
          position: "relative",
          mt: 140,
          zIndex: 1,
          textAlign: "center",
        })}
      >
        <div
          className={css({
            position: "relative",
            display: "inline-block",
            color: "{colors.text.dark}",
            fontSize: { base: 60, lg: 70, "2xl": 74 },
            fontWeight: 700,
            textWrap: "balance",
            lineHeight: 1.2,
            letterSpacing: 1,
            textShadow: "4px 6px 4px rgba(0,0,0,0.55)",
          })}
        >
          Build Your Ultimate Game Collection
        </div>
        <div
          className={css({
            position: "relative",
            fontFamily: "var(--font-outfit-sans)",
            color: "{colors.text.dark}",
            fontSize: { base: 20, lg: 24, "2xl": 26 },
            textWrap: "balance",
            lineHeight: 1.2,
            letterSpacing: 1,
            textShadow: "4px 6px 4px rgba(0,0,0,0.8)",
          })}
        >
          <div className={css({ mt: 12 })}>
            Browse, find, track, share, like, save and comment games!
          </div>
          <div className={css({ mt: 12 })}>
            Check the{" "}
            <Link
              href="/browse"
              className={css({
                color: "var(--colors-primary)",
                fontWeight: 500,
              })}
            >
              games list
            </Link>{" "}
            right now!
          </div>
        </div>
        {!!mostAnticipatedGames.length && (
          <>
            <h1>Most Anticipated</h1>
            <div
              className={css({
                display: "grid",
                gridAutoFlow: "column",
                overflowX: "scroll",
                gap: 8,
              })}
            >
              {mostAnticipatedGames.map((game: Game) => (
                <GamePannel key={game.id} game={game} />
              ))}
            </div>
          </>
        )}
        {!!comingSoonGames.length && (
          <>
            <h1>Coming soon</h1>
            {comingSoonGames.map((game: Game) => (
              <GamePannel key={game.id} game={game} />
            ))}
          </>
        )}
        {!!popularNowGames.length && (
          <>
            <h1>Popular now</h1>
            {popularNowGames.map((game: Game) => (
              <GamePannel key={game.id} game={game} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const PageBackground = ({ randomImgNumber }: { randomImgNumber?: number }) => {
  /* const randomImg = useMemo(
    () => images[Math.floor(Math.random() * images.length)],
    [images]
  ); */

  return (
    randomImgNumber && (
      <div
        className={css({
          position: "absolute",
          top: 0,
          left: 0,
          w: "100%",
          h: "800px",
          overflow: "hidden",
          maskImage: {
            base: "linear-gradient(to top, transparent 8%, white 50%)",
            sm: "linear-gradient(to top, transparent 2%, 35%, white 55%)",
          },
        })}
      >
        <Image
          //src={`https:${randomImg.url.replace("t_thumb", "t_screenshot_huge_2x")}`}
          src={`/banner/${randomImgNumber}.png`}
          //alt={randomImg.id}
          alt={`img-${randomImgNumber}`}
          width="200"
          height="200"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          className={css({
            filter: "blur(3px)",
            scale: "1.01",
            objectPosition: "center 15%",
            animation: "fade-in 2s",
          })}
        />
      </div>
    )
  );
};

const GamePannel = ({ game }: { game: Game }) => {
  return (
    <div
      className={css({
        position: "relative",
        display: "flex",
        w: "800px",
        h: "500px",
        my: 4,
        mx: "auto",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "2px 2px 8px rgba(0,0,0,.8)",
      })}
    >
      <div
        className={css({
          position: "relative",
          h: "full",
          aspectRatio: "3 / 4",
          backgroundSize: "auto 100%",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "left",
        })}
        style={{
          backgroundImage: `url("https:${game.cover?.url.replace("t_thumb", "t_cover_big_2x")}")`,
        }}
      />
      <div
        className={css({
          position: "relative",
          w: "full",
        })}
      >
        <div
          className={css({
            position: "absolute",
            w: "full",
            h: "full",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            filter: "blur(50px)",
            transform: "scale(3)",
            maskImage:
              "linear-gradient(to right, transparent 0%, 30%, white 33%)",
          })}
          style={{
            backgroundImage: `url("https:${game.cover?.url.replace("t_thumb", "t_cover_big_2x")}")`,
          }}
        />
      </div>

      <div
        className={css({
          position: "absolute",
          w: "50%",
          right: 0,
          zIndex: 1,
        })}
      >
        <div>{game.name}</div>
      </div>
    </div>
  );
};

/* const GamesCarousel = ({ games }: { games: Game[] }) => {
  console.log(games);
  return <div></div>;
};
 */
