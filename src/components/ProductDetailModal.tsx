import React, { useState } from 'react';
import { X, Star, Check, ShieldCheck, Phone, Plus, Minus, MessageSquare, MapPin } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';
import { ProductCanisterArt } from './ProductCanisterArt';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToInquiryList: (product: Product, flavor: string, quantity: number) => void;
  onOpenReviews: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToInquiryList,
  onOpenReviews,
}) => {
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'facts' | 'usage' | 'ingredients'>('facts');
  const [added, setAdded] = useState<boolean>(false);

  // Sync selected flavor when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedFlavor(product.flavors[0]);
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToInquiryList(product, selectedFlavor || product.flavors[0], quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const whatsappInquiryUrl = `https://wa.me/${STORE_INFO.phoneClean}?text=Hello%20Royal%20Sports%20%26%20Nutrition%2C%20is%20${encodeURIComponent(
    product.name
  )}%20(${encodeURIComponent(selectedFlavor || product.flavors[0])})%20available%20in%20store%20now%3F`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-2xl bg-[#0F172A] border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-full transition-colors border border-slate-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Visual Canister Stage & In-Store Availability Specs */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full rounded-xl bg-slate-950/70 border border-slate-800 p-4 flex items-center justify-center relative overflow-hidden">
                <ProductCanisterArt
                  product={product}
                  activeFlavor={selectedFlavor}
                  size="lg"
                />
              </div>

              {/* Shelf & Counter Location */}
              {product.shelfLocation && (
                <div className="w-full mt-3 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-amber-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{product.shelfLocation}</span>
                </div>
              )}

              {/* Trust Badges */}
              <div className="w-full mt-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inspect Seal & Batch Hologram in Person</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Store Hotline: {STORE_INFO.phone}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Nutrition Facts & Store Action Module */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {product.stockStatus}
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenReviews(product.id);
                  }}
                  className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white font-mono">{product.rating}</span>
                  <span className="text-slate-400 underline font-mono">
                    ({product.reviewCount} In-Store Reviews)
                  </span>
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-1">
                {product.name}
              </h2>
              <p className="text-sm font-medium text-amber-200/90 italic mb-4">
                {product.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Flavor Selector */}
              {product.flavors.length > 1 && (
                <div className="mb-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    In-Stock Flavor:{' '}
                    <span className="text-amber-400 font-bold ml-1">{selectedFlavor}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.flavors.map((flavor) => (
                      <button
                        key={flavor}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-left truncate ${
                          selectedFlavor === flavor
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Store Action Row */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Store Counter Price
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Qty:</span>
                    <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-white font-mono tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAdd}
                    className={`py-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                      added
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Saved to Store Visit List!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to Store Visit List</span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Informational Tabs: Nutrition Facts / Suggested Use / Ingredients */}
              <div>
                <div className="flex border-b border-slate-800 mb-4">
                  <button
                    onClick={() => setActiveTab('facts')}
                    className={`pb-2 px-3 text-xs font-semibold transition-colors border-b-2 ${
                      activeTab === 'facts'
                        ? 'border-amber-400 text-white'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Nutrition Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`pb-2 px-3 text-xs font-semibold transition-colors border-b-2 ${
                      activeTab === 'usage'
                        ? 'border-amber-400 text-white'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Key Features & Dosage
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2 px-3 text-xs font-semibold transition-colors border-b-2 ${
                      activeTab === 'ingredients'
                        ? 'border-amber-400 text-white'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Full Ingredients
                  </button>
                </div>

                {activeTab === 'facts' && (
                  <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-4">
                    <div className="flex justify-between text-xs text-slate-400 pb-2 mb-2 border-b border-slate-800">
                      <span>Serving Size: {product.servingSize}</span>
                      <span>Servings: {product.servingsPerContainer}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {product.nutritionProfile.map((fact) => (
                        <div
                          key={fact.label}
                          className="p-2.5 rounded bg-slate-900/60 border border-slate-800/80"
                        >
                          <div className="text-[11px] text-slate-400">{fact.label}</div>
                          <div className="text-base font-bold text-white font-mono tabular-nums">
                            {fact.value}
                          </div>
                          {fact.subtext && (
                            <div className="text-[10px] text-amber-400/80">{fact.subtext}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'usage' && (
                  <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-4 space-y-4 text-xs">
                    <div>
                      <div className="font-bold text-white mb-2">Key Features:</div>
                      <ul className="space-y-1.5 text-slate-300">
                        {product.keyFeatures.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <div className="font-bold text-white mb-1">Suggested Use & Dosage:</div>
                      <p className="text-slate-300 leading-relaxed">{product.suggestedUse}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-4 text-xs">
                    <div className="font-bold text-white mb-2">Active Ingredients & Formulation:</div>
                    <p className="text-slate-300 leading-relaxed">{product.ingredients}</p>
                    <div className="mt-3 text-[11px] text-slate-400">
                      Manufactured in an FSSAI & GMP certified facility. 100% free of banned substances. Inspect the physical bottle at our store counter anytime.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
