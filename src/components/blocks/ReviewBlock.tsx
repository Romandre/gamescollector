"use client";
import { useState } from "react";
import Link from "next/link";

// Components
import { StarsRating } from "./StarsRating";
import { DialogPrompt, Overlay } from "../design";

// Contexts
import { useRatings } from "@/context";

// Utils
import { formatDateAndTime } from "@/utils/formatDateAndTime";

// Types
import { Review } from "@/types";

// Styles
import { css } from "../../../styled-system/css";

export function ReviewBlock({
  review,
  myReviewTab,
  showGameTitle,
}: {
  review: Review;
  myReviewTab?: boolean;
  showGameTitle?: boolean;
}) {
  const {
    userReview,
    removeReview,
    setReviewModalActiveView,
    setIsReviewEditMode,
  } = useRatings();
  const labelClass = css({ fontSize: 14, opacity: 0.7 });
  const formattedDate = formatDateAndTime(review.updated_at);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isUserReview = userReview?.id === review.id;

  return (
    <>
      <div
        className={`tile ${css({
          position: "relative",
          display: "flex",
          flexDirection: "column",
          w: "full",
          p: 4,
          textAlign: "left",
          gap: 2,
          zIndex: 1,
        })}`}
      >
        <div className={css({ mb: 2 })}>
          {!myReviewTab && (
            <b
              className={css({
                mr: 2,
                color: !myReviewTab && isUserReview ? "{colors.primary}" : "",
              })}
            >
              {review.profiles.username}
            </b>
          )}
          <i className={labelClass}>{formattedDate}</i>{" "}
        </div>
        <div>
          <StarsRating rating={review.rating * 10} size={21} />
          <span className={labelClass}>({review.rating}/10)</span>
        </div>
        {!!showGameTitle && (
          <div>
            <span className={labelClass}>Game:</span>{" "}
            <Link
              href={`/game/${review.game_id}`}
              className={css({
                color: "{colors.primary}",
                fontWeight: 500,
                opacity: 0.9,
              })}
            >
              {review.game_title}
            </Link>
          </div>
        )}
        <div>
          <span className={labelClass}>Platform:</span> {review.platform}
        </div>
        <div>
          <span className={labelClass}>Comment:</span> {review.comment}
        </div>
        {isUserReview && (
          <div>
            <span
              onClick={() => {
                setReviewModalActiveView(1);
                setIsReviewEditMode(true);
              }}
              className="link"
            >
              edit
            </span>
            <span
              onClick={() => setIsDialogOpen(true)}
              className={`link ${css({ ml: 4 })}`}
            >
              remove
            </span>
          </div>
        )}
      </div>
      {isDialogOpen && removeReview && (
        <>
          <DialogPrompt
            message="Do you really want to remove this review?"
            onConfirm={() => removeReview()}
            onClose={() => setIsDialogOpen(false)}
          />
          <Overlay
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            overflowControl={false}
          />
        </>
      )}
    </>
  );
}
