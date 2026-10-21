import React from 'react';
import {
  TrendingUp,
  Landmark,
  KeyRound,
  FileSearch,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface ServicesSectionProps {
  onNavigateToValuation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigateToValuation }) => {
  const services = [
    {
      icon: TrendingUp,
      title: 'Venta Digital & Asesoría Estratégica',
      description:
        'Combinamos algoritmos predictivos de demanda con asesores expertos en el GAM y playas. Reportaje fotográfico HDR, tour 360° y publicación en portales mundiales.',
      features: ['Comisión transparente sin letra pequeña', 'Venta en promedio en 32 días', 'Negociación notarial completa'],
      ctaText: 'Quiero vender',
      isPrimary: true,
      action: onNavigateToValuation,
    },
    {
      icon: Landmark,
      title: 'Intermediación Hipotecaria Gratuita',
      description:
        'Conseguimos la mejor tasa de interés en dólares o colones negociando simultáneamente con los principales bancos de Costa Rica.',
      features: ['Alianzas con BAC, BNCR, BCR y Scotiabank', 'Ahorro promedio de hasta 1.2% en tasa de interés', '100% gratis para el comprador'],
      ctaText: 'Calcular cuota bancaria',
      isPrimary: false,
      href: '#hipotecas',
    },
    {
      icon: KeyRound,
      title: 'Gestión Integral de Alquileres',
      description:
        'Filtramos inquilinos con estudio crediticio y judicial en Costa Rica, gestionamos el contrato con abogados especialistas y cobros mensuales.',
      features: ['Verificación de récord crediticio', 'Contratos adaptados a la Ley de Arrendamientos Urbanos CR', 'Gestión de mantenimiento'],
      ctaText: 'Ver inmuebles en renta',
      isPrimary: false,
      href: '#catalogo',
    },
    {
      icon: FileSearch,
      title: 'Peritaje Oficial & Due Diligence',
      description:
        'Revisión exhaustiva ante el Registro Nacional de la Propiedad, planos catastrados municipales, solvencia fiscal y permisos de construcción.',
      features: ['Certificaciones de personería y gravámenes', 'Inspección técnica estructural', 'Acompañamiento hasta el traspaso final'],
      ctaText: 'Consultar con un abogado',
      isPrimary: false,
      href: `https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hola, deseo información sobre el servicio de Due Diligence y asesoría legal inmobiliaria.`,
      isExternal: true,
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Building className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ecosistema Housfy Integral</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-editorial tracking-tight">
            Todo lo que necesitas para tu propiedad en un solo lugar
          </h2>

          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Eliminamos la burocracia y los intermediarios innecesarios. Nuestra plataforma combina software de vanguardia con especialistas legales y comerciales en Costa Rica.
          </p>
        </div>

        {/* Grilla de 4 Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 border ${
                  svc.isPrimary
                    ? 'bg-slate-900 text-white border-slate-800 shadow-xl'
                    : 'bg-white text-slate-900 border-slate-200/80 hover:shadow-lg hover:border-slate-300'
                }`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                      svc.isPrimary
                        ? 'bg-emerald-500 text-white'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3
                    className={`text-lg font-bold tracking-tight mb-3 ${
                      svc.isPrimary ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {svc.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed mb-6 ${
                      svc.isPrimary ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {svc.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {svc.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            svc.isPrimary ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                        />
                        <span className={svc.isPrimary ? 'text-slate-200' : 'text-slate-700'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {svc.action ? (
                  <button
                    type="button"
                    onClick={svc.action}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      svc.isPrimary
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{svc.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href={svc.href}
                    target={svc.isExternal ? '_blank' : undefined}
                    rel={svc.isExternal ? 'noopener noreferrer' : undefined}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      svc.isPrimary
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{svc.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
