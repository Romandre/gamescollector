"use client";
import { useState, useMemo } from "react";
import axios from "axios";

// Components
import Image from "next/image";

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
          mt: 100,
          zIndex: 1,
          textAlign: "center",
        })}
      >
        <div
          className={css({
            position: "relative",
            fontFamily: "var(--font-outfit-sans)",
            color: "{colors.text.dark}",
            fontSize: { base: 38, sm: 46, lg: 52, "2xl": 58 },
            textWrap: "balance",
            lineHeight: 1.2,
            letterSpacing: 1,
            textShadow: "4px 4px 2px rgba(0,0,0,0.6)",
          })}
        >
          Welcome to Games Collector
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
          height: "100%",
          overflow: "hidden",
        })}
      >
        <Image
          src={`https:${randomImg.url.replace("t_thumb", "t_screenshot_huge_2x")}`}
          alt={randomImg.id}
          fill
          style={{ objectFit: "cover" }}
          className={css({
            height: "100vh",
            maskImage: {
              base: "linear-gradient(to top, transparent 2%, white 75%)",
              sm: "linear-gradient(to top, transparent 25%, white 75%)",
            },
            filter: "blur(1px)",
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
