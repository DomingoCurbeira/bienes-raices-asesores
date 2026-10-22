import React, { useState, useEffect, useMemo } from 'react';
import { SITE_CONFIG, getActiveThemeColors } from './config/siteConfig';
import { Property, FilterState, CurrencyMode, OperationType, PropertyType } from './types';
import { MOCK_PROPERTIES } from './data/mockProperties';
import { MOCK_AGENTS } from './data/mockAgents';

// Componentes
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PropertyCatalog } from './components/PropertyCatalog';
import { InstantValuationSection } from './components/InstantValuationSection';
import { ServicesSection } from './components/ServicesSection';
import { MortgageCalculatorSection } from './components/MortgageCalculatorSection';
import { AgentTeamSection } from './components/AgentTeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';

export function App() {
  // Estado Bimoneda (USD / CRC)
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>(
    SITE_CONFIG.currency.defaultMode
  );

  // Inyección automática de colores corporativos desde siteConfig.ts
  useEffect(() => {
    const themeColors = getActiveThemeColors();
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', themeColors.primary);
    root.style.setProperty('--brand-accent', themeColors.accent);
    root.style.setProperty('--brand-accent-hover', themeColors.accentHover);
    root.style.setProperty('--brand-accent-light', themeColors.accentLight);
    root.style.setProperty('--brand-accent-bg', themeColors.accentBg);
    if ('badgeBg' in themeColors) {
      root.style.setProperty('--brand-badge-bg', (themeColors as any).badgeBg);
    }
    document.title = `${SITE_CONFIG.brand.name} | Bienes Raíces Inteligentes en Costa Rica`;
  }, []);

  // Estado de Filtros Habitaclia
  const initialFilters: FilterState = {
    operation: 'venta',
    propertyType: 'todos',
    city: '',
    neighborhood: '',
    minPrice: 0,
    maxPrice: 99999999,
    minBedrooms: 0,
    minBathrooms: 0,
    hasGarage: false,
    hasPool: false,
    hasTerrace: false,
    hasElevator: false,
    hasSecurity24: false,
    onlyExclusives: false,
    onlyDiscounted: false,
    searchQuery: '',
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Favoritos guardados
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('housfy_cr_favorites');
      return saved ? JSON.parse(saved) : ['prop-1'];
    } catch {
      return ['prop-1'];
    }
  });

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Guardar favoritos
  useEffect(() => {
    try {
      localStorage.setItem('housfy_cr_favorites', JSON.stringify(favoriteIds));
    } catch {
      // Ignorar error de cuota si existiera
    }
  }, [favoriteIds]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearFavorites = () => {
    setFavoriteIds([]);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters((prev) => ({
      ...initialFilters,
      operation: prev.operation, // Conserva si está en venta o alquiler
    }));
  };

  // Conteo total para badges
  const saleCountTotal = useMemo(
    () => MOCK_PROPERTIES.filter((p) => p.operation === 'venta').length,
    []
  );

  const rentCountTotal = useMemo(
    () => MOCK_PROPERTIES.filter((p) => p.operation === 'alquiler').length,
    []
  );

  // Selección directa desde el Mega-Menú o acordeón móvil
  const handleSelectCategory = (
    operation: OperationType,
    propertyType: PropertyType | 'todos' = 'todos'
  ) => {
    setFilters((prev) => ({
      ...prev,
      operation,
      propertyType,
    }));
    const elem = document.getElementById('catalogo');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtrado reactivo de propiedades
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((prop) => {
      // 1. Operación (venta o alquiler)
      if (prop.operation !== filters.operation) return false;

      // 2. Tipo de inmueble
      if (filters.propertyType !== 'todos' && prop.type !== filters.propertyType) {
        return false;
      }

      // 3. Zona o Cantón
      if (filters.city && !prop.city.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }

      // 4. Dormitorios
      if (filters.minBedrooms > 0 && prop.bedrooms < filters.minBedrooms) {
        return false;
      }

      // 5. Precio Máximo
      if (prop.priceUSD > filters.maxPrice) {
        return false;
      }

      // 6. Amenidades booleanas
      if (filters.hasPool && !prop.hasPool) return false;
      if (filters.hasSecurity24 && !prop.hasSecurity24) return false;
      if (filters.hasGarage && prop.garageSpots < 1) return false;
      if (filters.hasTerrace && !prop.hasTerrace) return false;

      // 7. Exclusivas / Rebajadas
      if (filters.onlyExclusives && prop.status !== 'exclusiva') return false;
      if (filters.onlyDiscounted && prop.status !== 'rebajado') return false;

      return true;
    });
  }, [filters]);

  const favoriteProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((p) => favoriteIds.includes(p.id));
  }, [favoriteIds]);

  const selectedAgent = useMemo(() => {
    if (!selectedProperty) return undefined;
    return MOCK_AGENTS.find((a) => a.id === selectedProperty.agentId) || MOCK_AGENTS[0];
  }, [selectedProperty]);

  const scrollToValuation = () => {
    const elem = document.getElementById('valoracion');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const cleanWhatsApp = SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. Encabezado con Mega-Menú Desktop & Acordeón Mobile-First */}
      <Navbar
        currencyMode={currencyMode}
        onToggleCurrency={() =>
          setCurrencyMode((prev) => (prev === 'USD' ? 'CRC' : 'USD'))
        }
        favoritesCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onSelectCategory={handleSelectCategory}
        onNavigateToValuation={scrollToValuation}
        saleCount={saleCountTotal}
        rentCount={rentCountTotal}
      />

      {/* 2. Hero Section Editorial + Buscador Multicriterio Habitaclia */}
      <HeroSection
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={() => {
          const elem = document.getElementById('catalogo');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
        matchingCount={filteredProperties.length}
        currencyMode={currencyMode}
        onNavigateToValuation={scrollToValuation}
      />

      {/* 3. Catálogo de Inmuebles con Pestañas Venta / Alquiler */}
      <PropertyCatalog
        properties={filteredProperties}
        currencyMode={currencyMode}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        onSelectProperty={setSelectedProperty}
        onResetFilters={handleResetFilters}
        activeOperation={filters.operation}
        onChangeOperation={(op) =>
          setFilters((prev) => ({ ...prev, operation: op, propertyType: 'todos' }))
        }
        activeTypeFilter={filters.propertyType}
        onSelectTypeFilter={(type) => handleFilterChange({ propertyType: type })}
        saleCountTotal={saleCountTotal}
        rentCountTotal={rentCountTotal}
      />

      {/* 4. Valoración Online Inmediata (Housfy 3 Pasos) */}
      <InstantValuationSection currencyMode={currencyMode} />

      {/* 5. Ecosistema de 4 Servicios Housfy */}
      <ServicesSection onNavigateToValuation={scrollToValuation} />

      {/* 6. Simulador Hipotecario con Bancos de Costa Rica */}
      <MortgageCalculatorSection currencyMode={currencyMode} />

      {/* 7. Equipo de Asesores Locales */}
      <AgentTeamSection />

      {/* 8. Testimonios Verificados */}
      <TestimonialsSection />

      {/* 9. Pie de Página Oficial */}
      <Footer />

      {/* Cajón Lateral de Favoritos */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteProperties}
        currencyMode={currencyMode}
        onRemoveFavorite={toggleFavorite}
        onClearFavorites={handleClearFavorites}
        onSelectProperty={setSelectedProperty}
      />

      {/* Modal Ficha Completa del Inmueble */}
      <PropertyDetailModal
        property={selectedProperty}
        currencyMode={currencyMode}
        agent={selectedAgent}
        isFavorite={selectedProperty ? favoriteIds.includes(selectedProperty.id) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedProperty(null)}
      />

      {/* Botón Flotante de WhatsApp para Contacto Inmediato */}
      <a
        href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
          `Hola ${SITE_CONFIG.brand.name}, estoy navegando en su página web y me gustaría recibir asesoría sobre propiedades en Costa Rica.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
        title="Hablar con un asesor por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-bold text-xs pl-0 group-hover:pl-2">
          ¿En qué podemos ayudarte?
        </span>
      </a>
    </div>
  );
}

export default App;
