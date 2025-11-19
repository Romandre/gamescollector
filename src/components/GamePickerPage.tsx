"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, CircleLoader, Dropdown } from "./design";

// Styles
import { css } from "../../styled-system/css";

interface Filters {
  genre: string;
  mood: string;
  platform: string;
}

interface GameSuggestion {
  title: string;
  genre: string;
  reason: string;
}

const genreOptions = [
  "shooter",
  "rpg",
  "strategy",
  "adventure",
  "puzzle",
  "detective",
  "platformer",
  "survival",
  "horror",
  "simulation",
  "sports",
  "indie",
];

const platformOptions = [
  "PC",
  "PlayStation 4",
  "PlayStation 5",
  "Xbox One",
  "Xbox Series S/X",
  "Nintendo Switch",
  "Mobile",
];

const moodOptions = [
  "casual",
  "intense",
  "story-driven",
  "competitive",
  "relaxing",
  "challenging",
  "funny",
  "dark",
  "immersive",
  "mysterious",
];

function getRandomOption(options: string[]): string {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

export function GamePickerPage() {
  const [filters, setFilters] = useState<Filters>({
    genre: "",
    mood: "",
    platform: "",
  });
  const [result, setResult] = useState<GameSuggestion[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Current result:", result);

  useEffect(() => {
    const randomFilters = {
      genre: getRandomOption(genreOptions),
      mood: getRandomOption(moodOptions),
      platform: getRandomOption(platformOptions),
    };
    setFilters(randomFilters);
  }, [setFilters]);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get<{ suggestions: GameSuggestion[] }>(
        "/api/ai",
        {
          params: filters,
        }
      );

      setResult(res.data.suggestions);
    } catch (error) {
      console.error("Failed to fetch game suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={css({
          fontSize: { base: 42, xs: 52, sm: 62 },
          fontWeight: "bold",
          mt: 16,
          textAlign: "center",
          textWrap: "balance",
        })}
      >
        AI Game Picker
        <span
          className={css({
            ml: 2,
            verticalAlign: { base: "16px", xs: "20px", sm: "24px" },
            fontSize: 16,
            fontStyle: "italic",
            opacity: 0.6,
          })}
        >
          beta
        </span>
      </div>
      <div
        className={css({
          fontSize: { base: 18, xs: 20, sm: 22 },
          mt: 6,
          textAlign: "center",
          textWrap: "balance",
        })}
      >
        Let the AI pick the perfect game for you
      </div>
      <div
        className={css({
          display: "flex",
          flexDirection: { base: "column", md: "row" },
          gap: { base: 4, md: 0 },
          fontSize: { base: 16, xs: 18 },
          alignItems: "center",
          justifyContent: "center",
          mt: 20,
          mb: 6,
        })}
      >
        <span
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 1,
          })}
        >
          Suggest me
          <span
            className={css({
              display: "flex",
              mx: 3,
              p: 2,
              border: "1px solid var(--colors-primary)",
              borderRadius: 6,
            })}
          >
            <Dropdown
              value={filters.genre ? genreOptions.indexOf(filters.genre) : 0}
              isFilter={false}
              options={genreOptions}
              onSelect={(option) => {
                setFilters({ ...filters, genre: option });
              }}
            />
          </span>
          games{" "}
        </span>
        <span
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          for
          <span
            className={css({
              display: "flex",
              mx: 3,
              p: 2,
              border: "1px solid var(--colors-primary)",
              borderRadius: 6,
            })}
          >
            <Dropdown
              value={
                filters.platform ? platformOptions.indexOf(filters.platform) : 0
              }
              isFilter={false}
              options={platformOptions}
              onSelect={(option) => {
                setFilters({ ...filters, platform: option });
              }}
            />
          </span>
        </span>{" "}
        <span
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          that are
          <span
            className={css({
              display: "flex",
              mx: 3,
              p: 2,
              border: "1px solid var(--colors-primary)",
              borderRadius: 6,
            })}
          >
            <Dropdown
              value={filters.mood ? moodOptions.indexOf(filters.mood) : 0}
              isFilter={false}
              options={moodOptions}
              onSelect={(option) => {
                setFilters({ ...filters, mood: option });
              }}
            />
          </span>
        </span>
      </div>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 8,
        })}
      >
        {isLoading ? (
          <CircleLoader className={css({ w: "160px" })} />
        ) : (
          <Button
            type="button"
            onClick={() => handleSubmit()}
            className={css({ w: 200 })}
          >
            Get Suggestions <span className={css({ fontSize: 18 })}>✨</span>
          </Button>
        )}
      </div>

      {result && (
        <div>
          {result.map((game, index) => (
            <div
              key={index}
              style={{
                marginTop: "1rem",
                border: "1px solid #ccc",
                padding: "1rem",
              }}
            >
              <h3>{game.title}</h3>
              <p>
                <strong>Genre:</strong> {game.genre}
              </p>
              <p>
                <strong>Why:</strong> {game.reason}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
