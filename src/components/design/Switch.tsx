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
    <>
      {!!isVisible && (
        <div
          className={css({
            display: "flex",
            alignItems: "center",
          })}
        >
          {!!label && (
            <p
              className={css({
                display: "block",
                pr: 2,
                opacity: 0.8,
                whiteSpace: "nowrap",
              })}
            >
              {label}
            </p>
          )}
          <label className={`switch ${variant}`}>
            <input type="checkbox" onChange={onChange} checked={checked} />
            <span className="slider"></span>
          </label>
        </div>
      )}
    </>
  );
}
