"use client";

import { useState } from "react";

export function HeroIllustration() {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0" aria-hidden="true">
      <svg
        viewBox="0 0 500 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Background circle glow */}
        <circle cx="250" cy="210" r="180" fill="url(#bgGlow)" className="animate-pulse-slow" />

        {/* Floating hearts */}
        <g className="animate-float-slow">
          <path d="M100 80c0-11 9-20 20-20s20 9 20 20c0 11-20 30-20 30S100 91 100 80z" fill="#f472b6" opacity="0.7" />
        </g>
        <g className="animate-float-medium">
          <path d="M380 60c0-8 6.5-15 15-15s15 6.5 15 15c0 8-15 22-15 22s-15-14-15-15z" fill="#fb923c" opacity="0.6" />
        </g>
        <g className="animate-float-fast">
          <path d="M420 280c0-6 5-11 11-11s11 5 11 11c0 6-11 16-11 16s-11-10-11-11z" fill="#a78bfa" opacity="0.5" />
        </g>

        {/* Floating paw prints */}
        <g className="animate-float-medium" opacity="0.3">
          <circle cx="70" cy="180" r="5" fill="#f97316" />
          <circle cx="60" cy="170" r="3" fill="#f97316" />
          <circle cx="72" cy="167" r="3" fill="#f97316" />
          <circle cx="82" cy="172" r="3" fill="#f97316" />
        </g>
        <g className="animate-float-fast" opacity="0.25">
          <circle cx="440" cy="160" r="5" fill="#8b5cf6" />
          <circle cx="430" cy="150" r="3" fill="#8b5cf6" />
          <circle cx="442" cy="147" r="3" fill="#8b5cf6" />
          <circle cx="452" cy="152" r="3" fill="#8b5cf6" />
        </g>

        {/* Stars */}
        <g className="animate-twinkle">
          <polygon points="60,300 63,308 72,308 65,313 67,322 60,317 53,322 55,313 48,308 57,308" fill="#fbbf24" opacity="0.6" />
        </g>
        <g className="animate-twinkle-delayed">
          <polygon points="430,100 432,106 438,106 433,109 435,115 430,112 425,115 427,109 422,106 428,106" fill="#fbbf24" opacity="0.5" />
        </g>

        {/* Ground / grass */}
        <ellipse cx="250" cy="370" rx="200" ry="20" fill="#86efac" opacity="0.4" />
        <ellipse cx="250" cy="370" rx="160" ry="14" fill="#4ade80" opacity="0.3" />

        {/* === DOG === */}
        <g className="animate-bounce-gentle">
          {/* Body */}
          <ellipse cx="200" cy="300" rx="65" ry="50" fill="#fbbf24" />
          <ellipse cx="200" cy="300" rx="65" ry="50" fill="url(#dogGradient)" />
          {/* Tail — wags on hover */}
          <path
            d="M260 290 Q282 265 275 235"
            stroke="#d97706"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            className={hovering ? "dog-tail-wag" : ""}
            style={{ transformOrigin: "260px 290px" }}
          />
          {/* Head */}
          <circle cx="155" cy="240" r="42" fill="#f59e0b" />
          <circle cx="155" cy="240" r="42" fill="url(#dogHeadGradient)" />
          {/* Ears */}
          <ellipse cx="122" cy="210" rx="18" ry="28" fill="#d97706" transform="rotate(-15 122 210)" />
          <ellipse cx="185" cy="212" rx="16" ry="26" fill="#d97706" transform="rotate(10 185 212)" />
          {/* Eyes */}
          <circle cx="142" cy="235" r="7" fill="white" />
          <circle cx="168" cy="235" r="7" fill="white" />
          <circle cx="143" cy="236" r="4.5" fill="#1e293b" />
          <circle cx="169" cy="236" r="4.5" fill="#1e293b" />
          <circle cx="145" cy="234" r="1.5" fill="white" />
          <circle cx="171" cy="234" r="1.5" fill="white" />
          {/* Nose */}
          <ellipse cx="155" cy="252" rx="8" ry="6" fill="#1e293b" />
          <ellipse cx="153" cy="250" rx="2" ry="1.5" fill="#475569" />
          {/* Mouth - smile */}
          <path d="M148 258 Q155 268 162 258" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Tongue */}
          <ellipse cx="155" cy="266" rx="5" ry="7" fill="#fb7185" />
          {/* Legs */}
          <rect x="160" y="335" width="16" height="35" rx="8" fill="#f59e0b" />
          <rect x="220" y="335" width="16" height="35" rx="8" fill="#f59e0b" />
          <rect x="160" y="365" width="20" height="8" rx="4" fill="#d97706" />
          <rect x="218" y="365" width="20" height="8" rx="4" fill="#d97706" />
          {/* Collar */}
          <rect x="130" y="270" width="52" height="10" rx="5" fill="#ef4444" />
          <circle cx="156" cy="280" r="5" fill="#fbbf24" />
        </g>

        {/* === CAT === */}
        <g className="animate-bounce-gentle-delayed">
          {/* Body */}
          <ellipse cx="340" cy="310" rx="45" ry="40" fill="#c084fc" />
          <ellipse cx="340" cy="310" rx="45" ry="40" fill="url(#catGradient)" />
          {/* Head */}
          <circle cx="340" cy="255" r="35" fill="#a855f7" />
          <circle cx="340" cy="255" r="35" fill="url(#catHeadGradient)" />
          {/* Ears - triangular */}
          <polygon points="312,230 322,195 335,228" fill="#9333ea" />
          <polygon points="315,228 323,203 333,226" fill="#f9a8d4" />
          <polygon points="348,228 358,195 370,230" fill="#9333ea" />
          <polygon points="350,226 358,203 367,228" fill="#f9a8d4" />
          {/* Left eye */}
          <ellipse cx="327" cy="252" rx="7" ry="8" fill="#d9f99d" />
          <ellipse cx="327" cy="253" rx="3" ry="6" fill="#1e293b" />
          <circle cx="329" cy="250" r="1.5" fill="white" />
          {/* Right eye — fixed: added pupil */}
          <ellipse cx="353" cy="252" rx="7" ry="8" fill="#d9f99d" />
          <ellipse cx="353" cy="253" rx="3" ry="6" fill="#1e293b" />
          <circle cx="355" cy="250" r="1.5" fill="white" />
          {/* Nose */}
          <polygon points="337,264 340,260 343,264" fill="#f9a8d4" />
          {/* Whiskers */}
          <line x1="300" y1="260" x2="325" y2="262" stroke="#d8b4fe" strokeWidth="1.5" />
          <line x1="302" y1="268" x2="325" y2="266" stroke="#d8b4fe" strokeWidth="1.5" />
          <line x1="355" y1="262" x2="380" y2="260" stroke="#d8b4fe" strokeWidth="1.5" />
          <line x1="355" y1="266" x2="378" y2="268" stroke="#d8b4fe" strokeWidth="1.5" />
          {/* Mouth */}
          <path d="M336 268 Q340 273 344 268" stroke="#7c3aed" strokeWidth="1.5" fill="none" />
          {/* Legs */}
          <rect x="315" y="340" width="14" height="30" rx="7" fill="#a855f7" />
          <rect x="352" y="340" width="14" height="30" rx="7" fill="#a855f7" />
          <ellipse cx="322" cy="368" rx="9" ry="5" fill="#9333ea" />
          <ellipse cx="359" cy="368" rx="9" ry="5" fill="#9333ea" />
          {/* Tail */}
          <path d="M385 300 Q410 280 400 250 Q395 240 405 230" stroke="#9333ea" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Collar */}
          <rect x="318" y="280" width="44" height="8" rx="4" fill="#06b6d4" />
          <circle cx="340" cy="288" r="4" fill="#fbbf24" />
        </g>

        {/* Sparkles around */}
        <g className="animate-twinkle">
          <circle cx="130" cy="150" r="3" fill="#f472b6" />
          <circle cx="350" cy="150" r="2" fill="#818cf8" />
          <circle cx="90" cy="330" r="2.5" fill="#34d399" />
        </g>

        {/* Gradients */}
        <defs>
          <radialGradient id="bgGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#fce7f3" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ede9fe" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="dogGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dogHeadGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="catGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="catHeadGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
