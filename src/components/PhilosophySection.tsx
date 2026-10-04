import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Flame, Coffee, Heart } from 'lucide-react';
import { TASTE_PROFILES } from '../data/products';

export const PhilosophySection: React.FC = () => {
  const [activeTasteIndex, setActiveTasteIndex] = useState(0);

  const pillars = [
    {
      title: 'Low Carbohydrates',
      description: 'Strict macro control with minimal carbs to keep your nutrition clean and lean.',
    },
    {
      title: 'Zero Sugar Options',
      description: 'Zero added sucrose or glucose spikes. Pure nutrition without unneeded calories.',
    },
    {
      title: 'Easy Digestion',
      description: 'Lactose-free, cold micro-filtration and digestive enzymes ensure smooth absorption without bloating.',
    },
    {
      title: 'Quality Protein Nutrition',
      description: 'Uncompromised biological value with high naturally occurring BCAAs and Glutamine.',
    },
    {
      title: 'Premium Taste Profiles',
      description: 'Gourmet flavor engineering perfected so your fitness shakes are a daily highlight.',
    },
  ];

  return (
    <section id="philosophy" className="py-20 sm:py-28 bg-[#090D14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">
            Our Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif mb-6 [text-wrap:balance]">
            Advanced Nutrition. Clean Profiles. Premium Taste.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            At Royal Sports & Nutrition, our philosophy focuses on delivering advanced supplement
            profiles engineered for peak physical output. We refuse to compromise between nutritional
            purity and sensational taste.
          </p>
        </div>

        {/* 2-Column Grid: 5 Core Pillars on Left + Interactive Taste Lab on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: 5 Nutritional Pillars */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold text-white mb-6 font-serif flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              The Five Royal Formulation Standards
            </h3>

            <div className="space-y-3">
              {pillars.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex items-start gap-4"
                >
                  <div className="text-amber-400 mt-1 shrink-0 font-mono text-sm font-bold">
                    0{idx + 1}.
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">{pillar.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Taste Profiles Showcase */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Flavor Engineering
                </span>
                <span className="text-xs text-slate-400">Natural Taste Profiles</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-serif">
                Three Distinct Taste Profiles
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Engineered with real cocoa, aromatic vanilla pods, and fruit essence to deliver a smooth,
                dessert-grade experience without guilt.
              </p>

              {/* Flavor Selector Tabs */}
              <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 mb-6">
                {TASTE_PROFILES.map((profile, i) => (
                  <button
                    key={profile.name}
                    onClick={() => setActiveTasteIndex(i)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap truncate px-2 ${
                      activeTasteIndex === i
                        ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {profile.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Active Flavor Sensory Card */}
              {(() => {
                const current = TASTE_PROFILES[activeTasteIndex];
                return (
                  <div
                    className={`rounded-xl p-5 border border-slate-800 bg-gradient-to-br ${current.bg} transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-bold text-white font-serif">{current.name}</h4>
                      <div
                        className="w-4 h-4 rounded-full border border-white/40"
                        style={{ backgroundColor: current.accent }}
                      />
                    </div>

                    <p className="text-sm text-slate-200 leading-relaxed mb-5">{current.notes}</p>

                    <div className="border-t border-white/10 pt-4">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Available In:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {current.availableIn.map((prod) => (
                          <span
                            key={prod}
                            className="text-xs font-medium text-amber-200/90 py-0.5"
                          >
                            {prod} ·
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="mt-6 pt-5 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
                <span>100% Aspartame Free</span>
                <span>Zero Chalky Residue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
