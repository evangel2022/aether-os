import { useId } from 'react';
import { cn } from '@/lib/cn';
import { ARTWORK_VARIANTS, getArtworkVariant } from './file-utils';

interface FileImageArtProps {
  /** Explicit 0-3 composition; derived from `seed` when omitted. */
  variant?: number;
  seed?: string;
  className?: string;
}

/**
 * Tasteful, fully local placeholder artwork for demo image files.
 * No external images and no network requests — just restrained SVG.
 */
export function FileImageArt({ variant, seed = 'aether', className }: FileImageArtProps) {
  const uid = useId().replace(/:/g, '');
  const gradientId = `file-art-sky-${uid}`;
  const glowId = `file-art-glow-${uid}`;
  const resolved = variant === undefined ? getArtworkVariant(seed) : Math.abs(variant) % ARTWORK_VARIANTS;

  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eaf3ff" />
          <stop offset="52%" stopColor="#c6ddf8" />
          <stop offset="100%" stopColor="#9dc0ea" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="160" height="100" fill={`url(#${gradientId})`} />

      {resolved === 0 && (
        <>
          <circle cx="121" cy="27" r="19" fill={`url(#${glowId})`} />
          <circle cx="121" cy="27" r="10.5" fill="#f7fbff" opacity="0.88" />
          <path
            d="M0 74c21-12 38-12 55-4s31 9 48-1 38-9 57 1v30H0Z"
            fill="#b3cfee"
            opacity="0.9"
          />
          <path
            d="M0 84c19-7 33-6 47-1s28 6 45-1 35-6 53 2 15 5 15 5v11H0Z"
            fill="#8fb6e2"
            opacity="0.92"
          />
          <path d="M14 100l22-22 15 13 12-9 20 18Z" fill="#7eaad8" opacity="0.5" />
        </>
      )}

      {resolved === 1 && (
        <>
          <rect x="20" y="16" width="120" height="68" rx="12" fill="#f5f8fc" opacity="0.94" />
          <rect x="20" y="16" width="120" height="68" rx="12" fill="none" stroke="#ffffff" strokeOpacity="0.7" />
          <circle cx="34" cy="30" r="4.5" fill="#8fb6e2" />
          <rect x="44" y="26.5" width="30" height="7" rx="3.5" fill="#9dc0ea" opacity="0.9" />
          <rect x="33" y="45" width="46" height="8" rx="4" fill="#c5d9ef" />
          <rect x="33" y="58" width="68" height="5" rx="2.5" fill="#d9e5f4" />
          <rect x="33" y="67" width="54" height="5" rx="2.5" fill="#d9e5f4" />
          <rect x="112" y="52" width="16" height="16" rx="5" fill="#6f9fd8" opacity="0.85" />
          <rect x="112" y="26" width="16" height="16" rx="5" fill="#b6d1ec" />
        </>
      )}

      {resolved === 2 && (
        <>
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((column) => {
              const highlighted = (row + column) % 3 === 0;
              return (
                <rect
                  key={`${row}-${column}`}
                  x={39 + column * 30}
                  y={16 + row * 26}
                  width="22"
                  height="20"
                  rx="6.5"
                  fill={highlighted ? '#7aa8dd' : '#ffffff'}
                  opacity={highlighted ? 0.85 : 0.82}
                />
              );
            }),
          )}
          <circle cx="18" cy="82" r="26" fill="#ffffff" opacity="0.12" />
        </>
      )}

      {resolved === 3 && (
        <>
          <rect x="0" y="0" width="160" height="100" fill="#e7f0fb" />
          <circle cx="80" cy="52" r="46" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="9" />
          <circle cx="80" cy="52" r="31" fill="none" stroke="#9dc0ea" strokeOpacity="0.75" strokeWidth="7" />
          <circle cx="80" cy="52" r="17" fill="#ffffff" fillOpacity="0.78" />
          <circle cx="80" cy="52" r="7" fill="#86b0de" />
          <path d="M18 18l6 6M142 18l-6 6M18 84l6-6M142 84l-6-6" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      <rect width="160" height="100" fill="#ffffff" opacity="0.04" />
    </svg>
  );
}
