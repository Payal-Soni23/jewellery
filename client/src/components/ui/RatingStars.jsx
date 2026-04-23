import React from "react";
import { Star } from "lucide-react";

export default function RatingStars({ value = 4.8, reviews }) {
  const normalized = Math.max(0, Math.min(5, Number(value)));

  return (
    <div className="flex items-center gap-2 text-xs text-luxury-black/60">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3.5 w-3.5 ${
              star <= Math.round(normalized)
                ? "fill-luxury-gold text-luxury-gold"
                : "text-luxury-line"
            }`}
          />
        ))}
      </div>
      <span>{normalized.toFixed(1)}</span>
      {reviews ? <span>({reviews})</span> : null}
    </div>
  );
}
