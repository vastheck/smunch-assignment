export type CommonDBFields = {
  id: string;
  createdAt: Date | null;
  updatedAt?: Date | null;
}

export type Restaurant = {
  name: string;
  cousine: string;
}

export type MenuItem = {
  name: string;
  description: string | null;
  restaurantId?: string;
  reviews?: Review[]
}

export type Review = {
  rating: number;
  description?: string | null;
  menuItemId?: string | null;
  restaurantId?: string;
}

export type ReviewData = {
  latestReview: (Review & CommonDBFields) | null,
  avarageRating: number | null,
}

export type RestaurantData = 
  Restaurant & 
  CommonDBFields & 
  ReviewData &
  {
    menuItems: (MenuItem & CommonDBFields & Partial<ReviewData>)[],
    avarageRating: number | null
  }
