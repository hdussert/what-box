import MarketingGlow from '@/components/marketing/MarketingGlow'

/**
 * A closed box, its label on one side, and the items it holds. Drawn once
 * from a 3D projection, then frozen: edit the coordinates directly.
 */
const HeroScene = () => (
  <div aria-hidden className="relative isolate w-full max-w-sm">
    <MarketingGlow className="top-3/5 left-1/2" />
    <svg
      viewBox="2.8 3.1 294.5 241.1"
      fill="none"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      className="w-full"
    >
      <g className="fill-background stroke-foreground">
        <path d="M 112.4 99.8 Q 117 96 122.9 96.9 L 223.8 111.2 Q 229.7 112 229.7 118 L 229.7 197.7 Q 229.7 203.7 225.1 207.5 L 187.6 238.4 Q 183 242.3 177.1 241.4 L 76.2 227.1 Q 70.3 226.3 70.3 220.3 L 70.3 140.6 Q 70.3 134.6 74.9 130.8 Z" />
        <polyline points="71.5,135.1 183,150.5 228.2,113.3" />
        <polyline points="183,150.5 182.7,241.1" />
        <polyline points="93.6,115.3 206.4,131.3" />
      </g>
      <g transform="matrix(1.127 0.16 0 1.146 92.842 166.431)">
        <rect
          width="60"
          height="32"
          rx="2"
          className="fill-background stroke-primary"
        />
        {/* QR */}
        <g transform="translate(36 7)" className="fill-foreground stroke-none">
          <path d="M0 0h6v6h-6z M1 1v4h4v-4z M2 2h2v2h-2z" fillRule="evenodd" />
          <path
            d="M12 0h6v6h-6z M13 1v4h4v-4z M14 2h2v2h-2z"
            fillRule="evenodd"
          />
          <path
            d="M0 12h6v6h-6z M1 13v4h4v-4z M2 14h2v2h-2z"
            fillRule="evenodd"
          />
          <rect x="8" y="0" width="2" height="2" />
          <rect x="8" y="4" width="2" height="2" />
          <rect x="0" y="8" width="2" height="2" />
          <rect x="4" y="8" width="2" height="2" />
          <rect x="8" y="8" width="2" height="2" />
          <rect x="12" y="8" width="2" height="2" />
          <rect x="16" y="8" width="2" height="2" />

          <rect x="10" y="10" width="2" height="2" />
          <rect x="14" y="10" width="2" height="2" />

          <rect x="8" y="12" width="2" height="2" />
          <rect x="12" y="12" width="2" height="2" />
          <rect x="16" y="12" width="2" height="2" />

          <rect x="10" y="14" width="2" height="2" />
          <rect x="14" y="14" width="2" height="2" />

          <rect x="8" y="16" width="2" height="2" />
          <rect x="12" y="16" width="2" height="2" />
          <rect x="16" y="16" width="2" height="2" />
        </g>
        <line x1="7" y1="12" x2="28" y2="12" className="stroke-foreground" />
        <line
          x1="7"
          y1="20"
          x2="22"
          y2="20"
          className="stroke-muted-foreground"
        />
      </g>
      <g>
        <path d="M 92.8 166.4 L 45.3 116.5" className="stroke-primary" />
        <circle
          cx="28.8"
          cy="99.1"
          r="24"
          className="fill-background stroke-primary"
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-shirt text-foreground"
          aria-hidden="true"
          x="16.8"
          y="87.1"
        >
          <path d="M20.4 3.5 16 2a4 4 0 0 1-8 0L3.6 3.5a2 2 0 0 0-1.3 2.2l.58 3.5a1 1 0 0 0 .99.8H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.1a1 1 0 0 0 .99-.84l.58-3.5a2 2 0 0 0-1.3-2.2z" />
        </svg>
      </g>
      <g>
        <path d="M 129.8 171.7 L 146.6 52.9" className="stroke-primary" />
        <circle
          cx="150"
          cy="29.1"
          r="24"
          className="fill-background stroke-primary"
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-lamp text-foreground"
          aria-hidden="true"
          x="138"
          y="17.1"
        >
          <path d="M12 12v6" />
          <path d="M4.1 10.6A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.4l-3.1-7.4A2 2 0 0 0 15 2H9a2 2 0 0 0-1.8 1.2Z" />
          <path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" />
        </svg>
      </g>
      <g>
        <path d="M 160.5 176 L 251.5 112.8" className="stroke-primary" />
        <circle
          cx="271.2"
          cy="99.1"
          r="24"
          className="fill-background stroke-primary"
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-utensils text-foreground"
          aria-hidden="true"
          x="259.2"
          y="87.1"
        >
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
      </g>
    </svg>
  </div>
)

export default HeroScene
