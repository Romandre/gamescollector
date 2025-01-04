// Icons
import {
  FaWindows,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaXbox,
} from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";

// Styles
import { css } from "../../../styled-system/css";

export const PlatformsIcons = ({
  platforms,
  className,
}: {
  platforms: string[];
  className?: string;
}) => {
  return (
    platforms && (
      <div className={className}>
        <div
          className={css({
            display: "inline-flex",
            fontSize: 19,
            gap: 2,
            color: "#FFFFFF",
          })}
        >
          {!!platforms.some((platform) =>
            platform.name.toLowerCase().includes("windows")
          ) && <FaWindows />}
          {!!platforms.some((platform) =>
            platform.name.toLowerCase().includes("mac")
          ) && <FaApple />}
          {!!platforms.some((platform) =>
            platform.name.toLowerCase().includes("linux")
          ) && <FaLinux />}
          {!!platforms.some((platform) =>
            platform.name.toLowerCase().includes("playstation")
          ) && <FaPlaystation />}
          {!!platforms.some((platform) =>
            platform.name.toLowerCase().includes("xbox")
          ) && <FaXbox />}
          {!!platforms.some((platform) =>
            platform.name.toLowerCase().includes("nintendo")
          ) && <BsNintendoSwitch />}
        </div>
      </div>
    )
  );
};
