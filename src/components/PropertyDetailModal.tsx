import React, { useState, useEffect } from 'react';
import {
  X,
  Bed,
  Bath,
  Car,
  Maximize2,
  Trees,
  ShieldCheck,
  Check,
  MapPin,
  Calendar,
  Zap,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Building2,
} from 'lucide-react';
import { Property, CurrencyMode, Agent } from '../types';
import { SITE_CONFIG, formatDualPrice, getWhatsAppInquiryUrl } from '../config/siteConfig';

interface PropertyDetailModalProps {
  property: Property | null;
  currencyMode: CurrencyMode;
  agent?: Agent;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  currencyMode,
  agent,
  isFavorite,
  onToggleFavorite,
  onClose,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    setSelectedPhotoIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [property, onClose]);

  if (!property) return null;

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        {/* Barra superior con botón de cerrar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              REF: {property.reference}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
              {property.operation === 'venta' ? 'Venta' : 'Alquiler'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 rounded-full text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Guardar en favoritos"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Galería de Fotografías */}
        <div className="relative bg-slate-950">
          <div className="relative h-72 sm:h-96 w-full flex items-center justify-center overflow-hidden">
            <img
              src={property.images[selectedPhotoIndex] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedPhotoIndex((prev) =>
                      prev === 0 ? property.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setSelectedPhotoIndex((prev) =>
                      prev === property.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Fila de Miniaturas */}
          {property.images.length > 1 && (
            <div className="p-3 bg-slate-900/90 flex items-center gap-2 overflow-x-auto">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    selectedPhotoIndex === idx
                      ? 'border-emerald-400 opacity-100 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cuerpo de la Ficha Técnica */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* Precios y Título */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-editorial">
                  {priceFormatted.primary}
                </span>
                <span className="ml-3 text-sm font-semibold text-slate-500">
                  {priceFormatted.secondary}
                </span>
              </div>
              {property.hoaMonthlyUSD !== undefined && property.hoaMonthlyUSD > 0 && (
                <div className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-medium">
                  Cuota de condominio: <strong>${property.hoaMonthlyUSD} USD/mes</strong>
                </div>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3">
              {property.title}
            </h1>

            <p className="flex items-center gap-1.5 text-sm text-slate-600 mt-1">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {property.neighborhood}, {property.city}, {property.province}, Costa Rica
              </span>
            </p>

            {property.locationHighlights && (
              <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/80 p-2.5 rounded-xl mt-3 font-medium">
                📍 {property.locationHighlights}
              </p>
            )}
          </div>

          {/* Grilla Habitaclia de Parámetros Físicos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                <Bed className="w-4 h-4 text-emerald-600" />
                Dormitorios
              </span>
              <span className="text-lg font-bold text-slate-900">{property.bedrooms}</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                <Bath className="w-4 h-4 text-emerald-600" />
                Baños
              </span>
              <span className="text-lg font-bold text-slate-900">{property.bathrooms}</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                <Maximize2 className="w-4 h-4 text-emerald-600" />
                Construcción
              </span>
              <span className="text-lg font-bold text-slate-900">{property.areaBuilt} m²</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                <Car className="w-4 h-4 text-emerald-600" />
                Parqueos
              </span>
              <span className="text-lg font-bold text-slate-900">{property.garageSpots}</span>
            </div>
          </div>

          {/* Detalles Técnicos Adicionales */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600">
            {property.areaLot && property.areaLot > 0 && (
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="block text-slate-400">Área de Lote:</span>
                <span className="font-bold text-slate-800">{property.areaLot} m²</span>
              </div>
            )}
            {property.yearBuilt && (
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="block text-slate-400">Año de Construcción:</span>
                <span className="font-bold text-slate-800">{property.yearBuilt}</span>
              </div>
            )}
            {property.floor && (
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="block text-slate-400">Nivel de Planta:</span>
                <span className="font-bold text-slate-800">{property.floor}</span>
              </div>
            )}
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <span className="block text-slate-400">Calificación Energética:</span>
              <span className="font-bold text-emerald-700">{property.energyRating}</span>
            </div>
          </div>

          {/* Descripción Completa */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Descripción detallada</h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Lista de Amenidades y Equipamiento */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3">Amenidades y equipamiento</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {[
                { name: 'Seguridad 24/7 y control', active: property.hasSecurity24 },
                { name: 'Piscina / Área social', active: property.hasPool },
                { name: 'Terraza / Balcón', active: property.hasTerrace },
                { name: 'Jardín privado', active: property.hasGarden },
                { name: 'Aire acondicionado', active: property.hasAirConditioning },
                { name: 'Ascensor privado/comunitario', active: property.hasElevator },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl flex items-center gap-2 ${
                    item.active
                      ? 'bg-emerald-50 text-emerald-900 font-medium'
                      : 'bg-slate-100 text-slate-400 line-through'
                  }`}
                >
                  <Check
                    className={`w-3.5 h-3.5 ${
                      item.active ? 'text-emerald-600' : 'text-slate-300'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tarjeta de Asesor Inmobiliario Asignado */}
          {agent && (
            <div className="p-5 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <img
                  src={agent.photoUrl}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-400 shrink-0"
                />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold">
                    Asesor asignado
                  </span>
                  <h4 className="text-base font-bold text-white">{agent.name}</h4>
                  <p className="text-xs text-slate-300">{agent.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex-1 sm:flex-none p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-center"
                  title="Llamar al asesor"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Coordinar Visita</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
