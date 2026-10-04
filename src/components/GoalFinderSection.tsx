import React, { useState } from 'react';
import { Product } from '../types';
import { Dumbbell, TrendingUp, RefreshCw, HeartPulse, Plus, Check } from 'lucide-react';
import { ProductCanisterArt } from './ProductCanisterArt';

interface GoalFinderSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToInquiryList: (product: Product, flavor: string) => void;
}

export const GoalFinderSection: React.FC<GoalFinderSectionProps> = ({
  products,
  onSelectProduct,
  onAddToInquiryList,
}) => {
  const [activeGoal, setActiveGoal] = useState<'muscle-building' | 'weight-gain' | 'daily-health' | 'recovery'>('muscle-building');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const goals = [
    {
      id: 'muscle-building' as const,
      label: 'Muscle Building',
      icon: Dumbbell,
      tagline: 'Protein-Focused Supplementation',
      summary:
        'Protein-focused supplementation designed to complement your training and nutrition routine. Builds lean muscular tissue and optimizes protein synthesis.',
      recommendedProductIds: ['royal-100-isolate', 'protein-matrix'],
      timingTip: 'Ask store staff to show you our 100% Isolate (Aisle 1) and Sustained Matrix.',
    },
    {
      id: 'weight-gain' as const,
      label: 'Weight Gain',
      icon: TrendingUp,
      tagline: 'High-Calorie Mass Engineering',
      summary:
        'Herculez Gainer provides a high-calorie supplementation option for individuals working toward increased weight and muscle mass without empty sugar crashes.',
      recommendedProductIds: ['herculez-gainer'],
      timingTip: 'Ask counter staff to check our 6 lbs Herculez Gainer tub on Aisle 2.',
    },
    {
      id: 'recovery' as const,
      label: 'Recovery',
      icon: RefreshCw,
      tagline: 'Accelerated Tissue Repair',
      summary:
        'Royal 100% Isolate Protein Powder contains BCAAs and Glutamine and is designed to support rapid muscle recovery and eliminate prolonged delayed onset soreness.',
      recommendedProductIds: ['royal-100-isolate'],
      timingTip: 'Available on Aisle 1 with Chocolate Delight, Vanilla Delight, and Strawberry Sensation.',
    },
    {
      id: 'daily-health' as const,
      label: 'Daily Health',
      icon: HeartPulse,
      tagline: 'Vitality & Immune Defense',
      summary:
        'VITA LIFE provides daily multivitamin support for overall health, vitality, and immune function for active lifestyles.',
      recommendedProductIds: ['vita-life'],
      timingTip: 'Located on our Front Counter Showcase (60 enteric tablets per bottle).',
    },
  ];

  const currentGoalData = goals.find((g) => g.id === activeGoal)!;
  const recommendedProducts = products.filter((p) =>
    currentGoalData.recommendedProductIds.includes(p.id)
  );

  const handleAdd = (product: Product) => {
    onAddToInquiryList(product, product.flavors[0]);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="goals" className="py-20 sm:py-28 bg-[#0B0F18] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            In-Store Selection Guide
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif mb-4">
            Find the Right Product for Your Goal
          </h2>
          <p className="text-base text-slate-300">
            Select your primary fitness objective below to see which formulas are in stock at our store and where they are placed on our shelves.
          </p>
        </div>

        {/* 4 Interactive Goal Selector Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const isSelected = activeGoal === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setActiveGoal(goal.id)}
                className={`p-4 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-amber-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-white font-serif">{goal.label}</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{goal.tagline}</div>
              </button>
            );
          })}
        </div>

        {/* Goal Detail Showcase Card */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8">
          <div className="mb-8 pb-6 border-b border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Recommended In-Store Formula
                </span>
                <h3 className="text-2xl font-bold text-white font-serif mt-1">
                  Goal: {currentGoalData.label}
                </h3>
              </div>
              <div className="px-4 py-2 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 max-w-md">
                <span className="text-amber-400 font-bold">Counter Guidance: </span>
                {currentGoalData.timingTip}
              </div>
            </div>
            <p className="text-sm text-slate-300 mt-3 max-w-3xl leading-relaxed">
              {currentGoalData.summary}
            </p>
          </div>

          {/* Recommended Product(s) Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div
                  onClick={() => onSelectProduct(product)}
                  className="w-32 h-36 shrink-0 flex items-center justify-center cursor-pointer"
                >
                  <ProductCanisterArt product={product} size="sm" />
                </div>

                <div className="flex-1 w-full">
                  <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{product.stockStatus}</span>
                  </div>
                  <h4 className="text-base font-bold text-white font-serif mb-1">{product.name}</h4>
                  <p className="text-xs text-slate-400 mb-2 line-clamp-2">{product.shortDescription}</p>

                  <div className="text-[11px] text-amber-300/80 mb-3">
                    Shelf: {product.shelfLocation}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Counter Price</div>
                      <span className="text-lg font-black text-amber-400 font-mono tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-700 rounded-md transition-colors"
                      >
                        Specs
                      </button>
                      <button
                        onClick={() => handleAdd(product)}
                        className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap flex items-center gap-1"
                      >
                        {addedIds[product.id] ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Saved</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Visit List</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
