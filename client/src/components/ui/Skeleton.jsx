import React from "react";

export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-shimmer rounded-3xl bg-[linear-gradient(110deg,#f5f0e7,45%,#fff9ef,55%,#f5f0e7)] bg-[length:200%_100%] ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-[28px] border border-luxury-line bg-white p-4 shadow-luxury">
      <Skeleton className="mb-4 aspect-[4/5]" />
      <Skeleton className="mb-3 h-4 w-24" />
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="mb-6 h-4 w-1/2" />
      <Skeleton className="h-11 w-full rounded-full" />
    </div>
  );
}
