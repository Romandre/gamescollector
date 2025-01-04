import { ReactNode } from "react";
import { css } from "../../../styled-system/css";

export function SectionTitle({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
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
