# Delivery Component

Componente atómico para la sección de delivery con detección automática de país y visualización condicional de apps de delivery.

## Estructura

```
Delivery/
├── index.astro     # Template principal del componente
├── delivery.js     # Lógica JavaScript desacoplada
└── README.md       # Documentación
```

## Uso

```astro
---
import Delivery from '../../components/sections/Delivery/index.astro';
---

<Delivery 
  deliveryTitle="DÓNDE"
  deliverySubTitle="ENCONTRARNOS"
  deliveryApps={[
    {
      app_icon: "path/to/icon.webp",
      app_name: "App Name",
      app_url: "https://app-url.com",
      country: "Guatemala"
    }
  ]}
/>
```

## Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `deliveryTitle` | `string` | Título principal de la sección |
| `deliverySubTitle` | `string` | Subtítulo de la sección |
| `deliveryApps` | `Array<DeliveryApp>` | Array de apps de delivery disponibles |

### DeliveryApp Interface

```typescript
interface DeliveryApp {
  app_icon: string;    // URL del icono de la app
  app_name: string;    // Nombre de la app
  app_url: string;     // URL de la app
  country: string;     // País donde está disponible
}
```

## Funcionalidades

### 🌍 Detección de País
- **API Principal**: `/api/country` usando `geoip-lite`
- **Fallback 1**: `ipapi.co`
- **Fallback 2**: `api.country.is`
- **Testing**: Parámetro URL `?country=XX` para forzar país

### 📱 Lógica de Visualización
- **País detectado con app**: Muestra solo la app del país del usuario
- **País sin app / No detectado**: Muestra todas las apps con labels de país

### 🎨 Animaciones
- **Icono flotante**: Geolocalización que flota suavemente
- **Ondas sonar**: 3 ondas blancas que se expanden desde el centro
- **Hover effects**: Escalado suave en las apps

### 🎯 Responsive Design
- **Una app**: Centrada con max-width pequeño
- **Múltiples apps**: Grid responsive (1 col móvil, 2 cols desktop)

## Estilos CSS

El componente incluye:
- Fondo sólido `#84B3DA`
- Animaciones CSS para efectos sonar y flotante
- Estilos responsive con Tailwind CSS
- Transiciones suaves para interacciones

## API Dependencies

- `/api/country` - Endpoint interno para detección de país
- `ipapi.co` - API externa de fallback
- `api.country.is` - API externa de fallback secundaria

## Browser Support

- Soporte completo para navegadores modernos
- Fallbacks graceful para APIs de detección
- Console logging para debugging
