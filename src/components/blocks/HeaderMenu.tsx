// Components
import { MenuLink } from "../blocks";

// Styles
import { css } from "../../../styled-system/css";

// Icons
import { IoInformationOutline } from "react-icons/io5";
import { BiCollection } from "react-icons/bi";
import { GiHypersonicBolt } from "react-icons/gi";

export function HeaderMenu() {
  return (
    <div
      className={`menu ${css({
        position: "absolute",
        display: { base: "none", sm: "block" },
        top: "52px",
        left: 0,
        right: 0,
        w: "full",
        animation: "fade-in 0.4s",
      })}`}
    >
      <div
        className={css({
          display: "flex",
          flexBasis: "100px",
          maxW: "1800px",
          h: "54px",
          mx: "auto",
          px: 6,
          pb: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "1.35rem",
        })}
      >
        <div className={css({ mr: "0.3rem" })}>
          <MenuLink link="/browse/comingsoon">
            <GiHypersonicBolt
              size={19}
              className={css({ mt: "5px", mb: "2px" })}
            />
            Hype
          </MenuLink>
        </div>
        <MenuLink link="/collection">
          <BiCollection size={22} className={css({ mt: "4px", mb: "1px" })} />
          Collection
        </MenuLink>
        <MenuLink link="/about">
          <IoInformationOutline
            size={22}
            className={css({ mt: "4px", mb: "1px" })}
          />
          About
        </MenuLink>
      </div>
    </div>
  );
}
