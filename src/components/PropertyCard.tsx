import React, { useState } from 'react';
import {
  Bed,
  Bath,
  Car,
  Maximize2,
  Trees,
  ShieldCheck,
  Heart,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Eye,
  Tag,
  ArrowDownRight,
} from 'lucide-react';
import { Property, CurrencyMode } from '../types';
import { SITE_CONFIG, formatDualPrice, getWhatsAppInquiryUrl } from '../config/siteConfig';

interface PropertyCardProps {
  property: Property;
  currencyMode: CurrencyMode;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currencyMode,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  layout = 'grid',
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(property.id);
  };

  const priceFormatted = formatDualPrice(
    property.priceUSD,
    currencyMode,
    SITE_CONFIG.currency.exchangeRate,
    property.operation === 'alquiler'
  );

  const whatsappInquiryUrl = getWhatsAppInquiryUrl(
    SITE_CONFIG.contact.whatsapp,
    property.reference,
    property.title,
    priceFormatted.primary
  );

  // Descuento si está rebajado
  const discountPercent =
    property.previousPriceUSD && property.previousPriceUSD > property.priceUSD
      ? Math.round(((property.previousPriceUSD - property.priceUSD) / property.previousPriceUSD) * 100)
      : null;

  return (
    <article
      onClick={() => onSelectProperty(property)}
      className={`group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer ${
        layout === 'list' ? 'md:flex-row' : ''
      }`}
    >
      {/* Carrusel de Imágenes */}
      <div
        className={`relative bg-slate-900 overflow-hidden shrink-0 ${
          layout === 'list' ? 'md:w-80 h-64 md:h-auto' : 'h-64 sm:h-72 w-full'
        }`}
      >
        <img
          src={property.images[currentImageIndex] || property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradiente protector para textos */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>

        {/* Badges superiores: Operación y Estatus */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-900/90 text-white backdrop-blur-xs">
            {property.operation === 'venta' ? 'En Venta' : 'En Alquiler'}
          </span>

          {property.status === 'exclusiva' && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
              Exclusiva
            </span>
          )}

          {property.status === 'nuevo' && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-xs">
              Nuevo
            </span>
          )}

          {property.status === 'rebajado' && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-rose-600 text-white shadow-xs flex items-center gap-0.5">
              <ArrowDownRight className="w-3 h-3" />
              <span>{discountPercent ? `-${discountPercent}%` : 'Rebajado'}</span>
            </span>
          )}
        </div>

        {/* Botón de Favorito */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-600 transition-all shadow-md z-10 cursor-pointer"
          title="Guardar en favoritos"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Flechas de navegación de fotos */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Contador de fotos inferior */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-[11px] font-semibold backdrop-blur-xs z-10 pointer-events-none">
          {currentImageIndex + 1} / {property.images.length}
        </div>

        {/* Referencia única */}
        <div className="absolute bottom-3 left-3 text-[11px] text-slate-200 font-mono tracking-wider z-10 pointer-events-none">
          Ref: {property.reference}
        </div>
      </div>

      {/* Contenido Habitaclia con métricas físicas detalladas */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Bloque de Precios Bimoneda ($ USD / ₡ CRC) */}
          <div className="mb-2">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {priceFormatted.primary}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {priceFormatted.secondary}
              </span>
            </div>

            {property.hoaMonthlyUSD !== undefined && property.hoaMonthlyUSD > 0 && (
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Cuota cond. aprox: ${property.hoaMonthlyUSD} USD/mes
              </span>
            )}
          </div>

          {/* Título de la propiedad */}
          <h3 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {property.title}
          </h3>

          {/* Ubicación en Costa Rica */}
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {property.neighborhood}, {property.city}, {property.province}
          </p>

          {/* Resumen corto */}
          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {property.shortDescription}
          </p>
        </div>

        {/* Grilla Habitaclia de Especificaciones Físicas */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="grid grid-cols-4 gap-2 text-center text-slate-700">
            {/* Habitaciones */}
            <div className="p-1.5 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-slate-900 font-bold text-xs">
                <Bed className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{property.bedrooms}</span>
              </div>
              <span className="text-[10px] text-slate-500 block truncate">Habit.</span>
            </div>

            {/* Baños */}
            <div className="p-1.5 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-slate-900 font-bold text-xs">
                <Bath className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{property.bathrooms}</span>
              </div>
              <span className="text-[10px] text-slate-500 block truncate">Baños</span>
            </div>

            {/* Cocheras */}
            <div className="p-1.5 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-slate-900 font-bold text-xs">
                <Car className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{property.garageSpots}</span>
              </div>
              <span className="text-[10px] text-slate-500 block truncate">Parqueos</span>
            </div>

            {/* Construcción m² */}
            <div className="p-1.5 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-slate-900 font-bold text-xs">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{property.areaBuilt}</span>
              </div>
              <span className="text-[10px] text-slate-500 block truncate">m² constr.</span>
            </div>
          </div>

          {/* Insignias de Amenidades clave */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600">
            {property.areaLot && property.areaLot > 0 && (
              <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                <Trees className="w-3 h-3 text-emerald-600" />
                <span>Lote: {property.areaLot} m²</span>
              </span>
            )}

            {property.hasSecurity24 && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Seguridad 24/7</span>
              </span>
            )}

            {property.hasPool && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-medium">
                Piscina
              </span>
            )}
          </div>
        </div>

        {/* Acciones del Card */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProperty(property);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ficha completa</span>
          </button>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
};
