"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

// Components
import { Input, Overlay, SectionTitle, Button } from "./design";
import Skeleton from "react-loading-skeleton";

// Hooks
import { useQuery } from "@tanstack/react-query";

// Context
import { useGamesContext } from "@/context";

// Utils
import { getYearsArray } from "@/utils/yearsArray";
import { convertToPlural, getYearTimestamps } from "@/utils/filtersFormatter";

// Types
import { FilterOptions, FilterTypes } from "@/types";

// Styles
import { css } from "../../styled-system/css";

// Icons
import { IoFilter, IoChevronUp, IoChevronDown } from "react-icons/io5";
import { RxCross2, RxCrossCircled } from "react-icons/rx";

const fetchFilterOptions = async (type: FilterTypes, input: string) => {
  const pluralizedType = convertToPlural(type);
  const filterCondition = input ? `& name ~ *"${input}"*` : "";
  const queryCondition = `where name !~ *"archive"* ${filterCondition};`;
  const query = `query ${pluralizedType} "Options" { fields id, name; ${queryCondition} limit 500; };`;
  const response = await axios.get("/api/filters", { params: { query } });
  return response.data;
};

const allYears = getYearsArray();

export function GameFilters() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { isSortingLoading, filterInputs, resetFilters } = useGamesContext();
  const activeFiltersNum = Object.values(filterInputs).filter(
    (value) => value !== ""
  ).length;

  return (
    <>
      <div
        className={css({
          position: "relative",
          transform: { lg: "translate3d(0,0,0)" },
        })}
      >
        <Overlay isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen} />
        <div
          className={css({
            position: "absolute",
            display: { base: "block", lg: "none" },
            mt: { base: 0, md: "3px" },
          })}
        >
          {isSortingLoading ? (
            <Skeleton width={50} className={css({ ml: { base: 0, md: 2 } })} />
          ) : (
            <div
              className={css({ position: "relative", cursor: "pointer" })}
              onClick={() => setIsFiltersOpen(true)}
            >
              <IoFilter
                className={css({
                  mx: 1,
                  fontSize: 26,
                })}
              />
              {!!activeFiltersNum && (
                <span
                  className={css({
                    position: "absolute",
                    display: "flex",
                    top: 0,
                    right: 0,
                    w: 4,
                    h: 4,
                    fontSize: 10,
                    justifyContent: "center",
                    bg: "{colors.primary}",
                    borderRadius: "10px",
                    userSelect: "none",
                  })}
                >
                  {activeFiltersNum}
                </span>
              )}
            </div>
          )}
        </div>

        <div
          className={`filters ${css({
            position: "fixed",
            display: { base: isFiltersOpen ? "block" : "none", lg: "block" },
            left: 0,
            w: { base: "70%", lg: "full" },
            maxW: "400px",
            h: "full",
            top: { base: 0, lg: "unset" },
            py: { base: "72px", lg: 0 },
            pl: { base: 4, lg: 2 },
            px: 4,
            animation: "fade-in 0.3s",
            zIndex: { base: 998, lg: "unset" },
          })}`}
        >
          <div className={css({ display: { base: "none", lg: "block" } })}>
            {isSortingLoading ? (
              <Skeleton width={100} height={30} className={css({ mt: 1 })} />
            ) : (
              <SectionTitle>Filters</SectionTitle>
            )}
          </div>

          <div
            className={css({
              display: "flex",
              gap: 8,
              py: 5,
              alignItems: "start",
              flexDirection: "column",
            })}
          >
            <Filter type="year" options={allYears} />
            <Filter type="genre" />
            <Filter type="platform" />
            <Filter type="company" />
            <Button
              className={css({ display: { base: "block", lg: "none" } })}
              onClick={() => setIsFiltersOpen(false)}
            >
              Apply
            </Button>
            {!!Object.values(filterInputs).some((item) => !!item) && (
              <span
                className={css({
                  display: "flex",
                  alignItems: "center",
                  color: "var(--colors-primary)",
                  cursor: "pointer",
                })}
                onClick={resetFilters}
              >
                <RxCrossCircled className={css({ mr: 2, fontSize: 24 })} />{" "}
                Clear all filters
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const filterHeight = 50;
const Filter = ({
  type,
  options,
}: {
  type: FilterTypes;
  options?: string[];
}) => {
  const isYear = type === "year";
  const [availableOptions, setAvailableOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { handleFilter, filterInputs, setFilterInputs, isSortingLoading } =
    useGamesContext();
  const filterRef = useRef(null);
  const contextFilterValue = filterInputs[type];
  const filterId = `${type}-filter`;

  const chevronClass = {
    position: "absolute",
    h: "full",
    top: 0,
    right: 2,
    color: "#AAAAAA",
    fontSize: 22,
    cursor: "pointer",
  };

  const { data, isLoading /* isError, error */ } = useQuery({
    queryKey: ["game", filterId, inputValue],
    queryFn: () => fetchFilterOptions(type, inputValue),
    enabled: !options,
  });

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (options) {
      const filteredOptions = options.filter((option) =>
        option.includes(value)
      );

      if (!value.trim()) setIsOpen(false);

      if (value && filteredOptions.length) {
        setAvailableOptions(filteredOptions);
        setIsOpen(true);
      } else {
        setAvailableOptions(options);
        setIsOpen(false);
      }
    }
  };

  const applyFilter = (value: string) => {
    setFilterInputs({ ...filterInputs, [type]: value });
    setIsOpen(false);

    let gamesFilter = "";
    if (value) {
      if (isYear) {
        const timestamps = getYearTimestamps(value);
        gamesFilter = `first_release_date > ${timestamps.startOfYear} & first_release_date < ${timestamps.endOfYear}`;
      } else {
        const isCompany = type === "company";
        const pluralizedType = isCompany
          ? "involved_companies.company"
          : convertToPlural(type);
        gamesFilter = `${pluralizedType} = (${data.find((item: FilterOptions) => item.name === value).id})`;
      }
    }

    handleFilter(type, gamesFilter);
  };

  useEffect(() => {
    if (options) setAvailableOptions(options);
    if (data) {
      setAvailableOptions(data.map((filter: FilterOptions) => filter.name));
    }
  }, [options, data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // @ts-expect-error contains can't be used for 'never'
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setInputValue(contextFilterValue);
  }, [contextFilterValue]);

  return (
    <div
      id={filterId}
      ref={filterRef}
      className={css({ position: "relative", w: "full", h: "full" })}
    >
      {isSortingLoading ? (
        <Skeleton height={filterHeight} />
      ) : (
        <>
          <Input
            value={inputValue || contextFilterValue}
            label={type}
            placeholder={`Enter ${type}`}
            className={`search ${css({ w: "full", h: `${filterHeight}px`, pl: 2, pr: 10 })}`}
            onChange={(val) => handleInputChange(val)}
            onClick={() => setIsOpen(true)}
          />
          {!!inputValue || !!contextFilterValue ? (
            <RxCross2
              className={css(chevronClass)}
              onClick={() => {
                applyFilter("");
              }}
            />
          ) : isOpen ? (
            <IoChevronUp
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
                maxH: "210px",
                py: 1,
                px: 4,
                boxShadow: "0 14px 12px rgba(0,0,0,.4)",
                animation: "fade-in 0.1s",
                overflowY: "scroll",
                zIndex: 1,
              })}`}
            >
              {isLoading ? (
                <li>
                  <Skeleton className={css({ my: 2 })} />
                </li>
              ) : (
                availableOptions
                  .sort(!isYear ? undefined : () => 0)
                  .map((option, index) => (
                    <li
                      key={index}
                      className={`dropdown-item ${css({
                        py: 2,
                        textTransform: "capitalize",
                        cursor: "pointer",
                      })}`}
                      onClick={() => applyFilter(option)}
                    >
                      {option}
                    </li>
                  ))
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
