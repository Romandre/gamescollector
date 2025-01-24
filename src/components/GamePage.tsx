"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import axios from "axios";

// Components
import { GameCard } from "./GameCard";
import { Grid, Overlay, SectionTitle, Tiles } from "./design";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import Image from "next/image";

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
  FaAppStoreIos,
  FaItchIo,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { SiEpicgames, SiWikibooks } from "react-icons/si";
import { IoLogoGameControllerB } from "react-icons/io";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

// Types
import type {
  Cover,
  Game,
  GameStatus,
  Platform,
  Screenshot,
  Website,
} from "@/types";

const fields =
  "fields *, screenshots.*, cover.url, release_dates.*, release_dates.status.*, platforms.*, genres.*, age_ratings.*, dlcs.*, dlcs.cover.*, expansions.*, expansions.cover.*, ports.*, ports.cover.*, remakes.*, remakes.cover.*, involved_companies.*, involved_companies.company.*, parent_game.*, parent_game.cover.*, websites.*, videos.*;";

const bages = [
  { id: 1, name: "DLC" },
  { id: 2, name: "Expansion" },
  { id: 8, name: "Remake" },
  { id: 11, name: "Port" },
];

const regions = [
  { id: 1, name: "europe" },
  { id: 2, name: "north america" },
  { id: 3, name: "australia" },
  { id: 4, name: "new zealand" },
  { id: 5, name: "japan" },
  { id: 6, name: "china" },
  { id: 7, name: "asia" },
  { id: 8, name: "worldwide" },
  { id: 9, name: "korea" },
  { id: 10, name: "brazil" },
];

const getGame = async (query: string) => {
  const response = await axios.get("/api/games", { params: { query } });
  return response.data;
};

export function GamePage({ id }: { id: string }) {
  const gameId = id;
  const query = `${fields} where id = ${gameId};`;
  const { data, isLoading /* isError, error */ } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGame(query),
  });
  const game = data?.games?.[0] as Game;
  const isGameLoaded = !!(!isLoading && game?.id);
  const noGameFound = !!(!isLoading && !game?.id);

  console.log(game);

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
          display: "grid",
          mt: { base: 7, lg: "90px", xl: "120px" },
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
          gridTemplateColumns: { sm: "264px 1fr", xl: "300px 1fr 240px" },
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
          h: {
            base: "820px",
            sm: "800px",
            md: "720px",
            lg: "760px",
            xl: "720px",
            "2xl": "800px",
          },
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
              base: "linear-gradient(to top, transparent 2%, 26%, white 50%)",
              sm: "linear-gradient(to top, transparent 6%, 45%, white 56%)",
            },
            filter: "blur(1.5px)",
            opacity: loading ? 0 : 1,
            transition: "opacity 1.2s",
            scale: "1.01",
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
        maxW: { base: "280px", xs: "300px", sm: "none" },
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
        display: "block !important",
        h: { base: "440px", xs: "480px", sm: "430px", xl: "480px" },
        maxW: { base: "280px", xs: "300px", sm: "full" },
        mx: "auto",
        mb: 2,
      })}
    />
  );
};

