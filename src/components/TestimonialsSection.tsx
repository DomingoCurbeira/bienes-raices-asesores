import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { MOCK_TESTIMONIALS } from '../data/mockTestimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
            <span>Opiniones Verificadas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-editorial tracking-tight">
            Familias e inversionistas que confiaron en nosotros
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Nuestra mayor satisfacción es la tranquilidad de nuestros clientes durante una de las decisiones financieras más importantes de sus vidas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{test.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <img
                  src={test.avatarUrl}
                  alt={test.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{test.author}</h4>
                  <p className="text-[11px] text-slate-500">{test.role}</p>
                  <p className="text-[10px] text-emerald-700 font-medium">{test.propertyPurchased}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
