"use client";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

// Components
import { GameCard, ReviewBlock, ToggleFavourite } from "./blocks";
import {
  Button,
  CircleLoader,
  Grid,
  Overlay,
  SectionTitle,
  Select,
  Textarea,
  Tiles,
} from "./design";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import Image from "next/image";

// Contexts
import { useCommonContext, useGamesContext, useRatings } from "@/context";

// Hooks
import { useQuery } from "@tanstack/react-query";

// Utils
import { getGames } from "@/utils/getGames";
import { isGameReleased } from "@/utils/isGameReleased";

// Types
import type {
  Cover,
  Game,
  GameStatus,
  Platform,
  Review,
  Screenshot,
  Website,
  AverageRating,
  Franchise,
} from "@/types";
import { User } from "@supabase/supabase-js";

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
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { SiEpicgames, SiWikibooks } from "react-icons/si";
import { IoLogoGameControllerB } from "react-icons/io";
import { IoLogoGooglePlaystore, IoStarOutline, IoStar } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TbMoodCry } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";

const fields =
  "fields *, screenshots.*, cover.url, release_dates.*, release_dates.status.*, platforms.*, genres.*, age_ratings.*, dlcs.*, dlcs.cover.*, expansions.*, expansions.cover.*, ports.*, ports.cover.*, remakes.*, remakes.cover.*, remasters.*, remasters.cover.*, involved_companies.*, involved_companies.company.*, parent_game.*, parent_game.cover.*, websites.*, videos.*, franchises.*, franchises.games.*, franchises.games.cover.*;";

const badges = [
  { id: 1, name: "DLC" },
  { id: 2, name: "Expansion" },
  { id: 3, name: "Bundle" },
  { id: 4, name: "Standalone Expansion" },
  { id: 5, name: "Mod" },
  { id: 6, name: "Episode" },
  { id: 7, name: "Season" },
  { id: 8, name: "Remake" },
  { id: 9, name: "Remaster" },
  { id: 10, name: "Expanded Game" },
  { id: 11, name: "Port" },
  { id: 12, name: "Fork" },
  { id: 13, name: "Pack" },
  { id: 14, name: "Update" },
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

export function GamePage({ id, user }: { id: string; user: User | null }) {
  const gameId = id;
  const userId = user?.id || "";
  const query = `${fields} where id = ${gameId};`;
  const { data, isLoading /* isError, error */ } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGames(query),
  });
  const game = data?.games?.[0] as Game;
  const isGameLoaded = !!(!isLoading && game?.id);
  const noGameFound = !!(!isLoading && !game?.id);
  const isReleased = isGameReleased(game?.first_release_date);

  return noGameFound ? (
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
  ) : (
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
          px: { base: 0, xl: 6 },
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
          gridTemplateColumns: { sm: "264px 1fr", xl: "300px 1fr 200px" },
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
            gameId={gameId}
            userId={userId}
            cover={game?.cover}
            isReleased={isReleased}
            badge={game?.category}
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

      {!!isGameReleased && (
        <RatingsModal
          userId={user?.id}
          gameId={gameId}
          gamePlatforms={game?.platforms}
          gameTitle={game?.name}
        />
      )}
    </div>
  );
}

const PageBackground = ({ images }: { images: Screenshot[] }) => {
  const [isLoading, setIsLoading] = useState(true);
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
          opacity: isLoading ? 0 : 1,
          transition: "opacity 1s ease-in-out",
          overflow: "hidden",
        })}
      >
        <Image
          src={`https:${randomImg.url?.replace("t_thumb", "t_screenshot_huge_2x")}`}
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
            scale: "1.01",
          })}
          onLoad={() => setIsLoading(false)}
          priority
        />
      </div>
    )
  );
};

