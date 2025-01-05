"use client";
import { useThemeContext } from "@/context";

import Link from "next/link";

// Components
import { Overlay, Switch } from "../design";

// Styles
import { css } from "../../../styled-system/css";

// Icons
import { RxHamburgerMenu } from "react-icons/rx";
import { ReactNode, useState } from "react";

export function HeaderActions() {
  const { theme, toggleTheme } = useThemeContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={css({
        flexBasis: { base: "none", sm: "250px" },
        flexShrink: 0,
      })}
    >
      <Overlay isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <RxHamburgerMenu
        className={css({
          display: { base: "block", sm: "none" },
          fontSize: 30,
          mx: 2,
        })}
        onClick={() => setIsMenuOpen(true)}
      />
      <div
        className={`filters ${css({
          position: { base: "fixed", sm: "relative" },
          display: { base: isMenuOpen ? "flex" : "none", sm: "flex" },
          top: 0,
          right: 0,
          h: "full",
          w: { base: "180px", sm: "auto" },
          bg: { sm: "none" },
          flexDirection: { base: "column", sm: "row" },
          justifyContent: { base: "flex-start", sm: "space-evenly" },
          alignItems: "center",
          animation: { base: "fade-in 0.4s", sm: "none" },
          zIndex: 998,
        })}`}
      >
        <div
          className={css({
            flexBasis: "58px",
            flexShrink: 0,
            order: { base: 3, sm: 0 },
            scale: { base: 1.25, sm: 1 },
            my: { base: 6, sm: 0 },
          })}
        >
          <Switch
            variant={"theme"}
            checked={theme === "dark"}
            onChange={toggleTheme}
            isVisible={!!theme}
          />
        </div>
        <MenuLink link="/" onlyMobile={true}>
          Home
        </MenuLink>
        <MenuLink link="/browse">Browse</MenuLink>
        <MenuLink link="/signin">Sign In</MenuLink>
      </div>
    </div>
  );
}

const MenuLink = ({
  link,
  onlyMobile = false,
  children,
}: {
  link: string;
  onlyMobile?: boolean;
  children: ReactNode;
}) => {
  return (
    <Link
      href={link}
      className={css({
        display: { base: "block", sm: onlyMobile ? "none" : "block" },
        w: { base: "100%", sm: "auto" },
        textAlign: "center",
        backdropFilter: { base: "contrast(0.8)", sm: "none" },
        py: { base: 4, sm: 0 },
        borderBottom: { base: "1px solid", sm: "none" },
      })}
    >
      {children}
    </Link>
  );
};
