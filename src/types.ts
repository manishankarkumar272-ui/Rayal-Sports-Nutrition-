export interface NutritionFact {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'isolate' | 'gainer' | 'blend' | 'multivitamin';
  categoryLabel: string;
  targetGoal: 'muscle-building' | 'weight-gain' | 'daily-health' | 'recovery';
  targetGoalLabel: string;
  price: number; // in INR store price
  originalPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  servingSize: string;
  servingsPerContainer: number | string;
  containerWeight: string;
  nutritionProfile: NutritionFact[];
  keyFeatures: string[];
  flavors: string[];
  stockStatus: 'Available in Store' | 'High Demand' | 'Fresh Batch Arrived';
  badge?: string;
  accentColor: string;
  suggestedUse: string;
  ingredients: string;
  shelfLocation?: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  author: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  flavor?: string;
  fitnessGoal?: string;
  helpfulCount: number;
}

export interface StoreInquiryItem {
  id: string; // unique per item + flavor
  product: Product;
  flavor: string;
  size: string;
  quantity: number;
  price: number;
}
