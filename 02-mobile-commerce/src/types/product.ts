export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // 할인 전 가격
  discount?: number; // 할인율 %
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  inStock: boolean;
  stockCount: number;
  deliveryTime: number; // 분 단위
  deliveryFee: number;
  freeDeliveryThreshold?: number; // 무료배송 기준 금액
  weight?: number; // 그램 단위
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  features: string[]; // ['유기농', '당일제조', '냉장보관' 등]
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOptions?: { [key: string]: string };
  addedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories?: string[];
}

export interface DeliveryInfo {
  id: string;
  orderId: string;
  status: 'preparing' | 'cooking' | 'pickup' | 'delivering' | 'delivered';
  estimatedTime: number; // 분 단위
  currentLocation?: {
    lat: number;
    lng: number;
  };
  driverInfo?: {
    name: string;
    phone: string;
    photo: string;
  };
  timeline: {
    timestamp: Date;
    status: string;
    description: string;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  defaultAddressId?: string;
  preferences: {
    categories: string[];
    brands: string[];
    priceRange: { min: number; max: number };
  };
}

export interface Address {
  id: string;
  name: string; // '집', '회사' 등
  address: string;
  detailAddress?: string;
  zipCode: string;
  lat: number;
  lng: number;
  isDefault: boolean;
}