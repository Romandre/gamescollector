"use client";
import { useState } from "react";

// Context
import { useThemeContext } from "@/context";

// Components
import { MenuLink } from "../blocks";
import { Overlay, Switch } from "../design";
import { HeaderMenu } from "./HeaderMenu";

// Types
import { type User } from "@supabase/supabase-js";

// Styles
import { css } from "../../../styled-system/css";

// Icons
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaGamepadSolid } from "react-icons/lia";
import { RiAccountCircle2Line } from "react-icons/ri";
import { PiSignInBold } from "react-icons/pi";
import { GrHomeRounded } from "react-icons/gr";
import { TbMenuDeep } from "react-icons/tb";
import { IoInformationOutline } from "react-icons/io5";
import { BiCollection } from "react-icons/bi";
import { GiHypersonicBolt } from "react-icons/gi";

export function HeaderActions({ user }: { user: User | null }) {
  const { theme, toggleTheme } = useThemeContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Overlay
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        className={css({ top: { base: 0, sm: "106px !important" } })}
      />
      <div
        className={css({
          flexBasis: { base: "none", sm: "300px" },
          flexShrink: 0,
        })}
      >
        <RxHamburgerMenu
          className={css({
            display: { base: "block", sm: "none" },
            fontSize: 30,
            mx: 2,
          })}
          onClick={() => setIsMenuOpen(true)}
        />
        <div
          className={`modal ${css({
            position: { base: "fixed", sm: "relative" },
            display: { base: isMenuOpen ? "flex" : "none", sm: "flex" },
            top: 0,
            right: 0,
            h: { base: "100dvh", sm: "full" },
            w: { base: "180px", sm: "auto" },
            flexDirection: { base: "column", sm: "row" },
            justifyContent: { base: "flex-start", sm: "space-evenly" },
            alignItems: "center",
            bg: { sm: "none" },
            animation: { base: "fade-in 0.3s", sm: "none" },
            userSelect: "none",
            zIndex: 998,
          })}`}
        >
          <div
            className={css({
              flexBasis: { base: "unset", sm: "52px" },
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
            <GrHomeRounded size={20} className={css({ mb: "4px" })} />
            Home
          </MenuLink>
          <MenuLink link="/browse">
            <LiaGamepadSolid size={28} />
            Browse
          </MenuLink>
          <MenuLink link="/browse/comingsoon" onlyMobile={true}>
            <GiHypersonicBolt
              size={19}
              className={css({ mt: "5px", mb: "2px" })}
            />
            Hype
          </MenuLink>
          <MenuLink link="/collection" onlyMobile={true}>
            <BiCollection size={24} className={css({ mt: "2px", mb: "1px" })} />
            Collection
          </MenuLink>
          <MenuLink link="/about" onlyMobile={true}>
            <IoInformationOutline
              size={23}
              className={css({ mt: "2px", mb: "1px" })}
            />
            About
          </MenuLink>
          {user ? (
            <MenuLink link="/account">
              <RiAccountCircle2Line
                size={24}
                className={css({
                  mt: { base: 0, sm: 1 },
                  mb: { base: "2px", sm: 0 },
                })}
              />
              Account
            </MenuLink>
          ) : (
            <MenuLink link="/signin">
              <PiSignInBold
                size={24}
                className={css({
                  mt: { base: 0, sm: 1 },
                  mb: { base: "3px", sm: 0 },
                })}
              />
              Sign In
            </MenuLink>
          )}

          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={css({
              display: { base: "none", sm: "flex" },
              flexDirection: "column",
              mt: 1,
              alignItems: "center",
              fontSize: 12,
              lineHeight: 1.2,
              cursor: "pointer",
            })}
          >
            <TbMenuDeep size={25} />
            Menu
          </div>
        </div>
      </div>
      {!!isMenuOpen && <HeaderMenu />}
    </>
  );
}
