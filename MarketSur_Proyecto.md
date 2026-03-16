# 🛒 Market Sur
**Documento técnico del proyecto**
*Mercadillo digital para Cienfuegos, Cuba*

---

## 1. Visión del proyecto

Market Sur es un marketplace local tipo catálogo digital, pensado para reunir negocios y vendedores de Cienfuegos en una sola plataforma. El cliente navega los productos, los añade al carrito y realiza su pedido directamente por WhatsApp. No hay pagos online ni registro obligatorio — solo un catálogo bonito y una comunicación directa.

El administrador (tú) gestiona todos los productos desde un panel sencillo. Los vendedores te envían sus productos por WhatsApp y tú los publicas. Control total, cero fricción para el cliente.

---

## 2. Funcionalidades del MVP

### Para el cliente (sin registro)
- Navegar el catálogo completo de productos
- Filtrar por categoría con un solo toque
- Buscar productos por nombre o descripción
- Ver detalle de cada producto: fotos, precio, descripción
- Ver estado: disponible o agotado
- Añadir productos al carrito y ajustar cantidades
- Enviar el pedido completo por WhatsApp con un botón
- Compartir un producto y ver preview automático (Open Graph)

### Para el administrador (tú)
- Subir productos desde el panel de Supabase (sin código)
- Añadir fotos, precio, categoría, descripción y estado
- Marcar productos como agotado o disponible
- Editar o eliminar productos en cualquier momento

### Categorías

| Ícono | Categoría |
|-------|-----------|
| 👗 | Ropa y calzado |
| 🍔 | Comida y bebida |
| 📱 | Electrónica |
| 🏠 | Hogar y muebles |
| 💄 | Belleza y cuidado personal |
| 🔧 | Servicios |
| 🧸 | Juguetes |
| 📦 | Otros / variado |

---

## 3. Stack tecnológico

Todo gratuito, todo funciona desde Cuba, sin necesidad de pagar dominio.

| Parte | Tecnología | Por qué |
|-------|-----------|---------|
| Frontend | React + Vite + Tailwind CSS | Una sola app para web y móvil (PWA) |
| Base de datos | Supabase (PostgreSQL) | Gratuito, funciona desde Cuba |
| Imágenes | Supabase Storage | Fotos de productos incluidas |
| Contacto / pedidos | Enlace wa.me | Cero backend adicional |
| Despliegue | Vercel (gratis) | URL automática + HTTPS |
| Control de versiones | GitHub (gratis) | Histórico y respaldo del código |

**URL gratuita:** `marketsur.vercel.app`

---

## 4. Arquitectura del sistema

### Flujo del cliente

1. Cliente entra a `marketsur.vercel.app` desde su móvil o PC
2. Navega el catálogo y filtra por categoría o busca por nombre
3. Toca un producto para ver su detalle completo
4. Añade productos al carrito, ajusta cantidades
5. Pulsa **"Pedir por WhatsApp"** — WhatsApp se abre con el pedido ya escrito
6. Tú recibes el mensaje, confirmas y cierras la venta

### Flujo del administrador

1. Vendedor te envía el producto por WhatsApp (foto, nombre, precio, descripción)
2. Entras a Supabase Studio (panel visual gratuito)
3. Insertas el producto en la tabla con sus datos y subes la foto
4. El producto aparece en el catálogo automáticamente

---

## 5. Diseño de la base de datos

### Tabla: `productos`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid (PK) | Identificador único, generado automáticamente |
| `nombre` | text | Nombre del producto |
| `descripcion` | text | Descripción detallada |
| `precio` | numeric | Precio en la moneda local |
| `categoria` | text | Una de las 8 categorías |
| `imagen_url` | text | URL de la foto en Supabase Storage |
| `disponible` | boolean | true = disponible, false = agotado |
| `destacado` | boolean | Para mostrar primero en el catálogo |
| `created_at` | timestamp | Fecha de publicación (automático) |

---

## 6. Estructura de carpetas del proyecto

