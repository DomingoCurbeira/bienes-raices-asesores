import React from 'react';
import { X, Heart, Trash2, ArrowRight, Eye, MessageCircle } from 'lucide-react';
import { Property, CurrencyMode } from '../types';
import { SITE_CONFIG, formatDualPrice, getWhatsAppInquiryUrl } from '../config/siteConfig';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Property[];
  currencyMode: CurrencyMode;
  onRemoveFavorite: (id: string) => void;
  onClearFavorites: () => void;
  onSelectProperty: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  currencyMode,
  onRemoveFavorite,
  onClearFavorites,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Cabecera del Drawer */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Mis Inmuebles Favoritos</h3>
              <p className="text-xs text-slate-500">{favorites.length} guardados</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {favorites.length > 0 && (
              <button
                onClick={onClearFavorites}
                className="text-xs text-slate-400 hover:text-rose-600 transition-colors p-1"
                title="Vaciar favoritos"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lista de Favoritos */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {favorites.length > 0 ? (
            favorites.map((prop) => {
              const price = formatDualPrice(prop.priceUSD, currencyMode);
              const waUrl = getWhatsAppInquiryUrl(
                SITE_CONFIG.contact.whatsapp,
                prop.reference,
                prop.title,
                price.primary
              );

              return (
                <div
                  key={prop.id}
                  className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex gap-3 hover:border-slate-300 transition-all"
                >
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectProperty(prop);
                      onClose();
                    }}
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-mono text-slate-400">
                          {prop.reference}
                        </span>
                        <button
                          onClick={() => onRemoveFavorite(prop.id)}
                          className="text-slate-400 hover:text-rose-600 cursor-pointer p-0.5"
                          title="Eliminar de favoritos"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          onSelectProperty(prop);
                          onClose();
                        }}
                        className="text-xs font-bold text-slate-900 truncate hover:text-emerald-700 cursor-pointer"
                      >
                        {prop.title}
                      </h4>

                      <p className="text-[11px] font-bold text-emerald-700 mt-0.5">
                        {price.primary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          onSelectProperty(prop);
                          onClose();
                        }}
                        className="text-[11px] font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Ver</span>
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3 h-3 fill-current" />
                        <span>Consultar</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 px-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">
                No tienes propiedades guardadas
              </h4>
              <p className="text-xs text-slate-500">
                Haz clic en el corazón de cualquier ficha para conservarla aquí durante tu navegación.
              </p>
            </div>
          )}
        </div>

        {/* Footer del Drawer */}
        {favorites.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(
                /[^0-9]/g,
                ''
              )}?text=${encodeURIComponent(
                `Hola ${SITE_CONFIG.brand.name}, tengo guardadas ${favorites.length} propiedades en mi lista de favoritos (incluyendo ${favorites
                  .map((f) => f.reference)
                  .join(', ')}). Me gustaría recibir asesoría agrupada.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Consultar todas por WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
