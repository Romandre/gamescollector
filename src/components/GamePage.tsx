"use client";
import { ReactNode, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

// Components
import { GameCard } from "./GameCard";
import { Grid, SectionTitle, Tiles } from "./design";
import Skeleton from "react-loading-skeleton";

// Hooks
import { useQuery } from "@tanstack/react-query";

// Styles
import { css } from "../../styled-system/css";
import { grid } from "../../styled-system/patterns";

// Icons
import {
  FaStar,
  FaSteam,
  FaTwitch,
  FaWikipediaW,
  FaFacebookSquare,
  FaYoutube,
  FaInstagram,
  FaDiscord,
  FaReddit,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { SiEpicgames, SiWikibooks } from "react-icons/si";
import { IoLogoGameControllerB } from "react-icons/io";
import type { Cover, Game, Platform, Screenshot, Website } from "@/types";

const fields =
  "fields *, screenshots.*, cover.url, release_dates.*, platforms.*, genres.*, age_ratings.*, dlcs.*, dlcs.cover.*, expansions.*, expansions.cover.*, ports.*, ports.cover.*, remakes.*, remakes.cover.*, involved_companies.*, involved_companies.company.*, parent_game.*, parent_game.cover.*, websites.*;";

const bages = [
  { id: 1, name: "DLC" },
  { id: 2, name: "Expansion" },
  { id: 8, name: "Remake" },
  { id: 11, name: "Port" },
];

const getGames = async (query: string) => {
  const response = await axios.get("/api/games", { params: { query } });
  return response.data;
};

export function GamePage({ id }: { id: string }) {
  const gameId = id;
  const query = `${fields} where id = ${gameId};`;
  const { data, isLoading /* isError, error */ } = useQuery({
    queryKey: ["fetchGames", gameId],
    queryFn: () => getGames(query),
  });
  const game = data?.games?.[0] as Game;
  const isGameLoaded = !!(!isLoading && game?.id);
  const noGameFound = !!(!isLoading && !game?.id);

  return !noGameFound ? (
    <div
      className={css({
        animation: "fade-in 0.8s",
      })}
    >
      {isGameLoaded && Object.hasOwn(game, "screenshots") && (
        <PageBackground images={game.screenshots!} />
      )}

      <div
        className={css({
          position: "relative",
          px: { base: 2, lg: 3 },
          display: "grid",
          mt: { base: 2, sm: 8, lg: "90px", xl: "120px" },
          gridTemplateAreas: {
            base: `
            "cover"
            "title"
            "platforms"
            "main"
            "left"
            "right"
            `,
            sm: `
              "cover title"
              "cover platforms"
              "main main"
              "left left"
              "right right"
              `,
            md: `
              "cover title"
              "cover platforms"
              "cover main"
              "left main"
              "right main"
              `,
            xl: `
              "cover title title"
              "cover platforms right"
              "cover main right"
              "left main right"
              `,
          },
          gridTemplateColumns: { sm: "264px 1fr", xl: "300px 1fr 280px" },
          gridTemplateRows: {
            md: "auto auto auto 0fr 1fr",
            xl: "auto auto auto 1fr",
          },
          gridGap: { base: "0 18px", lg: "0 22px", "2xl": "0 26px" },
          zIndex: 1,
        })}
      >
        <div className={css({ gridArea: "cover" })}>
          <Cover
            cover={game?.cover}
            bage={game?.category}
            isLoaded={isGameLoaded}
          />
        </div>
        <div
          className={css({
            gridArea: "title",
            alignSelf: { base: "end", md: "auto" },
          })}
        >
          <Title game={game} isLoaded={isGameLoaded} />
        </div>
        <div className={css({ gridArea: "platforms" })}>
          <Platforms platforms={game?.platforms} isLoaded={isGameLoaded} />
        </div>
        <div className={css({ gridArea: "left" })}>
          <ColumnLeft game={game} isLoaded={isGameLoaded} />
        </div>

        <div className={css({ gridArea: "main" })}>
          <ColumnMain game={game} isLoaded={isGameLoaded} />
        </div>
        <div className={css({ gridArea: "right" })}>
          <ColumnRight game={game} isLoaded={isGameLoaded} />
        </div>
      </div>
    </div>
  ) : (
    <div className={css({ mt: 20, textAlign: "center" })}>
      <h1>Sorry, but the game is not found.</h1>
      <h1>
        Go back to{" "}
        <Link
          href="/browse"
          className={css({ color: "var(--colors-primary)" })}
        >
          games list
        </Link>
        .
      </h1>
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
          height: "700px",
          scale: "1.01",
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
            filter: "blur(2px)",
            opacity: loading ? 0 : 1,
            transition: "opacity 1.2s",
          })}
          onLoad={() => setLoading(false)}
          priority
        />
      </div>
    )
  );
};

