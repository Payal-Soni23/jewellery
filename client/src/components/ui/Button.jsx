import React from "react";

const variants = {
  primary:
    "bg-luxury-gold text-luxury-black hover:bg-[#d4ba8c] shadow-glow",
  secondary:
    "border border-luxury-line bg-white/70 text-luxury-black hover:border-luxury-gold hover:text-luxury-gold",
  ghost:
    "bg-transparent text-white hover:bg-white/10 border border-white/20",
  dark:
    "bg-luxury-black text-white hover:bg-luxury-charcoal",
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
