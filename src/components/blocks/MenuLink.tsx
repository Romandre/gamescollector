"use client";
import { ReactNode } from "react";

// Components
import Link from "next/link";

// Context
import { useCommonContext } from "@/context";

// Hooks
import { usePathname } from "next/navigation";

// Styles
import { css } from "../../../styled-system/css";

export const MenuLink = ({
  link,
  onlyMobile = false,
  onlyDesktop = false,
  children,
}: {
  link: string;
  onlyMobile?: boolean;
  onlyDesktop?: boolean;
  children: ReactNode;
}) => {
  const pathname = usePathname();
  const { handlePrevousLinkOnSignin } = useCommonContext();

  return (
    <Link
      href={link}
      onClick={() => {
        if (link === "/signin") {
          handlePrevousLinkOnSignin();
        }
      }}
      className={css({
        display: {
          base: onlyDesktop ? "none" : "flex",
          sm: onlyMobile ? "none" : "flex",
        },
        flexDirection: "column",
        alignItems: "center",
        w: { base: "100%", sm: "auto" },
        fontSize: { base: 14, sm: 12 },
        textAlign: "center",
        lineHeight: { base: "", sm: 1.2 },
        backdropFilter: { base: "contrast(0.8)", sm: "none" },
        py: { base: 3, sm: 0 },
        borderBottom: { base: "1px solid", sm: "none" },
        transition: "opacity 0.3s",
        opacity: { base: pathname === link ? 0.5 : 1, sm: 1 },
        pointerEvents: {
          base: pathname === link ? "none" : "all",
          sm: "unset",
        },
        _focus: {
          opacity: { base: 0.6 },
        },
        _active: {
          opacity: { base: 0.6 },
        },
      })}
    >
      {children}
    </Link>
  );
};
