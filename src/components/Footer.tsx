import React from 'react';
import { Phone, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';

interface FooterProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenReviews: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  products,
  onSelectProduct,
  onOpenReviews,
}) => {
  return (
    <footer className="bg-[#06090F] border-t border-slate-800 text-slate-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Store Info */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-extrabold text-white font-serif tracking-wider">
              ROYAL SPORTS & NUTRITION
            </h3>
            <div className="text-sm font-semibold text-amber-400">
              Official Retail Store & Sports Nutrition Outlet
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              High-quality nutritional formulas and protein supplements designed to support workout
              performance, muscle recovery, and fitness goals. Visit our store to inspect authentic stock in person.
            </p>
            <div className="space-y-1.5 text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Store Contact: </span>
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="font-bold text-amber-300 hover:text-white font-mono transition-colors"
                >
                  {STORE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Store Timings: {STORE_INFO.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Store Catalog
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-amber-400 transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#goals" className="hover:text-amber-400 transition-colors">
                  Goal Guide
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={onOpenReviews} className="hover:text-amber-400 transition-colors">
                  Customer Reviews & Ratings
                </a>
              </li>
              <li>
                <a href="#store-info" className="hover:text-amber-400 transition-colors">
                  Visit Store
                </a>
              </li>
            </ul>
          </div>

          {/* Core In-Store Products */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              In-Store Products Available
            </div>
            <ul className="space-y-2">
              {products.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onSelectProduct(p)}
                    className="hover:text-amber-400 transition-colors text-left flex items-center justify-between w-full group"
                  >
                    <span className="text-slate-300 group-hover:text-white">{p.name}</span>
                    <span className="text-[11px] font-mono text-emerald-400">
                      In Store · ₹{p.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Visit our counter for seal & hologram verification</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Unboxed Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © Royal Sports & Nutrition. All rights reserved. Physical Retail Store Showcase.
          </div>

          <div className="flex items-center gap-3">
            <span>Storefront Only</span>
            <span aria-hidden="true">·</span>
            <span>No Online Transactions</span>
            <span aria-hidden="true">·</span>
            <span>Counter Inquiries: {STORE_INFO.phone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
