"use client";
// Components
import { Dropdown, Switch } from "./design";

// Contexts
import { useGamesContext } from "@/context";

// Add-ons
import Skeleton from "react-loading-skeleton";

// Styles
import { css } from "../../styled-system/css";

// Icons
import { HiViewList } from "react-icons/hi";
import { MdViewList } from "react-icons/md";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";

const sortingOptions = ["popularity", "release date", "rating", "alphabet"];

export function GameSorting() {
  const {
    games,
    view,
    toggleView,
    hintsEnabled,
    showDlcs,
    toggleDlcs,
    toggleHints,
    sorting,
    handleSorting,
  } = useGamesContext();

  const isLoading = hintsEnabled === undefined && !games?.length;

  return (
    <div
      className={css({
        display: !isLoading ? "flex" : "block",
        alignItems: "center",
        h: 10,
        pb: 3,
        px: { base: 1, md: 2 },
        gap: { xl: 20, lg: 16, base: 12 },
      })}
    >
      {!isLoading ? (
        <>
          <Dropdown
            value={sorting}
            options={sortingOptions}
            onSelect={(option) => {
              handleSorting(sortingOptions.indexOf(option));
            }}
          />
          <div
            className={css({
              "@media (hover: none)": {
                display: "none",
              },
            })}
          >
            <Switch
              checked={hintsEnabled}
              onChange={() => {
                toggleHints();
              }}
              label={"Hints on hover"}
            />
          </div>
          <Switch
            checked={showDlcs}
            onChange={() => {
              toggleDlcs();
            }}
            label={"Show DLC"}
          />
          <div
            className={css({
              display: "flex",
              ml: "auto",
              alignItems: "center",
              gap: { xl: 3, base: 2 },
            })}
          >
            <HiViewList
              className={css({
                fontSize: 24,
                opacity: 0.8,
                color: view === "list-min" ? "var(--colors-primary)" : "",
                cursor: "pointer",
              })}
              onClick={() => toggleView("list-min")}
            />
            <MdViewList
              className={css({
                fontSize: 28,
                opacity: 0.8,
                color: view === "list" ? "var(--colors-primary)" : "",
                cursor: "pointer",
              })}
              onClick={() => toggleView("list")}
            />
            <TfiLayoutGrid3Alt
              className={css({
                fontSize: 20,
                opacity: 0.8,
                color: view === "grid" ? "var(--colors-primary)" : "",
                cursor: "pointer",
              })}
              onClick={() => toggleView("grid")}
            />
          </div>
        </>
      ) : (
        <Skeleton
          className={css({ h: 6, w: "full", verticalAlign: "middle" })}
        />
      )}
    </div>
  );
}
