"use client";

// Components
import { Input } from "./Input";
import { CircleLoader } from "./CircleLoader";

// Hooks
import { useEffect, useRef } from "react";

// Styles
import { css } from "../../../styled-system/css";

// Icons
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export function Select({
  options,
  inputValue,
  inputName,
  inputLabel,
  inputHeight,
  onInputChange,
  onOptionClick,
  isOpen,
  setIsOpen,
  isLoading,
  isSorted,
  required,
}: {
  options: string[];
  inputValue: string;
  inputName?: string;
  inputLabel: string;
  inputHeight: number;
  onInputChange: (value: string) => void;
  onOptionClick: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLoading?: boolean;
  isSorted?: boolean;
  required?: boolean;
}) {
  const selectRef = useRef(null);
  const chevronClass = css({
    position: "absolute",
    h: "full",
    top: 0,
    right: 2,
    color: "#AAAAAA",
    fontSize: 22,
    cursor: "pointer",
  });

  // Close select when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // @ts-expect-error contains can't be used for 'never'
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div ref={selectRef} className={css({ position: "relative" })}>
      <Input
        value={inputValue}
        name={inputName}
        label={inputLabel}
        placeholder={`Enter ${inputLabel}`}
        className={css({ w: "full", h: `${inputHeight}px`, pl: 2, pr: 10 })}
        onChange={(val: string) => onInputChange(val)}
        onClick={() => setIsOpen(true)}
        required={required}
      />
      {!!inputValue ? (
        <RxCross2
          className={chevronClass}
          onClick={() => {
            onOptionClick("");
          }}
        />
      ) : isOpen ? (
        <IoChevronUp
          className={chevronClass}
          onClick={() => {
            setIsOpen(false);
          }}
        />
      ) : (
        <IoChevronDown
          className={chevronClass}
          onClick={() => {
            setIsOpen(true);
          }}
        />
      )}
      {isOpen && (
        <ul
          className={`tile ${css({
            position: "absolute",
            top: `${inputHeight}px`,
            w: "full",
            maxH: "210px",
            py: 1,
            px: 4,
            boxShadow: "0 14px 12px rgba(0,0,0,.4)",
            animation: "fade-in 0.1s",
            overflowY: "auto",
            zIndex: 1,
          })}`}
        >
          {isLoading ? (
            <CircleLoader />
          ) : (
            options
              .sort(isSorted ? () => 0 : undefined)
              .map((option, index) => (
                <li
                  key={index}
                  className={`dropdown-item ${css({
                    py: 2,
                    textTransform: "capitalize",
                    cursor: "pointer",
                  })}`}
                  onClick={() => onOptionClick(option)}
                >
                  {option}
                </li>
              ))
          )}
        </ul>
      )}
    </div>
  );
}
