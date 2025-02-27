import { useState, useEffect, useCallback, ReactNode } from "react";
import { supabaseClient } from "@/utils/supabase/client";

export function useFavourite(
  userId: string | null | undefined,
  gameId?: string
) {
  const supabase = supabaseClient();
  const [isFavourite, setIsFavourite] = useState(false);
  const [isCollectionLoading, setIsCollectionLoading] = useState(true);
  const [message, setMessage] = useState("");
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
    if (gameId) {
      checkIfFavorite();
    }
  }, [gameId, checkIfFavorite]);

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

  const getCollection = async () => {
    setIsCollectionLoading(true);
    try {
      const { data, error } = await supabase
        .from("favourites")
        .select(`*`)
        .eq("user_id", userId);

      if (error) {
        setMessage(
          "Error occured on retrieving your collection. Try again later."
        );
        console.error(error);
      }

      if (data && !data.length) {
        setMessage("You don't have any games in your collection.");
      }

      if (data && data.length) {
        return data;
      } else {
        return [];
      }
    } catch (error) {
      setMessage("Something went wrong. Try again later.");
      console.error(error);
      return [];
    } finally {
      setIsCollectionLoading(false);
    }
  };

  return {
    isFavourite,
    toggleFavourite,
    toggleNote,
    message,
    isCollectionLoading,
    getCollection,
  };
}
