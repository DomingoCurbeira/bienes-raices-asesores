import { Testimonial } from '../types';

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Ing. Rodrigo Chaves Montero',
    role: 'Vendedor en Valle del Sol, Santa Ana',
    propertyPurchased: 'Villa Familiar en Valle del Sol',
    rating: 5,
    comment: 'La herramienta de valoración online nos dio un rango exacto del valor de mercado. Vendimos nuestra propiedad en 38 días sin comisiones desmedidas y con total transparencia en el proceso legal.',
    date: 'Febrero 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-2',
    author: 'Dra. Marianne Fournier & David Clark',
    role: 'Compradores en Rohrmoser',
    propertyPurchased: 'Penthouse frente a La Sabana',
    rating: 5,
    comment: 'Nos mudamos desde Canadá a Costa Rica y el equipo nos guió en cada detalle: trámite bancario con el BAC Credomatic, inspección técnica y traspaso notarial. Servicio de primera categoría.',
    date: 'Enero 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-3',
    author: 'Esteban Jimenes Pacheco',
    role: 'Inversor en Escalante & Rohrmoser',
    propertyPurchased: '2 Unidades en Torre Urbana',
    rating: 5,
    comment: 'El análisis de rentabilidad y asesoría fiscal para alquileres en San José fue impecable. Tienen la mejor tecnología de visualización y filtrado rápido que he visto en el país.',
    date: 'Marzo 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
];
