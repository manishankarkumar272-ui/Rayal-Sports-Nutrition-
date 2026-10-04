import React from 'react';
import { Phone, ClipboardList, Search, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface HeaderProps {
  inquiryListCount: number;
  onOpenInquiryList: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  inquiryListCount,
  onOpenInquiryList,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#090D14]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          className="text-lg sm:text-xl font-extrabold tracking-wider text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 font-serif"
        >
          ROYAL SPORTS & NUTRITION
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#products"
            className="hover:text-amber-400 transition-colors py-1 hover:border-b-2 hover:border-amber-400"
          >
            Store Catalog
          </a>
          <a
            href="#about"
            className="hover:text-amber-400 transition-colors py-1 hover:border-b-2 hover:border-amber-400"
          >
            About Us
          </a>
          <a
            href="#philosophy"
            className="hover:text-amber-400 transition-colors py-1 hover:border-b-2 hover:border-amber-400"
          >
            Philosophy
          </a>
          <a
            href="#goals"
            className="hover:text-amber-400 transition-colors py-1 hover:border-b-2 hover:border-amber-400"
          >
            Goal Guide
          </a>
          <a
            href="#reviews"
            className="hover:text-amber-400 transition-colors py-1 hover:border-b-2 hover:border-amber-400"
          >
            Customer Reviews
          </a>
          <a
            href="#store-info"
            className="hover:text-amber-400 transition-colors py-1 hover:border-b-2 hover:border-amber-400"
          >
            Visit Store
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/60"
            aria-label="Search available products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Store Inquiry / Wishlist for Counter Visits */}
          <button
            onClick={onOpenInquiryList}
            className="relative flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:border-amber-500/60 hover:text-white transition-colors whitespace-nowrap"
            aria-label="Store Visit List"
            title="Items you wish to check or pick up at the store"
          >
            <ClipboardList className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Store Visit List</span>
            {inquiryListCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[11px] font-extrabold bg-amber-400 text-slate-950 rounded-full tabular-nums">
                {inquiryListCount}
              </span>
            )}
          </button>

          {/* Direct Store Call Action */}
          <a
            href={`tel:${STORE_INFO.phone}`}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-sm hover:shadow-amber-500/20 whitespace-nowrap"
            aria-label="Call store"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="font-mono">{STORE_INFO.phone}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
