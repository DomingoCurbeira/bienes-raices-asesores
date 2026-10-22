import React, { useState, useRef, useEffect } from 'react';
import {
  Building2,
  Phone,
  MessageCircle,
  Heart,
  Menu,
  X,
  Clock,
  MapPin,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Home,
  Building,
  KeyRound,
  Tag,
  Palmtree,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { CurrencyMode, OperationType, PropertyType } from '../types';

interface NavbarProps {
  currencyMode: CurrencyMode;
  onToggleCurrency: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onSelectCategory: (operation: OperationType, propertyType?: PropertyType | 'todos') => void;
  onNavigateToValuation: () => void;
  saleCount: number;
  rentCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currencyMode,
  onToggleCurrency,
  favoritesCount,
  onOpenFavorites,
  onSelectCategory,
  onNavigateToValuation,
  saleCount,
  rentCount,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatalogDropdownOpen, setIsCatalogDropdownOpen] = useState(false);
  const [mobileCatalogExpanded, setMobileCatalogExpanded] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCatalogDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cleanWhatsApp = SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '');

  const handleCategoryClick = (
    operation: OperationType,
    propertyType: PropertyType | 'todos' = 'todos'
  ) => {
    setIsCatalogDropdownOpen(false);
    setIsMobileMenuOpen(false);
    onSelectCategory(operation, propertyType);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* 1. Barra superior de confianza y contacto en Costa Rica (Ocultable en móviles pequeños para maximizar espacio) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate max-w-[240px] sm:max-w-none">
                {SITE_CONFIG.contact.address.split(',')[0]}, San José, Costa Rica
              </span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.contact.schedule}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>SINPE: {SITE_CONFIG.contact.sinpeMovil}</span>
            </span>
            <a
              href={`https://wa.me/${cleanWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>{SITE_CONFIG.contact.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Barra principal de navegación */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logotipo y Nombre */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 font-editorial">
                  {SITE_CONFIG.brand.name}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 hidden xs:inline-block">
                  Costa Rica
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block truncate max-w-xs">
                {SITE_CONFIG.brand.slogan}
              </p>
            </div>
          </a>

          {/* Menú Desktop con Dropdown Enriquecido */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            {/* Menú Desplegable "Catálogo" */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsCatalogDropdownOpen(!isCatalogDropdownOpen)}
                className={`flex items-center gap-1.5 py-2 px-3 rounded-xl transition-all cursor-pointer ${
                  isCatalogDropdownOpen
                    ? 'bg-slate-100 text-slate-900 font-bold'
                    : 'hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                <span>Catálogo de Inmuebles</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isCatalogDropdownOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Mega-Menú Desplegable Desktop */}
              {isCatalogDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[540px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 z-50 animate-fade-in">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Columna Venta */}
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                          <Home className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Propiedades en Venta</span>
                        </span>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          {saleCount} disponibles
                        </span>
                      </div>

                      <ul className="space-y-1 text-xs">
                        <li>
                          <button
                            onClick={() => handleCategoryClick('venta', 'todos')}
                            className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-800 font-bold text-slate-800 flex items-center justify-between transition-colors"
                          >
                            <span>Ver todo en Venta</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleCategoryClick('venta', 'casa')}
                            className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            Casas & Condominios
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleCategoryClick('venta', 'apartamento')}
                            className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            Apartamentos & Torres
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleCategoryClick('venta', 'atico')}
                            className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            Áticos & Sky Penthouses
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleCategoryClick('venta', 'villa')}
                            className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            Villas de Lujo (Playa / Montaña)
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Columna Alquiler */}
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                          <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                          <span>Propiedades en Alquiler</span>
                        </span>
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          {rentCount} disponibles
                        </span>
                      </div>

                      <ul className="space-y-1 text-xs">
                        <li>
                          <button
                            onClick={() => handleCategoryClick('alquiler', 'todos')}
                            className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-800 font-bold text-slate-800 flex items-center justify-between transition-colors"
                          >
                            <span>Ver todo en Alquiler</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleCategoryClick('alquiler', 'apartamento')}
                            className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            Apartamentos Residenciales
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleCategoryClick('alquiler', 'duplex')}
                            className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            Lofts Urbanos & Dúplex
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleCategoryClick('alquiler', 'casa')}
                            className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            Residencias Familiares
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Banner inferior del Mega-Menú */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-[11px] text-slate-600 font-medium">
                      ¿Quieres saber el valor de tu inmueble en Costa Rica?
                    </span>
                    <button
                      onClick={() => {
                        setIsCatalogDropdownOpen(false);
                        onNavigateToValuation();
                      }}
                      className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Valora gratis</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onNavigateToValuation}
              className="flex items-center gap-1.5 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors cursor-pointer py-1"
            >
              <span>Valoración Online</span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Gratis
              </span>
            </button>

            <a href="#hipotecas" className="hover:text-emerald-700 transition-colors py-1">
              Hipotecas
            </a>

            <a href="#servicios" className="hover:text-emerald-700 transition-colors py-1">
              Servicios
            </a>

            <a href="#agentes" className="hover:text-emerald-700 transition-colors py-1">
              Asesores
            </a>
          </nav>

          {/* Controles de Acción (Bimoneda, Favoritos, CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Selector Bimoneda USD / CRC (Ultra compacto para celular) */}
            <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200 text-[11px] sm:text-xs font-semibold">
              <button
                onClick={currencyMode === 'CRC' ? onToggleCurrency : undefined}
                className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg transition-all cursor-pointer ${
                  currencyMode === 'USD'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Precios en Dólares"
              >
                USD ($)
              </button>
              <button
                onClick={currencyMode === 'USD' ? onToggleCurrency : undefined}
                className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg transition-all cursor-pointer ${
                  currencyMode === 'CRC'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Precios en Colones"
              >
                CRC (₡)
              </button>
            </div>

            {/* Botón de Favoritos Guardados */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 sm:p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer border border-slate-200"
              title="Ver propiedades guardadas"
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* CTA Desktop Vender */}
            <button
              onClick={onNavigateToValuation}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs sm:text-sm hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
            >
              <span>Vender propiedad</span>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>

            {/* Botón Hamburguesa Móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Menú Móvil / Tablet tipo Acordeón Limpio (Mobile-First) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto animate-fade-in">
          {/* Acordeón de Catálogo */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
            <button
              type="button"
              onClick={() => setMobileCatalogExpanded(!mobileCatalogExpanded)}
              className="w-full flex items-center justify-between p-3.5 text-sm font-bold text-slate-900 bg-slate-100/80 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-600" />
                <span>Explorar Catálogo de Inmuebles</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 text-slate-500 ${
                  mobileCatalogExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mobileCatalogExpanded && (
              <div className="p-3.5 space-y-4 bg-white text-xs">
                {/* Sección Comprar Móvil */}
                <div>
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-emerald-800">
                      <Home className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Comprar / En Venta ({saleCount})</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handleCategoryClick('venta', 'todos')}
                      className="p-2 text-left font-bold rounded-lg bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                    >
                      Todas en Venta
                    </button>
                    <button
                      onClick={() => handleCategoryClick('venta', 'casa')}
                      className="p-2 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700"
                    >
                      Casas & Condos
                    </button>
                    <button
                      onClick={() => handleCategoryClick('venta', 'apartamento')}
                      className="p-2 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700"
                    >
                      Apartamentos
                    </button>
                    <button
                      onClick={() => handleCategoryClick('venta', 'villa')}
                      className="p-2 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700"
                    >
                      Villas de Playa
                    </button>
                  </div>
                </div>

                {/* Sección Alquilar Móvil */}
                <div>
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-blue-800">
                      <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                      <span>Alquilar ({rentCount})</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handleCategoryClick('alquiler', 'todos')}
                      className="p-2 text-left font-bold rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100"
                    >
                      Todos en Alquiler
                    </button>
                    <button
                      onClick={() => handleCategoryClick('alquiler', 'apartamento')}
                      className="p-2 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700"
                    >
                      Apartamentos
                    </button>
                    <button
                      onClick={() => handleCategoryClick('alquiler', 'duplex')}
                      className="p-2 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700"
                    >
                      Lofts Urbanos
                    </button>
                    <button
                      onClick={() => handleCategoryClick('alquiler', 'casa')}
                      className="p-2 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700"
                    >
                      Casas Familiares
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enlaces Rápidos Móviles */}
          <div className="space-y-1 pt-1">
            <button
              onClick={() => {
                onNavigateToValuation();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-3 font-semibold text-emerald-800 bg-emerald-50 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Valoración Inmobiliaria Online</span>
              </div>
              <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
                Gratis
              </span>
            </button>

            <a
              href="#hipotecas"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              Simulador Hipotecario (Bancos Costa Rica)
            </a>

            <a
              href="#servicios"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              Ecosistema de Servicios
            </a>

            <a
              href="#agentes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              Equipo de Asesores
            </a>
          </div>

          {/* Botón WhatsApp Móvil */}
          <div className="pt-2">
            <a
              href={`https://wa.me/${cleanWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Contactar Asesor por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
