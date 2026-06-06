"use client";

import React from "react";

interface LogoProps {
  className?: string;
  variant?: "vertical" | "horizontal" | "monogram";
  color?: string; // e.g. "text-forest" or "text-cream"
}

export default function Logo({ className = "w-auto h-12", variant = "vertical", color = "text-forest" }: LogoProps) {
  // Brand Colors:
  // Olive Green / Forest: #40513B / #1E3A2F
  // Sand / Gold: #B88E56 / #C4A882
  
  if (variant === "monogram") {
    return (
      <svg
        viewBox="0 0 240 240"
        className={`${className} ${color}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Monogram Monolith group */}
        <g>
          {/* Letter D */}
          <text
            x="30"
            y="150"
            fontFamily="var(--font-display), 'Playfair Display', serif"
            fontSize="150"
            fontWeight="300"
            fill="currentColor"
            letterSpacing="-0.05em"
          >
            D
          </text>
          
          {/* Letter B */}
          <text
            x="105"
            y="210"
            fontFamily="var(--font-display), 'Playfair Display', serif"
            fontSize="140"
            fontWeight="300"
            fill="currentColor"
            letterSpacing="-0.02em"
          >
            B
          </text>

          {/* Elegant Hand-drawn Botanical sprig wrapping D */}
          <g className="stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Main stem */}
            <path d="M 35 180 C 25 150, 40 100, 95 80" />
            <path d="M 35 180 C 15 170, 8 160, 5 155" />
            
            {/* Leaf 1 (bottom left) */}
            <path d="M 28 175 C 10 178, 5 170, 15 162 C 22 165, 25 170, 28 175 Z" fill="currentColor" fillOpacity="0.05" />
            {/* Leaf 2 (left mid) */}
            <path d="M 24 150 C 5 145, 0 135, 12 125 C 20 130, 22 140, 24 150 Z" fill="currentColor" fillOpacity="0.05" />
            {/* Leaf 3 (left upper) */}
            <path d="M 32 125 C 15 110, 18 98, 32 95 C 38 105, 36 115, 32 125 Z" fill="currentColor" fillOpacity="0.05" />
            {/* Leaf 4 (inner stem) */}
            <path d="M 50 107 C 40 85, 48 78, 58 88 C 58 98, 54 103, 50 107 Z" fill="currentColor" fillOpacity="0.05" />
            {/* Leaf 5 (top) */}
            <path d="M 72 90 C 65 70, 75 60, 82 72 C 82 80, 78 85, 72 90 Z" fill="currentColor" fillOpacity="0.05" />
            {/* Leaf 6 (top-most branch tip) */}
            <path d="M 95 80 C 98 65, 110 65, 102 75 C 98 80, 96 80, 95 80 Z" fill="currentColor" fillOpacity="0.05" />
            
            {/* Small leaves on the stem */}
            <path d="M 54 135 C 65 142, 68 152, 60 158 C 54 152, 52 142, 54 135 Z" fill="currentColor" fillOpacity="0.05" />
            <path d="M 68 118 C 78 122, 82 132, 75 138 C 68 132, 66 124, 68 118 Z" fill="currentColor" fillOpacity="0.05" />
          </g>
        </g>
      </svg>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className={`flex items-center gap-3 ${color} ${className}`}>
        {/* Monogram component inline */}
        <svg
          viewBox="0 0 240 240"
          className="h-10 w-10 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g>
            <text
              x="25"
              y="155"
              fontFamily="var(--font-display), 'Playfair Display', serif"
              fontSize="160"
              fontWeight="300"
              fill="currentColor"
              letterSpacing="-0.05em"
            >
              D
            </text>
            <text
              x="105"
              y="215"
              fontFamily="var(--font-display), 'Playfair Display', serif"
              fontSize="145"
              fontWeight="300"
              fill="currentColor"
              letterSpacing="-0.02em"
            >
              B
            </text>
            <g className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 35 180 C 25 150, 40 100, 95 80" />
              <path d="M 35 180 C 15 170, 8 160, 5 155" />
              <path d="M 28 175 C 10 178, 5 170, 15 162 C 22 165, 25 170, 28 175 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M 24 150 C 5 145, 0 135, 12 125 C 20 130, 22 140, 24 150 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M 32 125 C 15 110, 18 98, 32 95 C 38 105, 36 115, 32 125 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M 50 107 C 40 85, 48 78, 58 88 C 58 98, 54 103, 50 107 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M 72 90 C 65 70, 75 60, 82 72 C 82 80, 78 85, 72 90 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M 95 80 C 98 65, 110 65, 102 75 C 98 80, 96 80, 95 80 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M 54 135 C 65 142, 68 152, 60 158 C 54 152, 52 142, 54 135 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M 68 118 C 78 122, 82 132, 75 138 C 68 132, 66 124, 68 118 Z" fill="currentColor" fillOpacity="0.05" />
            </g>
          </g>
        </svg>
        <div className="flex flex-col">
          <span className="font-display text-lg font-medium uppercase tracking-[0.25em] leading-none">
            Daily Bloomm
          </span>
          <span className="mt-0.5 font-body text-[9px] uppercase tracking-[0.35em] opacity-60 text-terra">
            Organic Soaps
          </span>
        </div>
      </div>
    );
  }

  // Default: vertical lockup (matches the user's shared design exactly)
  return (
    <div className={`flex flex-col items-center text-center ${color} ${className}`}>
      {/* Monogram Group */}
      <svg
        viewBox="0 0 240 240"
        className="h-32 w-32 md:h-40 md:w-40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g>
          <text
            x="25"
            y="155"
            fontFamily="var(--font-display), 'Playfair Display', serif"
            fontSize="160"
            fontWeight="300"
            fill="currentColor"
            letterSpacing="-0.05em"
          >
            D
          </text>
          <text
            x="105"
            y="215"
            fontFamily="var(--font-display), 'Playfair Display', serif"
            fontSize="145"
            fontWeight="300"
            fill="currentColor"
            letterSpacing="-0.02em"
          >
            B
          </text>
          
          <g className="stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 35 180 C 25 150, 40 100, 95 80" />
            <path d="M 35 180 C 15 170, 8 160, 5 155" />
            <path d="M 28 175 C 10 178, 5 170, 15 162 C 22 165, 25 170, 28 175 Z" fill="currentColor" fillOpacity="0.05" />
            <path d="M 24 150 C 5 145, 0 135, 12 125 C 20 130, 22 140, 24 150 Z" fill="currentColor" fillOpacity="0.05" />
            <path d="M 32 125 C 15 110, 18 98, 32 95 C 38 105, 36 115, 32 125 Z" fill="currentColor" fillOpacity="0.05" />
            <path d="M 50 107 C 40 85, 48 78, 58 88 C 58 98, 54 103, 50 107 Z" fill="currentColor" fillOpacity="0.05" />
            <path d="M 72 90 C 65 70, 75 60, 82 72 C 82 80, 78 85, 72 90 Z" fill="currentColor" fillOpacity="0.05" />
            <path d="M 95 80 C 98 65, 110 65, 102 75 C 98 80, 96 80, 95 80 Z" fill="currentColor" fillOpacity="0.05" />
            <path d="M 54 135 C 65 142, 68 152, 60 158 C 54 152, 52 142, 54 135 Z" fill="currentColor" fillOpacity="0.05" />
            <path d="M 68 118 C 78 122, 82 132, 75 138 C 68 132, 66 124, 68 118 Z" fill="currentColor" fillOpacity="0.05" />
          </g>
        </g>
      </svg>

      {/* Main Title: DAILY BLOOMM */}
      <h1 className="mt-2 font-display text-2xl md:text-3.5xl font-normal tracking-[0.22em] uppercase leading-none">
        Daily Bloomm
      </h1>

      {/* Sub-Separator: ORGANIC SOAPS with lines */}
      <div className="mt-4 flex w-full max-w-[280px] items-center gap-3">
        <span className="h-px flex-1 bg-bark/20 opacity-70" />
        <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold text-terra">
          Organic Soaps
        </span>
        <span className="h-px flex-1 bg-bark/20 opacity-70" />
      </div>

      {/* Bottom Tagline: Natural · Pure · Handmade */}
      <p className="mt-3 font-script text-sm md:text-base italic tracking-widest opacity-80">
        Natural &middot; Pure &middot; Handmade
      </p>
    </div>
  );
}
