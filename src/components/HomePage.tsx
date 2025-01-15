"use client";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";

// Components
import { PlatformsIcons, SectionTitle } from "./design";
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

const timeLeftUntil = (now: number, unixTimestamp: number) => {
  const targetTime = unixTimestamp * 1000;
  const timeDifference = targetTime - now;

  if (timeDifference <= 0) {
    return;
  }

  // const seconds = Math.floor(timeDifference / 1000) % 60;
  const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <>
      <div
        className={css({
          mt: 4,
          mb: 1,
          letterSpacing: 1,
          textDecoration: "underline",
        })}
      >
        {formatTimestamp(targetTime)}
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: 1,
        })}
      >
        {formattedTime(days, "days")}
        <b>
          <span>:</span>
        </b>
        {formattedTime(hours, "hours")}
        <b>
          <span>:</span>
        </b>
        {formattedTime(minutes, "minutes")}
      </div>
    </>
  );
};

const formattedTime = (number: number, time: string) => {
  const numberDigits = number.toString().split("");
  if (numberDigits.length < 2) numberDigits.unshift("0");

  return (
    <div>
      <div className={css({ display: "flex", gap: 1 })}>
        {numberDigits.map((num, i) => (
          <span
            key={i}
            className={css({
              w: { base: "24px", xs: "26px" },
              py: 2,
              bg: "rgba(0,0,0,.4)",
              fontSize: { base: 16, lg: 17 },
              textAlign: "center",
            })}
          >
            {num}
          </span>
        ))}
      </div>
      <div
        className={css({
          h: 0,
          fontSize: 13,
          textTransform: "uppercase",
          textAlign: "center",
        })}
      >
        {time}
      </div>
    </div>
  );
};

function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

const timeNow = Math.floor(Date.now() / 1000);
const twoMonthsAgo = getTimestampTwoMonthsAgo();

// ----------------------- //
// - HomePage Component - //
// --------------------- //
export function HomePage({ randomImgNumber }: { randomImgNumber: number }) {
  const mostAnticipatedQuery = `fields name, first_release_date, cover.*, platforms.*; where first_release_date > ${timeNow}; sort hypes desc; limit 4;`;
  const comingSoonQuery = `fields name, first_release_date, cover.*, platforms.*; where first_release_date > ${timeNow} & hypes > 50; sort first_release_date asc; limit 4;`;
  const popularNowQuery = `fields name, first_release_date, cover.*, platforms.*; where first_release_date > ${twoMonthsAgo} & first_release_date < ${timeNow}; sort hypes desc; limit 4;`;

  const {
    data: comingSoon,
    isLoading: isComingSoonLoading /*  isError, error */,
  } = useQuery({
    queryKey: ["comingSoon", [comingSoonQuery]],
    queryFn: () => getGames(comingSoonQuery),
  });
  const {
    data: mostAnticipated,
    isLoading: isMostAnticipatedLoading /*  isError, error */,
  } = useQuery({
    queryKey: ["anticipated", [mostAnticipatedQuery]],
    queryFn: () => getGames(mostAnticipatedQuery),
  });
  const {
    data: popularNow,
    isLoading: isPopularNowLoading /* isError, error */,
  } = useQuery({
    queryKey: ["popular", [popularNowQuery]],
    queryFn: () => getGames(popularNowQuery),
  });
  const comingSoonGames = comingSoon?.games || [];
  const mostAnticipatedGames = mostAnticipated?.games || [];
  const popularNowGames = popularNow?.games || [];
  const areGamesLoading =
    isComingSoonLoading || isMostAnticipatedLoading || isPopularNowLoading;

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
          mt: { base: "30px", md: "80px", "2xl": "100px" },
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
      </div>
      {!areGamesLoading && (
        <div
          className={css({
            display: "block",
            w: "full",
            maxW: { base: "536px", md: "1200px" },
            mx: "auto",
            animation: "fade-in 0.4s",
          })}
        >
          {!!comingSoonGames.length && (
            <>
              <PannelGrid title="What's coming soon">
                {comingSoonGames.map((game: Game) => (
                  <GamePannel key={game.id} game={game} />
                ))}
              </PannelGrid>
            </>
          )}
          {!!mostAnticipatedGames.length && (
            <>
              <PannelGrid title="Most anticipated">
                {mostAnticipatedGames.map((game: Game) => (
                  <GamePannel key={game.id} game={game} />
                ))}
              </PannelGrid>
            </>
          )}
          {!!popularNowGames.length && (
            <>
              <PannelGrid title="Popular now">
                {popularNowGames.map((game: Game) => (
                  <GamePannel key={game.id} game={game} />
                ))}
              </PannelGrid>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const PageBackground = ({ randomImgNumber }: { randomImgNumber?: number }) => {
  return (
    randomImgNumber && (
      <div
        className={css({
          position: "absolute",
          top: 0,
          left: 0,
          w: "100%",
          h: "500px",
          overflow: "hidden",
          maskImage: "linear-gradient(to top, transparent 2%, 35%, white 55%)",
        })}
      >
        <Image
          src={`/banner/${randomImgNumber}.png`}
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

const PannelGrid = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <>
      <SectionTitle className={css({ mt: 14, mb: 5, fontSize: 30 })}>
        {title}
        <span
          className={css({
            pt: 2,
            float: "right",
            textTransform: "capitalize",
            fontSize: 16,
            color: "var(--colors-primary)",
            cursor: "pointer",
          })}
        >
          See more
        </span>
      </SectionTitle>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
          justifyContent: "center",
          gap: { base: 5, md: 4, xl: 6 },
        })}
      >
        {children}
      </div>
    </>
  );
};

const GamePannel = ({ game }: { game: Game }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const timeLeftGrid = game.first_release_date
    ? timeLeftUntil(currentTime, game.first_release_date)
    : 0;

  useEffect(() => {
    // Set up a timer to update the time every 1000 milliseconds (1 second)
    const timerId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <Link
      href={`/game/${game.id}`}
      className={css({
        position: "relative",
        display: "flex",
        w: "100%",
        mx: "auto",
        aspectRatio: "5/3",
        fontFamily: "var(--font-outfit-sans)",
        borderRadius: "10px",
        boxShadow: "2px 2px 8px rgba(0,0,0,.8)",
        textShadow: "2px 2px 2px rgba(0,0,0,0.6)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "opacity .3s",
        _focus: {
          opacity: 0.55,
        },
        _active: {
          opacity: 0.55,
        },
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
          zIndex: 1,
          maskImage: "linear-gradient(to left, transparent 0%, 10%, white 20%)",
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
            backgroundPosition: "40% 0%",
            filter: "blur(50px)",
            transform: "scale(3)",
            zIndex: 0,
          })}
          style={{
            backgroundImage: `url("https:${game.cover?.url.replace("t_thumb", "t_cover_big_2x")}")`,
          }}
        />
      </div>
      <div
        className={css({
          position: "absolute",
          w: { base: "57%", sm: "55%" },
          right: 0,
          py: 3,
          px: 4,
          color: "{colors.text.dark}",
          zIndex: 1,
        })}
      >
        <div
          className={css({
            fontSize: { base: 18, lg: 20 },
            fontWeight: 500,
            textWrap: "balance",
            lineHeight: 1.3,
            letterSpacing: 1,
          })}
        >
          {game.name}
        </div>
        <PlatformsIcons platforms={game.platforms} className={css({ mt: 5 })} />
        {timeLeftGrid}
      </div>
    </Link>
  );
};

/* const GamesCarousel = ({ games }: { games: Game[] }) => {
  console.log(games);
  return <div></div>;
};
 */
