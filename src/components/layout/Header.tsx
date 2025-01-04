// Components
import { SearchInput } from "../design";
import { HeaderActions } from "./HeaderActions";
import Link from "next/link";
import Image from "next/image";

// Styles
import { css } from "../../../styled-system/css";

export function Header() {
  return (
    <div
      className={[
        "header",
        css({
          position: "fixed",
          display: "flex",
          w: "100%",
          h: "54px",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          zIndex: 999,
        }),
      ].join(" ")}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          flexBasis: { base: "90px", sm: "140px" },
          flexShrink: 0,
        })}
      >
        <Link
          href="/"
          className={css({ position: "relative", display: "block", h: "full" })}
        >
          {/*  <Image
            src="/logo.png"
            alt="logo"
            width="76"
            height="44"
            blurDataURL="/logo.png"
          /> */}
          <h1 className="logo">GC</h1>
        </Link>
      </div>

      <div className={css({ w: "full", h: "full" })}>
        <SearchInput
          className={`search ${css({
            h: "100%",
            w: "100%",
          })}`}
        />
      </div>

      <HeaderActions />
    </div>
  );
}
