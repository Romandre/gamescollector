"use client";
import { useEffect, useState } from "react";

// Components
import { Input, Overlay, SectionTitle } from "./design";

// Utils
import { getYearsArray } from "@/utils/yearsArray";

// Styles
import { css } from "../../styled-system/css";

// Icons
import { IoFilter } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FilterOptions } from "@/types";

const allYears = getYearsArray();

export function GameFilters() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <>
      <div
        className={css({
          position: "relative",
          transform: { sm: "translate3d(0,0,0)" },
        })}
      >
        <Overlay isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen} />
        <IoFilter
          onClick={() => setIsFiltersOpen(true)}
          className={css({
            position: "absolute",
            display: { base: "display", lg: "none" },
            mx: 1,
            fontSize: 26,
          })}
        />

        <div
          className={`filters ${css({
            position: "fixed",
            display: { base: isFiltersOpen ? "block" : "none", lg: "block" },
            left: 0,
            w: { base: "70%", sm: "full" },
            h: "full",
            top: { base: 0, lg: "unset" },
            py: { base: "72px", lg: 0 },
            px: { base: 4, lg: 2 },
            animation: "fade-in 0.4s",
            zIndex: { base: 998, lg: "unset" },
          })}`}
        >
          <SectionTitle
            className={css({ display: { base: "none", lg: "block" } })}
          >
            Filters
          </SectionTitle>
          <div
            className={css({
              display: "flex",
              gap: 2,
              py: 2,
              pr: 2,
              alignItems: "start",
              flexDirection: "column",
            })}
          >
            <Filter type="year" options={allYears} />
            <Filter type="genre" options={allYears} />
            <Filter type="platform" options={allYears} />
            <Filter type="company" options={allYears} />
          </div>
        </div>
      </div>
    </>
  );
}

const Filter = ({
  type,
  options,
}: {
  type: string;
  options: FilterOptions;
}) => {
  const [availableOptions, setAvailableOptions] = useState<FilterOptions>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const filterHeight = 50;
  const chevronClass = {
    position: "absolute",
    h: "full",
    top: 0,
    right: 2,
    color: "#AAAAAA",
    fontSize: 22,
    cursor: "pointer",
  };

  useEffect(() => {
    setAvailableOptions(options);
  }, [options]);

  const handleChange = (value: string) => {
    const filteredOptions = options.filter((option) => option.includes(value));
    setValue(value);

    if (!value.trim()) setIsOpen(false);

    if (value && filteredOptions.length) {
      setAvailableOptions(filteredOptions);
      setIsOpen(true);
    } else {
      setAvailableOptions(options);
      setIsOpen(false);
    }
  };

  return (
    <div className={css({ position: "relative", w: "full", h: "full", my: 3 })}>
      <Input
        value={value}
        className={`search ${css({ w: "full", h: `${filterHeight}px`, pl: 2, pr: 10 })}`}
        onChange={(val) => handleChange(val)}
        placeholder="Enter year"
      />
      <span
        className={`filters ${css({
          position: "absolute",
          top: -2,
          left: 0,
          px: 1,
          fontSize: 14,
          textTransform: "capitalize",
          borderRadius: "0 0 6px 0",
          opacity: 0.8,
        })}`}
      >
        {type}
      </span>
      {isOpen ? (
        <RxCross2
          className={css(chevronClass)}
          onClick={() => {
            setIsOpen(false);
          }}
        />
      ) : (
        <IoChevronDown
          className={css(chevronClass)}
          onClick={() => {
            setIsOpen(true);
          }}
        />
      )}
      {isOpen && (
        <ul
          className={`tile ${css({
            position: "absolute",
            top: `${filterHeight}px`,
            w: "full",
            h: "210px",
            py: 1,
            px: 4,
            boxShadow: "0 10px 14px rgba(0,0,0,.4)",
            animation: "fade-in 0.2s",
            overflowY: "scroll",
            cursor: "pointer",
            zIndex: 1,
          })}`}
        >
          {availableOptions.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item ${css({ py: 2, textTransform: "capitalize" })}`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
