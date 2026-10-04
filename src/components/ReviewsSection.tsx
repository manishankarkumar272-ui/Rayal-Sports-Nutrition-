import React, { useState } from 'react';
import { Star, ShieldCheck, ThumbsUp, PlusCircle, Check } from 'lucide-react';
import { Product, Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  products: Product[];
  onOpenWriteReview: (productId?: string) => void;
  onHelpfulClick: (reviewId: string) => void;
  preselectedProductId?: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  products,
  onOpenWriteReview,
  onHelpfulClick,
  preselectedProductId,
}) => {
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>(
    preselectedProductId || 'all'
  );
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    const matchesProduct =
      selectedProductFilter === 'all' || r.productId === selectedProductFilter;
    const matchesStar = starFilter === 'all' || r.rating === starFilter;
    return matchesProduct && matchesStar;
  });

  // Calculate statistics
  const totalReviewsCount = reviews.length;
  const averageRating =
    totalReviewsCount > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount).toFixed(1)
      : '5.0';

  const starCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    if (starCounts[r.rating] !== undefined) {
      starCounts[r.rating]++;
    }
  });

  const handleHelpful = (id: string) => {
    if (helpfulVoted[id]) return;
    onHelpfulClick(id);
    setHelpfulVoted((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#090D14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
              Verified Athlete Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif">
              Customer Ratings & Reviews
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Authentic feedback from competitive lifters, athletes, and fitness enthusiasts training with Royal Sports & Nutrition.
            </p>
          </div>

          <button
            onClick={() => onOpenWriteReview()}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm transition-all whitespace-nowrap self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Overview Summary Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 mb-12">
          {/* Big Score Box */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8 text-center">
            <div className="text-5xl sm:text-6xl font-black text-amber-400 font-mono tabular-nums mb-2">
              {averageRating}
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <div className="text-xs text-slate-400">
              Based on <span className="font-bold text-white font-mono">{totalReviewsCount}</span> verified ratings
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Certified Formula Reviews</span>
            </div>
          </div>

          {/* Star Distribution Progress Bars */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-2.5">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = starCounts[stars] || 0;
              const percent = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
              return (
                <div
                  key={stars}
                  onClick={() => setStarFilter(starFilter === stars ? 'all' : stars)}
                  className="flex items-center gap-3 text-xs cursor-pointer group"
                >
                  <span className="w-12 text-slate-300 font-medium group-hover:text-amber-400 transition-colors">
                    {stars} Stars
                  </span>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-slate-400 font-mono tabular-nums">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Controls (Product Filter & Star Filter) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-1">
              Filter By Product:
            </span>
            <button
              onClick={() => setSelectedProductFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedProductFilter === 'all'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              All Products
            </button>
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProductFilter(p.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedProductFilter === p.id
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {p.category === 'isolate' ? '100% Isolate' : p.name}
              </button>
            ))}
          </div>

          {starFilter !== 'all' && (
            <button
              onClick={() => setStarFilter('all')}
              className="text-xs text-amber-400 hover:underline"
            >
              Showing only {starFilter}-star reviews (Click to clear)
            </button>
          )}
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800">
            <p className="text-sm text-slate-400 mb-3">No reviews found matching the current filter.</p>
            <button
              onClick={() => {
                setSelectedProductFilter('all');
                setStarFilter('all');
              }}
              className="text-xs text-amber-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="flex flex-col justify-between rounded-xl bg-slate-900/60 border border-slate-800 p-5 hover:border-slate-700 transition-colors"
              >
                <div>
                  {/* Top line: Stars + Date */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                      {rev.date}
                    </span>
                  </div>

                  {/* Headline */}
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug font-serif">
                    “{rev.title}”
                  </h4>

                  {/* Comment */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {rev.comment}
                  </p>
                </div>

                {/* Footer metadata (Unboxed, no pills) */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <div className="flex items-center gap-1.5 font-medium text-slate-200">
                      <span>{rev.author}</span>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-0.5 text-emerald-400 text-[10px]">
                          <Check className="w-3 h-3" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleHelpful(rev.id)}
                      className={`inline-flex items-center gap-1 text-[11px] transition-colors ${
                        helpfulVoted[rev.id]
                          ? 'text-amber-400 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Mark as helpful"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span className="font-mono tabular-nums">
                        {rev.helpfulCount + (helpfulVoted[rev.id] ? 1 : 0)}
                      </span>
                    </button>
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5 flex-wrap">
                    <span className="text-amber-300">{rev.productName}</span>
                    {rev.flavor && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{rev.flavor}</span>
                      </>
                    )}
                    {rev.fitnessGoal && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>Goal: {rev.fitnessGoal}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
