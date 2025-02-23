import { ReactNode } from "react";
import { grid } from "../../../styled-system/patterns";

export function Grid({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const gridClass =
    className ||
    grid({
      w: "100%",
      columns: { base: 2, sm: 3, md: 4, xl: 5, "2xl": 6 },
      gap: { base: 2.5, sm: 2 },
    });

  return <div className={gridClass}>{children}</div>;
}
