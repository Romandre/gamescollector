"use client";
import { useFavourite } from "@/hooks";
import { BiCollection, BiSolidCollection } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

import { css } from "../../../styled-system/css";

export function ToggleFavourite({
  gameId,
  userId,
}: {
  gameId: string;
  userId: string;
}) {
  const { isFavourite, toggleFavourite } = useFavourite(gameId, userId);

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
          <BiSolidCollection
            size={34}
            className={css({
              color: "{colors.primary}",
            })}
          />
          <span>In your collection</span>
        </>
      ) : (
        <>
          <div className={css({ position: "relative" })}>
            <BiCollection
              size={34}
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
          <span>Add to collection</span>
        </>
      )}
    </div>
  );
}
