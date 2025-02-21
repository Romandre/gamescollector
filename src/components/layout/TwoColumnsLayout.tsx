import { ReactNode } from "react";
import { css } from "../../../styled-system/css";

const leftColumn = "270px";
const rightColumn = "1fr";

export function TwoColumnsLayout({
  breakpoint,
  children,
}: {
  breakpoint: "md" | "lg";
  children: ReactNode;
}) {
  const gridTemplate =
    breakpoint === "md"
      ? css({
          display: "grid",
          gridTemplateColumns: {
            md: `${leftColumn} ${rightColumn}`,
          },
        })
      : css({
          display: "grid",
          gridTemplateColumns: {
            lg: `${leftColumn} ${rightColumn}`,
          },
        });

  return <div className={gridTemplate}>{children}</div>;
}
