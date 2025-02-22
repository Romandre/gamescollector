"use client";

import { useState, useRef, useEffect } from "react";
import { css } from "../../../styled-system/css";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";

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
    const handleClickOutside = (event: MouseEvent) => {
      // @ts-expect-error contains can't be used for 'never'
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
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        })}
        onClick={toggleDropdown}
      >
        <span
          className={css({
            display: "inline-block",
            verticalAlign: "bottom",
            w: "108px",
            px: 2,
            color: "var(--colors-primary)",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          })}
        >
          {value ? options[value].toUpperCase() : options[0].toUpperCase()}
        </span>
        {isOpen ? (
          <IoChevronUp className={css({ float: "right" })} />
        ) : (
          <IoChevronDown className={css({ float: "right" })} />
        )}
      </div>
      {isOpen && (
        <ul
          className={`tile ${css({
            position: "absolute",
            top: 8,
            right: { base: 0, md: "unset" },
            minW: "160px",
            py: 2,
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
              className={`dropdown-item ${css({ py: 1, px: 4, textTransform: "capitalize" })}`}
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
