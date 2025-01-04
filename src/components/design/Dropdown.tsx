"use client";

import { useState, useRef, useEffect } from "react";
import { css } from "../../../styled-system/css";

export function Dropdown({
  value,
  options,
  onSelect,
  label = "Sort by",
}: {
  value?: number;
  options: string[];
  onSelect: (option: string) => void;
  label?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={css({
        position: "relative",
        display: "flex",
        alignItems: "end",
      })}
    >
      <p
        className={css({
          display: { base: "none", md: "block" },
          opacity: 0.8,
        })}
      >
        {label}
      </p>
      <div
        className={css({
          cursor: "pointer",
        })}
        onClick={toggleDropdown}
      >
        <span
          className={css({
            display: "inline-block",
            w: "110px",
            px: 2,
            color: "var(--colors-primary)",
          })}
        >
          {value ? options[value].toUpperCase() : options[0].toUpperCase()}
        </span>
        <span className={`${css({ float: "right" })} ${isOpen ? "open" : ""}`}>
          &#9662;
        </span>
      </div>
      {isOpen && (
        <ul
          className={`tile ${css({
            position: "absolute",
            top: 8,
            py: 1,
            px: 4,
            borderRadius: 6,
            cursor: "pointer",
            boxShadow: "0 0 6px 6px rgba(0,0,0,0.3)",
            animation: "fade-in 0.2s",
            zIndex: 998,
          })}`}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item ${css({ py: 1, textTransform: "capitalize" })}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
