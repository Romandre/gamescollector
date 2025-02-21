import { useState, useEffect, useCallback, ReactNode } from "react";
import { supabaseClient } from "@/utils/supabase/client";

export function useFavourite(gameId: string, userId: string | null) {
  const supabase = supabaseClient();
  const [isFavourite, setIsFavourite] = useState(false);
  const [toggleNote, setToggleNote] = useState<
    { id: number; text: ReactNode }[]
  >([]);

  const checkIfFavorite = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("user_id", userId)
        .eq("game_id", gameId)
        .maybeSingle();

      if (error) throw error;
      setIsFavourite(!!data);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  }, [gameId, userId, supabase]);

  useEffect(() => {
    checkIfFavorite();
  }, [checkIfFavorite]);

  const toggleFavourite = async () => {
    setIsFavourite(true);

    try {
      if (isFavourite) {
        // Remove from favorites
        const { error } = await supabase
          .from("favourites")
          .delete()
          .eq("user_id", userId)
          .eq("game_id", gameId);

        if (error) throw error;
        setIsFavourite(false);
      } else {
        // Add to favorites
        const { error } = await supabase.from("favourites").insert([
          {
            user_id: userId,
            game_id: gameId,
          },
        ]);

        if (error) throw error;
        setIsFavourite(true);
      }
      toggleAnimation();
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Error updating favorites");
    }
  };

  const toggleAnimation = () => {
    const newElement = {
      id: Date.now(),
      text: isFavourite ? "Removed" : "Added",
    };
    setToggleNote((prev) => [...prev, newElement]);

    setTimeout(() => {
      setToggleNote((prev) => prev.filter((el) => el.id !== newElement.id));
    }, 1000);
  };

  return { isFavourite, toggleFavourite, toggleNote };
}
