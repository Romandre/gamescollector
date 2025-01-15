import { ReactNode } from "react";
import { css } from "../../../styled-system/css";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className={css({ maxW: "1800px", m: "0 auto", p: 3, pt: 16 })}>
      {children}
    </div>
  );
}
