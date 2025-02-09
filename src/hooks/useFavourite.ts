import { useState, useEffect, useCallback } from "react";
import { supabaseClient } from "@/utils/supabase/client";

export function useFavourite(gameId: string, userId: string | undefined) {
  const supabase = supabaseClient();
  const [isAddedToFavourites, setIsAddedToFavourites] = useState(false);

  const checkFavourite = useCallback(async () => {
    if (!gameId || !userId) return;

    const { data, error } = await supabase
      .from("favourites")
      .select(`id`)
      .eq("game_id", gameId)
      .eq("user_id", userId)
      .single();

    if (!error && data) {
      setIsAddedToFavourites(true);
    } else {
      setIsAddedToFavourites(false);
    }
  }, [gameId, userId, supabase]);

  // Check if the item is already in favourites
  useEffect(() => {
    checkFavourite();
  }, [checkFavourite]);

  // Function to toggle favourite status
  const toggleFavourite = useCallback(async () => {
    if (!gameId || !userId) return;

    if (isAddedToFavourites) {
      // Remove from favourites
      const { error } = await supabase
        .from("favourites")
        .delete()
        .match({ game_id: gameId, user_id: userId });

      if (!error) {
        setIsAddedToFavourites(false);
      }
    } else {
      // Add to favourites
      const { error } = await supabase
        .from("favourites")
        .insert([{ game_id: gameId, user_id: userId }]);

      if (!error) {
        setIsAddedToFavourites(true);
      }
    }
  }, [isAddedToFavourites, gameId, userId, supabase]);

  return { isAddedToFavourites, toggleFavourite };
}
