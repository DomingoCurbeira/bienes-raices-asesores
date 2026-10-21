import { SiteConfig, CurrencyMode } from '../types';

// =========================================================================
// ⚙️ CONFIGURACIÓN MAESTRA DE LA INMOBILIARIA (EDITA AQUÍ TUS DATOS)
// Modifica los valores en este archivo y toda la página se actualizará automáticamente.
// No necesitas tocar ningún otro archivo de código.
// =========================================================================

export const SITE_CONFIG: SiteConfig = {
  // 1. IDENTIDAD DE LA MARCA
  brand: {
    // Nombre comercial de la inmobiliaria (se refleja en encabezados, pie, títulos y WhatsApp)
    name: 'Housfy Costa Rica',

    // Eslogan principal que aparece en el Hero
    slogan: 'La nueva era para comprar, vender y valorar tu propiedad',

    // Subtítulo descriptivo de confianza
    subSlogan: 'Propiedades de alta gama en Escazú, Santa Ana y Costa Pacífica con tecnología transparente, valoración gratuita y expertos locales.',

    // Tipo de logotipo: 'text' (usa el nombre estilizado con icono) o 'image'
    logoType: 'text',

    // En caso de usar 'image', colocar aquí la URL de la imagen del logotipo
    logoImageUrl: '',
  },

  // 2. PALETA DE COLORES CORPORATIVOS
  // Opciones disponibles:
  // - 'emerald'   : Verde Esmeralda (Housfy Tropical / Fresco / Arquitectura moderna)
  // - 'gold'      : Oro & Pizarra (Luxury High-End / Zonas exclusivas)
  // - 'terracotta': Naranja Terracota & Atardecer del Pacífico
  // - 'sapphire'  : Azul Zafiro & Corporativo Clásico
  // - 'custom'    : Utiliza los colores personalizados de 'colors' más abajo
  theme: {
    palette: 'emerald',

    // Colores específicos (activos cuando palette = 'custom' o como base para variables)
    colors: {
      primary: '#061a14',
      accent: '#059669', // Color principal de botones, enlaces e insignias
      accentHover: '#047857',
      accentLight: '#34d399',
      accentBg: 'rgba(5, 150, 105, 0.12)',
    },
  },

  // 3. CANALES DE CONTACTO OFICIALES EN COSTA RICA
  contact: {
    phone: '+506 2289-4500',
    whatsapp: '+506 8800-1234', // A este número caerán todas las consultas y valoraciones
    email: 'info@housfy.cr',
    address: 'Plaza Tempo, Torre 2, Nivel 4, Escazú, San José, Costa Rica',
    sinpeMovil: '+506 8800-1234',
    schedule: 'Lunes a Viernes: 8:30 am - 6:00 pm • Sábados: Con cita previa',
  },

  // 4. MONEDA Y TIPO DE CAMBIO
  currency: {
    // Moneda por defecto al cargar la web: 'USD' ($ Dólares) o 'CRC' (₡ Colones)
    defaultMode: 'USD',

    // Tipo de cambio referencial (₡ Colones por cada $1 USD)
    exchangeRate: 520,
  },
};

// =========================================================================
// PALETAS PRECONFIGURADAS (Se activan con SITE_CONFIG.theme.palette)
// =========================================================================
export const PALETTES = {
  emerald: {
    primary: '#061a14',
    accent: '#059669',
    accentHover: '#047857',
    accentLight: '#34d399',
    accentBg: 'rgba(5, 150, 105, 0.12)',
    badgeBg: '#d1fae5',
  },
  gold: {
    primary: '#090d16',
    accent: '#d97706',
    accentHover: '#b45309',
    accentLight: '#fbbf24',
    accentBg: 'rgba(217, 119, 6, 0.12)',
    badgeBg: '#fef3c7',
  },
  terracotta: {
    primary: '#1c130e',
    accent: '#ea580c',
    accentHover: '#c2410c',
    accentLight: '#fb923c',
    accentBg: 'rgba(234, 88, 12, 0.12)',
    badgeBg: '#ffedd5',
  },
  sapphire: {
    primary: '#0a1426',
    accent: '#2563eb',
    accentHover: '#1d4ed8',
    accentLight: '#60a5fa',
    accentBg: 'rgba(37, 99, 235, 0.12)',
    badgeBg: '#dbeafe',
  },
};

// Obtener los colores activos según la configuración del archivo
export function getActiveThemeColors() {
  const p = SITE_CONFIG.theme.palette;
  if (p === 'custom') return SITE_CONFIG.theme.colors;
  return PALETTES[p] || PALETTES.emerald;
}

// =========================================================================
// FUNCIONES AUXILIARES DE FORMATEO BIMONEDA Y ENLACES
// =========================================================================

export function formatDualPrice(
  priceUSD: number,
  currencyMode: CurrencyMode,
  exchangeRate: number = SITE_CONFIG.currency.exchangeRate,
  isMonthly: boolean = false
): { primary: string; secondary: string; perM2: string } {
  const priceCRC = Math.round(priceUSD * exchangeRate);
  const suffix = isMonthly ? '/mes' : '';

  if (currencyMode === 'USD') {
    return {
      primary: `$${priceUSD.toLocaleString('en-US')}${suffix} USD`,
      secondary: `≈ ₡${priceCRC.toLocaleString('es-CR')}${suffix} CRC`,
      perM2: `$${Math.round(priceUSD / 100).toLocaleString('en-US')}/m²`,
    };
  } else {
    return {
      primary: `₡${priceCRC.toLocaleString('es-CR')}${suffix} CRC`,
      secondary: `≈ $${priceUSD.toLocaleString('en-US')}${suffix} USD`,
      perM2: `₡${Math.round(priceCRC / 100).toLocaleString('es-CR')}/m²`,
    };
  }
}

export function getWhatsAppInquiryUrl(
  whatsappNumber: string,
  propertyRef: string,
  propertyTitle: string,
  priceText: string
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = `Hola ${SITE_CONFIG.brand.name}, me interesa recibir información detallada de la propiedad Ref: ${propertyRef} ("${propertyTitle}" - ${priceText}) que vi en su página web. ¿Podríamos coordinar una visita?`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppValuationUrl(
  whatsappNumber: string,
  zone: string,
  propertyType: string,
  areaM2: number,
  estimatedRange: string
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = `Hola ${SITE_CONFIG.brand.name}, he completado la valoración online de mi ${propertyType} de aprox. ${areaM2} m² en ${zone}. El rango estimado fue de ${estimatedRange}. Me gustaría recibir el informe oficial y coordinar una valoración presencial sin compromiso.`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
