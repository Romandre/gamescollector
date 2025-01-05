"use client";
import { useState } from "react";

// Components
import { Overlay, SectionTitle } from "./design";

// Styles
import { css } from "../../styled-system/css";

// Icons
import { IoFilter } from "react-icons/io5";

export function GameFilters() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <>
      <div
        className={css({
          position: "relative",
        })}
      >
        <Overlay isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen} />
        <IoFilter
          onClick={() => setIsFiltersOpen(true)}
          className={css({
            position: "absolute",
            display: { base: "display", lg: "none" },
            mx: 1,
            fontSize: 26,
          })}
        />

        <div
          className={`filters ${css({
            position: "fixed",
            display: { base: isFiltersOpen ? "block" : "none", lg: "block" },
            left: 0,
            h: "full",
            top: { base: 0, lg: "unset" },
            py: { base: "72px", lg: 0 },
            px: { base: 4, lg: 2 },
            animation: "fade-in 0.4s",
            zIndex: { base: 998, lg: "unset" },
          })}`}
        >
          <SectionTitle
            className={css({ display: { base: "none", lg: "block" } })}
          >
            Filters
          </SectionTitle>
          <div
            className={css({
              display: "flex",
              gap: 2,
              alignItems: "start",
              flexDirection: "column",
            })}
          >
            <div>Filter are in progress...</div>
          </div>
        </div>
      </div>
    </>
  );
}
