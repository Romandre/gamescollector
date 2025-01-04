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
        <IoFilter
          onClick={() => setIsFiltersOpen(true)}
          className={css({
            position: "absolute",
            display: { base: "display", lg: "none" },
            mx: 1,
            fontSize: 26,
          })}
        />
        <Overlay isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen} />
        <div
          className={`filters ${css({
            position: "fixed",
            left: 0,
            h: "full",
            top: { base: 0, lg: "unset" },
            py: { base: "72px", lg: 0 },
            px: { base: 4, lg: 2 },
            display: { base: isFiltersOpen ? "block" : "none", lg: "block" },
            zIndex: { base: 998, lg: "unset" },
            animation: { base: "fade-in 0.4s", lg: "none" },
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
