import React from 'react';
import {
  Building2,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  ShieldCheck,
  Clock,
  ArrowUp,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanWhatsApp = SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Columna 1 y 2: Identidad y Misión */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-editorial text-white">
                {SITE_CONFIG.brand.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {SITE_CONFIG.brand.subSlogan}
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{SITE_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${cleanWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp: {SITE_CONFIG.contact.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{SITE_CONFIG.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Columna 3: Zonas en Costa Rica */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Zonas de Costa Rica
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Escazú (Jaboncillos & San Rafael)
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Santa Ana (Valle del Sol & Lindora)
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  San José (Rohrmoser & Sabana)
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Curridabat (Pinares & Granadilla)
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Manuel Antonio & Quepos
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Tamarindo & Costa Pacífica
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Ecosistema & Servicios */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Servicios Housfy
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#valoracion" className="hover:text-white transition-colors">
                  Valoración Online Inmediata
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Venta Digital sin Comisiones Ocultas
                </a>
              </li>
              <li>
                <a href="#hipotecas" className="hover:text-white transition-colors">
                  Brokerage Hipotecario (BAC / BCR / BNCR)
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Gestión Segura de Alquileres
                </a>
              </li>
              <li>
                <a href="#agentes" className="hover:text-white transition-colors">
                  Equipo de Asesores Locales
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 5: Confianza y Pagos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Pagos & Respaldo
            </h4>
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>SINPE Móvil Oficial</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                {SITE_CONFIG.contact.sinpeMovil}
              </p>
              <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                Operaciones respaldadas en colones (₡) y dólares ($) con tipo de cambio oficial BCCR (ref. ₡{SITE_CONFIG.currency.exchangeRate}).
              </div>
            </div>
          </div>
        </div>

        {/* Fila Inferior de Copyright y Volver Arriba */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.brand.name}. Todos los derechos reservados. San José, Costa Rica.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
