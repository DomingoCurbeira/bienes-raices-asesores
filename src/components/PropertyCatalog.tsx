import React, { useState } from 'react';
import {
  LayoutGrid,
  List,
  ArrowUpDown,
  Filter,
  RefreshCw,
  Building,
  Home,
  KeyRound,
  Sparkles,
} from 'lucide-react';
import { Property, CurrencyMode, PropertyType, OperationType } from '../types';
import { PropertyCard } from './PropertyCard';

interface PropertyCatalogProps {
  properties: Property[];
  currencyMode: CurrencyMode;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onResetFilters: () => void;
  activeOperation: OperationType;
  onChangeOperation: (op: OperationType) => void;
  activeTypeFilter: PropertyType | 'todos';
  onSelectTypeFilter: (type: PropertyType | 'todos') => void;
  saleCountTotal: number;
  rentCountTotal: number;
}

export const PropertyCatalog: React.FC<PropertyCatalogProps> = ({
  properties,
  currencyMode,
  favoriteIds,
  onToggleFavorite,
  onSelectProperty,
  onResetFilters,
  activeOperation,
  onChangeOperation,
  activeTypeFilter,
  onSelectTypeFilter,
  saleCountTotal,
  rentCountTotal,
}) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc' | 'area'>('recent');

  // Ordenar propiedades
  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
    if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
    if (sortBy === 'area') return b.areaBuilt - a.areaBuilt;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const saleFilterChips: { label: string; value: PropertyType | 'todos' }[] = [
    { label: 'Todas en Venta', value: 'todos' },
    { label: 'Casas & Condominios', value: 'casa' },
    { label: 'Apartamentos & Torres', value: 'apartamento' },
    { label: 'Áticos / Penthouses', value: 'atico' },
    { label: 'Villas de Lujo', value: 'villa' },
    { label: 'Lofts & Dúplex', value: 'duplex' },
  ];

  const rentFilterChips: { label: string; value: PropertyType | 'todos' }[] = [
    { label: 'Todos en Alquiler', value: 'todos' },
    { label: 'Apartamentos Residenciales', value: 'apartamento' },
    { label: 'Lofts Urbanos', value: 'duplex' },
    { label: 'Casas en Alquiler', value: 'casa' },
  ];

  const activeChips = activeOperation === 'venta' ? saleFilterChips : rentFilterChips;

  return (
    <section id="catalogo" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden w-full max-w-full">
      {/* 1. Selector de Catálogo Principal (Ventas vs Alquileres) - Gran Visibilidad */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 w-full min-w-0">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Building className="w-3.5 h-3.5 text-emerald-600" />
            <span>Inventario Activo en Costa Rica</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-editorial">
            {activeOperation === 'venta'
              ? 'Propiedades en Venta'
              : 'Propiedades en Alquiler Mensual'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {activeOperation === 'venta'
              ? 'Inmuebles con escrituración, financiamiento bancario disponible y plusvalía asegurada.'
              : 'Alquileres residenciales y corporativos con verificación legal de contrato en Costa Rica.'}
          </p>
        </div>

        {/* Pestañas Principales Venta / Alquiler (Adaptables y sin desborde en móvil) */}
        <div className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex bg-slate-100 p-1 sm:p-1.5 rounded-2xl border border-slate-200 shadow-2xs shrink-0">
          <button
            type="button"
            onClick={() => onChangeOperation('venta')}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeOperation === 'venta'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Home className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">En Venta ({saleCountTotal})</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeOperation('alquiler')}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeOperation === 'alquiler'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <KeyRound className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="truncate">En Alquiler ({rentCountTotal})</span>
          </button>
        </div>
      </div>

      {/* 2. Píldoras de Filtro por Tipo de Vivienda y Controles de Vista */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 w-full min-w-0">
        {/* Contenedor de scroll táctil aislado con min-w-0 para evitar desborde del viewport */}
        <div className="w-full min-w-0 overflow-x-auto pb-2 scrollbar-none overscroll-x-contain">
          <div className="flex items-center gap-2">
            {activeChips.map((chip) => (
              <button
                key={chip.value}
                onClick={() => onSelectTypeFilter(chip.value)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTypeFilter === chip.value
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ordenar y Toggle Cuadrícula / Lista */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="recent">Más recientes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="area">Mayor metraje (m²)</option>
            </select>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setLayout('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                layout === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Vista en cuadrícula"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                layout === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Vista en lista detallada (Habitaclia)"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Grilla o Lista de Propiedades */}
      {sortedProperties.length > 0 ? (
        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
          }
        >
          {sortedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              currencyMode={currencyMode}
              isFavorite={favoriteIds.includes(property.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectProperty={onSelectProperty}
              layout={layout}
            />
          ))}
        </div>
      ) : (
        /* Estado vacío */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 max-w-lg mx-auto shadow-xs">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Filter className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            No encontramos inmuebles en {activeOperation === 'venta' ? 'venta' : 'alquiler'} con estos filtros
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Intenta cambiar el tipo de propiedad, ampliar el presupuesto o alternar a la pestaña de{' '}
            {activeOperation === 'venta' ? 'Alquiler' : 'Venta'}.
          </p>
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restablecer filtros de {activeOperation}</span>
          </button>
        </div>
      )}
    </section>
  );
};
