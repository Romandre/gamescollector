"use client";
import { css } from "../../../styled-system/css";

export function CircleLoader({ className }: { className?: string }) {
  return (
    <div
      className={`${css({
        display: "inline-flex",
        w: "full",
        h: "50px",
        justifyContent: "center",
        alignItems: "center",
      })} ${className}`}
    >
      <span className="loader" />
    </div>
  );
}
