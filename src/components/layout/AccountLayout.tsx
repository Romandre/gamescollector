import { ReactNode } from "react";
import { css } from "../../../styled-system/css";

const accountMenuWidth = 270;

export function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: {
          md: `${accountMenuWidth}px 1fr`,
        },
      })}
    >
      {children}
    </div>
  );
}
