import React, { useState } from 'react';
import { Star, X, CheckCircle, ShieldCheck } from 'lucide-react';
import { Product, Review } from '../types';

interface RatingServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSubmitReview: (review: Review) => void;
  initialProductId?: string;
}

export const RatingServiceModal: React.FC<RatingServiceModalProps> = ({
  isOpen,
  onClose,
  products,
  onSubmitReview,
  initialProductId,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProductId || products[0]?.id || ''
  );
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [flavor, setFlavor] = useState<string>('Chocolate Delight');
  const [fitnessGoal, setFitnessGoal] = useState<string>('Muscle Building');
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [recommend, setRecommend] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const activeProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const ratingDescriptions: Record<number, string> = {
    1: 'Poor — Did not meet expectations',
    2: 'Fair — Needs improvement',
    3: 'Good — Standard performance',
    4: 'Very Good — Highly effective',
    5: 'Excellent — Top-tier quality & taste',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!title.trim() || !comment.trim()) {
      setError('Please provide a review headline and comment.');
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: activeProduct.id,
      productName: activeProduct.name,
      author: authorName.trim(),
      rating,
      date: new Date().toISOString().split('T')[0],
      title: title.trim(),
      comment: comment.trim(),
      verified: true,
      flavor: activeProduct.flavors.length > 1 ? flavor : undefined,
      fitnessGoal,
      helpfulCount: 0,
    };

    onSubmitReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0F172A] border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white font-serif mb-2">
              Review Submitted!
            </h3>
            <p className="text-sm text-slate-300">
              Thank you for contributing to our verified athlete community. Your review has been recorded.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Royal Verified Athlete Review Service</span>
              </div>
              <h2 className="text-2xl font-bold text-white font-serif">
                Rate & Review Product
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Share your authentic feedback on taste, mixability, recovery, and results.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Select Product
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Star Rating Interactive Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-slate-600 transition-colors focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            (hoverRating || rating) >= star
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-amber-300 font-medium pl-2">
                    {ratingDescriptions[hoverRating || rating]}
                  </span>
                </div>
              </div>

              {/* Author & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram S."
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Email (for verification)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Flavor & Fitness Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeProduct.flavors.length > 1 ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Flavor Tested
                    </label>
                    <select
                      value={flavor}
                      onChange={(e) => setFlavor(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      {activeProduct.flavors.map((fl) => (
                        <option key={fl} value={fl}>
                          {fl}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Flavor
                    </label>
                    <div className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400">
                      Standard
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Your Fitness Goal
                  </label>
                  <select
                    value={fitnessGoal}
                    onChange={(e) => setFitnessGoal(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Muscle Building">Muscle Building</option>
                    <option value="Weight Gain">Weight Gain</option>
                    <option value="Recovery">Post-Workout Recovery</option>
                    <option value="Daily Health">Daily Health & Immunity</option>
                    <option value="Athletic Conditioning">Athletic Conditioning</option>
                  </select>
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sum up your experience in one sentence"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Detailed Review
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="How does it mix? How does it digest? What results have you noticed in training?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* Recommend Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="recommend"
                  checked={recommend}
                  onChange={(e) => setRecommend(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                />
                <label htmlFor="recommend" className="text-xs text-slate-300">
                  I recommend this product to other athletes and gym enthusiasts
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-lg shadow-amber-500/10 transition-all"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
