import React, { useState, useEffect } from 'react';
import { PRODUCTS, INITIAL_REVIEWS } from './data/products';
import { Product, Review, StoreInquiryItem } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ProductsSection } from './components/ProductsSection';
import { GoalFinderSection } from './components/GoalFinderSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { InquiryListDrawer } from './components/InquiryListDrawer';
import { SearchModal } from './components/SearchModal';
import { RatingServiceModal } from './components/RatingServiceModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('royal_sports_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [inquiryList, setInquiryList] = useState<StoreInquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('royal_sports_inquiry_list');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal visibility states
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isInquiryDrawerOpen, setIsInquiryDrawerOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
  const [ratingTargetProductId, setRatingTargetProductId] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('royal_sports_reviews', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('royal_sports_inquiry_list', JSON.stringify(inquiryList));
    } catch {
      // ignore
    }
  }, [inquiryList]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Inquiry list operations
  const handleAddToInquiryList = (product: Product, flavor: string, quantity = 1) => {
    const itemId = `${product.id}-${flavor.replace(/\s+/g, '-').toLowerCase()}`;
    setInquiryList((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          flavor,
          size: product.containerWeight,
          quantity,
          price: product.price,
        },
      ];
    });
    showToast(`Added ${quantity}x ${product.name} (${flavor}) to Store Visit List`);
  };

  const handleUpdateInquiryQuantity = (id: string, delta: number) => {
    setInquiryList((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as StoreInquiryItem[]
    );
  };

  const handleRemoveInquiryItem = (id: string) => {
    setInquiryList((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearInquiryList = () => {
    setInquiryList([]);
  };

  // Rating Service submission
  const handleSubmitReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);

    // Recalculate average rating for that product
    const productReviews = [newReview, ...reviews.filter((r) => r.productId === newReview.productId)];
    const avg =
      productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === newReview.productId) {
          return {
            ...p,
            rating: parseFloat(avg.toFixed(2)),
            reviewCount: p.reviewCount + 1,
          };
        }
        return p;
      })
    );

    showToast('Thank you! Your verified in-store review has been recorded.');
  };

  const handleHelpfulClick = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleOpenReviewsForProduct = (productId: string) => {
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWriteReview = (productId?: string) => {
    setRatingTargetProductId(productId);
    setIsRatingModalOpen(true);
  };

  const handleSelectGoal = (goalKey: string) => {
    const el = document.getElementById('goals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalInquiryItemCount = inquiryList.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 border border-amber-500/60 shadow-2xl text-xs text-white flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Header
        inquiryListCount={totalInquiryItemCount}
        onOpenInquiryList={() => setIsInquiryDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          flagshipProduct={products[0]}
          onSelectProduct={(p) => setDetailProduct(p)}
          onAddToInquiryList={handleAddToInquiryList}
        />

        {/* In-Store Featured Products Catalog */}
        <ProductsSection
          products={products}
          onSelectProduct={(p) => setDetailProduct(p)}
          onAddToInquiryList={handleAddToInquiryList}
          onOpenReviewsForProduct={handleOpenReviewsForProduct}
        />

        {/* About Royal Sports & Nutrition */}
        <AboutSection onSelectGoal={handleSelectGoal} />

        {/* Philosophy & Taste Profiles */}
        <PhilosophySection />

        {/* In-Store Goal Guide */}
        <GoalFinderSection
          products={products}
          onSelectProduct={(p) => setDetailProduct(p)}
          onAddToInquiryList={handleAddToInquiryList}
        />

        {/* Why Choose Royal Sports & Nutrition */}
        <WhyChooseSection />

        {/* Customer Rating Service & Reviews */}
        <ReviewsSection
          reviews={reviews}
          products={products}
          onOpenWriteReview={handleOpenWriteReview}
          onHelpfulClick={handleHelpfulClick}
          preselectedProductId={ratingTargetProductId}
        />

        {/* Store Info & Visit / Enquiry Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        products={products}
        onSelectProduct={(p) => setDetailProduct(p)}
        onOpenReviews={() => {
          const el = document.getElementById('reviews');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals & Slide-out Drawers */}
      <ProductDetailModal
        product={detailProduct}
        isOpen={Boolean(detailProduct)}
        onClose={() => setDetailProduct(null)}
        onAddToInquiryList={handleAddToInquiryList}
        onOpenReviews={(prodId) => {
          handleOpenReviewsForProduct(prodId);
        }}
      />

      {/* Store Visit / Reservation List Drawer */}
      <InquiryListDrawer
        isOpen={isInquiryDrawerOpen}
        onClose={() => setIsInquiryDrawerOpen(false)}
        items={inquiryList}
        onUpdateQuantity={handleUpdateInquiryQuantity}
        onRemoveItem={handleRemoveInquiryItem}
        onClearList={handleClearInquiryList}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setDetailProduct(p)}
      />

      <RatingServiceModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        products={products}
        onSubmitReview={handleSubmitReview}
        initialProductId={ratingTargetProductId}
      />
    </div>
  );
}
