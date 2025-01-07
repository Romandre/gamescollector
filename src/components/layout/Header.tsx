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
          w: "100%",
          zIndex: 999,
        }),
      ].join(" ")}
    >
      <div
        className={css({
          position: "relative",
          display: "flex",
          maxW: "1800px",
          w: "100%",
          h: "54px",
          mx: "auto",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        })}
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
            className={css({
              position: "relative",
              display: "block",
              h: "full",
            })}
          >
            <Image
              src="/logo.png"
              alt="logo"
              width="76"
              height="44"
              blurDataURL="/logo.png"
            />
            {/* <h1 className="logo">GC</h1> */}
          </Link>
        </div>

        <SearchInput
          className={`search ${css({
            h: "100%",
            w: "100%",
            px: 10,
          })}`}
        />

        <HeaderActions />
      </div>
    </div>
  );
}
