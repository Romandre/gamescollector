// Icons
import {
  FaWindows,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaXbox,
} from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { DiAndroid } from "react-icons/di";
import { SiAtari } from "react-icons/si";

// Types
import { Platform } from "@/types";

// Styles
import { css } from "../../../styled-system/css";

export const PlatformIcons = ({
  platforms,
  className,
}: {
  platforms: Platform[] | undefined;
  className?: string;
}) => {
  return (
    platforms && (
      <div className={className}>
        <div
          className={css({
            display: "inline-flex",
            fontSize: 19,
            filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.4))",
            gap: 2,
          })}
        >
          {!!platforms.some((platform) =>
            platform.name.toLowerCase().includes("windows")
          ) && <FaWindows />}
          {!!platforms.some(
            (platform) =>
              platform.name.toLowerCase().includes("mac") ||
              platform.name.toLowerCase().includes("ios")
          ) && <FaApple />}
          {!!platforms.some((platform) =>
            platform.name.toLowerCase().includes("android")
          ) && <DiAndroid />}
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
          {!!platforms.some((platform) =>
            platform.name.toLowerCase().includes("atari")
          ) && <SiAtari />}
        </div>
      </div>
    )
  );
};
