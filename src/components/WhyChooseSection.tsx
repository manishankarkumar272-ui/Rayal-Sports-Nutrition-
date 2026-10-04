import React from 'react';
import { Award, Shield, Compass, Sparkles } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const reasons = [
    {
      icon: Award,
      title: 'Performance-Focused Nutrition',
      description:
        'Products designed around the nutritional needs of athletes, bodybuilders, and fitness enthusiasts. Every formula is calibrated for maximum bioavailability and cellular recovery.',
      metric: '100%',
      metricLabel: 'Batch Verified',
    },
    {
      icon: Shield,
      title: 'Quality Protein Solutions',
      description:
        'From cold-microfiltered protein isolate to sustained-release protein blends, our range offers uncompromising purity and zero chalky binders or artificial fillers.',
      metric: '27g',
      metricLabel: 'Isolate / Serving',
    },
    {
      icon: Compass,
      title: 'Goal-Oriented Products',
      description:
        'Choose products according to your goals, including muscle building, weight gain, recovery, and daily health. Clear dosage guides eliminate the guesswork.',
      metric: '4 Core',
      metricLabel: 'Target Objectives',
    },
    {
      icon: Sparkles,
      title: 'Premium Taste',
      description:
        'Enjoy gourmet taste profiles including Chocolate Delight, Vanilla Delight, and Strawberry Sensation with ultra-smooth texture and zero added sugar.',
      metric: '0g',
      metricLabel: 'Sugar Added',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#090D14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            The Royal Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif mb-4">
            Why Choose Royal Sports & Nutrition?
          </h2>
          <p className="text-base text-slate-300">
            Engineered at the intersection of sports physiology and clean food science. Built for those who demand measurable athletic progression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-serif">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-amber-400 font-mono tabular-nums">
                    {item.metric}
                  </span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                    {item.metricLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
