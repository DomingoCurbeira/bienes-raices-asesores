export type OperationType = 'venta' | 'alquiler';

export type PropertyType =
  | 'casa'
  | 'apartamento'
  | 'atico'
  | 'villa'
  | 'terreno'
  | 'duplex';

export type PropertyStatus =
  | 'disponible'
  | 'exclusiva'
  | 'rebajado'
  | 'nuevo'
  | 'reservado';

export type CurrencyMode = 'USD' | 'CRC';

export interface Property {
  id: string;
  reference: string;
  title: string;
  shortDescription: string;
  description: string;
  operation: OperationType;
  type: PropertyType;
  status: PropertyStatus;
  priceUSD: number;
  previousPriceUSD?: number;
  province: string;
  city: string;
  neighborhood: string;
  locationHighlights?: string;
  bedrooms: number;
  bathrooms: number;
  areaBuilt: number; // m² de construcción
  areaLot?: number; // m² de terreno / lote
  garageSpots: number;
  floor?: string;
  hoaMonthlyUSD?: number; // Cuota condominal
  hasPool: boolean;
  hasSecurity24: boolean;
  hasTerrace: boolean;
  hasGarden: boolean;
  hasElevator: boolean;
  hasAirConditioning: boolean;
  energyRating: string;
  yearBuilt: number;
  images: string[];
  featured: boolean;
  createdAt: string;
  agentId: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    slogan: string;
    subSlogan: string;
    logoType: 'text' | 'image';
    logoImageUrl?: string;
  };
  theme: {
    palette: 'emerald' | 'gold' | 'terracotta' | 'sapphire' | 'custom';
    colors: {
      primary: string;
      accent: string;
      accentHover: string;
      accentLight: string;
      accentBg: string;
    };
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    sinpeMovil: string;
    schedule: string;
  };
  currency: {
    defaultMode: CurrencyMode;
    exchangeRate: number; // ₡ por cada $1 USD
  };
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  email: string;
  photoUrl: string;
  bio: string;
  languages: string[];
  salesCount: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  propertyPurchased: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl: string;
}

export interface FilterState {
  operation: OperationType;
  propertyType: PropertyType | 'todos';
  city: string;
  neighborhood: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  minBathrooms: number;
  hasGarage: boolean;
  hasPool: boolean;
  hasTerrace: boolean;
  hasElevator: boolean;
  hasSecurity24: boolean;
  onlyExclusives: boolean;
  onlyDiscounted: boolean;
  searchQuery: string;
}
