"use client";

import { KeyboardEvent, useState } from "react";
import { redirect, usePathname } from "next/navigation";

// Components
import { Input } from "./Input";

// Context
import { useGamesContext } from "@/context";

// Icons
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

// Styles
import { css } from "../../../styled-system/css";

export function SearchInput({ className }: { className: string }) {
  const { search, handleSearch } = useGamesContext();
  const [value, setValue] = useState(search);
  const trimmedValue = value.trim();
  const isNewSearchValue = trimmedValue && trimmedValue !== search;
  const pathname = usePathname();

  const searchIconStyle = isNewSearchValue
    ? css({
        width: "30px",
        h: "30px",
        px: "5px",
        color: "#FFFFFF",
        bg: "var(--colors-primary)",
        borderRadius: "8px",
        opacity: 0.9,
        transition: "background 0.3s, color 0.3s",
        cursor: "pointer",
      })
    : "";

  const handleChange = (value: string) => {
    setValue(value);
  };

  const searchGames = () => {
    if (isNewSearchValue) {
      window.scrollTo(0, 0);
      handleSearch(trimmedValue);
    }
    if (pathname !== "/browse") redirect("/browse");
  };

  const searchGamesWithEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      searchGames();
    }
  };

  /* 
  * Life-search
  *
  useEffect(() => {
    const trimmed = value.trim();

    if (trimmed.length > 2) {
      const timeout = setTimeout(() => handleSearch(trimmed), 300);
      return () => clearTimeout(timeout);
    } else if (trimmed === "") {
      handleSearch("");
    }
  }, [value, handleSearch]);
  */

  return (
    <div className={css({ position: "relative", w: "full", h: "full" })}>
      <Input
        value={value}
        className={className}
        onChange={handleChange}
        onKeyUp={searchGamesWithEnter}
        placeholder="Search by game name"
      >
        <IoSearch onClick={searchGames} className={searchIconStyle} />
      </Input>
      {!!value.length && (
        <RxCross2
          className={css({
            position: "absolute",
            h: "full",
            top: 0,
            right: 2,
            color: "#AAAAAA",
            fontSize: 22,
            cursor: "pointer",
          })}
          onClick={() => {
            handleChange("");
            handleSearch("");
          }}
        />
      )}
    </div>
  );
}
