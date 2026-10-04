import React from 'react';
import { Product } from '../types';

interface ProductCanisterArtProps {
  product: Product;
  activeFlavor?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductCanisterArt: React.FC<ProductCanisterArtProps> = ({
  product,
  activeFlavor,
  className = '',
  size = 'md',
}) => {
  const flavor = activeFlavor || product.flavors[0] || 'Original';

  // Determine canister theme based on category
  const isTub = product.category !== 'multivitamin';
  const isGainer = product.category === 'gainer';
  const isMultivitamin = product.category === 'multivitamin';

  // Flavor badge color
  let flavorRibbonColor = '#d97706'; // default gold/amber
  if (flavor.includes('Strawberry')) {
    flavorRibbonColor = '#e11d48';
  } else if (flavor.includes('Vanilla')) {
    flavorRibbonColor = '#eab308';
  } else if (flavor.includes('Chocolate')) {
    flavorRibbonColor = '#78350f';
  }

  const heightClass = size === 'sm' ? 'h-48' : size === 'lg' ? 'h-80 sm:h-96' : 'h-64 sm:h-72';

  return (
    <div
      className={`relative w-full ${heightClass} flex items-center justify-center select-none overflow-hidden ${className}`}
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute inset-0 opacity-25 blur-2xl pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(circle at 50% 55%, ${product.accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* SVG 3D Render of Supplement Container */}
      <svg
        viewBox="0 0 320 400"
        className="h-full w-auto max-w-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Obsidian tub body gradient */}
          <linearGradient id={`tub-body-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B0F19" />
            <stop offset="12%" stopColor="#1E293B" />
            <stop offset="28%" stopColor="#334155" />
            <stop offset="45%" stopColor="#111827" />
            <stop offset="70%" stopColor="#0F172A" />
            <stop offset="90%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#090D14" />
          </linearGradient>

          {/* Chrome / Gold Cap Gradient */}
          <linearGradient id={`gold-cap-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="20%" stopColor="#D97706" />
            <stop offset="45%" stopColor="#FDE68A" />
            <stop offset="60%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Metallic Gold Foil Label Accent */}
          <linearGradient id={`gold-foil-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="35%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Multivitamin Amber Glass Gradient */}
          <linearGradient id="amber-glass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="20%" stopColor="#78350F" />
            <stop offset="50%" stopColor="#B45309" />
            <stop offset="80%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#301202" />
          </linearGradient>

          {/* Soft Shadow Filter */}
          <radialGradient id={`pedestal-shadow-${product.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base Floor Contact Shadow */}
        <ellipse cx="160" cy="380" rx="110" ry="16" fill={`url(#pedestal-shadow-${product.id})`} />

        {isMultivitamin ? (
          /* Multivitamin Bottle Geometry */
          <g transform="translate(10, 10)">
            {/* Bottle Neck & Cap */}
            <rect x="120" y="55" width="60" height="24" rx="4" fill={`url(#gold-cap-${product.id})`} />
            {/* Ridges on cap */}
            <line x1="130" y1="58" x2="130" y2="76" stroke="#451A03" strokeWidth="1.5" />
            <line x1="140" y1="58" x2="140" y2="76" stroke="#451A03" strokeWidth="1.5" />
            <line x1="150" y1="58" x2="150" y2="76" stroke="#451A03" strokeWidth="1.5" />
            <line x1="160" y1="58" x2="160" y2="76" stroke="#451A03" strokeWidth="1.5" />
            <line x1="170" y1="58" x2="170" y2="76" stroke="#451A03" strokeWidth="1.5" />

            {/* Bottle Shoulder */}
            <path
              d="M 120 79 Q 90 90 85 130 L 85 330 Q 85 350 150 350 Q 215 350 215 330 L 215 130 Q 210 90 180 79 Z"
              fill="url(#amber-glass)"
            />

            {/* Bottle Glass Specular Reflection */}
            <path
              d="M 98 135 L 105 135 L 105 325 L 98 325 Z"
              fill="#FFFFFF"
              fillOpacity="0.12"
            />

            {/* Multivitamin Matte Black & Gold Label */}
            <rect x="88" y="145" width="124" height="165" rx="3" fill="#090D14" />
            <rect
              x="90"
              y="147"
              width="120"
              height="161"
              rx="2"
              stroke={`url(#gold-foil-${product.id})`}
              strokeWidth="1.2"
            />

            {/* Label Crown Header */}
            <path
              d="M 142 166 L 150 157 L 158 166 L 154 171 L 146 171 Z"
              fill={`url(#gold-foil-${product.id})`}
            />
            <circle cx="142" cy="165" r="1.5" fill="#FEF08A" />
            <circle cx="150" cy="156" r="1.5" fill="#FEF08A" />
            <circle cx="158" cy="165" r="1.5" fill="#FEF08A" />

            <text
              x="150"
              y="185"
              fill="#E2E8F0"
              fontSize="7"
              fontWeight="800"
              letterSpacing="2"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              ROYAL SPORTS
            </text>

            <text
              x="150"
              y="207"
              fill="#FFFFFF"
              fontSize="16"
              fontWeight="900"
              letterSpacing="1"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              VITA LIFE
            </text>

            <text
              x="150"
              y="222"
              fill="#10B981"
              fontSize="8"
              fontWeight="700"
              letterSpacing="0.8"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              DAILY MULTIVITAMIN
            </text>

            {/* Nutrition Badges */}
            <line x1="102" y1="232" x2="198" y2="232" stroke="#334155" strokeWidth="0.8" />
            <text x="150" y="247" fill="#F8FAFC" fontSize="11" fontWeight="800" textAnchor="middle">
              32 NUTRIENTS
            </text>
            <text x="150" y="258" fill="#94A3B8" fontSize="7" textAnchor="middle">
              CHELATED MINERALS & VITAMINS
            </text>

            <rect x="108" y="268" width="84" height="22" rx="3" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="0.8" />
            <text x="150" y="282" fill="#34D399" fontSize="8" fontWeight="700" letterSpacing="0.5" textAnchor="middle">
              60 ENTERIC TABLETS
            </text>
          </g>
        ) : (
          /* Standard Heavyweight Protein Tub Canister */
          <g>
            {/* Massive Canister Lid / Cap */}
            <rect
              x={isGainer ? '62' : '75'}
              y="38"
              width={isGainer ? '196' : '170'}
              height="34"
              rx="6"
              fill={`url(#gold-cap-${product.id})`}
            />

            {/* Vertical gripping ridges on the lid */}
            {Array.from({ length: 16 }).map((_, i) => (
              <line
                key={i}
                x1={(isGainer ? 74 : 86) + i * (isGainer ? 11 : 9.5)}
                y1="42"
                x2={(isGainer ? 74 : 86) + i * (isGainer ? 11 : 9.5)}
                y2="68"
                stroke="#451A03"
                strokeWidth="1.4"
                strokeOpacity="0.75"
              />
            ))}

            {/* Tub Neck Ring */}
            <rect
              x={isGainer ? '66' : '80'}
              y="72"
              width={isGainer ? '188' : '160'}
              height="10"
              fill="#1E293B"
            />

            {/* Tub Main Barrel Body */}
            <rect
              x={isGainer ? '45' : '55'}
              y="82"
              width={isGainer ? '230' : '210'}
              height={isGainer ? '285' : '275'}
              rx="18"
              fill={`url(#tub-body-${product.id})`}
            />

            {/* Cylindrical Sheen / Highlight strip */}
            <rect
              x={isGainer ? '85' : '92'}
              y="84"
              width="14"
              height={isGainer ? '280' : '270'}
              fill="#FFFFFF"
              fillOpacity="0.08"
            />
            <rect
              x={isGainer ? '102' : '108'}
              y="84"
              width="5"
              height={isGainer ? '280' : '270'}
              fill="#FFFFFF"
              fillOpacity="0.12"
            />

            {/* Premium Center Foil Wrap / Label */}
            <rect
              x={isGainer ? '50' : '60'}
              y="110"
              width={isGainer ? '220' : '200'}
              height={isGainer ? '220' : '215'}
              rx="4"
              fill="#06090F"
            />

            {/* Metallic Gold Hairline Framing */}
            <rect
              x={isGainer ? '54' : '64'}
              y="114"
              width={isGainer ? '212' : '192'}
              height={isGainer ? '212' : '207'}
              rx="2"
              stroke={`url(#gold-foil-${product.id})`}
              strokeWidth="1.2"
              strokeDasharray="6 2"
            />

            {/* Royal Crown Crest Vector */}
            <g transform={`translate(${isGainer ? 144 : 144}, 125)`}>
              <path
                d="M 6 18 L 16 4 L 26 18 L 22 24 L 10 24 Z"
                fill={`url(#gold-foil-${product.id})`}
              />
              <circle cx="6" cy="16" r="2" fill="#FEF08A" />
              <circle cx="16" cy="3" r="2.5" fill="#FEF08A" />
              <circle cx="26" cy="16" r="2" fill="#FEF08A" />
            </g>

            {/* Brand Name Lockup */}
            <text
              x="160"
              y="160"
              fill="#E2E8F0"
              fontSize="8"
              fontWeight="800"
              letterSpacing="2.5"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              ROYAL SPORTS & NUTRITION
            </text>

            {/* Product Primary Name */}
            <text
              x="160"
              y="186"
              fill="#FFFFFF"
              fontSize={product.category === 'isolate' ? '14' : '16'}
              fontWeight="900"
              letterSpacing="0.8"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              {product.category === 'isolate'
                ? '100% ISOLATE'
                : product.category === 'gainer'
                ? 'HERCULEZ GAINER'
                : 'PROTEIN MATRIX'}
            </text>

            <text
              x="160"
              y="200"
              fill={product.accentColor}
              fontSize="7.5"
              fontWeight="700"
              letterSpacing="1.2"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              {product.category === 'isolate'
                ? 'PURE WHEY ISOLATE'
                : product.category === 'gainer'
                ? 'ADVANCED MASS BUILDER'
                : 'SUSTAINED RELEASE BLEND'}
            </text>

            {/* Macronutrient Hero Callout Box */}
            <rect
              x={isGainer ? '68' : '78'}
              y="212"
              width={isGainer ? '184' : '164'}
              height="46"
              rx="4"
              fill="#0F172A"
              stroke="#1E293B"
              strokeWidth="1"
            />

            {product.category === 'isolate' && (
              <g>
                <text x="105" y="235" fill="#FEF08A" fontSize="16" fontWeight="900" textAnchor="middle">
                  27g
                </text>
                <text x="105" y="248" fill="#94A3B8" fontSize="7" fontWeight="600" textAnchor="middle">
                  ISOLATE
                </text>

                <line x1="135" y1="218" x2="135" y2="252" stroke="#334155" strokeWidth="1" />

                <text x="160" y="235" fill="#38BDF8" fontSize="15" fontWeight="900" textAnchor="middle">
                  0g
                </text>
                <text x="160" y="248" fill="#94A3B8" fontSize="7" fontWeight="600" textAnchor="middle">
                  SUGAR
                </text>

                <line x1="185" y1="218" x2="185" y2="252" stroke="#334155" strokeWidth="1" />

                <text x="212" y="235" fill="#4ADE80" fontSize="15" fontWeight="900" textAnchor="middle">
                  0g
                </text>
                <text x="212" y="248" fill="#94A3B8" fontSize="7" fontWeight="600" textAnchor="middle">
                  FAT
                </text>
              </g>
            )}

            {product.category === 'gainer' && (
              <g>
                <text x="105" y="235" fill="#F59E0B" fontSize="15" fontWeight="900" textAnchor="middle">
                  1250
                </text>
                <text x="105" y="248" fill="#94A3B8" fontSize="7" fontWeight="600" textAnchor="middle">
                  CALORIES
                </text>

                <line x1="135" y1="218" x2="135" y2="252" stroke="#334155" strokeWidth="1" />

                <text x="160" y="235" fill="#FEF08A" fontSize="15" fontWeight="900" textAnchor="middle">
                  52g
                </text>
                <text x="160" y="248" fill="#94A3B8" fontSize="7" fontWeight="600" textAnchor="middle">
                  PROTEIN
                </text>

                <line x1="185" y1="218" x2="185" y2="252" stroke="#334155" strokeWidth="1" />

                <text x="212" y="235" fill="#38BDF8" fontSize="15" fontWeight="900" textAnchor="middle">
                  250g
                </text>
                <text x="212" y="248" fill="#94A3B8" fontSize="7" fontWeight="600" textAnchor="middle">
                  CARBS
                </text>
              </g>
            )}

            {product.category === 'blend' && (
              <g>
                <text x="105" y="235" fill="#38BDF8" fontSize="15" fontWeight="900" textAnchor="middle">
                  24g
                </text>
                <text x="105" y="248" fill="#94A3B8" fontSize="7" fontWeight="600" textAnchor="middle">
                  PROTEIN
                </text>

                <line x1="135" y1="218" x2="135" y2="252" stroke="#334155" strokeWidth="1" />

                <text x="160" y="235" fill="#FEF08A" fontSize="15" fontWeight="900" textAnchor="middle">
                  8 HRS
                </text>
                <text x="160" y="248" fill="#94A3B8" fontSize="7" fontWeight="600" textAnchor="middle">
                  RELEASE
                </text>

                <line x1="185" y1="218" x2="185" y2="252" stroke="#334155" strokeWidth="1" />

                <text x="212" y="235" fill="#4ADE80" fontSize="15" fontWeight="900" textAnchor="middle">
                  5.5g
                </text>
                <text x="212" y="248" fill="#94A3B8" fontSize="7" fontWeight="600" textAnchor="middle">
                  BCAAS
                </text>
              </g>
            )}

            {/* Flavor Ribbon Banner */}
            <rect
              x={isGainer ? '68' : '78'}
              y="268"
              width={isGainer ? '184' : '164'}
              height="20"
              rx="3"
              fill={flavorRibbonColor}
            />
            <text
              x="160"
              y="281"
              fill="#FFFFFF"
              fontSize="8"
              fontWeight="800"
              letterSpacing="0.8"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              {flavor.toUpperCase()}
            </text>

            {/* Bottom Net Weight & Servings info */}
            <text
              x="160"
              y="308"
              fill="#64748B"
              fontSize="7"
              fontWeight="600"
              textAnchor="middle"
              letterSpacing="0.5"
            >
              NET WT. {product.containerWeight.toUpperCase()} · ~{product.servingsPerContainer} SERVINGS
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
