import React from "react";

export default function QuantitySelector({ value, onChange, min = 1 }) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(value + 1);

  return (
    <div className="inline-flex items-center rounded-full border border-luxury-line bg-white p-1 shadow-sm">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-luxury-black transition hover:bg-luxury-pearl"
        onClick={decrease}
      >
        -
      </button>
      <span className="min-w-[3rem] text-center text-sm font-semibold text-luxury-black">
        {value}
      </span>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-luxury-black transition hover:bg-luxury-pearl"
        onClick={increase}
      >
        +
      </button>
    </div>
  );
}
