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

const fields = "fields screenshots, screenshots.*;";

const getGames = async (query: string) => {
  const response = await axios.get("/api/games", { params: { query } });
  return response.data;
};

export function HomePage({ randomImgNumber }: { randomImgNumber: number }) {
  const query = `${fields} where total_rating > 80; sort hypes desc; limit 30;`;
  const { data /* isLoading, isError, error */ } = useQuery({
    queryKey: ["hypes", [query]],
    queryFn: () => getGames(query),
  });
  const games = data?.games || [];

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
      </div>
      {false && <GamesCarousel games={games} />}
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
        })}
      >
        <Image
          //src={`https:${randomImg.url.replace("t_thumb", "t_screenshot_huge_2x")}`}
          src={`/wp/${randomImgNumber}.jpg`}
          //alt={randomImg.id}
          alt={`img-${randomImgNumber}`}
          fill
          style={{ objectFit: "cover" }}
          className={css({
            maskImage: {
              base: "linear-gradient(to top, transparent 8%, white 50%)",
              sm: "linear-gradient(to top, transparent 2%, 35%, white 55%)",
            },
            filter: "blur(2px)",
            scale: "1.01",
            animation: "fade-in 2s",
            objectPosition: "center 38%",
          })}
        />
      </div>
    )
  );
};

const GamesCarousel = ({ games }: { games: Game[] }) => {
  console.log(games);
  return <div></div>;
};
