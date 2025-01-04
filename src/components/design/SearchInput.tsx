"use client";

import { KeyboardEvent, useState } from "react";
import { redirect, usePathname } from "next/navigation";

// Components
import { Input } from "./Input";

// Context
import { useGamesContext } from "@/context";

// Icons
import { IoSearch } from "react-icons/io5";

export function SearchInput({ className }: { className: string }) {
  const { search, handleSearch, setGames } = useGamesContext();
  const [value, setValue] = useState(search);
  const pathname = usePathname();

  const handleChange = (value: string) => {
    setValue(value);
  };

  const searchGames = (e: KeyboardEvent) => {
    const trimmedValue = value.trim();
    if (e.key === "Enter" && search !== trimmedValue) {
      setGames([]);
      window.scrollTo(0, 0);
      handleSearch(trimmedValue);
      if (pathname !== "/browse") redirect("/browse");
    }
  };

  return (
    <Input
      value={value}
      className={className}
      onChange={handleChange}
      onKeyUp={searchGames}
      placeholder="Search by game name"
    >
      <IoSearch />
    </Input>
  );
}
