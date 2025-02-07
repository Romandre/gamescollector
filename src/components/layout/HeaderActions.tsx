"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Context
import { useAuthContext, useThemeContext } from "@/context";

// Components
import { Overlay, Switch } from "../design";

// Types
import { type User } from "@supabase/supabase-js";

// Styles
import { css } from "../../../styled-system/css";

// Icons
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaGamepadSolid } from "react-icons/lia";
import { RiAccountCircle2Line } from "react-icons/ri";
import { PiSignInBold } from "react-icons/pi";

export function HeaderActions({ user }: { user: User | null }) {
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
          animation: { base: "fade-in 0.3s", sm: "none" },
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
        <MenuLink link="/browse">
          <LiaGamepadSolid size={28} />
          Browse
        </MenuLink>
        {user ? (
          <MenuLink link="/account">
            <RiAccountCircle2Line size={26} className={css({ mt: 1 })} />
            Account
          </MenuLink>
        ) : (
          <MenuLink link="/signin">
            <PiSignInBold size={25} className={css({ mt: 1 })} />
            Sign In
          </MenuLink>
        )}
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
  const pathname = usePathname();
  const { setLinkBeforeLogin } = useAuthContext();

  const handleRedirect = () => {
    if (!pathname.includes("sign") && link === "/signin")
      setLinkBeforeLogin(pathname);
  };

  return (
    <Link
      href={link}
      onClick={handleRedirect}
      className={css({
        display: { base: "block", sm: onlyMobile ? "none" : "flex" },
        flexDirection: "column",
        alignItems: "center",
        w: { base: "100%", sm: "auto" },
        fontSize: 12,
        textAlign: "center",
        lineHeight: { base: "", sm: 1.2 },
        backdropFilter: { base: "contrast(0.8)", sm: "none" },
        py: { base: 4, sm: 0 },
        borderBottom: { base: "1px solid", sm: "none" },
      })}
    >
      {children}
    </Link>
  );
};
