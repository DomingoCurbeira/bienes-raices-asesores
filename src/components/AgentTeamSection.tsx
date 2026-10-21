import React from 'react';
import { Phone, MessageCircle, Mail, Award, CheckCircle2 } from 'lucide-react';
import { MOCK_AGENTS } from '../data/mockAgents';
import { SITE_CONFIG } from '../config/siteConfig';

export const AgentTeamSection: React.FC = () => {
  return (
    <section id="agentes" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Asesores Locales Certificados</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-editorial tracking-tight">
            Especialistas dedicados por zona en Costa Rica
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Nuestros asesores combinan profundo conocimiento de mercado, ética profesional y acompañamiento en cada fase de negociación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-5">
                  <img
                    src={agent.photoUrl}
                    alt={agent.name}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    +{agent.salesCount} operaciones cerradas
                  </div>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                  {agent.role}
                </span>

                <h3 className="text-lg font-bold text-slate-900">{agent.name}</h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{agent.bio}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {agent.languages.map((lang, lIdx) => (
                    <span
                      key={lIdx}
                      className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Llamar</span>
                </a>

                <a
                  href={`https://wa.me/${agent.whatsapp.replace(
                    /[^0-9]/g,
                    ''
                  )}?text=Hola ${agent.name}, vi su perfil en ${SITE_CONFIG.brand.name} y me gustaría recibir asesoría para una propiedad.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
