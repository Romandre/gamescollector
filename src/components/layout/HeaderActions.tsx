"use client";
import { useThemeContext } from "@/context";

import Link from "next/link";

// Components
import { Switch } from "../design";

// Styles
import { css } from "../../../styled-system/css";

export function HeaderActions() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div
      className={css({
        display: { base: "none", sm: "flex" },
        flexBasis: "250px",
        flexShrink: 0,
        justifyContent: "space-around",
        alignItems: "center",
      })}
    >
      <div
        className={css({
          flexBasis: "58px",
          flexShrink: 0,
        })}
      >
        <Switch
          variant={"theme"}
          checked={theme === "dark"}
          onChange={toggleTheme}
          isVisible={!!theme}
        />
      </div>
      <Link href="/browse">Browse</Link>
      <Link href="/signin">Sign In</Link>
    </div>
  );
}
