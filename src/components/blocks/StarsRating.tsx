export const StarsRating = ({
  rating,
  size,
  className,
}: {
  rating: number | undefined;
  size?: number;
  className?: string;
}) => {
  if (!rating) return;

  const style: React.CSSProperties = {
    ["--star-size" as string]: `${size}px` || "18px",
    ["--rating" as string]: Math.round((rating / 20) * 10) / 10,
  };

  if (isNaN(rating) || rating === 0) return false;
  return <div className={`stars ${className}`} style={style}></div>;
};
