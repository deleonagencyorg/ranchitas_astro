# Guía de Colores del Header

Este sistema permite personalizar los colores del header/navbar por sección de manera dinámica.

## Configuración

### Archivo de Configuración
Los colores se configuran en `src/config/headerColors.ts`

### Estructura de Configuración
```typescript
interface HeaderColorConfig {
  textColor: string;           // Color del texto (clases Tailwind)
  backgroundColor: string;      // Color de fondo (clases Tailwind)
  hoverTextColor: string;      // Color del texto en hover (clases Tailwind)
  hoverBackgroundColor: string; // Color de fondo en hover (clases Tailwind)
  showMessageCarousel: boolean; // Si mostrar el carrusel de mensajes
}
```

## Configuraciones Disponibles

### Por Defecto
- **Texto**: Blanco
- **Fondo**: Azul oscuro (`bg-blue-900`)
- **Hover**: Gris claro
- **MessageCarousel**: Sí

### Brands/Marcas
- **Texto**: Blanco
- **Fondo**: Azul oscuro
- **MessageCarousel**: No

### Blog/Noticias
- **Texto**: Negro
- **Fondo**: Transparente
- **Hover**: Gris oscuro
- **MessageCarousel**: No

### Productos
- **Texto**: Blanco
- **Fondo**: Azul oscuro
- **MessageCarousel**: Sí

### Recetas
- **Texto**: Blanco
- **Fondo**: Verde oscuro (`bg-green-800`)
- **Hover**: Verde claro
- **MessageCarousel**: No

### Contacto
- **Texto**: Blanco
- **Fondo**: Gris oscuro (`bg-gray-800`)
- **Hover**: Gris claro
- **MessageCarousel**: No

### Noticias
- **Texto**: Blanco
- **Fondo**: Púrpura oscuro (`bg-purple-800`)
- **Hover**: Púrpura claro
- **MessageCarousel**: No

## Cómo Agregar Nuevas Configuraciones

1. **Agregar nueva configuración en `headerColors`**:
```typescript
// En src/config/headerColors.ts
export const headerColors: HeaderColors = {
  // ... configuraciones existentes ...
  
  // Nueva sección
  nuevaSeccion: {
    textColor: 'text-white',
    backgroundColor: 'bg-red-800',
    hoverTextColor: 'hover:text-red-200',
    hoverBackgroundColor: 'hover:bg-red-700',
    showMessageCarousel: false,
  },
};
```

2. **Agregar lógica de detección en `getHeaderColors`**:
```typescript
export function getHeaderColors(pathname: string): HeaderColorConfig {
  const path = pathname.toLowerCase();
  
  // ... lógica existente ...
  
  if (path.includes('/nueva-seccion')) {
    return headerColors.nuevaSeccion;
  }
  
  return headerColors.default;
}
```

## Características Especiales

### Mobile Menu
- El menú móvil **siempre** mantiene el fondo azul (`bg-primary`)
- Los colores del texto y hover se aplican dinámicamente
- El botón de hamburguesa usa los colores configurados

### Language Switcher
- Los colores del texto se aplican dinámicamente
- El hover mantiene el color amarillo para el idioma activo
- Los colores inactivos usan la configuración de la sección

### Message Carousel
- Se puede mostrar/ocultar por sección
- Por defecto está habilitado en la página de inicio y productos

## Clases Tailwind Disponibles

### Colores de Texto
- `text-white` - Blanco
- `text-black` - Negro
- `text-gray-300` - Gris claro
- `text-gray-700` - Gris oscuro

### Colores de Fondo
- `bg-blue-900` - Azul oscuro
- `bg-transparent` - Transparente
- `bg-green-800` - Verde oscuro
- `bg-gray-800` - Gris oscuro
- `bg-purple-800` - Púrpura oscuro

### Hover
- `hover:text-gray-300` - Hover gris claro
- `hover:text-gray-700` - Hover gris oscuro
- `hover:bg-blue-800` - Hover azul
- `hover:bg-green-700` - Hover verde
- `hover:bg-gray-700` - Hover gris
- `hover:bg-purple-700` - Hover púrpura

## Ejemplo de Uso

Para cambiar los colores de una sección específica:

1. **Editar la configuración**:
```typescript
// En src/config/headerColors.ts
brands: {
  textColor: 'text-yellow-400',        // Cambiar a amarillo
  backgroundColor: 'bg-red-900',       // Cambiar a rojo oscuro
  hoverTextColor: 'hover:text-yellow-200',
  hoverBackgroundColor: 'hover:bg-red-800',
  showMessageCarousel: false,
},
```

2. **Los cambios se aplican automáticamente** cuando se navega a `/brands` o `/marcas`

## Notas Importantes

- Los cambios son **inmediatos** y no requieren reiniciar el servidor
- El sistema es **responsivo** y funciona en desktop y mobile
- Los colores se aplican **dinámicamente** basándose en la URL actual
- El menú móvil mantiene su comportamiento especial (fondo azul)
- El MessageCarousel se puede controlar por sección 