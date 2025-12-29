
import React from 'react';

export interface Product {
  id: string;
  name: string;
  sku: string;
  short_desc: string;
  description: string;
  price: number;
  sale_price: number | null;
  category: string;
  image: string;
  brand: string;
  in_stock: boolean;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AIRecommendation {
  productIds: string[];
  reasoning: string;
  sources?: GroundingSource[];
}

// Added missing BrandInfo interface to resolve import error in App.tsx
export interface BrandInfo {
  name: string;
  count: number;
  icon: string;
}

// Added missing CategoryInfo interface to resolve import error in App.tsx
export interface CategoryInfo {
  name: string;
  count: number;
  icon: React.ReactNode;
}
