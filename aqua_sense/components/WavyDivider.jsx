"use client";

export default function WavyDivider({ className = "", flip = false, color = "shakespeare-50" }) {
  return (
    <div className={`relative w-full ${className}`} style={{ transform: flip ? 'rotate(180deg)' : 'none' }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 C150,50 350,0 600,30 C850,60 1050,20 1200,40 L1200,120 L0,120 Z"
          className={`fill-current text-${color}`}
          style={{ opacity: 0.8 }}
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,0 C150,50 350,0 600,30 C850,60 1050,20 1200,40 L1200,120 L0,120 Z;
              M0,20 C150,0 350,50 600,10 C850,30 1050,60 1200,20 L1200,120 L0,120 Z;
              M0,0 C150,50 350,0 600,30 C850,60 1050,20 1200,40 L1200,120 L0,120 Z
            "
          />
        </path>
        <path
          d="M0,20 C200,60 400,10 600,50 C800,90 1000,40 1200,60 L1200,120 L0,120 Z"
          className={`fill-current text-${color}`}
          style={{ opacity: 0.5 }}
        >
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            values="
              M0,20 C200,60 400,10 600,50 C800,90 1000,40 1200,60 L1200,120 L0,120 Z;
              M0,40 C200,10 400,70 600,30 C800,50 1000,90 1200,40 L1200,120 L0,120 Z;
              M0,20 C200,60 400,10 600,50 C800,90 1000,40 1200,60 L1200,120 L0,120 Z
            "
          />
        </path>
      </svg>
    </div>
  );
}
