"use client";
import { useFavourite } from "@/hooks";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
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
        <IoMdHeart
          size={34}
          className={css({
            color: "{colors.primary}",
          })}
        />
      ) : (
        <IoMdHeartEmpty
          size={34}
          className={css({
            color: "{colors.primary}",
          })}
        />
      )}
    </div>
  );
}
