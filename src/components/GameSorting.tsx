"use client";
import { useState } from "react";

// Components
import { Dropdown, Overlay, Switch } from "./design";

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
import { IoOptions } from "react-icons/io5";

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
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const isLoading = hintsEnabled === undefined && !games?.length;

  return (
    <>
      <Overlay isOpen={isSortingOpen} setIsOpen={setIsSortingOpen} />
      <IoOptions
        className={css({
          display: { base: "block", sm: "none" },
          float: "right",
          mx: 2,
          mb: 2,
          fontSize: 28,
        })}
        onClick={() => setIsSortingOpen(true)}
      />

      <div
        className={`filters ${css({
          position: { base: "fixed", sm: "relative" },
          top: 0,
          right: 0,
          display: {
            base: isSortingOpen ? "flex" : "none",
            sm: !isLoading ? "flex" : "block",
          },
          flexDirection: { base: "column", sm: "row" },
          alignItems: { base: "end", sm: "center" },
          h: { base: "full", sm: 10 },
          pb: 3,
          px: { base: 4, sm: 2 },
          pt: { base: "72px", sm: 0 },
          gap: { base: 6, sm: 8, lg: 14, xl: 20 },
          zIndex: { base: 998, sm: "unset" },
          bg: { base: "var(--)" },
          animation: { base: "fade-in 0.4s", sm: "none" },
        })}`}
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
    </>
  );
}
