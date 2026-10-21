import React, { useState } from 'react';
import {
  LayoutGrid,
  List,
  ArrowUpDown,
  Filter,
  RefreshCw,
  Building,
  Home,
  Sparkles,
  TrendingDown,
} from 'lucide-react';
import { Property, CurrencyMode, PropertyType } from '../types';
import { PropertyCard } from './PropertyCard';

interface PropertyCatalogProps {
  properties: Property[];
  currencyMode: CurrencyMode;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onResetFilters: () => void;
  activeTypeFilter: PropertyType | 'todos';
  onSelectTypeFilter: (type: PropertyType | 'todos') => void;
}

export const PropertyCatalog: React.FC<PropertyCatalogProps> = ({
  properties,
  currencyMode,
  favoriteIds,
  onToggleFavorite,
  onSelectProperty,
  onResetFilters,
  activeTypeFilter,
  onSelectTypeFilter,
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

  const filterChips: { label: string; value: PropertyType | 'todos' }[] = [
    { label: 'Todos los inmuebles', value: 'todos' },
    { label: 'Casas', value: 'casa' },
    { label: 'Apartamentos', value: 'apartamento' },
    { label: 'Áticos / Penthouse', value: 'atico' },
    { label: 'Villas de Lujo', value: 'villa' },
    { label: 'Dúplex & Lofts', value: 'duplex' },
  ];

  return (
    <section id="catalogo" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Cabecera del Catálogo */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
            <Building className="w-3.5 h-3.5" />
            <span>Catálogo Activo Costa Rica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-editorial">
            Inmuebles destacados en venta y alquiler
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Mostrando {properties.length} propiedades verificadas con métricas exactas
          </p>
        </div>

        {/* Controles de ordenamiento y vista */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Ordenar por */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-500">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="recent">Más recientes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="area">Mayor tamaño (m²)</option>
            </select>
          </div>

          {/* Selector de Vista (Grilla vs Lista Habitaclia) */}
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

      {/* Píldoras de filtros rápidos */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {filterChips.map((chip) => (
          <button
            key={chip.value}
            onClick={() => onSelectTypeFilter(chip.value)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTypeFilter === chip.value
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Grilla o Lista de Propiedades */}
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
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 max-w-lg mx-auto">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Filter className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            No encontramos inmuebles con estos filtros
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Intenta ampliar el presupuesto máximo, cambiar la zona o quitar restricciones de amenidades.
          </p>
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restablecer todos los filtros</span>
          </button>
        </div>
      )}
    </section>
  );
};
