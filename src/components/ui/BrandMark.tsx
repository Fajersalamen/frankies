type BrandMarkProps = {
  className?: string;
  background?: string;
};

/**
 * Recreation of the Frankies Cake badge — a three-point crown over a
 * four-point sparkle, in the brand's teal/coral palette. Hand-drawn as SVG
 * (not a raster copy) so it stays crisp from favicon size up to a large
 * hero mark.
 */
export function BrandMark({ className, background = '#FFFFFF' }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-label="Frankies Cake">
      <defs>
        <clipPath id="fc-right-half">
          <rect x="100" y="0" width="100" height="200" />
        </clipPath>
      </defs>

      <circle cx="100" cy="100" r="100" fill={background} />

      {/* Crown */}
      <path d="M50,112 L60,68 L85,94 L100,34 L115,94 L140,68 L150,112 Z" fill="#6FAF9C" />
      <path
        d="M50,112 L60,68 L85,94 L100,34 L115,94 L140,68 L150,112 Z"
        fill="#8FCBBB"
        clipPath="url(#fc-right-half)"
      />
      <path d="M91,112 L100,40 L109,112 Z" fill="#CDEBE2" />

      {/* Sparkle */}
      <path d="M100,106 Q120,132 146,150 Q120,168 100,194 Q80,168 54,150 Q80,132 100,106 Z" fill="#F0966F" />
      <path
        d="M100,106 Q120,132 146,150 Q120,168 100,194 Q80,168 54,150 Q80,132 100,106 Z"
        fill="#EC8465"
        clipPath="url(#fc-right-half)"
      />
    </svg>
  );
}
