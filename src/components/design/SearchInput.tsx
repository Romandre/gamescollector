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
  const pathname = usePathname();

  const handleChange = (value: string) => {
    setValue(value);
  };

  const searchGames = (e: KeyboardEvent) => {
    const trimmedValue = value.trim();
    if (e.key === "Enter" && search !== trimmedValue) {
      window.scrollTo(0, 0);
      handleSearch(trimmedValue);
      if (pathname !== "/browse") redirect("/browse");
    }
  };

  return (
    <div className={css({ position: "relative", w: "full", h: "full" })}>
      <Input
        value={value}
        className={className}
        onChange={handleChange}
        onKeyUp={searchGames}
        placeholder="Search by game name"
      >
        <IoSearch />
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