```
marketsur/
├── public/
│   ├── manifest.json          ← hace la PWA instalable
│   └── icons/                 ← íconos de la app
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx     ← tarjeta de producto
│   │   ├── CategoryFilter.jsx  ← botones de categoría
│   │   ├── SearchBar.jsx       ← barra de búsqueda
│   │   ├── Cart.jsx            ← carrito deslizable
│   │   └── CartItem.jsx        ← fila de producto en carrito
│   ├── pages/
│   │   ├── Home.jsx            ← catálogo principal
│   │   └── ProductDetail.jsx   ← detalle de un producto
│   ├── hooks/
│   │   ├── useProducts.js      ← lógica de carga desde Supabase
│   │   └── useCart.js          ← lógica del carrito
│   ├── lib/
│   │   ├── supabase.js         ← cliente de Supabase
│   │   └── whatsapp.js         ← función que genera el enlace
│   ├── App.jsx
│   └── main.jsx
├── .env                        ← claves de Supabase (no subir a GitHub)
├── vite.config.js
└── package.json
```

---

## 7. Fragmentos de código clave

### 7.1 Función generadora del enlace de WhatsApp

```js
// src/lib/whatsapp.js
export function generarMensajeWhatsApp(carrito) {
  const TU_NUMERO = '5351234567'; // tu número cubano

  let mensaje = 'Hola, quiero hacer este pedido:%0A%0A';

  carrito.forEach(item => {
    mensaje += `• ${item.nombre} x${item.cantidad} — $${item.precio}%0A`;
  });

  const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
  mensaje += `%0ATotal: $${total}%0A%C2%BFEstán disponibles?`;

  return `https://wa.me/${TU_NUMERO}?text=${mensaje}`;
}
```

### 7.2 Hook del carrito

```js
// src/hooks/useCart.js
import { useState } from 'react';

export function useCart() {
  const [items, setItems] = useState([]);

  const agregar = (producto) => {
    setItems(prev => {
      const existe = prev.find(i => i.id === producto.id);
      if (existe) return prev.map(i =>
        i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
      );
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitar = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const cantidad = items.reduce((s, i) => s + i.cantidad, 0);

  return { items, agregar, quitar, total, cantidad };
}
```

### 7.3 Carga de productos desde Supabase

```js
// src/hooks/useProducts.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useProducts(categoria = null, busqueda = '') {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      let query = supabase.from('productos').select('*')
        .eq('disponible', true).order('destacado', { ascending: false });

      if (categoria) query = query.eq('categoria', categoria);
      if (busqueda) query = query.ilike('nombre', `%${busqueda}%`);

      const { data } = await query;
      setProductos(data || []);
      setCargando(false);
    }
    cargar();
  }, [categoria, busqueda]);

  return { productos, cargando };
}
```

---

## 8. Plan de desarrollo por fases

### Fase 1 — Base funcional (1-2 semanas)
- Configurar proyecto con Vite + React + Tailwind CSS
- Conectar Supabase y crear la tabla de productos
- Mostrar catálogo con tarjetas de productos
- Filtros por categoría y barra de búsqueda
- Página de detalle del producto
- Carrito funcional con hook de estado
- Botón de WhatsApp con mensaje generado
- Desplegar en Vercel

### Fase 2 — Pulido y estándares (1 semana)
- Estado "agotado" visual en tarjetas y detalle
- Open Graph para preview al compartir links
- PWA: `manifest.json` + Service Worker para instalar en móvil
- Animaciones y transiciones suaves
- Diseño responsivo revisado en diferentes tamaños

### Fase 3 — Mejoras futuras
- Productos destacados en banner principal
- Filtro por rango de precio
- Galería de múltiples fotos por producto
- Modo oscuro
- Estadísticas básicas de visitas

---

## 9. Comandos para arrancar hoy

```bash
# 1. Crear el proyecto
npm create vite@latest marketsur -- --template react
cd marketsur

# 2. Instalar dependencias
npm install
npm install @supabase/supabase-js
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Instalar React Router (para la página de detalle)
npm install react-router-dom

# 4. Arrancar el servidor de desarrollo
npm run dev
```

Después creas tu proyecto gratuito en [supabase.com](https://supabase.com), copias las claves al archivo `.env`, y ya tienes el stack completo funcionando en local.

---

## 10. Recursos esenciales

| Recurso | URL |
|---------|-----|
| Supabase (crear proyecto gratis) | supabase.com |
| Vercel (despliegue gratis) | vercel.com |
| Documentación de React | react.dev |
| Documentación de Tailwind CSS | tailwindcss.com |
| Documentación de Supabase JS | supabase.com/docs/reference/javascript |
| React Router (rutas) | reactrouter.com |
| Generador de wa.me | wa.me |

---

*Market Sur — construido con React, Supabase y mucha claridad*
