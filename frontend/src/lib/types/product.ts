export interface UserInfo {
  id: string;
  name: string | null;
  email: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  name_en?: string;
  name_ko?: string;
  description?: string | null;
  description_en?: string;
  description_ko?: string;
  image?: string | null;
  images?: string[] | null;
  price: number;
  originalPrice?: number | null;
  rating?: number | null;
  reviewCount: number;
  reviews?: { rating: number; comment: string }[];
  category?: string | null;
  category_en?: string;
  category_ko?: string;
  restaurantName?: string | null;
  restaurantName_en?: string;
  restaurantName_ko?: string;
  restaurantAddress?: string | null;
  restaurantAddress_en?: string;
  restaurantAddress_ko?: string;
  cuisineType?: string | null;
  cuisineType_en?: string;
  cuisineType_ko?: string;
  tags?: string[] | null;
  calories?: number | null;
  ingredients?: string | null;
  allergens?: string | null;
  portionSize?: string | null;
  priceRange?: string | null;
  preparationTime?: number | null;
  spiceLevel?: number | null;
  isAvailable: boolean;
  userId: string;
  user?: UserInfo;
  createdAt?: string;
  updatedAt?: string;
}

