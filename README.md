# La Casa del Alfajor - Rediseño de E-commerce

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

> **⚠️ Nota Importante**: Este es un proyecto educativo personal que rediseña la experiencia web de "La Casa del Alfajor", un negocio peruano real. Este proyecto **no está afiliado, patrocinado ni respaldado** por la empresa original. Fue desarrollado como ejercicio de práctica para demostrar habilidades de desarrollo web moderno.

Rediseño completo y moderno de un e-commerce de alfajores artesanales peruanos, enfocado en mejorar la experiencia de usuario, rendimiento y funcionalidad mediante las últimas tecnologías web.

## 🎯 Motivación del Proyecto

Este proyecto nació como un ejercicio de análisis y mejora de una plataforma e-commerce existente. Los objetivos principales fueron:

- 📊 Analizar y mejorar la experiencia de usuario de un sitio real
- 🚀 Implementar funcionalidades modernas ausentes en la versión original
- 💡 Aplicar mejores prácticas de desarrollo web y arquitectura escalable
- 🎨 Crear un diseño responsive y accesible desde cero
- ⚡ Optimizar rendimiento y velocidad de carga

## ✨ Mejoras Implementadas vs. Sitio Original

### 🔍 Búsqueda y Navegación
- Búsqueda en tiempo real con sugerencias inteligentes
- Filtros avanzados por categoría, precio y disponibilidad
- Breadcrumbs en todas las páginas
- Navegación optimizada y accesible

### 🛒 Experiencia de Compra
- Carrito persistente con localStorage
- Checkout simplificado en 3 pasos
- Interfaz de múltiples métodos de pago
- Sistema de variantes de producto mejorado

### 🎨 Diseño y UX
- Diseño mobile-first 100% responsive
- Modo claro/oscuro
- Animaciones y transiciones suaves
- Interfaz moderna y consistente

### ⚡ Rendimiento
- Optimización de imágenes con next/image
- Server-Side Rendering (SSR)
- Lazy loading de componentes
- Código optimizado y type-safe con TypeScript

## 🌟 Características Principales

### 🛍️ Catálogo y Productos
- **Catálogo Completo**: Más de 100 productos organizados en categorías
- **Búsqueda Inteligente**: Búsqueda en tiempo real con sugerencias
- **Filtros Avanzados**: Por precio, categoría, popularidad y disponibilidad
- **Sistema de Reviews**: Visualización de calificaciones y reseñas

### 📦 Categorías de Productos
- **Alfajores**: Más de 15 sabores únicos (Chocolate, Lúcuma, Maracuyá, etc.)
- **Cajas Mixtas**: Combinaciones de 2, 3 y 4 sabores
- **Postres**: Brownies, budines, cheesecakes, tortas
- **Regalos Corporativos**: Boxes personalizados y cajas temáticas
- **Tienda**: Helados artesanales, kits DIY, bebidas y más

### 🛒 Carrito y Checkout (Demo)
- **Carrito de Compras**: Sistema completo con persistencia en localStorage
- **Checkout Multipasos**: Proceso de compra simulado en 3 pasos
- **Múltiples Métodos de Pago**: Interfaz para Tarjeta, Yape, Plin, Transferencia y Efectivo
- **Cálculo de Totales**: Subtotal, envío e impuestos

### 🎨 Diseño y UX
- **Diseño Responsivo**: Optimizado para mobile, tablet y desktop
- **Modo Claro/Oscuro**: Interfaz adaptable a preferencias del usuario
- **Animaciones Suaves**: Transiciones y efectos visuales profesionales
- **Imágenes Optimizadas**: Sistema de fallback para carga de imágenes
- **Accesibilidad**: Componentes accesibles siguiendo estándares WCAG

### 🔧 Funcionalidades Técnicas
- **Autenticación (Demo)**: Interfaz completa de Login/Registro
- **Gestión de Estado**: Context API para carrito y autenticación
- **Navegación Dinámica**: Breadcrumbs y routing optimizado
- **SEO Optimizado**: Metadata dinámica por página

## ⚠️ Alcance del Proyecto

Este es un **proyecto frontend de demostración** que incluye:

### ✅ Lo que SÍ tiene:
- Interfaz completa y funcional del e-commerce
- Sistema de carrito con persistencia local
- Flujo de checkout simulado
- Búsqueda y filtros en tiempo real
- Diseño responsive y optimizado
- Código limpio y escalable

### ❌ Lo que NO tiene (por ser demo):
- Backend real / Base de datos
- Autenticación real de usuarios
- Procesamiento real de pagos
- Integración con pasarelas de pago
- Gestión real de inventario
- Sistema de envío real
- Panel de administración

> 💡 **Nota**: Este proyecto está enfocado en el desarrollo frontend, la arquitectura de componentes, la gestión de estado y el diseño de interfaces. Para un sistema de producción completo, se requeriría integrar con un backend (Node.js/Express, Django, etc.) y servicios de pago reales.

## 🚀 Tecnologías Utilizadas

### Frontend
- **Next.js 15** - Framework de React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Framework de utilidades CSS
- **Shadcn/ui** - Componentes de UI accesibles y personalizables

### Herramientas y Librerías
- **Lucide React** - Iconos modernos y ligeros
- **next/image** - Optimización automática de imágenes
- **Context API** - Gestión de estado global
- **React Hooks** - useState, useEffect, useContext, useRouter

### Desarrollo
- **ESLint** - Linting de código
- **Git** - Control de versiones

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18.0 o superior
- npm, yarn, pnpm o bun

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/erickdc7/la-casa-del-alfajor.git

# Entrar al directorio
cd la-casa-del-alfajor

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install
```

### Ejecutar en Desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para Producción
```bash
npm run build
npm start
```

**Nota importante**: 
- El código es de código abierto bajo MIT License
- Las imágenes de productos pueden estar sujetas a derechos de autor
- El nombre "La Casa del Alfajor" es una marca del negocio original
- Este proyecto es solo para demostración de habilidades técnicas

---

⭐ **Si te gustó este proyecto, ¡dale una estrella en GitHub!**
