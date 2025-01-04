export const StarsRating = ({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) => {
  const style: React.CSSProperties = {
    ["--rating" as string]: Math.round((rating / 20) * 10) / 10,
  };

  if (isNaN(rating) || rating === 0) return false;
  return <div className={`stars ${className}`} style={style}></div>;
};
