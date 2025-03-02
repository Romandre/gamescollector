// Components
import { supabaseClient } from "@/utils/supabase/server";
import { SearchInput } from "../design";
import { HeaderActions } from "../blocks";
import Link from "next/link";
import Image from "next/image";

// Styles
import { css } from "../../../styled-system/css";

export async function Header() {
  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div
      className={`header
        ${css({
          position: "fixed",
          w: "100%",
          zIndex: 999,
        })}`}
    >
      <div
        className={css({
          display: "flex",
          maxW: "1800px",
          w: "100%",
          h: "54px",
          mx: "auto",
          justifyContent: "center",
          alignItems: "center",
          overflow: "visible",
        })}
      >
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            flexBasis: { base: "96px", sm: "140px" },
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
              width={0}
              height={0}
              blurDataURL="/logo.png"
              style={{ width: "76px", height: "44px" }}
              priority
            />
          </Link>
        </div>
        <SearchInput
          className={css({
            h: "100%",
            w: "100%",
            px: 10,
          })}
        />
        <HeaderActions user={user} />
      </div>
    </div>
  );
}
