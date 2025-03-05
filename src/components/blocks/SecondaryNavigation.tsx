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

export type SecondaryNavigationSections = {
  id: number;
  name: string;
  link: string;
};

export function SecondaryNavigation({
  navSections,
}: {
  navSections: SecondaryNavigationSections[];
}) {
  const pathname = usePathname();

  return (
    <div
      className={css({
        display: "flex",
        mb: 2,
        flexDirection: { base: "row", md: "column" },
        pr: { base: 0, md: 4 },
        gap: { base: 1, md: 5 },
      })}
    >
      <div className={css({ display: { base: "none", md: "block" } })}>
        <SectionTitle>Navigation</SectionTitle>
      </div>
      {navSections.map((item: LinksSideMenuSection) => (
        <Link
          key={item.id}
          href={item.link}
          className={`search ${css({
            display: "flex",
            w: "full",
            h: { base: 9, md: 12 },
            px: { base: 2, md: 4 },
            my: { base: 2, md: 0 },
            alignItems: "center",
            justifyContent: { base: "center", md: "left" },
            fontSize: { base: 13, md: 14 },
            transition: "opacity 0.3s",
            borderBottom: {
              base: pathname === item.link ? "3px solid {colors.primary}" : 0,
              md: 0,
            },
            borderRight: {
              base: 0,
              md: pathname === item.link ? "4px solid {colors.primary}" : 0,
            },
            pointerEvents: pathname === item.link ? "none" : "all",
            boxSizing: "border-box",
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
