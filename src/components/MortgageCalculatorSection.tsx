import React, { useState } from 'react';
import {
  Landmark,
  Calculator,
  Percent,
  Calendar,
  DollarSign,
  MessageCircle,
  CheckCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { SITE_CONFIG, formatDualPrice } from '../config/siteConfig';
import { CurrencyMode } from '../types';

interface MortgageCalculatorSectionProps {
  currencyMode: CurrencyMode;
}

export const MortgageCalculatorSection: React.FC<MortgageCalculatorSectionProps> = ({
  currencyMode,
}) => {
  const [propertyPriceUSD, setPropertyPriceUSD] = useState<number>(350000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanYears, setLoanYears] = useState<number>(25);
  const [interestRateAnnual, setInterestRateAnnual] = useState<number>(7.65); // Tasa en USD promedio en CR

  // Cálculos matemáticos de hipoteca
  const downPaymentUSD = Math.round(propertyPriceUSD * (downPaymentPercent / 100));
  const loanPrincipalUSD = propertyPriceUSD - downPaymentUSD;
  const monthlyInterestRate = interestRateAnnual / 100 / 12;
  const totalMonths = loanYears * 12;

  const monthlyPaymentUSD =
    monthlyInterestRate > 0
      ? Math.round(
          (loanPrincipalUSD *
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
            (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
        )
      : Math.round(loanPrincipalUSD / totalMonths);

  // Ingreso familiar sugerido (ratio 35%)
  const minRequiredIncomeUSD = Math.round(monthlyPaymentUSD / 0.35);

  const formattedPayment = formatDualPrice(monthlyPaymentUSD, currencyMode, SITE_CONFIG.currency.exchangeRate, true);
  const formattedIncome = formatDualPrice(minRequiredIncomeUSD, currencyMode, SITE_CONFIG.currency.exchangeRate, true);

  // Bancos aliados en Costa Rica con sus condiciones estimadas
  const bankPartners = [
    {
      name: 'BAC Credomatic',
      tag: 'Aprobación Rápida',
      rate: '7.45%',
      maxFinance: '80%',
      benefits: 'Precalificación digital en 24h y pólizas competitivas.',
    },
    {
      name: 'Banco Nacional (BNCR)',
      tag: 'Banca Estatal',
      rate: '7.25%',
      maxFinance: '85%',
      benefits: 'Condiciones preferenciales para vivienda sostenible.',
    },
    {
      name: 'Banco de Costa Rica (BCR)',
      tag: 'Tasa Fija Inicial',
      rate: '7.50%',
      maxFinance: '80%',
      benefits: 'Primeros 3 años con tasa fija asegurada en USD.',
    },
    {
      name: 'Scotiabank Costa Rica',
      tag: 'Segmento Premium',
      rate: '7.30%',
      maxFinance: '80%',
      benefits: 'Especialistas en crédito hipotecario para extranjeros y no residentes.',
    },
  ];

  const cleanWhatsApp = SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '');
  const mortgageWhatsAppUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    `Hola ${SITE_CONFIG.brand.name}, me gustaría precalificar para un crédito hipotecario en Costa Rica. Valor de la propiedad: $${propertyPriceUSD.toLocaleString(
      'en-US'
    )} USD, Prima prevista: ${downPaymentPercent}%, Plazo: ${loanYears} años. ¿Podrían asesorarme gratuitamente con las opciones bancarias?`
  )}`;

  return (
    <section id="hipotecas" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Landmark className="w-3.5 h-3.5 text-emerald-600" />
            <span>Brokerage Hipotecario Costa Rica</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-editorial tracking-tight">
            Simula tu cuota y negocia con los mejores bancos del país
          </h2>

          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Nuestro equipo de intermediación hipotecaria compara las condiciones del BAC, BNCR, BCR y Scotiabank para conseguirte la cuota más baja sin ningún costo adicional para ti.
          </p>
        </div>

        {/* Simulador Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controles de Entrada */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/90 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>Parámetros del financiamiento</span>
            </h3>

            {/* Precio del Inmueble */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Valor del inmueble (USD)
                </label>
                <span className="text-lg font-black text-slate-900">
                  ${propertyPriceUSD.toLocaleString('en-US')} USD
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="1500000"
                step="10000"
                value={propertyPriceUSD}
                onChange={(e) => setPropertyPriceUSD(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>$50,000</span>
                <span>$750,000</span>
                <span>$1,500,000</span>
              </div>
            </div>

            {/* Prima / Enganche (%) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Prima / Enganche aportado
                </label>
                <span className="text-base font-bold text-emerald-700">
                  {downPaymentPercent}% (${downPaymentUSD.toLocaleString('en-US')} USD)
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>10% (Mínimo legal)</span>
                <span>20% (Recomendado)</span>
                <span>50%</span>
              </div>
            </div>

            {/* Plazo del Crédito */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Plazo del préstamo
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 20, 25, 30].map((years) => (
                  <button
                    key={years}
                    type="button"
                    onClick={() => setLoanYears(years)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      loanYears === years
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {years} Años
                  </button>
                ))}
              </div>
            </div>

            {/* Tasa de interés */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Tasa de interés estimada anual
                </label>
                <span className="text-base font-bold text-slate-900">{interestRateAnnual}%</span>
              </div>
              <input
                type="range"
                min="5.5"
                max="12.0"
                step="0.05"
                value={interestRateAnnual}
                onChange={(e) => setInterestRateAnnual(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>5.5% (Tasa preferencial)</span>
                <span>7.65% (Promedio USD)</span>
                <span>12.0% (Colones)</span>
              </div>
            </div>
          </div>

          {/* Resultado de la Simulación y CTA */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cuota Estimada</span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-white font-editorial tracking-tight">
                {formattedPayment.primary}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {formattedPayment.secondary} (Cuota estimada capital + intereses)
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Monto total a financiar:</span>
                  <span className="font-bold text-white">
                    ${loanPrincipalUSD.toLocaleString('en-US')} USD
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Ingreso familiar sugerido:</span>
                  <span className="font-bold text-emerald-400">{formattedIncome.primary}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Plazo total:</span>
                  <span className="font-bold text-white">{totalMonths} cuotas mensuales</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <a
                href={mortgageWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Precalificar mi crédito sin costo</span>
              </a>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Asesoría 100% gratuita. No cobramos honorarios al comprador. El banco seleccionado cubre nuestros costos de originación.
              </p>
            </div>
          </div>
        </div>

        {/* Tabla comparativa de Bancos en Costa Rica */}
        <div className="mt-12">
          <h4 className="text-base font-bold text-slate-900 mb-4 text-center sm:text-left">
            Bancos aliados en Costa Rica para financiamiento
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bankPartners.map((bank, bIdx) => (
              <div
                key={bIdx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{bank.name}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      {bank.tag}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-lg font-black text-emerald-700">{bank.rate}</span>
                    <span className="text-[11px] text-slate-500">Financia hasta {bank.maxFinance}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{bank.benefits}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
