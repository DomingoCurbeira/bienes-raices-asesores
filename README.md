# InmoHousfy Costa Rica | Prototipo Híbrido Housfy + Habitaclia

Prototipo de alta gama para agencia inmobiliaria en **Costa Rica**, combinando la elegancia editorial y las herramientas PropTech de **Housfy** (valoración online gratuita en 3 pasos, ecosistema de servicios, brokerage hipotecario con bancos costarricenses) con la densidad de datos y el potente buscador de **Habitaclia** (m² de construcción y lote, cuota condominal, dormitorios, baños, parqueos, seguridad 24/7 y filtros multicriterio).

---

## 🎯 Configuración Maestra con Variables (Sin Botones de Demo)

Tal como se solicitó, la web **no contiene botones flotantes de demo**. Toda la personalización de marca, paleta de colores corporativos, teléfonos y moneda se gestiona de forma centralizada en un único archivo:

📁 **[`src/config/siteConfig.ts`](file:///Users/macbook-m4/Proyectos/prototipos/inmobiliaria-housfy-habitaclia/src/config/siteConfig.ts)**

### 1. Cambiar el Nombre de la Inmobiliaria
Edita la variable `SITE_CONFIG.brand.name`. Se actualizará en el encabezado, títulos de página, pie de página y en los mensajes automáticos de WhatsApp:
```typescript
brand: {
  name: 'Mi Inmobiliaria CR',
  slogan: 'Tu hogar soñado en Costa Rica',
  ...
}
```

### 2. Cambiar la Paleta de Colores
Puedes seleccionar una de las 4 paletas preconfiguradas o definir colores hexadecimales personalizados en `palette`:
- `'emerald'`: Verde Esmeralda (Housfy Moderno / Naturaleza de Costa Rica)
- `'gold'`: Oro & Carbón (Luxury High-End / Escazú & Santa Ana)
- `'terracotta'`: Naranja Terracota & Atardecer del Pacífico
- `'sapphire'`: Azul Zafiro & Corporativo Clásico
- `'custom'`: Define tus propios códigos HEX en `colors`

```typescript
theme: {
  palette: 'emerald', // o 'gold', 'terracotta', 'sapphire', 'custom'
}
```

### 3. Modificar Contactos y Canales de Costa Rica
```typescript
contact: {
  phone: '+506 2289-4500',
  whatsapp: '+506 8800-1234', // Recibe todas las consultas directas
  email: 'info@housfy.cr',
  address: 'Plaza Tempo, Torre 2, Nivel 4, Escazú, San José, Costa Rica',
  sinpeMovil: '+506 8800-1234',
  schedule: 'Lunes a Viernes: 8:30 am - 6:00 pm',
}
```

### 4. Moneda y Tipo de Cambio
```typescript
currency: {
  defaultMode: 'USD', // o 'CRC'
  exchangeRate: 520,   // ₡ Colones por cada $1 USD
}
```

---

## 🚀 Tecnologías Utilizadas
- **React 19** + **TypeScript**
- **Vite 8** (Compilación ultrarrápida)
- **Tailwind CSS v4** (Variables de diseño y CSS reactivo)
- **Lucide React** (Iconografía inmobiliaria de alta precisión)

---

## 🛠️ Comandos de Desarrollo
```bash
# Instalar dependencias
npm install

# Iniciar servidor local de desarrollo
npm run dev

# Compilar para producción (Netlify / Vercel / Servidor propio)
npm run build
```
