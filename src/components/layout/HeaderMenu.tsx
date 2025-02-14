// Components
import { MenuLink } from "../blocks";

// Styles
import { css } from "../../../styled-system/css";

// Icons
import { IoInformationOutline } from "react-icons/io5";

export function HeaderMenu() {
  return (
    <div
      className={`menu ${css({
        position: "absolute",
        display: { base: "none", sm: "flex" },
        top: "52px",
        right: 0,
        w: "full",
        h: "54px",
        px: 6,
        pb: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        animation: "fade-in 0.3s",
      })}`}
    >
      <MenuLink link="/about">
        <IoInformationOutline
          size={22}
          className={css({ mt: "4px", mb: "1px" })}
        />
        About
      </MenuLink>
    </div>
  );
}
