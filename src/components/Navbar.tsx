import React, { useState } from 'react';
import {
  Building2,
  Phone,
  MessageCircle,
  Heart,
  Menu,
  X,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { CurrencyMode } from '../types';

interface NavbarProps {
  currencyMode: CurrencyMode;
  onToggleCurrency: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onNavigateToCatalog: (operation?: 'venta' | 'alquiler') => void;
  onNavigateToValuation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currencyMode,
  onToggleCurrency,
  favoritesCount,
  onOpenFavorites,
  onNavigateToCatalog,
  onNavigateToValuation,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cleanWhatsApp = SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Barra superior de confianza y contacto en Costa Rica */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{SITE_CONFIG.contact.address.split(',')[0]}, San José, Costa Rica</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.contact.schedule}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded text-[11px]">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>SINPE Móvil: {SITE_CONFIG.contact.sinpeMovil}</span>
            </span>
            <a
              href={`https://wa.me/${cleanWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp: {SITE_CONFIG.contact.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Barra principal de navegación */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logotipo y Nombre de Marca configurado */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-brand" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-editorial">
                  {SITE_CONFIG.brand.name}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Costa Rica
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block truncate max-w-xs">
                {SITE_CONFIG.brand.slogan}
              </p>
            </div>
          </a>

          {/* Menú de Enlaces Desktop */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <button
              onClick={() => onNavigateToCatalog('venta')}
              className="hover:text-brand transition-colors cursor-pointer py-1"
            >
              Comprar
            </button>
            <button
              onClick={() => onNavigateToCatalog('alquiler')}
              className="hover:text-brand transition-colors cursor-pointer py-1"
            >
              Alquilar
            </button>
            <button
              onClick={onNavigateToValuation}
              className="flex items-center gap-1.5 text-brand font-semibold hover:opacity-85 transition-opacity cursor-pointer py-1"
            >
              <span>Valoración Gratis</span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-700 font-bold">
                Online
              </span>
            </button>
            <a href="#servicios" className="hover:text-brand transition-colors py-1">
              Servicios
            </a>
            <a href="#hipotecas" className="hover:text-brand transition-colors py-1">
              Hipotecas
            </a>
            <a href="#agentes" className="hover:text-brand transition-colors py-1">
              Agentes
            </a>
          </nav>

          {/* Controles de Acción a la derecha */}
          <div className="flex items-center gap-3">
            {/* Selector Bimoneda USD / CRC */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={currencyMode === 'CRC' ? onToggleCurrency : undefined}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  currencyMode === 'USD'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Mostrar precios en Dólares Americanos"
              >
                USD ($)
              </button>
              <button
                onClick={currencyMode === 'USD' ? onToggleCurrency : undefined}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  currencyMode === 'CRC'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Mostrar precios en Colones Costarricenses"
              >
                CRC (₡)
              </button>
            </div>

            {/* Botón de Favoritos Guardados */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer border border-slate-200"
              title="Ver propiedades guardadas"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-scale">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* CTA Principal Estilo Housfy: Vender / Valorar */}
            <button
              onClick={onNavigateToValuation}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
            >
              <span>Vender mi propiedad</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Botón Móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => {
                onNavigateToCatalog('venta');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center font-medium bg-slate-100 rounded-lg text-slate-800"
            >
              Comprar en Costa Rica
            </button>
            <button
              onClick={() => {
                onNavigateToCatalog('alquiler');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center font-medium bg-slate-100 rounded-lg text-slate-800"
            >
              Alquilar
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigateToValuation();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 font-semibold text-emerald-700 bg-emerald-50 rounded-lg flex items-center justify-between"
            >
              <span>Valoración Online Inmediata</span>
              <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded">Gratis</span>
            </button>
            <a
              href="#servicios"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Ecosistema de Servicios
            </a>
            <a
              href="#hipotecas"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Simulador Hipotecario (Bancos CR)
            </a>
            <a
              href="#agentes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Equipo de Asesores
            </a>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/${cleanWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