const Title = ({ game, isLoaded }: { game: Game; isLoaded: boolean }) => {
  return isLoaded ? (
    <div
      className={css({
        position: "relative",
        mt: { base: 1, md: 20, lg: 24, "2xl": 28 },
        mb: { base: 2, md: 8 },
      })}
    >
      <div
        className={css({
          position: "relative",
          fontFamily: "var(--font-outfit-sans)",
          color: "{colors.text.dark}",
          textAlign: { base: "center", sm: "left" },
          fontSize: { base: 46, lg: 52, "2xl": 58 },
          textWrap: "balance",
          lineHeight: 1.2,
          letterSpacing: 1,
          textShadow: "4px 4px 2px rgba(0,0,0,0.6)",
        })}
      >
        {game.name}
      </div>
      {!!game.total_rating_count && game.total_rating_count > 5 && (
        <div
          className={css({
            display: "flex",
            my: { base: 6, sm: 2 },
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
          mb: { base: 8, sm: 6, md: 4, lg: 8 },
        })}
      />
      <Skeleton
        height="30px"
        width="200px"
        className={css({ mb: { base: 10, sm: 6, lg: 12 } })}
      />
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
      <div className={css({ display: { base: "none", md: "block" } })}>
        <Skeleton width="200px" className={css({ mb: 4 })} />
      </div>
      <div className={css({ display: "flex", flexWrap: "wrap", gap: 2 })}>
        <Skeleton height="34px" width="100px" className={css({ mb: 4 })} />
        <Skeleton height="34px" width="100px" className={css({ mb: 4 })} />
        <Skeleton
          height="34px"
          width="100px"
          className={css({ mb: { base: 10, sm: 8 } })}
        />
      </div>
    </>
  );
};

const ColumnLeft = ({ game, isLoaded }: { game: Game; isLoaded: boolean }) => {
  const releases = game?.release_dates;
  const platforms = game?.platforms;
  const releaseDates =
    releases?.length && platforms?.length
      ? releases
          .reduce<
            {
              date: string;
              platforms: string[];
              status: GameStatus;
              region: number;
            }[]
          >((acc, release) => {
            // Find existing entry for this date
            const existingEntry = acc.find(
              (entry) => entry.date === release.human
            );

            // Find platform name
            const platform = platforms.find(
              (p) => p.id === release.platform
            )?.name;
            if (!platform) return acc;

            if (existingEntry) {
              // Add platform to existing date entry
              existingEntry.platforms.push(platform);
            } else {
              // Create new entry for this date
              acc.push({
                date: release.human,
                platforms: [platform],
                status: release.status,
                region: release.region,
              });
            }

            return acc;
          }, [])
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
          })
      : [];
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

  console.log(releaseDates);

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
      {!!releaseDates.length && (
        <Section title="Releases">
          {releaseDates
            ?.slice()
            .reverse()
            .map(
              (date) =>
                date && ( // Ensure date is not undefined
                  <div key={date.date} className={css({ mb: 2 })}>
                    - {date.date}{" "}
                    {date.region !== 8 ? (
                      <span
                        className={css({
                          fontSize: 13,
                          fontWeight: 600,
                          textTransform: "capitalize",
                        })}
                      >
                        |{" "}
                        <i>
                          {regions.find((reg) => reg.id === date.region)?.name}
                        </i>
                      </span>
                    ) : (
                      (date.status?.id === 34 || date.status?.id === 3) && (
                        <span
                          className={css({
                            fontSize: 13,
                            fontWeight: 600,
                          })}
                        >
                          | <i>{date.status.name}</i>
                        </span>
                      )
                    )}
                    <p className={css({ fontSize: 13 })}>
                      <i>{(date.platforms as string[]).join(", ")}</i>
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
            />
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
          <Screenshots screenshots={game.screenshots} />
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
      <Skeleton height="10px" className={css({ mb: 8 })} />
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
        {!!links.length && (
          <>
            <div
              className={css({
                mt: 8,
                fontSize: 18,
                textTransform: "uppercase",
              })}
            >
              Related Links
            </div>
            <div className={css({ fontSize: 16 })}>
              <WebsiteLinks links={links} />
            </div>
          </>
        )}
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
  { id: 10, name: "iphone", icon: <FaAppStoreIos /> },
  { id: 11, name: "ipad", icon: <FaAppStoreIos /> },
  { id: 12, name: "android", icon: <IoLogoGooglePlaystore /> },
  { id: 13, name: "steam", icon: <FaSteam /> },
  { id: 14, name: "reddit", icon: <FaReddit /> },
  { id: 15, name: "itch", icon: <FaItchIo /> },
  { id: 16, name: "epicgames", icon: <SiEpicgames /> },
  { id: 17, name: "gog", icon: <IoLogoGameControllerB /> },
  { id: 18, name: "discord", icon: <FaDiscord /> },
];
const WebsiteLinks = ({ links }: { links: Website[] }) => {
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

const Screenshots = ({ screenshots }: { screenshots: Screenshot[] }) => {
  const [gallery, setGallery] = useState<{
    imgIndex: number | null;
    isOpen: boolean;
  }>({ imgIndex: null, isOpen: false });

  return (
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
      {screenshots.map((screenshot, index) => (
        <div
          key={screenshot.id}
          className={css({
            position: "relative",
            display: "block",
            flexBasis: "50%",
            cursor: "pointer",
          })}
        >
          <Image
            src={`https:${screenshot.url.replace("t_thumb", "t_screenshot_big")}`}
            alt={screenshot.id}
            width={500}
            height={500}
            onClick={() => setGallery({ imgIndex: index, isOpen: true })}
          ></Image>
        </div>
      ))}
      <ImagesFullView
        imageIndex={gallery.imgIndex}
        isOpen={gallery.isOpen}
        screenshots={screenshots}
        onClose={() => setGallery({ imgIndex: null, isOpen: false })}
      />
    </div>
  );
};

const ImagesFullView = ({
  imageIndex,
  isOpen,
  screenshots,
  onClose,
}: {
  imageIndex: number | null;
  isOpen: boolean;
  screenshots: Screenshot[];
  onClose: () => void;
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [index, setIndex] = useState<number | undefined>();
  const viewedImage = index !== undefined && screenshots[index];

  const handleImageClick = (direction: "prev" | "next") => {
    if (index !== undefined) {
      const nextIndex = index < screenshots.length - 1 ? index + 1 : 0;
      const prevIndex = index === 0 ? screenshots.length - 1 : index - 1;
      const nextActiveIndex = direction === "next" ? nextIndex : prevIndex;

      // Smooth transition
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex(nextActiveIndex);
      }, 150);
    }
  };

  useEffect(() => {
    setIndex(imageIndex!);
    setIsTransitioning(true);
  }, [imageIndex]);

  return (
    !!(isOpen && viewedImage) && (
      <>
        <div
          key={viewedImage.id}
          className={css({
            position: "fixed",
            display: "block",
            w: { base: "full", md: "80%" },
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -48%)",
            opacity: isTransitioning ? 0 : 1, // For fading effect
            transition: "opacity .15s ease-in-out",
            zIndex: 998,
          })}
        >
          <GalleryChevron
            direction="back"
            onClick={() => handleImageClick("prev")}
          />
          <Image
            src={`https:${viewedImage.url.replace("t_thumb", "t_screenshot_huge_2x")}`}
            alt={viewedImage.id}
            width={500}
            height={500}
            className={css({ w: "full", h: "full" })}
            onClick={() => handleImageClick("next")}
            onLoadingComplete={() => setIsTransitioning(false)}
            priority
          />
          <GalleryChevron
            direction="forth"
            onClick={() => handleImageClick("next")}
          />
        </div>
        <Overlay isOpen={isOpen} setIsOpen={() => onClose()} />
      </>
    )
  );
};

const GalleryChevron = ({
  direction,
  onClick,
}: {
  direction: "back" | "forth";
  onClick: () => void;
}) => {
  const isLeftChevron = direction === "back";

  return (
    <div
      className={css({
        position: "absolute",
        w: "50%",
        h: "full",
        top: 0,
        left: isLeftChevron ? 0 : "unset",
        right: !isLeftChevron ? 0 : "unset",
        cursor: "pointer",
      })}
      onClick={onClick}
    >
      <div
        className={css({
          position: "absolute",
          display: "flex",
          w: 12,
          h: "full",
          left: isLeftChevron ? { base: 0, md: -12 } : "unset",
          right: !isLeftChevron ? { base: 0, md: -12 } : "unset",
          alignItems: "center",
          justifyContent: "center",
          bg: "rgba(255,255,255,.2)",
        })}
      >
        {isLeftChevron ? <FaChevronLeft /> : <FaChevronRight />}
      </div>
    </div>
  );
};
