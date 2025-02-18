"use client";
// Components
import Link from "next/link";
import { SectionTitle } from "../design";

// Hooks
import { usePathname } from "next/navigation";

// Types
import { LinksSideMenuSection } from "@/types";

// Styles
import { css } from "../../../styled-system/css";

const accountMenuSections = [
  { id: 1, name: "Account Info", link: "/account" },
  { id: 2, name: "Game Collection", link: "/collection" },
  { id: 3, name: "Settings", link: "/account/settings" },
];

export function AccountMenu() {
  const pathname = usePathname();

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: { base: "row", md: "column" },
        pr: { base: 0, md: 4 },
        gap: { base: 1, md: 5 },
      })}
    >
      <div className={css({ display: { base: "none", md: "block" } })}>
        <SectionTitle>Navigation</SectionTitle>
      </div>
      {accountMenuSections.map((item: LinksSideMenuSection) => (
        <Link
          key={item.id}
          href={item.link}
          className={`search ${css({
            display: "block",
            w: "full",
            px: { base: 2, md: 4 },
            py: { base: 2, md: 3 },
            my: { base: 2, md: 0 },
            textAlign: { base: "center", md: "left" },
            fontSize: { base: 12, md: 14 },
            transition: "opacity 0.3s",
            opacity: pathname === item.link ? 0.65 : 1,
            pointerEvents: pathname === item.link ? "none" : "all",
            _focus: {
              opacity: 0.6,
            },
            _active: {
              opacity: 0.6,
            },
          })}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
