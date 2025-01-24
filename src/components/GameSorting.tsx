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
    view,
    toggleView,
    hintsEnabled,
    showDlcs,
    toggleDlcs,
    toggleHints,
    sorting,
    handleSorting,
    isSortingLoading,
  } = useGamesContext();
  const [isSortingOpen, setIsSortingOpen] = useState(false);

  return (
    <>
      <Overlay isOpen={isSortingOpen} setIsOpen={setIsSortingOpen} />
      <div
        className={css({
          display: { base: "block", md: "none" },
          float: "right",
          mb: 2,
        })}
      >
        {isSortingLoading ? (
          <Skeleton width={50} />
        ) : (
          <IoOptions
            className={css({
              mx: 2,
              fontSize: 28,
              cursor: "pointer",
            })}
            onClick={() => setIsSortingOpen(true)}
          />
        )}
      </div>

      <div
        className={`filters ${css({
          position: { base: "fixed", md: "relative" },
          top: 0,
          right: 0,
          display: {
            base: isSortingOpen ? "flex" : "none",
            md: !isSortingLoading ? "flex" : "block",
          },
          flexDirection: { base: "column", md: "row" },
          alignItems: { base: "end", md: "center" },
          h: { base: "full", md: 10 },
          ml: { md: "13%", lg: 0 },
          pb: 3,
          px: { base: 4, md: 2 },
          pt: { base: "72px", md: 0 },
          gap: { base: 6, md: 8, lg: 14, xl: 20 },
          zIndex: { base: 998, md: "unset" },
          animation: "fade-in 0.3s",
        })}`}
      >
        {!isSortingLoading ? (
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
                gap: { base: 2, xl: 3 },
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
