"use client";
import { ReactNode, useState } from "react";

// Components
import { PlatformIcons, StarsRating } from "./blocks";
import { Button, SectionTitle } from "./design";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

// Hooks
import { useQuery } from "@tanstack/react-query";

// Utils
import { getGames } from "@/utils/getGames";
import { getTimestampTwoMonthsAgo } from "@/utils/yearsArray";

// Types
import { type User } from "@supabase/supabase-js";
import { Game } from "@/types";

// Styles
import { css } from "../../styled-system/css";
import { RatingsProvider } from "@/context";
import { ReviewsList } from "./blocks/ReviewsList";
import { useCountdown } from "@/hooks";

const formattedTime = (number: number, time: string) => {
  const numberDigits = number.toString().split("");
  if (numberDigits.length < 2) numberDigits.unshift("0");

  return (
    <>
      <div>
        <div className={css({ display: "flex", gap: 1 })}>
          {numberDigits.map((num, i) => (
            <span
              key={i}
              className={css({
                w: { base: "24px", xs: "26px", md: "24px", lg: "26px" },
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
            fontSize: 12,
            textTransform: "uppercase",
            textAlign: "center",
          })}
        >
          {time}
        </div>
      </div>
      {time !== "minutes" && (
        <b>
          <span
            className={css({
              fontSize: 18,
              animation: "release-countdown 1.8s infinite",
            })}
          >
            :
          </span>
        </b>
      )}
    </>
  );
};

function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("en-EN", { month: "long" });
  const year = date.getFullYear();

  return (
    <div
      className={css({
        mt: 4,
        mb: 1,
        letterSpacing: 1,
        textDecoration: "underline",
      })}
    >
      {day} {month} {year}
    </div>
  );
}

const timeNow = Math.floor(Date.now() / 1000);
const twoMonthsAgo = getTimestampTwoMonthsAgo();

// ----------------------- //
// - HomePage Component - //
// --------------------- //
export function HomePage({
  user,
  randomImgNumber,
}: {
  user: User | null;
  randomImgNumber: number;
}) {
  const gamePannelsLimit = 4;
  const comingSoonQuery = `fields name, first_release_date, cover.*, platforms.*; where first_release_date > ${timeNow} & hypes > 50; sort first_release_date asc; limit ${gamePannelsLimit};`;
  const mostAnticipatedQuery = `fields name, release_dates.*, cover.*, platforms.*, summary, storyline; where first_release_date > ${timeNow}; sort hypes desc; limit ${gamePannelsLimit};`;
  const popularNowQuery = `fields name, cover.*, platforms.*, total_rating; where first_release_date > ${twoMonthsAgo} & first_release_date < ${timeNow}; sort hypes desc; limit ${gamePannelsLimit};`;

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

  return (
    <div
      className={css({
        animation: "fade-in 0.8s",
        mb: 8,
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
            fontSize: { base: 54, md: 70, "2xl": 74 },
            fontWeight: 700,
            textWrap: "balance",
            lineHeight: 1.2,
            letterSpacing: 1,
            textShadow: "4px 6px 4px rgba(0,0,0,0.55)",
          })}
        >
          Build Your Ultimate Games Collection
        </div>

        <div
          className={css({
            position: "relative",
            mt: 12,
            fontFamily: "var(--font-outfit-sans)",
            color: "{colors.text.dark}",
            fontSize: { base: 20, lg: 22, "2xl": 24 },
            fontWeight: 500,
            textWrap: "balance",
            lineHeight: 1.2,
            textShadow: "2px 2px 1px rgba(0,0,0,0.6)",
          })}
        >
          {user ? (
            <>
              <div className={css({ mb: 12 })}>
                Browse games, explore games info, write reviews and create your
                personal collection!
              </div>
              <div>
                Check the{" "}
                <Link
                  href="/browse"
                  className={css({
                    color: "var(--colors-primary)",
                    fontWeight: 600,
                    textShadow: "2px 2px 1px rgba(0,0,0,0.2)",
                  })}
                >
                  games list
                </Link>{" "}
                to start, or check what&apos;s tranding below!
              </div>
            </>
          ) : (
            <>
              <div className={css({ mb: 4 })}>
                Sign in to start creating your own games collection
              </div>
              <Link href="/signin">
                <Button
                  className={css({
                    w: "120px",
                    fontSize: 16,
                    boxShadow: "0 4px 8px rgba(0,0,0,.4)",
                  })}
                >
                  Sign in
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div
        className={css({
          position: "relative",
          display: "block",
          w: "full",
          maxW: { base: "536px", md: "1200px" },
          mx: "auto",
          animation: "fade-in 0.4s",
          zIndex: 1,
        })}
      >
        <PannelGrid title="Coming soon" link="/browse/comingsoon">
          {!isComingSoonLoading ? (
            !!comingSoonGames.length ? (
              comingSoonGames.map((game: Game) => (
                <GamePannel key={game.id} game={game} />
              ))
            ) : (
              "Something went wrong"
            )
          ) : (
            <PannelLoader count={gamePannelsLimit} />
          )}
        </PannelGrid>
        <PannelGrid title="Most anticipated" link="/browse/anticipated">
          {!isMostAnticipatedLoading ? (
            !!mostAnticipatedGames.length ? (
              mostAnticipatedGames.map((game: Game) => (
                <GamePannel key={game.id} game={game} />
              ))
            ) : (
              "Something went wrong"
            )
          ) : (
            <PannelLoader count={gamePannelsLimit} />
          )}
        </PannelGrid>
        <PannelGrid title="Popular now" link="/browse/popular">
          {!isPopularNowLoading ? (
            !!popularNowGames.length ? (
              popularNowGames.map((game: Game) => (
                <GamePannel key={game.id} game={game} />
              ))
            ) : (
              "Something went wrong"
            )
          ) : (
            <PannelLoader count={gamePannelsLimit} />
          )}
        </PannelGrid>
        <PannelGrid
          title="Recent comments"
          gridClass={css({
            gridTemplateColumns: {
              base: "1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
          })}
        >
          <RatingsProvider>
            <ReviewsList forWho="all" />
          </RatingsProvider>
        </PannelGrid>
      </div>
    </div>
  );
}

const PageBackground = ({ randomImgNumber }: { randomImgNumber?: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    randomImgNumber && (
      <div
        className={css({
          position: "absolute",
          top: 0,
          left: 0,
          w: "100%",
          h: "600px",
          overflow: "hidden",
          maskImage: {
            base: "linear-gradient(to top, transparent 2%, 40%, white 60%)",
            md: "linear-gradient(to top, transparent 2%, 35%, white 55%)",
          },
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 1.2s ease-in-out",
        })}
      >
        <Image
          src={`/banner/${randomImgNumber}.png`}
          alt={`img-${randomImgNumber}`}
          width="200"
          height="200"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          className={css({
            filter: "blur(1.5px) contrast(90%)",
            scale: "1.01",
            objectPosition: "center 15%",
          })}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      </div>
    )
  );
};

const PannelGrid = ({
  title,
  link,
  gridClass,
  children,
}: {
  title: string;
  link?: string;
  gridClass?: string;
  children: ReactNode;
}) => {
  return (
    <>
      <SectionTitle
        className={css({
          mt: 14,
          mb: 5,
          fontSize: 30,
        })}
      >
        {title}
        {!!link && (
          <Link href={link}>
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
          </Link>
        )}
      </SectionTitle>
      <div
        className={`${css({
          display: "grid",
          gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
          justifyContent: "center",
          gap: { base: 5, md: 4, xl: 6 },
        })} ${gridClass}`}
      >
        {children}
      </div>
    </>
  );
};

const GamePannel = ({ game }: { game: Game }) => {
  const gameDescription = game.storyline || game.summary;
  const releaseDate = game.first_release_date;

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
        animation: "fade-in 0.6s",
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
            transform: "translate3d(0, 0, 0) scale(3)",
            willChange: "transform, filter",
            zIndex: 0,
          })}
          style={{
            backgroundImage: `url("https:${game.cover?.url.replace("t_thumb", "t_cover_big_2x")}")`,
          }}
        ></div>
      </div>
      <div
        className={css({
          position: "absolute",
          h: "full",
          w: { base: "57%", sm: "55%" },
          right: 0,
          py: 3,
          px: 4,
          color: "{colors.text.dark}",
          maskImage: !releaseDate
            ? "linear-gradient(to top, transparent 0, 14%, white 20%)"
            : "",
          zIndex: 1,
        })}
      >
        <div
          className={css({
            fontSize: { base: 18, lg: 21 },
            fontWeight: 500,
            textWrap: "balance",
            lineHeight: 1.3,
            letterSpacing: 1,
          })}
        >
          {game.name}
        </div>
        <PlatformIcons platforms={game.platforms} className={css({ mt: 5 })} />
        {!!releaseDate && <CountdownDisplay timestamp={releaseDate} />}
        {!!gameDescription && (
          <div
            className={css({
              mt: 4,
              fontFamily: "var(--font-exo-2)",
              fontSize: 14,
            })}
          >
            {gameDescription}
          </div>
        )}
        {!!game.total_rating && (
          <StarsRating
            rating={game.total_rating}
            size={20}
            className={css({ my: 4, textShadow: "none" })}
          />
        )}
      </div>
    </Link>
  );
};

const PannelLoader = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className={css({ aspectRatio: 5 / 3 })} />
      ))}
    </>
  );
};

const CountdownDisplay = ({ timestamp }: { timestamp: number }) => {
  const timeLeft = useCountdown(timestamp);

  if (timeLeft.expired) return <p>Release time reached!</p>;

  return (
    <div>
      {formatTimestamp(timestamp)}
      <div className={css({ display: "flex", alignItems: "center", gap: 1 })}>
        {formattedTime(timeLeft.days, "days")}
        {formattedTime(timeLeft.hours, "hours")}
        {formattedTime(timeLeft.minutes, "minutes")}
      </div>
    </div>
  );
};
