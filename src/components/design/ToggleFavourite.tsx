"use client";
import { useAuthContext } from "@/context";
import { useFavourite } from "@/hooks";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { css } from "../../../styled-system/css";

export function ToggleFavourite({ gameId }: { gameId: string }) {
  const { userId } = useAuthContext();
  const { isAddedToFavourites, toggleFavourite } = useFavourite(gameId, userId);

  return isAddedToFavourites ? (
    <IoMdHeart
      size={28}
      className={css({ justifySelf: "center", cursor: "pointer" })}
      onClick={toggleFavourite}
    />
  ) : (
    <IoMdHeartEmpty
      size={28}
      className={css({ justifySelf: "center", cursor: "pointer" })}
      onClick={toggleFavourite}
    />
  );
}
