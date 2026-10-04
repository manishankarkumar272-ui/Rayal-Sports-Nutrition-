import React from 'react';
import { ArrowRight, Phone, MessageSquare, ShieldCheck, MapPin, Store } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';
import { ProductCanisterArt } from './ProductCanisterArt';

interface HeroSectionProps {
  flagshipProduct: Product;
  onSelectProduct: (product: Product) => void;
  onAddToInquiryList: (product: Product, flavor: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  flagshipProduct,
  onSelectProduct,
  onAddToInquiryList,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#090D14] via-[#0E1420] to-[#090D14] py-14 sm:py-20 border-b border-slate-800/80">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Prominent Physical Store Showcase Banner */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-200">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white uppercase tracking-wider">
                Official Retail Store Catalog:
              </span>{' '}
              <span className="text-slate-300">
                Browse all products available directly at our retail counter. We do not process online transactions.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 font-mono"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{STORE_INFO.phone}</span>
            </a>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-medium">Open 7 Days (9 AM – 9 PM)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Statement & Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed Brand Kicker (No Pill Enclosure per Anti-Slop Rules) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4">
              <span>Retail Supplement Store</span>
              <span aria-hidden="true">·</span>
              <span>100% Genuine Sealed Stock</span>
              <span aria-hidden="true">·</span>
              <span>In-Store Guidance</span>
            </div>

            {/* Primary Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 font-serif [text-wrap:balance]">
              Premium Performance Nutrition.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                Engineered for Results.
              </span>
            </h1>

            {/* Descriptive Body */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-6">
              Royal Sports & Nutrition is a premium supplement brand engineered for athletes,
              bodybuilders, and fitness enthusiasts. Our nutritional formulas and protein supplements
              are designed to support workout performance, muscle recovery, and fitness goals.
            </p>

            {/* Tagline Callout */}
            <div className="border-l-2 border-amber-500 pl-4 py-1 mb-8">
              <p className="text-base sm:text-lg font-semibold text-amber-200 italic tracking-wide">
                “Train with purpose. Recover with confidence.”
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-lg shadow-amber-500/10 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>Browse Store Products</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Store: {STORE_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.phoneClean}?text=Hello%20Royal%20Sports%20%26%20Nutrition%2C%20I%20want%20to%20check%20product%20availability%20in%20your%20store`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Store Counter</span>
              </a>
            </div>

            {/* Clean Unboxed Key Invariants / In-Store Verification Adjacency */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <div className="text-2xl font-black text-white font-mono tabular-nums">27g</div>
                <div className="text-xs text-slate-400 mt-0.5">Pure Isolate / Serving</div>
              </div>
              <div>
                <div className="text-2xl font-black text-amber-400 font-mono tabular-nums">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Authentic Sealed Stock</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono tabular-nums">7 Days</div>
                <div className="text-xs text-slate-400 mt-0.5">Open 9 AM – 9 PM</div>
              </div>
              <div>
                <div className="text-2xl font-black text-amber-400 font-mono tabular-nums">3</div>
                <div className="text-xs text-slate-400 mt-0.5">Fresh In-Store Flavors</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card with Interactive Canister */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
              {/* Product Kicker */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available in Store Now
                </span>
                <span className="font-mono tabular-nums">★ 4.9 · 142 Reviews</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 font-serif">
                {flagshipProduct.name}
              </h2>
              <p className="text-xs text-slate-300 mb-4">
                {flagshipProduct.subtitle}
              </p>

              {/* 3D Canister vector illustration */}
              <div
                className="cursor-pointer group my-2"
                onClick={() => onSelectProduct(flagshipProduct)}
                title="Click to view full nutrition facts"
              >
                <ProductCanisterArt
                  product={flagshipProduct}
                  activeFlavor="Chocolate Delight"
                  size="md"
                />
              </div>

              {/* Quick Spec Bar */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800 text-center my-4 text-xs">
                <div>
                  <div className="text-slate-400">Protein</div>
                  <div className="font-bold text-white font-mono">27g Isolate</div>
                </div>
                <div>
                  <div className="text-slate-400">Sugar / Fat</div>
                  <div className="font-bold text-amber-400 font-mono">0g / 0g</div>
                </div>
                <div>
                  <div className="text-slate-400">Store Shelf</div>
                  <div className="font-bold text-white font-mono">Aisle 1</div>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <div>
                  <div className="text-xs text-slate-400 line-through tabular-nums font-mono">
                    ₹{flagshipProduct.originalPrice.toLocaleString('en-IN')}
                  </div>
                  <div className="text-2xl font-black text-amber-400 font-mono tabular-nums">
                    ₹{flagshipProduct.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProduct(flagshipProduct)}
                    className="px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Nutrition Facts
                  </button>
                  <button
                    onClick={() => onAddToInquiryList(flagshipProduct, 'Chocolate Delight')}
                    className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
                  >
                    + Add to Visit List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
