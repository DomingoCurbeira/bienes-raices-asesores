import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Home,
  SlidersHorizontal,
  DollarSign,
  Bed,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { FilterState, OperationType, PropertyType, CurrencyMode } from '../types';

interface HeroSectionProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onSearch: () => void;
  matchingCount: number;
  currencyMode: CurrencyMode;
  onNavigateToValuation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  onFilterChange,
  onSearch,
  matchingCount,
  currencyMode,
  onNavigateToValuation,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const locations = [
    { label: 'Todas las zonas de Costa Rica', value: '' },
    { label: 'Escazú (Jaboncillos, San Rafael)', value: 'Escazú' },
    { label: 'Santa Ana (Valle del Sol, Pozos)', value: 'Santa Ana' },
    { label: 'San José (Rohrmoser, Sabana, Escalante)', value: 'San José' },
    { label: 'Curridabat (Pinares, Granadilla)', value: 'Curridabat' },
    { label: 'Manuel Antonio & Quepos (Pacífico)', value: 'Manuel Antonio' },
    { label: 'Tamarindo & Flamingo (Guanacaste)', value: 'Tamarindo' },
  ];

  const propertyTypes: { label: string; value: PropertyType | 'todos' }[] = [
    { label: 'Todos los tipos', value: 'todos' },
    { label: 'Casas', value: 'casa' },
    { label: 'Apartamentos', value: 'apartamento' },
    { label: 'Áticos / Penthouse', value: 'atico' },
    { label: 'Villas de Lujo', value: 'villa' },
    { label: 'Dúplex / Lofts', value: 'duplex' },
  ];

  const priceRangesUSD = [
    { label: 'Hasta $200,000 USD', max: 200000 },
    { label: 'Hasta $500,000 USD', max: 500000 },
    { label: 'Hasta $800,000 USD', max: 800000 },
    { label: 'Hasta $1,500,000 USD', max: 1500000 },
    { label: 'Sin límite de precio', max: 99999999 },
  ];

  const priceRangesCRC = [
    { label: 'Hasta ₡100 Millones', max: 100000000 / SITE_CONFIG.currency.exchangeRate },
    { label: 'Hasta ₡250 Millones', max: 250000000 / SITE_CONFIG.currency.exchangeRate },
    { label: 'Hasta ₡400 Millones', max: 400000000 / SITE_CONFIG.currency.exchangeRate },
    { label: 'Hasta ₡750 Millones', max: 750000000 / SITE_CONFIG.currency.exchangeRate },
    { label: 'Sin límite de precio', max: 99999999 },
  ];

  const activePriceRanges = currencyMode === 'USD' ? priceRangesUSD : priceRangesCRC;

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Elementos decorativos sutiles de fondo */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-500 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-teal-600 blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Cabecera Editorial Estilo Housfy */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-emerald-300 font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PropTech & Asesoría Inmobiliaria en Costa Rica</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-editorial text-white leading-tight sm:leading-none">
            {SITE_CONFIG.brand.slogan}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            {SITE_CONFIG.brand.subSlogan}
          </p>

          {/* Estadísticas de Confianza Housfy */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-left sm:text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-editorial">
                +350
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Propiedades gestionadas</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-editorial">
                32 Días
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Promedio de venta</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-editorial">
                0% Sorpresas
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Comisiones transparentes</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-editorial">
                100% BAC / BCR
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Alianzas bancarias CR</p>
            </div>
          </div>
        </div>

        {/* Buscador Multicriterio Potente Estilo Habitaclia */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-7 text-slate-900 border border-slate-100">
          {/* Selector de Operación (Comprar / Alquilar) */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => onFilterChange({ operation: 'venta' })}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  filters.operation === 'venta'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Comprar
              </button>
              <button
                type="button"
                onClick={() => onFilterChange({ operation: 'alquiler' })}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  filters.operation === 'alquiler'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Alquilar
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onNavigateToValuation}
                className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>¿Quieres vender? Valora tu casa gratis</span>
              </button>
            </div>
          </div>

          {/* Grilla Principal de Campos Habitaclia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Ubicación / Cantón */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Zona o Cantón
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-emerald-600 pointer-events-none" />
                <select
                  value={filters.city}
                  onChange={(e) => onFilterChange({ city: e.target.value })}
                  className="w-full pl-9.5 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tipo de Inmueble */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Tipo de Propiedad
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-3.5 w-4 h-4 text-emerald-600 pointer-events-none" />
                <select
                  value={filters.propertyType}
                  onChange={(e) =>
                    onFilterChange({
                      propertyType: e.target.value as PropertyType | 'todos',
                    })
                  }
                  className="w-full pl-9.5 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                >
                  {propertyTypes.map((pt) => (
                    <option key={pt.value} value={pt.value}>
                      {pt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rango de Precio Máximo */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Presupuesto Máximo ({currencyMode})
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-emerald-600 pointer-events-none" />
                <select
                  value={filters.maxPrice}
                  onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                  className="w-full pl-9.5 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                >
                  {activePriceRanges.map((pr, idx) => (
                    <option key={idx} value={pr.max}>
                      {pr.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Habitaciones mínimas */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Dormitorios
              </label>
              <div className="relative">
                <Bed className="absolute left-3 top-3.5 w-4 h-4 text-emerald-600 pointer-events-none" />
                <select
                  value={filters.minBedrooms}
                  onChange={(e) => onFilterChange({ minBedrooms: Number(e.target.value) })}
                  className="w-full pl-9.5 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                >
                  <option value={0}>Cualquier número</option>
                  <option value={1}>1+ habitación</option>
                  <option value={2}>2+ habitaciones</option>
                  <option value={3}>3+ habitaciones</option>
                  <option value={4}>4+ habitaciones</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filtros avanzados expandibles */}
          {showAdvanced && (
            <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={filters.hasPool}
                  onChange={(e) => onFilterChange({ hasPool: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-700">Piscina</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={filters.hasSecurity24}
                  onChange={(e) => onFilterChange({ hasSecurity24: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-700">Seguridad 24/7</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={filters.hasGarage}
                  onChange={(e) => onFilterChange({ hasGarage: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-700">Cochera techada</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={filters.hasTerrace}
                  onChange={(e) => onFilterChange({ hasTerrace: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-700">Terraza / Balcón</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={filters.onlyExclusives}
                  onChange={(e) => onFilterChange({ onlyExclusives: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-700">Solo Exclusivas</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={filters.onlyDiscounted}
                  onChange={(e) => onFilterChange({ onlyDiscounted: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-700">Rebajadas</span>
              </label>
            </div>
          )}

          {/* Barra de Acciones del Buscador */}
          <div className="mt-5 pt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showAdvanced ? 'Ocultar filtros avanzados' : 'Más filtros (piscina, seguridad, etc.)'}</span>
            </button>

            <button
              type="button"
              onClick={onSearch}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer group"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Ver {matchingCount} propiedades disponibles</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
