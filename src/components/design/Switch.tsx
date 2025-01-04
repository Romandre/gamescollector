"use client";
import { css } from "../../../styled-system/css";

export function Switch({
  variant,
  checked,
  onChange,
  label,
  isVisible = true,
}: {
  variant?: string;
  checked?: boolean;
  onChange: () => void;
  label?: string;
  isVisible?: boolean;
}) {
  return (
    <div
      className={css({
        flexBasis: "58px",
        flexShrink: 0,
      })}
    >
      {!!isVisible && (
        <div
          className={css({
            display: "flex",
            h: "full",
            alignItems: "end",
            animation: "fade-in 0.8s",
          })}
        >
          <p className={css({ pr: 2, opacity: 0.8, whiteSpace: "nowrap" })}>
            {label}
          </p>
          <label className={`switch ${variant}`}>
            <input type="checkbox" onChange={onChange} checked={checked} />
            <span className="slider"></span>
          </label>
        </div>
      )}
    </div>
  );
}
