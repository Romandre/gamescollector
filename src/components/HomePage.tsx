"use client";
import { useState, useMemo } from "react";
import axios from "axios";

// Components
import Image from "next/image";
import Link from "next/link";

// Hooks
import { useQuery } from "@tanstack/react-query";

// Types
import { Screenshot } from "@/types";

// Styles
import { css } from "../../styled-system/css";

const fields = "fields screenshots, screenshots.*;";

const getGames = async (query: string) => {
  const response = await axios.get("/api/games", { params: { query } });
  return response.data;
};

export function HomePage() {
  const query = `${fields} where total_rating > 80; sort hypes desc; limit 30;`;
  const { data /* isLoading, isError, error */ } = useQuery({
    queryKey: ["hypes", [query]],
    queryFn: () => getGames(query),
  });
  const games = data?.games || [];
  const randomGame = games[Math.floor(Math.random() * games.length)];

  return (
    <div
      className={css({
        animation: "fade-in 0.8s",
      })}
    >
      {randomGame?.screenshots && (
        <PageBackground images={randomGame.screenshots!} />
      )}
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
            fontFamily: "var(--font-zen-tokyo)",
            color: "{colors.text.dark}",
            fontSize: { base: 60, lg: 70, "2xl": 74 },
            textWrap: "balance",
            lineHeight: 1.2,
            letterSpacing: 1,
            textShadow: "4px 6px 4px rgba(0,0,0,0.7)",
          })}
        >
          Welcome to Games Collector
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
    </div>
  );
}

const PageBackground = ({ images }: { images: Screenshot[] }) => {
  const [loading, setLoading] = useState(true);
  const randomImg = useMemo(
    () => images[Math.floor(Math.random() * images.length)],
    [images]
  );

  return (
    randomImg && (
      <div
        className={css({
          position: "absolute",
          top: 0,
          left: 0,
          w: "100%",
          h: "84%",
          minHeight: "600px",
          overflow: "hidden",
        })}
      >
        <Image
          src={`https:${randomImg.url.replace("t_thumb", "t_screenshot_huge_2x")}`}
          alt={randomImg.id}
          fill
          style={{ objectFit: "cover" }}
          className={css({
            maskImage: {
              base: "linear-gradient(to top, transparent 8%, white 50%)",
              sm: "linear-gradient(to top, transparent 2%, 35%, white 55%)",
            },
            filter: "blur(3px)",
            transition: "opacity 1.2s",
            opacity: loading ? 0 : 1,
            scale: "1.01",
            animation: "fade-in 0.4s",
          })}
          onLoad={() => setLoading(false)}
          priority
        />
      </div>
    )
  );
};
