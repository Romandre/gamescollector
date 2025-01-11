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
import { ReactNode } from "react";
import { SectionTitle } from "./design";

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
      <div
        className={css({
          display: "block",
          w: "full",
          maxW: "1200px",
          mx: "auto",
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
          h: "500px",
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

const PannelGrid = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <>
      <SectionTitle className={css({ mt: 12, mb: 5 })}>{title}</SectionTitle>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
          justifyContent: "center",
          gap: { base: 4, xl: 6 },
        })}
      >
        {children}
      </div>
    </>
  );
};

const GamePannel = ({ game }: { game: Game }) => {
  return (
    <Link
      href={`/game/${game.id}`}
      className={css({
        position: "relative",
        display: "flex",
        w: "100%",
        aspectRatio: "5/3",
        mx: "auto",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "2px 2px 8px rgba(0,0,0,.8)",
        cursor: "pointer",
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
          w: "55%",
          right: 0,
          py: 2,
          px: 4,
          zIndex: 1,
        })}
      >
        <div
          className={css({
            textAlign: "center",
            fontFamily: "var(--font-outfit-sans)",
            color: "{colors.text.dark}",
            fontSize: 20,
            textWrap: "balance",
            lineHeight: 1.2,
            letterSpacing: 1,
            textShadow: "2px 2px 2px rgba(0,0,0,0.6)",
          })}
        >
          {game.name}
        </div>
      </div>
    </Link>
  );
};

/* const GamesCarousel = ({ games }: { games: Game[] }) => {
  console.log(games);
  return <div></div>;
};
 */
