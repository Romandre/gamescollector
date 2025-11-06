"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { supabaseClient } from "@/utils/supabase/client";
import type { AverageRating, ComplexMessage, Review } from "@/types";

interface RatingsContextType {
  userReview?: Review;
  getReviews: (target: "user" | "other" | "all") => Promise<Review[]>;
  addReview: (
    rating: number,
    platform: string,
    comment: string,
    gameTitle: string
  ) => Promise<void>;
  updateReview: (
    rating: number,
    platform: string,
    comment: string
  ) => Promise<void>;
  removeReview: () => Promise<void>;
  getAverageGameRating: () => Promise<AverageRating | null>;
  message: ComplexMessage | null;
  isLoading: boolean;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (val: boolean) => void;
  reviewModalActiveView: 1 | 2;
  setReviewModalActiveView: (val: 1 | 2) => void;
  isReviewEditMode: boolean;
  setIsReviewEditMode: (val: boolean) => void;
}

const RatingsContext = createContext<RatingsContextType | undefined>(undefined);

export const RatingsProvider = ({
  children,
  userId,
  gameId,
}: {
  children: React.ReactNode;
  userId?: string;
  gameId?: string;
}) => {
  const supabase = useMemo(() => supabaseClient(), []);
  const [userReview, setUserReview] = useState<Review | undefined>();
  const [message, setMessage] = useState<ComplexMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewModalActiveView, setReviewModalActiveView] = useState<1 | 2>(1);
  const [isReviewEditMode, setIsReviewEditMode] = useState(false);

  const getReview = useCallback(async () => {
    if (!userId || !gameId) return undefined;
    const { data, error } = await supabase
      .from("ratings")
      .select("*")
      .eq("user_id", userId)
      .eq("game_id", gameId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }, [gameId, userId, supabase]);

  const checkUserReview = useCallback(async () => {
    if (!userId || !gameId) return;
    setIsLoading(true);

    try {
      const data = await getReview();
      setUserReview(data);
    } catch (error) {
      setMessage({
        text: "Game rating cannot be retrieved. Try again later.",
        type: "error",
      });
      console.error("Error checking game rating:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getReview, gameId, userId]);

  useEffect(() => {
    checkUserReview();
  }, [checkUserReview]);

  const getReviews = useCallback(
    async (target: "user" | "other" | "all") => {
      if (target === "user" && !userId) return [];

      setIsLoading(true);

      try {
        let query = supabase
          .from("ratings")
          .select("*, profiles(username)")
          .order("created_at", { ascending: false });

        if (target === "user") {
          query = query.eq("user_id", userId);
        } else if (target === "other" && userId) {
          query = query.neq("user_id", userId);
        }

        if (gameId) {
          query = query.eq("game_id", gameId);
        }

        const { data, error } = await query;

        if (error) throw error;

        if (data.length > 1) {
          const dataSortedByDate = data.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );
          return dataSortedByDate;
        }

        return data;
      } catch (error) {
        setMessage({
          text: "Reviews cannot be retrieved. Try again later.",
          type: "error",
        });
        console.error("Error retrieving reviews:", error);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [gameId, userId, supabase]
  );

  const addReview = async (
    rating: number,
    platform: string,
    comment: string,
    gameTitle: string
  ) => {
    if (!userId || !gameId) return;

    if (!rating) {
      setMessage({ text: "Review must have rating value.", type: "error" });
      return;
    }

    setIsLoading(true);

    // Check if user already has a review for the current game
    const review = await getReview();
    if (review) {
      setMessage({
        text: "It seems that you already reviewed this game.",
        type: "warn",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from("ratings").insert([
        {
          user_id: userId,
          game_id: gameId,
          game_title: gameTitle,
          rating,
          platform,
          comment,
        },
      ]);

      if (error) throw error;

      const newReview = await getReview(); // Fetch the new review from the database
      setUserReview(newReview); // Update state with the newly added review
      setMessage({ text: "The review added successfuly!", type: "success" });
      setTimeout(() => {
        setMessage(null);
      }, 6000);
    } catch (error) {
      setMessage({
        text: "Something wrong happened while saving review. Try again later.",
        type: "error",
      });
      console.error("Error adding review:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const updateReview = async (
    rating: number,
    platform: string,
    comment: string
  ) => {
    if (!userId || !gameId || !userReview) return;

    if (!rating) {
      setMessage({ text: "Review must have rating value.", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("ratings").upsert([
        {
          id: userReview.id,
          user_id: userReview.user_id,
          game_id: userReview.game_id,
          rating,
          platform,
          comment,
        },
      ]);

      if (error) throw error;

      const newReview = await getReview(); // Fetch the new review from the database
      setUserReview(newReview); // Update state with the newly added review
      setMessage({ text: "The review updated successfuly!", type: "success" });
      setTimeout(() => {
        setMessage(null);
      }, 6000);
    } catch (error) {
      setMessage({
        text: "Something wrong happened while updating review. Try again later.",
        type: "error",
      });
      console.error("Error updating review:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const removeReview = async () => {
    if (!userId || !gameId) return;

    try {
      const { error } = await supabase
        .from("ratings")
        .delete()
        .eq("user_id", userId)
        .eq("game_id", gameId);

      if (error) throw error;
      setUserReview(undefined);
      setMessage({ text: "Review was removed successfuly!", type: "success" });
      setTimeout(() => {
        setMessage(null);
      }, 6000);
    } catch (error) {
      setMessage({
        text: "Something wrong happened while removing review. Try again later.",
        type: "error",
      });
      console.error("Error removing review:", error);
    }
  };

  const getAverageGameRating = async () => {
    if (!gameId) return null;

    try {
      const { data, error } = await supabase
        .from("ratings")
        .select("rating")
        .eq("game_id", gameId);

      if (error) throw error;

      if (!data || data.length === 0) return null;

      const totalRatings = data.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRatings / data.length;
      return { average: averageRating, count: data.length };
    } catch (error) {
      console.error("Error fetching average rating:", error);
      return { average: 0, count: 0 };
    }
  };

  return (
    <RatingsContext.Provider
      value={{
        userReview,
        getReviews,
        addReview,
        updateReview,
        removeReview,
        getAverageGameRating,
        message,
        isLoading,
        isReviewModalOpen,
        setIsReviewModalOpen,
        reviewModalActiveView,
        setReviewModalActiveView,
        isReviewEditMode,
        setIsReviewEditMode,
      }}
    >
      {children}
    </RatingsContext.Provider>
  );
};

export const useRatings = () => {
  const context = useContext(RatingsContext);
  if (!context) {
    throw new Error("useRatings must be used within a RatingsProvider");
  }
  return context;
};
