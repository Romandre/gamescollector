// Components
import { PlatformIcons, StarsRating } from "./";
import Link from "next/link";
import Image from "next/image";

// Contexts
import { useGamesContext } from "@/context";

// Types
import { Game } from "@/types";

// Styles
import { css } from "../../../styled-system/css";

export function GameCard({
  game,
  showHints = true,
}: {
  game: Game;
  showHints?: boolean;
}) {
  const { hintsEnabled } = useGamesContext();

  return (
    <>
      <Link
        href={`/game/${game.id}`}
        className={`group 
          ${css({
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            animation: "fade-in .8s",
            transition: "opacity .2s",
            _focus: {
              opacity: 0.55,
            },
            _active: {
              opacity: 0.55,
            },
          })}`}
      >
        <div
          className={css({
            position: "relative",
            w: "100%",
            pt: "132%",
          })}
        >
          {game.cover && game.cover.url ? (
            <Image
              src={`https:${game.cover.url?.replace("t_thumb", "t_cover_big_2x")}`}
              alt={game.cover.id}
              fill
              style={{ objectFit: "cover", animation: "fade-in 0.8s" }}
              sizes="(max-width: 700px) 100vw, 700px"
              className={css({
                height: "100vh",
              })}
            />
          ) : (
            <Image
              src="/no-image.jpg"
              alt="no-image"
              fill
              className={css({
                objectFit: "cover",
                aspectRatio: "3/4",
              })}
            ></Image>
          )}
        </div>
        {hintsEnabled && showHints && (
          <div
            className={css({
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bottom: 0,
              w: "full",
              h: "auto",
              px: 3,
              maxHeight: 0,
              bg: "rgba(0,0,0,.2)",
              backdropFilter: "blur(16px)",
              maskImage: "linear-gradient(to bottom, transparent, black 30%)",
              transition: "all 200ms ease-in-out",
              overflow: "hidden",
              gap: 2,
              _groupHover: {
                "@media (hover: none)": {
                  display: "none",
                },
                maxHeight: "32%",
                pt: 10,
                pb: 4,
              },
            })}
          >
            {/* <div
              className={css({
                fontFamily: "Outfit Variable",
                lineHeight: 1.25,
                fontSize: 18,
                color: "white",
                textShadow: "2px 2px 1px rgba(0,0,0,.75)",
                textAlign: "center",
                textWrap: "balance",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                lineClamp: 2,
              })}
            >
              {game.name}
            </div> */}
            <PlatformIcons
              platforms={game.platforms}
              className={css({ display: "flex", color: "#FFFFFF" })}
            />
            <StarsRating rating={game.total_rating} size={18} />
          </div>
        )}
      </Link>
    </>
  );
}
