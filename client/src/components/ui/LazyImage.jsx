import React, { useEffect, useState } from "react";
import { PLACEHOLDER_PRODUCT_IMAGE } from "../../utils/product";

export default function LazyImage({ src, alt, className = "", onError, ...props }) {
  const [imageSrc, setImageSrc] = useState(src || PLACEHOLDER_PRODUCT_IMAGE);

  useEffect(() => {
    setImageSrc(src || PLACEHOLDER_PRODUCT_IMAGE);
  }, [src]);

  const handleError = (event) => {
    if (imageSrc !== PLACEHOLDER_PRODUCT_IMAGE) {
      setImageSrc(PLACEHOLDER_PRODUCT_IMAGE);
    }

    onError?.(event);
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      className={`h-full w-full object-cover ${className}`}
      onError={handleError}
      {...props}
    />
  );
}
