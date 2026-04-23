import React from "react";

export default function LazyImage({ src, alt, className = "", ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`h-full w-full object-cover ${className}`}
      {...props}
    />
  );
}