const Cover = ({
  gameId,
  userId,
  cover,
  isReleased,
  badge,
  isLoaded,
}: {
  gameId: string;
  userId: string;
  cover: Cover | undefined;
  isReleased: boolean;
  badge?: number;
  isLoaded: boolean;
}) => {
  const { handlePrevousLinkOnSignin } = useCommonContext();

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
            loading="lazy"
          />
        ) : (
          <Image
            src="/no-image.jpg"
            alt="no-image"
            fill
            style={{ objectFit: "cover", animation: "fade-in 0.8s" }}
            sizes="(max-width: 700px) 100vw, 700px"
            loading="lazy"
          />
        )}
        {badges.some((item) => item.id === badge) && (
          <div
            className={css({
              position: "absolute",
              left: 0,
              top: 0,
              py: 1,
              px: 2,
              color: "white",
              bg: "var(--colors-primary)",
              fontSize: 12,
              fontWeight: 700,
              boxShadow: "1px 1px 5px 2px rgba(0,0,0,0.5)",
            })}
          >
            {badges.find((item) => item.id === badge)?.name}
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
        {userId ? (
          <div
            className={css({ display: "flex", alignItems: "center", gap: 3 })}
          >
            <div className={css({ flexBasis: "50%" })}>
              <ToggleFavourite gameId={gameId} userId={userId} />
            </div>
            <span className={`divider ${css({ w: "1px", h: 5 })}`} />
            <div
              className={css({
                flexBasis: "50%",
              })}
            >
              <ToggleRating isReleased={isReleased} />
            </div>
          </div>
        ) : (
          <>
            <Link
              href="/signin"
              onClick={() => handlePrevousLinkOnSignin()}
              className={css({
                color: "var(--colors-primary)",
                fontWeight: 500,
              })}
            >
              Sign in
            </Link>{" "}
            to rate and add games to your personal library{" "}
          </>
        )}
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
  const {
    userReview,
    getAverageGameRating,
    setIsReviewModalOpen,
    setReviewModalActiveView,
  } = useRatings();
  const [averageRating, setAverageRating] = useState<AverageRating | null>({
    average: 0,
    count: 0,
  });
  const anyRating =
    (game?.total_rating_count && game?.total_rating_count > 5) || averageRating;

  useEffect(() => {
    const fetchRating = async () => {
      const rating = await getAverageGameRating();
      setAverageRating(rating);
    };

    fetchRating();
  }, [getAverageGameRating]);

  return isLoaded ? (
    <div
      className={css({
        position: "relative",
        mt: { base: 1, md: 20, lg: 24, "2xl": 28 },
        mb: { base: 2, md: 10 },
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
      {anyRating && (
        <div
          className={css({
            display: "flex",
            my: { base: 6, sm: 2 },
            alignItems: "center",
            textShadow: "2px 2px 1px rgba(0,0,0,0.5)",
            gap: 3,
          })}
        >
          <FaStar
            color="var(--colors-primary)"
            className={css({
              position: "relative",
              top: "2px",
              fontSize: { base: 28, md: 32, lg: 35 },
              filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.6))",
            })}
          />
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.2,
            })}
          >
            {game.total_rating_count && game.total_rating_count > 5 && (
              <div
                className={css({
                  display: "flex",
                  alignItems: "baseline",
                  color: "white",
                  gap: 2,
                })}
              >
                <span>IGDB:</span>
                <span
                  className={css({
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
            )}
            {!!(averageRating && averageRating.average) && (
              <div
                className={css({
                  display: "flex",
                  alignItems: "baseline",
                  color: "white",
                  gap: 2,
                })}
              >
                <span>GC:</span>
                <span
                  className={css({
                    fontSize: { base: 22, md: 24, lg: 28 },
                    fontWeight: 500,
                  })}
                >
                  {averageRating.average}/10
                </span>
                <span className={css({ fontStyle: "italic", opacity: 0.8 })}>
                  ({averageRating.count})
                </span>
                {}
                <span
                  className="link"
                  onClick={() => {
                    setIsReviewModalOpen(true);
                    if (!(userReview && averageRating.count === 1))
                      setReviewModalActiveView(2);
                  }}
                >
                  see all
                </span>
              </div>
            )}
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
    platforms
      ?.filter((platform) => platform.name !== "Google Stadia")
      .map((platform) => platform.name)
      .sort() || [];

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
              regions: number[];
              status: GameStatus;
            }[]
          >((acc, release) => {
            const {
              human: date,
              platform: platformId,
              release_region: region,
              status,
            } = release;

            // Find existing entry for this date
            const existingEntry = acc.find((entry) => entry.date === date);

            // Find platform name
            const platform = platforms.find((p) => p.id === platformId)?.name;
            if (!platform) return acc;

            if (existingEntry) {
              // Add platform if not already included
              if (!existingEntry.platforms.includes(platform)) {
                existingEntry.platforms.push(platform);
              }

              // Add region if not already included
              if (!existingEntry.regions.includes(region)) {
                existingEntry.regions.push(region);
              }
            } else {
              // Create a new entry for this date
              acc.push({
                date,
                platforms: [platform],
                regions: [region],
                status,
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
                    {date.status?.id === 34 ||
                    date.status?.id === 3 ||
                    date.status?.id === 2 ? (
                      <span
                        className={css({
                          fontSize: 13,
                          fontWeight: 600,
                        })}
                      >
                        | <i>{date.status.name}</i>
                      </span>
                    ) : (
                      !!date.regions.length &&
                      date.regions[0] !== 8 && (
                        <span
                          className={css({
                            fontSize: 13,
                            fontWeight: 600,
                            textTransform: "capitalize",
                          })}
                        >
                          |{" "}
                          <i>
                            {date.regions
                              .map(
                                (region) =>
                                  regions.find((reg) => reg.id === region)?.name
                              )
                              .join(", ")}
                          </i>
                        </span>
                      )
                    )}
                    <p className={css({ fontSize: 13 })}>
                      <i>{(date.platforms.sort() as string[]).join(", ")}</i>
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
  const dlcs = game?.dlcs;
  const expansions = game?.expansions;
  const combined =
    dlcs?.length && expansions?.length && dlcs.concat(expansions);
  const allDlcs = combined || dlcs || expansions || [];

  const gridClass = grid({
    w: "100%",
    columns: { base: 2, sm: 3, md: 4, lg: 5, xl: 4, "2xl": 5 },
    gap: 1.5,
  });

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
      {!!game?.remasters?.length && (
        <Section title="Remasters">
          <div className={css({ display: "block" })}>
            <Grid className={gridClass}>
              {game.remasters.map((remaster) => (
                <GameCard key={remaster.id} game={remaster} showHints={false} />
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
      {!!game?.franchises?.length && (
        <Section title="Games in franchise">
          <Franchises franchises={game.franchises} gridClass={gridClass} />
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
              className={css({ bg: "var(--colors-primary)", opacity: 0.9 })}
            />
          </Link>
        </div>
        {!!links.length && (
          <>
            <div
              className={css({
                mt: { base: 4, xl: 6 },
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
      <SectionContent type={type}>{children}</SectionContent>
    </>
  );
};

const SectionContent = ({
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
      ?.sort((a, b) => a.type - b.type)
      .map((link) => {
        const website = websites.find((website) => website.id === link.type);

        return (
          !!website && (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
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
            h: "auto",
            maxH: "86vh",
            top: "50%",
            left: "50%",
            aspectRatio: "16/10",
            bg: "rgba(100,100,100,0.2)",
            transform: {
              base: "translate(-50%, -50%)",
              sm: "translate(-50%, -42%)",
              lg: "translate(-50%, -48%)",
            },
            zIndex: 998,
          })}
        >
          <Image
            src={`https:${viewedImage.url.replace("t_thumb", "t_screenshot_huge_2x")}`}
            alt={viewedImage.id}
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center",
            }}
            className={css({
              opacity: isTransitioning ? 0 : 1,
              transition: "opacity .15s ease-in-out",
            })}
            onClick={() => handleImageClick("next")}
            onLoadingComplete={() => setIsTransitioning(false)}
            priority
          />
          <GalleryChevron
            direction="back"
            hasShadow={true}
            onClick={() => handleImageClick("prev")}
          />
          <GalleryChevron
            direction="forth"
            hasShadow={true}
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
  hasShadow,
  onClick,
}: {
  direction: "back" | "forth";
  hasShadow?: boolean;
  onClick: () => void;
}) => {
  const isLeftChevron = direction === "back";
  const chevronStyle = css({
    color: "white",
    fontSize: { base: 24, md: 22 },
    filter: hasShadow ? "drop-shadow(0px 0px 2px rgb(0 0 0 / 1))" : "none",
  });

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
        {isLeftChevron ? (
          <FaChevronLeft className={chevronStyle} />
        ) : (
          <FaChevronRight className={chevronStyle} />
        )}
      </div>
    </div>
  );
};

const ToggleRating = ({ isReleased }: { isReleased: boolean }) => {
  const { userReview, setIsReviewModalOpen } = useRatings();

  return (
    <div
      onClick={() => !!isReleased && setIsReviewModalOpen(true)}
      className={css({
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: 11,
        fontWeight: 500,
        lineHeight: 1.2,
        gap: 1,
        cursor: "pointer",
      })}
    >
      {isReleased ? (
        <>
          {userReview && userReview?.rating ? (
            <>
              <IoStar
                size={26}
                className={css({
                  h: "32px",
                  mx: "auto",
                  justifySelf: "center",
                  color: "{colors.primary}",
                  cursor: "pointer",
                })}
              />
              <span>Rated {userReview.rating}/10</span>
            </>
          ) : (
            <>
              <IoStarOutline
                size={26}
                className={css({
                  h: "32px",
                  mx: "auto",
                  justifySelf: "center",
                  color: "{colors.primary}",
                  cursor: "pointer",
                })}
              />
              <span>Rate the game</span>
            </>
          )}
        </>
      ) : (
        <div className={css({ opacity: 0.6 })}>
          <IoStarOutline
            size={26}
            className={css({
              h: "32px",
              mx: "auto",
              justifySelf: "center",
              cursor: "pointer",
            })}
          />
          <span>Game not released</span>
        </div>
      )}
    </div>
  );
};

const Franchises = ({
  franchises,
  gridClass,
}: {
  franchises: Franchise[];
  gridClass: string;
}) => {
  const { handleSearch } = useGamesContext();

  return franchises.map((franchise: Franchise) => (
    <div key={franchise.id} className={css({ display: "block" })}>
      {franchises.length > 1 && (
        <div
          className={css({
            display: "flex",
            w: "full",
            mb: 2,
            alignItems: "center",
            gap: 4,
          })}
        >
          <span
            className={css({
              w: 6,
              h: "1px",
              bgColor: "{colors.primary}",
            })}
          />
          <span className={css({ flexShrink: 0 })}>{franchise.name}</span>
          <span
            className={css({
              w: "full",
              h: "1px",
              bgColor: "{colors.primary}",
            })}
          />
        </div>
      )}
      <Grid className={gridClass}>
        {franchise.games.slice(0, 9).map((game: Game) => (
          <GameCard key={game.id} game={game} showHints={false} />
        ))}
        {franchise.games.length > 10 && (
          <Link
            href={"/browse"}
            onClick={() => handleSearch(franchise.name)}
            className={css({
              display: "flex",
              h: { sm: 12, md: "full" },
              gridColumn: { sm: "1 / 4", md: "unset" },
              justifyContent: "center",
              alignItems: "center",
              fontSize: 14,
              textTransform: "uppercase",
              color: "{colors.primary}",
              bgColor: "var(--skeleton-base-color)",
              borderRadius: "8px",
              cursor: "pointer",
              _focus: {
                opacity: { base: 0.6 },
              },
              _active: {
                opacity: { base: 0.6 },
              },
            })}
          >
            Show more...
          </Link>
        )}
      </Grid>
    </div>
  ));
};

// Ratings (reviews) modal
const tabs = [
  { id: 1, name: "My review" },
  { id: 2, name: "All reviews" },
];
const RatingsModal = ({
  userId,
  gameId,
  gamePlatforms,
  gameTitle,
}: {
  userId: string | undefined;
  gameId: string | undefined;
  gamePlatforms?: Platform[];
  gameTitle: string;
}) => {
  const {
    isReviewModalOpen,
    setIsReviewModalOpen,
    userReview,
    getReviews,
    message,
    isLoading,
    reviewModalActiveView,
    setReviewModalActiveView,
    isReviewEditMode,
  } = useRatings();
  const { handlePrevousLinkOnSignin } = useCommonContext();
  const [allReviews, setAllReviews] = useState<Review[] | null>(null);

  const messageColor =
    message?.type !== "error"
      ? message?.type !== "warn"
        ? "#06a400"
        : "#f09e03"
      : "#be0404";

  const tabContentStyle = css({
    display: "flex",
    h: "full",
    flexDirection: "column",
    alignItems: "center",
    animation: "fade-in 0.3s",
    gap: 4,
  });

  const loadAllReviews = useCallback(async () => {
    if (!gameId) return;

    try {
      const all = await getReviews("all");
      setAllReviews(all);
    } catch (error) {
      console.error("Failed to load all reviews:", error);
    }
  }, [getReviews, gameId]);

  useEffect(() => {
    loadAllReviews();
  }, [loadAllReviews]);

  if (!isReviewModalOpen) return null;

  return (
    isReviewModalOpen && (
      <>
        <div
          className={`header ${css({
            position: "fixed",
            maxW: "800px",
            w: { base: "full", sm: "80%" },
            h: { base: "full", sm: "80%" },
            top: { base: 0, sm: "50%" },
            left: { base: 0, sm: "50%" },
            transform: { base: "none", sm: "translate(-50%, -46%)" },
            boxShadow: "0 0 24px rgba(0,0,0,0.35)",
            borderBottom: "none",
            animation: "fade-in 0.2s",
            zIndex: { base: 999, sm: 998 },
          })}`}
        >
          <div
            className={css({
              display: "flex",
              w: "full",
              alignItems: "center",
            })}
          >
            {tabs.map((tab) => (
              <span
                key={tab.id}
                onClick={() => setReviewModalActiveView(tab.id as 1 | 2)}
                className={`${reviewModalActiveView === tab.id ? "modal" : ""} 
                  ${css({
                    position: "relative",
                    display: "flex",
                    h: "50px",
                    px: 6,
                    color: "{colors.primary}",
                    fontSize: 14,
                    textTransform: "uppercase",
                    alignItems: "center",
                    boxShadow:
                      reviewModalActiveView === tab.id
                        ? "0 0px 12px rgba(0,0,0,0.35)"
                        : "none",
                    opacity: reviewModalActiveView === tab.id ? 1 : 0.7,
                    borderTop:
                      reviewModalActiveView === tab.id
                        ? {
                            base: "3px solid var(--colors-primary)",
                            sm: "2px solid var(--colors-primary)",
                          }
                        : "none",
                    cursor: "pointer",
                  })}`}
              >
                {tab.name}
                {!!(reviewModalActiveView === tab.id) && (
                  <div
                    className={`modal ${css({
                      position: "absolute",
                      w: "full",
                      height: "30px",
                      left: 0,
                      right: 0,
                      bottom: "-20px",
                      boxShadow: "none",
                      zIndex: 1,
                    })}`}
                  />
                )}
              </span>
            ))}
            <RxCross2
              size={24}
              onClick={() => setIsReviewModalOpen(false)}
              className={css({
                position: "absolute",
                right: 4,
                color: "{colors.primary}",
                cursor: "pointer",
              })}
            />
          </div>
          <div
            className={`modal ${css({
              h: "calc(100% - 50px)",
              py: 6,
              boxShadow: "0 0 24px rgba(0,0,0,0.35)",
              textAlign: "center",
            })}`}
          >
            <div className={css({ h: "full", px: 6, overflowY: "auto" })}>
              {isLoading ? (
                <CircleLoader />
              ) : (
                <>
                  {reviewModalActiveView === 1 && (
                    <div className={tabContentStyle}>
                      {userId ? (
                        <>
                          {userReview && !isReviewEditMode ? (
                            <>
                              <div>My review for {gameTitle}</div>
                              <ReviewBlock
                                review={userReview}
                                myReviewTab={true}
                              />
                            </>
                          ) : (
                            <>
                              <div className={css({ mb: 4 })}>
                                {isReviewEditMode ? "Update" : "Add"} review for{" "}
                                {gameTitle}
                              </div>
                              <AddReviewForm
                                gameTitle={gameTitle}
                                gamePlatforms={gamePlatforms}
                              />
                            </>
                          )}
                          {!!(message && message.text) && (
                            <div
                              className={css({
                                display: "flex",
                                gap: 2,
                                animation: "fade-in 0.3s",
                                color: messageColor,
                              })}
                            >
                              <MdErrorOutline size={24} /> {message.text}
                            </div>
                          )}
                        </>
                      ) : (
                        <span>
                          <Link
                            href="/signin"
                            onClick={() => handlePrevousLinkOnSignin()}
                            className={css({
                              color: "var(--colors-primary)",
                              fontWeight: 500,
                            })}
                          >
                            Sign in
                          </Link>{" "}
                          to be able to rate games
                        </span>
                      )}
                    </div>
                  )}
                  {reviewModalActiveView === 2 && (
                    <div className={tabContentStyle}>
                      <div
                        className={css({
                          textWrap: "balance",
                        })}
                      >
                        All reviews for <i>{gameTitle}</i>
                      </div>
                      {allReviews && allReviews.length ? (
                        allReviews.map((review) => (
                          <ReviewBlock key={review.id} review={review} />
                        ))
                      ) : (
                        <>
                          <span>There are no reviews for this game yet</span>
                          <TbMoodCry size={60} />
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <Overlay isOpen={true} setIsOpen={setIsReviewModalOpen} />
      </>
    )
  );
};

const AddReviewForm = ({
  gameTitle,
  gamePlatforms,
}: {
  gameTitle: string;
  gamePlatforms?: Platform[];
}) => {
  const { userReview, addReview, updateReview, setIsReviewEditMode } =
    useRatings();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const handleReview = (formData: FormData) => {
    if (userReview) {
      updateReview(
        Number(formData.get("rating")),
        formData.get("platform") as string,
        formData.get("comment") as string
      );
      setIsReviewEditMode(false);
    } else {
      addReview(
        Number(formData.get("rating")),
        formData.get("platform") as string,
        formData.get("comment") as string,
        gameTitle as string
      );
    }
  };

  useEffect(() => {
    if (userReview) {
      setRating(userReview.rating);
      setText(userReview.comment);
    }
  }, [userReview]);

  return (
    <form
      action={handleReview}
      className={css({
        display: "flex",
        flexDirection: "column",
        w: "full",
        maxW: "340px",
        textAlign: "left",
        animation: "fade-in 0.3s",
        gap: 6,
      })}
    >
      <div className={css({ mb: 1 })}>
        <div className={css({ fontSize: 14, opacity: 0.8, m: 1 })}>Rating</div>
        <div
          className={css({ display: "flex", justifyContent: "space-between" })}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <span
              key={index}
              onClick={() => setRating(index + 1)}
              className={`search 
                ${css({
                  w: 6,
                  py: 2,
                  textAlign: "center",
                  color: "unset",
                  borderRadius: 8,
                  fontWeight: rating === index + 1 ? 600 : 400,
                  bgColor: rating === index + 1 ? "{colors.primary}" : "",
                  cursor: "pointer",
                })}`}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
      {gamePlatforms?.length && (
        <PlatformSelect
          defaultValue={userReview?.platform}
          gamePlatforms={gamePlatforms || []}
        />
      )}
      <Textarea
        value={text}
        name="comment"
        label="comment"
        placeholder="Add comment"
        className={css({
          w: "full",
          maxH: "400px",
          minH: "150px",
          py: 3,
          px: 2,
        })}
        onChange={setText}
        required={true}
      />
      <input name="rating" value={rating} hidden readOnly />
      <div className={css({ display: "flex", gap: 2 })}>
        <Button type="submit">
          {userReview ? "Update review" : "Add review"}
        </Button>
        {!!userReview && (
          <Button
            className="secondary"
            onClick={() => setIsReviewEditMode(false)}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

const PlatformSelect = ({
  gamePlatforms,
  defaultValue,
}: {
  gamePlatforms: Platform[];
  defaultValue?: string;
}) => {
  const platformNames = gamePlatforms?.map((platform) => platform.name);
  const [platforms, setPlatforms] = useState(platformNames);
  const [platform, setPlatform] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (val: string) => {
    setPlatform(val);
    const filteredOptions = platformNames.filter((option) =>
      option.includes(val)
    );

    if (!val.trim()) setIsOpen(false);

    if (val && filteredOptions.length) {
      setPlatforms(filteredOptions);
      setIsOpen(true);
    } else {
      setPlatforms(platformNames);
      setIsOpen(false);
    }
  };

  const handlePlatformSelect = (val: string) => {
    setPlatform(val);
    setIsOpen(false);
  };

  useEffect(() => {
    if (defaultValue) setPlatform(defaultValue);
  }, [defaultValue]);

  return (
    <Select
      options={platforms}
      inputValue={platform}
      inputName="platform"
      inputLabel="platform"
      inputHeight={50}
      onInputChange={handleInputChange}
      onOptionClick={handlePlatformSelect}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      required={true}
    />
  );
};
