import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.targetGoalLabel.toLowerCase().includes(q) ||
      p.flavors.some((f) => f.toLowerCase().includes(q)) ||
      p.keyFeatures.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0F172A] border border-slate-700 shadow-2xl p-6">
        <div className="flex items-center gap-3 border-b border-slate-700 pb-4 mb-4">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search isolate, gainer, multivitamin, flavors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white text-base focus:outline-none placeholder-slate-500"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto space-y-2">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No products found matching “{query}”.
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 cursor-pointer flex items-center justify-between transition-colors group"
              >
                <div>
                  <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                    {product.categoryLabel}
                  </div>
                  <div className="text-sm font-bold text-white font-serif group-hover:text-amber-300 transition-colors">
                    {product.name}
                  </div>
                  <div className="text-xs text-slate-400">{product.subtitle}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-amber-400 font-mono tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
