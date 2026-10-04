import React, { useState } from 'react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';
import { ProductCanisterArt } from './ProductCanisterArt';
import { Star, Check, Plus, Eye, MessageSquare, MapPin } from 'lucide-react';

interface ProductsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToInquiryList: (product: Product, flavor: string) => void;
  onOpenReviewsForProduct: (productId: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  onSelectProduct,
  onAddToInquiryList,
  onOpenReviewsForProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFlavors, setSelectedFlavors] = useState<Record<string, string>>({
    'royal-100-isolate': 'Chocolate Delight',
    'herculez-gainer': 'Chocolate Delight',
    'protein-matrix': 'Chocolate Delight',
    'vita-life': 'Unflavored Coated Tablets',
  });
  const [addedRecently, setAddedRecently] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All In-Store Products' },
    { id: 'isolate', label: '100% Isolate' },
    { id: 'gainer', label: 'Mass Gainer' },
    { id: 'blend', label: 'Protein Matrix' },
    { id: 'multivitamin', label: 'Daily Wellness' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleFlavorChange = (productId: string, flavor: string) => {
    setSelectedFlavors((prev) => ({ ...prev, [productId]: flavor }));
  };

  const handleAdd = (product: Product) => {
    const chosenFlavor = selectedFlavors[product.id] || product.flavors[0];
    onAddToInquiryList(product, chosenFlavor);
    setAddedRecently((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedRecently((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="products" className="py-20 sm:py-28 bg-[#090D14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>In-Store Catalog & Live Availability</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif">
              Available at Our Store
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Inspect our current stock, container weights, and flavor options available for immediate counter pickup.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* In-Store Availability Notice */}
        <div className="mb-8 p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">💡 Store Visit Tip:</span>
            <span>You can add products to your "Store Visit List" and show it at our counter or WhatsApp us for instant reservation!</span>
          </div>
          <span className="hidden sm:inline font-mono text-emerald-400 font-semibold">● Ready in Store</span>
        </div>

        {/* 4 Products Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const currentFlavor = selectedFlavors[product.id] || product.flavors[0];
            const isAdded = addedRecently[product.id];

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/90 hover:border-amber-500/40 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1"
              >
                <div>
                  {/* Top Kicker & Store Stock Status */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {product.stockStatus}
                    </span>
                    <button
                      onClick={() => onOpenReviewsForProduct(product.id)}
                      className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
                      title="View verified reviews"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-mono text-xs font-bold tabular-nums">
                        {product.rating}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        ({product.reviewCount})
                      </span>
                    </button>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-lg font-bold text-white mb-1 font-serif group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-amber-200/80 italic mb-2">
                    {product.subtitle}
                  </p>

                  {/* Shelf Location Callout */}
                  {product.shelfLocation && (
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mb-3">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{product.shelfLocation}</span>
                    </div>
                  )}

                  {/* Canister Visual Stage */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="cursor-pointer relative rounded-xl bg-slate-950/60 border border-slate-800/60 p-2 my-2 group-hover:border-slate-700 transition-colors flex items-center justify-center overflow-hidden"
                  >
                    <ProductCanisterArt
                      product={product}
                      activeFlavor={currentFlavor}
                      size="sm"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 border border-slate-700 rounded-lg shadow-md">
                        <Eye className="w-3.5 h-3.5" />
                        Nutrition & Ingredients
                      </span>
                    </div>
                  </div>

                  {/* Key Nutrition Metrics Row */}
                  <div className="grid grid-cols-3 gap-1 py-2.5 my-3 border-y border-slate-800/80 text-center text-xs">
                    {product.nutritionProfile.slice(0, 3).map((metric) => (
                      <div key={metric.label} className="px-1">
                        <div className="font-extrabold text-white font-mono tabular-nums text-sm">
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Available Flavors in Store */}
                  {product.flavors.length > 1 && (
                    <div className="mb-4">
                      <div className="text-[11px] text-slate-400 mb-1.5 flex justify-between">
                        <span>In-Stock Flavors:</span>
                        <span className="text-white font-medium text-xs truncate max-w-[120px]">
                          {currentFlavor}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                        {product.flavors.map((flavor) => (
                          <button
                            key={flavor}
                            onClick={() => handleFlavorChange(product.id, flavor)}
                            className={`py-1 px-1.5 text-[11px] font-medium rounded border transition-colors truncate ${
                              currentFlavor === flavor
                                ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-semibold'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                            title={flavor}
                          >
                            {flavor.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Features Bullet List */}
                  <ul className="space-y-1 mb-5 text-[11px] text-slate-300">
                    {product.keyFeatures.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">✓</span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer: Store Price & Action Buttons */}
                <div className="pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Store Price</div>
                      <div className="text-xl font-black text-amber-400 font-mono tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 text-right">
                      <div>{product.containerWeight}</div>
                      <div className="text-emerald-400 font-medium">Ready at Counter</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="py-2.5 px-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors text-center whitespace-nowrap"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => handleAdd(product)}
                      className={`py-2.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                        isAdded
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-sm'
                      }`}
                      title="Add to your store visit wishlist"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Saved!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Visit List</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Direct WhatsApp Check Link */}
                  <a
                    href={`https://wa.me/${STORE_INFO.phoneClean}?text=Hello%20Royal%20Sports%20%26%20Nutrition%2C%20is%20${encodeURIComponent(
                      product.name
                    )}%20(${encodeURIComponent(currentFlavor)})%20available%20in%20stock%20today%3F`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-800/40 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Check Stock via WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
