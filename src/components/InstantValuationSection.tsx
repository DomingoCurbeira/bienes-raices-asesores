import React, { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  MapPin,
  Building,
  CheckCircle,
  ArrowRight,
  RotateCcw,
  MessageCircle,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { SITE_CONFIG, formatDualPrice, getWhatsAppValuationUrl } from '../config/siteConfig';
import { CurrencyMode } from '../types';

interface InstantValuationSectionProps {
  currencyMode: CurrencyMode;
}

export const InstantValuationSection: React.FC<InstantValuationSectionProps> = ({ currencyMode }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [zone, setZone] = useState('Escazú');
  const [propertyType, setPropertyType] = useState('Casa en Condominio');
  const [areaM2, setAreaM2] = useState<number>(240);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [condition, setCondition] = useState<'excelente' | 'bueno' | 'regular'>('excelente');

  // Precios promedio estimados por m² según zona en Costa Rica
  const zoneBasePricePerM2: Record<string, number> = {
    Escazú: 1950,
    'Santa Ana': 1800,
    'San José (Rohrmoser/Sabana)': 1850,
    Curridabat: 1450,
    'Manuel Antonio / Quepos': 2600,
    'Tamarindo / Guanacaste': 2750,
    Alajuela: 1300,
    Heredia: 1400,
  };

  const conditionMultiplier: Record<'excelente' | 'bueno' | 'regular', number> = {
    excelente: 1.08,
    bueno: 1.0,
    regular: 0.9,
  };

  // Cálculo del valor estimado
  const baseRate = zoneBasePricePerM2[zone] || 1700;
  const multiplier = conditionMultiplier[condition] || 1.0;
  const centralEstimateUSD = Math.round(areaM2 * baseRate * multiplier);
  const minEstimateUSD = Math.round(centralEstimateUSD * 0.93);
  const maxEstimateUSD = Math.round(centralEstimateUSD * 1.07);

  const formattedMin = formatDualPrice(minEstimateUSD, currencyMode);
  const formattedMax = formatDualPrice(maxEstimateUSD, currencyMode);
  const estimatedRangeText = `${formattedMin.primary} - ${formattedMax.primary}`;

  const whatsappValuationUrl = getWhatsAppValuationUrl(
    SITE_CONFIG.contact.whatsapp,
    zone,
    propertyType,
    areaM2,
    estimatedRangeText
  );

  return (
    <section id="valoracion" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Luces y texturas de fondo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Cabecera del Módulo */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Herramienta Housfy Valora</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-white tracking-tight">
            ¿Cuánto vale tu propiedad en Costa Rica hoy?
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Obtén una estimación de mercado inmediata basada en más de 1,200 transacciones recientes del Gran Área Metropolitana y zonas costeras. Sin compromiso y 100% gratuita.
          </p>
        </div>

        {/* Tarjeta del Asistente Interactivo */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          {/* Indicador de pasos */}
          <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 1 ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'
                }`}
              >
                1
              </span>
              <span className="text-xs font-medium text-slate-300">Ubicación</span>
            </div>
            <div className={`h-0.5 w-12 ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'
                }`}
              >
                2
              </span>
              <span className="text-xs font-medium text-slate-300">Características</span>
            </div>
            <div className={`h-0.5 w-12 ${step === 3 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 3 ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'
                }`}
              >
                3
              </span>
              <span className="text-xs font-medium text-slate-300">Valoración</span>
            </div>
          </div>

          {/* PASO 1: UBICACIÓN Y TIPO */}
          {step === 1 && (
            <div className="space-y-6 max-w-xl mx-auto animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  1. ¿En qué zona o cantón se ubica la propiedad?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(zoneBasePricePerM2).map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => setZone(z)}
                      className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        zone === z
                          ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300 ring-1 ring-emerald-400'
                          : 'bg-slate-750 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <span className="truncate">{z}</span>
                      {zone === z && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  2. Tipo de inmueble
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {['Casa en Condominio', 'Apartamento / Torre', 'Villa de Lujo', 'Casa Independiente', 'Ático Duplex', 'Lote / Terreno'].map(
                    (tp) => (
                      <button
                        key={tp}
                        type="button"
                        onClick={() => setPropertyType(tp)}
                        className={`p-3 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                          propertyType === tp
                            ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300 ring-1 ring-emerald-400'
                            : 'bg-slate-750 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {tp}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Continuar al Paso 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PASO 2: METRAJE Y DETALLES */}
          {step === 2 && (
            <div className="space-y-6 max-w-xl mx-auto animate-fade-in">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Área estimada de construcción
                  </label>
                  <span className="text-lg font-bold text-emerald-400">{areaM2} m²</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="800"
                  step="5"
                  value={areaM2}
                  onChange={(e) => setAreaM2(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>45 m² (Estudio)</span>
                  <span>250 m² (Casa estándar)</span>
                  <span>800 m² (Mansión)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Dormitorios
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full p-3 bg-slate-750 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'habitación' : 'habitaciones'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Baños completos
                  </label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full p-3 bg-slate-750 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'baño' : 'baños'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Estado general de conservación
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'excelente', label: 'Excelente / Nueva' },
                    { key: 'bueno', label: 'Buen estado' },
                    { key: 'regular', label: 'Requiere mejoras' },
                  ].map((st) => (
                    <button
                      key={st.key}
                      type="button"
                      onClick={() => setCondition(st.key as any)}
                      className={`p-3 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                        condition === st.key
                          ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300 ring-1 ring-emerald-400'
                          : 'bg-slate-750 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Volver al Paso 1
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Calcular Valoración Inmediata</span>
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: RESULTADO ESTIMADO Y ACCIONES */}
          {step === 3 && (
            <div className="space-y-8 max-w-xl mx-auto text-center animate-fade-in">
              <div className="p-6 bg-slate-900/80 border border-emerald-500/30 rounded-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Rango Estimado de Mercado</span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-white font-editorial tracking-tight">
                  {estimatedRangeText}
                </div>

                <div className="text-xs text-slate-400 mt-2">
                  Basado en {areaM2} m² en <span className="text-emerald-300 font-semibold">{zone}</span> ({propertyType})
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-left">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Promedio zona m²:</span>
                    <span className="text-sm font-semibold text-slate-200">
                      ≈ ${Math.round(baseRate * multiplier)} USD/m²
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Estimación alquiler mensual:</span>
                    <span className="text-sm font-semibold text-emerald-400">
                      ≈ ${Math.round((centralEstimateUSD * 0.0055) / 10) * 10} USD/mes
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón WhatsApp de Solicitud Oficial */}
              <div className="space-y-3">
                <a
                  href={whatsappValuationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Recibir informe oficial y agendar peritaje</span>
                </a>

                <p className="text-xs text-slate-400">
                  Un perito especializado de {SITE_CONFIG.brand.name} verificará los acabados en sitio sin ningún costo ni exclusividad obligatoria.
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Realizar otra valoración</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
