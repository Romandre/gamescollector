"use client";

// Components
import { SectionTitle } from "./design";

// Styles
import { css } from "../../styled-system/css";

export function GameFilters() {
  return (
    <div
      className={css({
        position: { lg: "fixed" },
      })}
    >
      <SectionTitle>Filters</SectionTitle>
      <div
        className={css({
          display: "flex",
          gap: 2,
          alignItems: "center",
        })}
      ></div>
    </div>
  );
}
