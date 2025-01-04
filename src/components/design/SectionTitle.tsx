import { ReactNode } from "react";
import { css } from "../../../styled-system/css";

export function SectionTitle({
  titleStyle,
  children,
}: {
  titleStyle?: string;
  children: ReactNode;
}) {
  return (
    <div className={titleStyle}>
      <h1>{children}</h1>
      <Divider />
    </div>
  );
}

function Divider() {
  return (
    <div
      className={css({ w: "82px", h: "3px", bg: "var(--colors-primary)" })}
    ></div>
  );
}
