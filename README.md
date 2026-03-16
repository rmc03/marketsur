# 🛒 Market Sur

> El mercadillo digital de Cienfuegos, Cuba

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3ECF8E?logo=supabase)](https://supabase.com)

Market Sur es una Progressive Web App (PWA) que conecta vendedores locales con clientes en Cienfuegos. Los usuarios navegan el catálogo, agregan productos al carrito y realizan pedidos directamente por WhatsApp.

## ✨ Características

- 🎨 **Interfaz Moderna** - Diseño limpio con modo oscuro
- 📱 **PWA Completa** - Instalable, funciona offline
- 🔍 **Búsqueda Avanzada** - Busca por nombre o descripción
- 🏷️ **Filtros por Categoría** - 8 categorías predefinidas
- 🖼️ **Galería de Imágenes** - Swipe entre múltiples fotos
- 🛒 **Carrito Inteligente** - Gestión de productos y cantidades
- 💬 **Pedidos por WhatsApp** - Integración directa
- 📊 **Historial de Pedidos** - Repite pedidos fácilmente
- 🎭 **Animaciones Suaves** - Transiciones con Framer Motion
- 📲 **Pull to Refresh** - Actualiza el catálogo
- 🔔 **Feedback Háptico** - Vibración en móviles

## 🚀 Demo

[Ver Demo en Vivo](https://marketsur.vercel.app) _(próximamente)_

## 📸 Screenshots

_Próximamente_

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + Vite 8
- **Estilos**: Tailwind CSS 4
- **Animaciones**: Framer Motion
- **Iconos**: Phosphor Icons
- **Base de Datos**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Routing**: React Router v7
- **Despliegue**: Vercel

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase (gratis)

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/rmc03/marketsur.git
cd marketsur
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env
cp .env.example .env

# Editar .env con tus credenciales de Supabase
VITE_SUPABASE_URL=tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-publica
```

4. **Configurar Supabase**

Sigue la guía completa en [`docs/GUIA_SUPABASE.md`](docs/GUIA_SUPABASE.md)

5. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linter ESLint
```

## 🗂️ Estructura del Proyecto

```
marketsur/
├── public/
│   ├── manifest.json      # PWA manifest
│   ├── sw.js             # Service Worker
│   └── icons/            # Iconos de la app
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── pages/           # Páginas de la app
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilidades (Supabase, WhatsApp)
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Entry point
├── docs/                # Documentación
└── README.md
```

## 🎯 Categorías de Productos

- 👗 Ropa y calzado
- 🍔 Comida y bebida
- 📱 Electrónica
- 🏠 Hogar y muebles
- 💄 Belleza y cuidado personal
- 🔧 Servicios
- 🧸 Juguetes
- 📦 Otros / variado

## 🔧 Configuración de Supabase

### Tabla `productos`

```sql
CREATE TABLE productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio NUMERIC NOT NULL,
  categoria TEXT NOT NULL,
  imagen_url TEXT,
  imagenes TEXT[],
  disponible BOOLEAN DEFAULT true,
  destacado BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Ver guía completa en [`docs/GUIA_SUPABASE.md`](docs/GUIA_SUPABASE.md)

## 🚢 Despliegue

### Vercel (Recomendado)

1. Conecta tu repo de GitHub en [vercel.com](https://vercel.com)
2. Configura las variables de entorno
3. Despliega automáticamente

### Otras opciones

- Netlify
- Cloudflare Pages
- GitHub Pages (con adaptador)

## 📱 Generar APK

Para convertir la PWA en APK para Android:

1. Despliega la app en Vercel
2. Ve a [pwabuilder.com](https://www.pwabuilder.com/)
3. Ingresa tu URL
4. Descarga la APK

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👤 Autor

**Ruslan MC**
- GitHub: [@rmc03](https://github.com/rmc03)

## 🙏 Agradecimientos

- Diseño inspirado en Facebook Marketplace
- Iconos por [Phosphor Icons](https://phosphoricons.com/)
- Imágenes de ejemplo por [Unsplash](https://unsplash.com/)

## 📞 Soporte

¿Tienes preguntas? Abre un [issue](https://github.com/rmc03/marketsur/issues) o contacta al autor.

---

Hecho con ❤️ en Cienfuegos, Cuba
