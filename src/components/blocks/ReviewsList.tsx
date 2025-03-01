"use client";
import { useEffect, useState } from "react";

// Context
import { useRatings } from "@/context";

// Components
import { ReviewBlock } from "./ReviewBlock";
import Skeleton from "react-loading-skeleton";

// Types
import { Review } from "@/types";

// Styles
import { css } from "../../../styled-system/css";

export function ReviewsList({ forWho }: { forWho: "user" | "other" | "all" }) {
  const { getReviews } = useRatings();
  const [reviews, setReviews] = useState<Review[] | undefined>();

  useEffect(() => {
    const loadAllReviews = async () => {
      const [all] = await Promise.all([getReviews(forWho)]);

      setReviews(all);
    };

    loadAllReviews();
  }, [getReviews, setReviews, forWho]);

  return reviews ? (
    reviews?.map((review) => (
      <ReviewBlock
        key={review.id}
        review={review}
        showGameTitle={true}
        myReviewTab={forWho === "user"}
      />
    ))
  ) : (
    <PannelLoader count={6} />
  );
}

const PannelLoader = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className={css({ aspectRatio: 5 / 3 })} />
      ))}
    </>
  );
};
