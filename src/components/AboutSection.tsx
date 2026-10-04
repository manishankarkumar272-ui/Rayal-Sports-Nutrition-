import React from 'react';
import { Target, Dumbbell, TrendingUp, HeartPulse, RefreshCw } from 'lucide-react';

interface AboutSectionProps {
  onSelectGoal: (goalKey: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSelectGoal }) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0B0F18] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">
            About Royal Sports & Nutrition
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif [text-wrap:balance] mb-6">
            Nutrition Designed for Your Fitness Journey
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-4">
            Royal Sports & Nutrition is dedicated to providing high-quality nutritional formulas and
            protein supplements for individuals committed to an active and healthy lifestyle.
          </p>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Our product range is designed to support different fitness goals, including muscle building,
            weight gain, recovery, and daily health. Whether you are training at the gym, working toward
            a specific physique, or simply looking to support your daily nutrition, Royal Sports & Nutrition
            offers focused supplementation for your fitness journey.
          </p>
        </div>

        {/* 4 Supported Fitness Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Goal 1 */}
          <div
            onClick={() => onSelectGoal('muscle-building')}
            className="group p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif group-hover:text-amber-400 transition-colors">
              Muscle Building
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Protein-focused supplementation designed to complement your training and nutrition routine.
            </p>
            <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
              View Formulas →
            </span>
          </div>

          {/* Goal 2 */}
          <div
            onClick={() => onSelectGoal('weight-gain')}
            className="group p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif group-hover:text-amber-400 transition-colors">
              Weight Gain
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Herculez Gainer provides a high-calorie supplementation option for individuals working toward increased weight.
            </p>
            <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
              View Formulas →
            </span>
          </div>

          {/* Goal 3 */}
          <div
            onClick={() => onSelectGoal('recovery')}
            className="group p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif group-hover:text-amber-400 transition-colors">
              Muscle Recovery
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Royal 100% Isolate contains BCAAs and Glutamine and is engineered to accelerate post-workout recovery.
            </p>
            <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
              View Formulas →
            </span>
          </div>

          {/* Goal 4 */}
          <div
            onClick={() => onSelectGoal('daily-health')}
            className="group p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif group-hover:text-amber-400 transition-colors">
              Daily Health
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              VITA LIFE provides daily multivitamin support for overall health, vitality, and immune function.
            </p>
            <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
              View Formulas →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