const Cover = ({
  cover,
  bage,
  isLoaded,
}: {
  cover: Cover | undefined;
  bage?: number;
  isLoaded: boolean;
}) => {
  return isLoaded ? (
    <div
      className={css({
        w: "100%",
        maxW: { base: "300px", sm: "none" },
        mx: "auto",
        mb: { base: 4, md: 8 },
        boxShadow: "4px -2px 8px rgba(0,0,0,0.3) ",
      })}
    >
      <div
        className={css({
          position: "relative",
          w: "100%",
          pt: "135%",
        })}
      >
        {cover ? (
          <Image
            src={`https:${cover.url.replace("t_thumb", "t_cover_big_2x")}`}
            alt={cover.id}
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
        {bages.some((item) => item.id === bage) && (
          <div
            className={css({
              position: "absolute",
              left: 0,
              top: 0,
              py: 1,
              px: 2,
              bg: "var(--colors-primary)",
              fontSize: 12,
              fontWeight: 700,
              boxShadow: "1px 1px 5px 2px rgba(0,0,0,0.5)",
            })}
          >
            {bages.find((item) => item.id === bage)?.name}
          </div>
        )}
      </div>
      <div
        className={`tile ${css({
          w: "100%",
          py: 3,
          px: 6,
          borderTop: "none",
          textAlign: "center",
        })}`}
      >
        <Link
          href="/signin"
          className={css({ color: "var(--colors-primary)", fontWeight: 500 })}
        >
          Sign in
        </Link>{" "}
        to add games to your personal library
      </div>
    </div>
  ) : (
    <Skeleton
      className={css({
        h: { base: "420px", md: "430px", xl: "480px" },
        mb: 8,
      })}
    />
  );
};

const Title = ({ game, isLoaded }: { game: Game; isLoaded: boolean }) => {
  return isLoaded ? (
    <div
      className={css({
        position: "relative",
        mt: { base: 0, md: 20, lg: 24, "2xl": 28 },
        mb: { base: 2, md: 8 },
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
        {game.name}
      </div>
      {game.total_rating_count && game.total_rating_count > 5 && (
        <div
          className={css({
            display: "flex",
            my: 2,
            alignItems: "center",
            textShadow: "2px 2px 2px rgba(0,0,0,0.8)",
          })}
        >
          <FaStar
            color="var(--colors-primary)"
            className={css({
              fontSize: { base: 28, md: 28, lg: 32 },
              filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.6))",
            })}
          />
          <div
            className={css({
              display: "flex",
              alignItems: "baseline",
              color: "white",
            })}
          >
            <span
              className={css({
                mx: 2,
                fontSize: { base: 22, md: 24, lg: 28 },
                fontWeight: 500,
              })}
            >
              {Math.floor(game.total_rating!) / 10}/10
            </span>
            <span className={css({ fontStyle: "italic", opacity: 0.8 })}>
              ({game.total_rating_count})
            </span>
          </div>
        </div>
      )}
    </div>
  ) : (
    <>
      <Skeleton
        height="44px"
        className={css({
          mt: { base: 0, md: 24, lg: 28, "2xl": 32 },
          mb: { base: 2, md: 8 },
        })}
      />
      <Skeleton height="30px" width="200px" className={css({ mb: 12 })} />
    </>
  );
};

const Platforms = ({
  platforms,
  isLoaded,
}: {
  platforms: Platform[] | undefined;
  isLoaded: boolean;
}) => {
  if (!platforms) return;

  const platformNames =
    platforms?.map((platform) => platform.name).sort() || [];

  return isLoaded ? (
    <Section
      title="Platforms"
      titleStyle={css({ display: { base: "none", md: "block" } })}
    >
      <Tiles array={platformNames} />
    </Section>
  ) : (
    <>
      <Skeleton width="200px" className={css({ mb: 4 })} />
      <div className={css({ display: "flex", flexWrap: "wrap", gap: 2 })}>
        <Skeleton height="34px" width="100px" className={css({ mb: 4 })} />
        <Skeleton height="34px" width="100px" className={css({ mb: 4 })} />
        <Skeleton height="34px" width="100px" className={css({ mb: 8 })} />
      </div>
    </>
  );
};

const ColumnLeft = ({ game, isLoaded }: { game: Game; isLoaded: boolean }) => {
  const releases = game?.release_dates;
  const platforms = game?.platforms;
  const releaseDates =
    !!releases?.length &&
    !!platforms?.length &&
    Object.entries(
      releases.reduce<Record<string, string[]>>((acc, item) => {
        if (!acc[item.human]) {
          acc[item.human] = [];
        }
        // Find the matching platform name
        const platformName = platforms.find(
          (platform) => platform.id === item.platform
        )?.name;
        if (platformName) {
          acc[item.human].push(platformName);
        }
        return acc;
      }, {})
    ).map(([date, platforms]) => ({
      date,
      platforms,
    }));
  const genres = game?.genres?.map((genre) => genre.name);
  const ageRatingValue = game?.age_ratings?.find(
    (rating) => rating.category === 2
  )?.rating;
  const ageRating = () => {
    if (ageRatingValue === 5) return 18;
    if (ageRatingValue === 4) return 16;
    if (ageRatingValue === 3) return 12;
    if (ageRatingValue === 2) return 7;
    if (ageRatingValue === 1) return 3;
    return 0;
  };
  const developers =
    game?.involved_companies?.filter((company) => company.developer === true) ||
    [];
  const publishers =
    game?.involved_companies?.filter((company) => company.publisher === true) ||
    [];

  console.log("releaseDates", releaseDates);

  return isLoaded ? (
    <>
      {!!genres?.length && (
        <Section title="Genres">
          <Tiles array={genres} />
        </Section>
      )}
      {!!developers.length && (
        <Section title="Developers">
          {developers?.map((developer) => (
            <div key={developer.id} className={css({ mb: 2 })}>
              - {developer.company.name}
            </div>
          ))}
        </Section>
      )}
      {!!publishers.length && (
        <Section title="Publishers">
          {publishers?.map((publisher) => (
            <div key={publisher.id} className={css({ mb: 2 })}>
              - {publisher.company.name}
            </div>
          ))}
        </Section>
      )}
      {!!releaseDates && (
        <Section title="Releases">
          {releaseDates
            ?.slice()
            .reverse()
            .map(
              (date) =>
                date && ( // Ensure date is not undefined
                  <div key={date.date} className={css({ mb: 2 })}>
                    - {date.date}
                    <p className={css({ fontStyle: "italic", fontSize: 13 })}>
                      {(date.platforms as string[]).join(", ")}
                    </p>
                  </div>
                )
            )}
        </Section>
      )}
      {ageRating() !== 0 && (
        <Section title="Age rating">
          <div className={css({ position: "relative" })}>
            <Image
              src={`/pegi_${ageRating()}.png`}
              alt="pegi"
              width={86}
              height={100}
            ></Image>
          </div>
        </Section>
      )}
    </>
  ) : (
    <>
      <Skeleton width="200px" className={css({ mb: 4 })} />
      <div className={css({ display: "flex", flexWrap: "wrap", gap: 2 })}>
        <Skeleton height="34px" width="100px" className={css({ mb: 4 })} />
        <Skeleton height="34px" width="100px" className={css({ mb: 8 })} />
      </div>
    </>
  );
};

const ColumnMain = ({ game, isLoaded }: { game: Game; isLoaded: boolean }) => {
  const gridClass = grid({
    w: "100%",
    columns: { base: 2, sm: 3, md: 4, lg: 5, xl: 4, "2xl": 5 },
    gap: 1.5,
  });
  const dlcs = game?.dlcs;
  const expansions = game?.expansions;
  const combined =
    dlcs?.length && expansions?.length && dlcs.concat(expansions);
  const allDlcs = combined || dlcs || expansions || [];

  return isLoaded ? (
    <>
      {!!game.summary && (
        <Section title="Description" type="text">
          {game.summary}
        </Section>
      )}
      {!!game.storyline && (
        <Section title="Plot" type="text">
          {game.storyline}
        </Section>
      )}
      {!!game.parent_game?.id && (
        <Section title="Main game">
          <div className={css({ display: "block" })}>
            <Grid className={gridClass}>
              <GameCard
                key={game.parent_game.id}
                game={game.parent_game}
                showHints={false}
              />
            </Grid>
          </div>
        </Section>
      )}
      {!!allDlcs.length && (
        <Section title="Dlc / Expansions">
          <div className={css({ display: "block" })}>
            <Grid className={gridClass}>
              {allDlcs.map((dlc) => (
                <GameCard key={dlc.id} game={dlc} showHints={false} />
              ))}
            </Grid>
          </div>
        </Section>
      )}
      {!!game?.ports?.length && (
        <Section title="Ports">
          <div className={css({ display: "block" })}>
            <Grid className={gridClass}>
              {game.ports.map((port) => (
                <GameCard key={port.id} game={port} showHints={false} />
              ))}
            </Grid>
          </div>
        </Section>
      )}
      {!!game?.remakes?.length && (
        <Section title="Remakes">
          <div className={css({ display: "block" })}>
            <Grid className={gridClass}>
              {game.remakes.map((remake) => (
                <GameCard key={remake.id} game={remake} showHints={false} />
              ))}
            </Grid>
          </div>
        </Section>
      )}
      {!!game?.screenshots?.length && (
        <Section title="Screenshots">
          <div
            className={css({
              display: "grid",
              mb: 4,
              gridTemplateColumns: {
                base: "1fr 1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr 1fr",
                xl: "1fr 1fr",
                "2xl": "1fr 1fr 1fr",
              },
              gap: 1.5,
            })}
          >
            {game?.screenshots.map((screenshot) => (
              <div
                key={screenshot.id}
                className={css({
                  position: "relative",
                  display: "block",
                  flexBasis: "50%",
                })}
              >
                <Image
                  src={`https:${screenshot.url.replace("t_thumb", "t_screenshot_big")}`}
                  alt={screenshot.id}
                  width={500}
                  height={500}
                ></Image>
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  ) : (
    <>
      <Skeleton width="150px" className={css({ mb: 4 })} />
      <Skeleton height="10px" className={css({ mb: 4 })} />
      <Skeleton height="10px" className={css({ mb: 4 })} />
      <Skeleton height="10px" className={css({ mb: 8 })} />
      <Skeleton width="150px" className={css({ mb: 4 })} />
      <Skeleton height="10px" className={css({ mb: 4 })} />
      <Skeleton height="10px" className={css({ mb: 4 })} />
      <Skeleton height="10px" className={css({ mb: 4 })} />
      <Skeleton height="10px" className={css({ mb: 4 })} />
    </>
  );
};

const ColumnRight = ({ game, isLoaded }: { game: Game; isLoaded: boolean }) => {
  const links = game?.websites || [];

  return isLoaded ? (
    <>
      <Section title="Other Info">
        <div className={css({ fontSize: 18 })}>GAME ID</div>
        <div className={css({ fontSize: 16 })}>
          <Link
            href={game.url}
            className={css({
              display: "flex",
              alignItems: "center",
              color: "var(--colors-primary)",
              gap: 2,
            })}
          >
            {game?.id}
            <Image
              src="/igdb_logo.png"
              alt="igdb"
              width="40"
              height="10"
              className={css({ bg: "var(--colors-primary)" })}
            />
          </Link>
        </div>
        <div
          className={css({ mt: 4, fontSize: 18, textTransform: "uppercase" })}
        >
          Related Links
        </div>
        <div className={css({ fontSize: 16 })}>
          <WebsiteLinks links={links} />
        </div>
      </Section>
    </>
  ) : (
    <>
      <Skeleton className={css({ mb: 4 })} />
      <Skeleton height="10px" width="140px" className={css({ mb: 4 })} />
      <Skeleton height="10px" width="140px" className={css({ mb: 4 })} />
      <Skeleton height="10px" width="140px" className={css({ mb: 4 })} />
      <Skeleton height="10px" width="140px" className={css({ mb: 4 })} />
      <Skeleton height="10px" width="140px" className={css({ mb: 4 })} />
      <Skeleton height="10px" width="140px" className={css({ mb: 4 })} />
      <Skeleton height="10px" width="140px" className={css({ mb: 4 })} />
      <Skeleton height="10px" width="140px" className={css({ mb: 4 })} />
    </>
  );
};

const Section = ({
  title,
  type,
  children,
  titleStyle,
}: {
  title?: string;
  type?: string;
  children: ReactNode;
  titleStyle?: string;
}) => {
  return (
    <>
      {title && <SectionTitle className={titleStyle}>{title}</SectionTitle>}
      <SectionText type={type}>{children}</SectionText>
    </>
  );
};

const SectionText = ({
  type,
  children,
}: {
  type?: string;
  children: ReactNode;
}) => {
  return (
    <div className={css({ mt: 4, mb: 8 })}>
      {type === "text" ? <p>{children}</p> : <>{children}</>}
    </div>
  );
};

const websites = [
  {
    id: 1,
    name: "official website",
    icon: <CgWebsite />,
  },
  { id: 2, name: "wikia", icon: <SiWikibooks /> },
  {
    id: 3,
    name: "wikipedia",
    icon: <FaWikipediaW />,
  },
  { id: 4, name: "facebook", icon: <FaFacebookSquare /> },
  { id: 5, name: "twitter", icon: <BsTwitterX /> },
  { id: 6, name: "twitch", icon: <FaTwitch /> },
  { id: 8, name: "instagram", icon: <FaInstagram /> },
  { id: 9, name: "youtube", icon: <FaYoutube /> },
  { id: 10, name: "iphone" },
  { id: 11, name: "ipad" },
  { id: 12, name: "android" },
  { id: 13, name: "steam", icon: <FaSteam /> },
  { id: 14, name: "reddit", icon: <FaReddit /> },
  { id: 15, name: "itch" },
  { id: 16, name: "epicgames", icon: <SiEpicgames /> },
  { id: 17, name: "gog", icon: <IoLogoGameControllerB /> },
  { id: 18, name: "discord", icon: <FaDiscord /> },
];
const WebsiteLinks = ({ links }: { links: Website[] }) => {
  console.log(links);

  return (
    !!links?.length &&
    links
      ?.sort((a, b) => a.category - b.category)
      .map((link) => {
        const website = websites.find(
          (website) => website.id === link.category
        );

        return (
          !!website && (
            <Link
              key={link.id}
              href={link.url}
              className={css({
                display: "flex",
                py: 1,
                alignItems: "center",
                color: "var(--colors-primary)",
                gap: 2.5,
              })}
            >
              {!!website.icon && (
                <span className={css({ fontSize: 19 })}>{website.icon}</span>
              )}
              <span
                className={css({
                  textTransform: "capitalize",
                })}
              >
                {website.name}
              </span>
            </Link>
          )
        );
      })
  );
};
