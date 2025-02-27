"use client";

// Hooks
import { useFavourite } from "@/hooks";

// Styles
import { css } from "../../../styled-system/css";

// Icons
import { BiCollection, BiSolidCollection } from "react-icons/bi";
import { FaPlus, FaCheck } from "react-icons/fa";

export function ToggleFavourite({
  gameId,
  userId,
  hasText = true,
}: {
  gameId: string;
  userId: string;
  hasText?: boolean;
}) {
  const { isFavourite, toggleFavourite, toggleNote } = useFavourite(
    userId,
    gameId
  );

  return (
    <div
      onClick={toggleFavourite}
      className={css({
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: 11,
        fontWeight: 500,
        lineHeight: 1.2,
        gap: 1,
        cursor: "pointer",
      })}
    >
      {isFavourite ? (
        <>
          <div className={css({ position: "relative" })}>
            <BiSolidCollection
              size={32}
              className={css({
                color: "{colors.primary}",
              })}
            />
            <FaCheck
              size={10}
              className={css({
                position: "absolute",
                color: "{colors.primary}",
                top: 0,
                right: "-4px",
              })}
            />
          </div>
          {!!hasText && <span>In my collection</span>}
        </>
      ) : (
        <>
          <div className={css({ position: "relative" })}>
            <BiCollection
              size={32}
              className={css({
                color: "{colors.primary}",
              })}
            />
            <FaPlus
              size={10}
              className={css({
                position: "absolute",
                color: "{colors.primary}",
                top: "1px",
                right: "-4px",
              })}
            />
          </div>
          {!!hasText && <span>Add to collection</span>}
        </>
      )}
      {!!toggleNote.length &&
        toggleNote.map((note) => (
          <span
            key={note.id}
            className={css({
              position: "absolute",
              top: -3,
              color: "{colors.primary}",
              fontSize: 14,
              textShadow: "1px 1px 2px rgba(0,0,0,.25)",
              animation: "float-up 1.4s",
            })}
          >
            {note.text}
          </span>
        ))}
    </div>
  );
}
