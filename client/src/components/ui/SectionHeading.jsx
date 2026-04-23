import React from "react";

export default function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`mb-10 flex flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-luxury-gold">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl text-luxury-black sm:text-4xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-luxury-black/65 sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
