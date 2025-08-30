'use client';

import { motion } from 'framer-motion';

interface AILabIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

const AILabIcon = ({ size = 80, className = '', animated = true }: AILabIconProps) => {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      whileHover={animated ? { scale: 1.05 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Outer Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 via-cyan-400/20 to-purple-600/30 rounded-2xl blur-xl animate-pulse" />
      
      {/* Main Icon Container */}
      <div className="relative w-full h-full">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background Circuit Board Pattern */}
          <defs>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF88" stopOpacity="1" />
              <stop offset="50%" stopColor="#00D9FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF88" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Hexagon Background */}
          <path
            d="M50 5 L85 25 L85 75 L50 95 L15 75 L15 25 Z"
            fill="rgba(10, 14, 39, 0.9)"
            stroke="url(#aiGradient)"
            strokeWidth="2"
            filter="url(#glow)"
          />

          {/* Circuit Lines */}
          <g opacity="0.3">
            <path d="M30 25 L30 35 L40 35" stroke="#00FF88" strokeWidth="1" />
            <path d="M70 25 L70 35 L60 35" stroke="#00D9FF" strokeWidth="1" />
            <path d="M25 50 L35 50" stroke="#7C3AED" strokeWidth="1" />
            <path d="M75 50 L65 50" stroke="#00FF88" strokeWidth="1" />
            <circle cx="30" cy="25" r="2" fill="#00FF88" />
            <circle cx="70" cy="25" r="2" fill="#00D9FF" />
            <circle cx="25" cy="50" r="2" fill="#7C3AED" />
            <circle cx="75" cy="50" r="2" fill="#00FF88" />
          </g>

          {/* Robot Head */}
          <rect
            x="30"
            y="30"
            width="40"
            height="35"
            rx="8"
            fill="rgba(0, 255, 136, 0.1)"
            stroke="url(#aiGradient)"
            strokeWidth="2"
          />

          {/* Robot Eyes - Code Brackets */}
          <text
            x="38"
            y="48"
            fontFamily="JetBrains Mono, monospace"
            fontSize="14"
            fontWeight="bold"
            fill="#00FF88"
            filter="url(#glow)"
          >
            &lt;/&gt;
          </text>
          <text
            x="54"
            y="48"
            fontFamily="JetBrains Mono, monospace"
            fontSize="14"
            fontWeight="bold"
            fill="#00D9FF"
            filter="url(#glow)"
          >
            &lt;/&gt;
          </text>

          {/* Neural Network Brain Pattern */}
          <g opacity="0.6">
            <circle cx="50" cy="35" r="1.5" fill="#00FF88" />
            <circle cx="45" cy="38" r="1" fill="#00D9FF" />
            <circle cx="55" cy="38" r="1" fill="#7C3AED" />
            <path d="M50 35 L45 38 M50 35 L55 38" stroke="#00FF88" strokeWidth="0.5" opacity="0.5" />
          </g>

          {/* Mouth - Terminal Cursor */}
          <rect
            x="42"
            y="55"
            width="16"
            height="3"
            fill="url(#glowGradient)"
            className={animated ? "animate-pulse" : ""}
          />

          {/* Antenna */}
          <line
            x1="50"
            y1="30"
            x2="50"
            y2="20"
            stroke="url(#aiGradient)"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="18"
            r="3"
            fill="none"
            stroke="url(#aiGradient)"
            strokeWidth="1.5"
            className={animated ? "animate-pulse" : ""}
          />

          {/* Lab Flask Symbol (Bottom Right) */}
          <g transform="translate(60, 65)">
            <path
              d="M5 2 L5 6 L2 10 L8 10 L5 6 L5 2 M3 2 L7 2"
              stroke="#00FF88"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
            <circle cx="5" cy="8" r="0.5" fill="#00D9FF" opacity="0.8" />
            <circle cx="4" cy="9" r="0.3" fill="#7C3AED" opacity="0.8" />
          </g>

          {/* Code Symbol (Bottom Left) */}
          <g transform="translate(25, 65)" opacity="0.6">
            <text
              x="0"
              y="8"
              fontFamily="JetBrains Mono, monospace"
              fontSize="8"
              fill="#00D9FF"
            >
              { }
            </text>
          </g>
        </svg>

        {/* Animated Scanning Line */}
        {animated && (
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"
            animate={{
              y: [0, size, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default AILabIcon;