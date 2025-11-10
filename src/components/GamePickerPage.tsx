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
      <h2
        className={css({
          fontSize: 46,
          fontWeight: "bold",
          my: 6,
          textAlign: "center",
        })}
      >
        AI Game Picker{" "}
        <span
          className={css({
            verticalAlign: "super",
            fontSize: 18,
            fontStyle: "italic",
            opacity: 0.7,
          })}
        >
          beta
        </span>
      </h2>
      <div
        className={css({
          display: "flex",
          fontSize: 18,
          alignItems: "center",
          justifyContent: "center",
          my: 6,
        })}
      >
        Suggest me
        <Dropdown
          value={filters.genre ? genreOptions.indexOf(filters.genre) : 0}
          isFilter={false}
          options={genreOptions}
          onSelect={(option) => {
            setFilters({ ...filters, genre: option });
          }}
        />
        games for
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
        that are
        <Dropdown
          value={filters.mood ? moodOptions.indexOf(filters.mood) : 0}
          isFilter={false}
          options={moodOptions}
          onSelect={(option) => {
            setFilters({ ...filters, mood: option });
          }}
        />
      </div>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 6,
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
            Get Suggestions
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
