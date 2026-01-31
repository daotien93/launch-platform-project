export const RatingStars = ({ rating }: { rating?: number | null }) => {
  if (rating == null) return null;
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1 text-xs text-yellow-300">
      <span>
        {"★".repeat(full)}
        {"☆".repeat(5 - full)}
      </span>
      <span className="text-neutral-400">({rating.toFixed(1)})</span>
    </div>
  );
};

