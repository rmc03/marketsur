# 🗄️ Guía de Configuración de Supabase para Market Sur

## 📋 Índice
1. [Crear Proyecto en Supabase](#1-crear-proyecto-en-supabase)
2. [Crear Tabla de Productos](#2-crear-tabla-de-productos)
3. [Configurar Storage para Imágenes](#3-configurar-storage-para-imágenes)
4. [Conectar la App](#4-conectar-la-app)
5. [Insertar Productos de Prueba](#5-insertar-productos-de-prueba)
6. [Migrar Datos Mock](#6-migrar-datos-mock)

---

## 1. Crear Proyecto en Supabase

### Paso 1.1: Registro
1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Inicia sesión con GitHub (recomendado) o email

### Paso 1.2: Crear Proyecto
1. Clic en "New Project"
2. Completa:
   - **Name**: `marketsur` (o el nombre que prefieras)
   - **Database Password**: Genera una contraseña segura (guárdala!)
   - **Region**: Selecciona la más cercana (ej: `South America (São Paulo)`)
   - **Pricing Plan**: Free (suficiente para empezar)
3. Clic en "Create new project"
4. Espera 2-3 minutos mientras se crea

---

## 2. Crear Tabla de Productos

### Paso 2.1: Abrir SQL Editor
1. En el panel izquierdo, clic en "SQL Editor"
2. Clic en "New query"

### Paso 2.2: Ejecutar Script SQL

Copia y pega este script completo:

```sql
-- Crear tabla productos
CREATE TABLE productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio NUMERIC NOT NULL CHECK (precio >= 0),
  categoria TEXT NOT NULL,
  imagen_url TEXT,
  imagenes TEXT[], -- Array para múltiples imágenes
  disponible BOOLEAN DEFAULT true,
  destacado BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_productos_categoria ON productos(categoria);
CREATE INDEX idx_productos_disponible ON productos(disponible);
CREATE INDEX idx_productos_destacado ON productos(destacado);
CREATE INDEX idx_productos_created_at ON productos(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer productos
CREATE POLICY "Productos son públicos para lectura"
  ON productos FOR SELECT
  USING (true);

-- Política: Solo usuarios autenticados pueden insertar
-- (Puedes ajustar esto según tus necesidades)
CREATE POLICY "Solo autenticados pueden insertar productos"
  ON productos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política: Solo autenticados pueden actualizar
CREATE POLICY "Solo autenticados pueden actualizar productos"
  ON productos FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Política: Solo autenticados pueden eliminar
CREATE POLICY "Solo autenticados pueden eliminar productos"
  ON productos FOR DELETE
  USING (auth.role() = 'authenticated');

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_productos_updated_at
  BEFORE UPDATE ON productos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentación
COMMENT ON TABLE productos IS 'Catálogo de productos de Market Sur';
COMMENT ON COLUMN productos.imagenes IS 'Array de URLs de imágenes (soporta galería múltiple)';
COMMENT ON COLUMN productos.imagen_url IS 'URL de imagen principal (compatibilidad con versión anterior)';
```

3. Clic en "Run" (o presiona Ctrl+Enter)
4. Deberías ver: "Success. No rows returned"

---

## 3. Configurar Storage para Imágenes

### Paso 3.1: Crear Bucket
1. En el panel izquierdo, clic en "Storage"
2. Clic en "Create a new bucket"
3. Completa:
   - **Name**: `productos`
   - **Public bucket**: ✅ Activado (para que las imágenes sean accesibles)
4. Clic en "Create bucket"

### Paso 3.2: Configurar Políticas de Storage

1. Clic en el bucket `productos`
2. Ve a la pestaña "Policies"
3. Clic en "New policy"
4. Selecciona "For full customization"
5. Pega este código:

```sql
-- Política: Todos pueden ver imágenes
CREATE POLICY "Imágenes públicas para lectura"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'productos');

-- Política: Solo autenticados pueden subir
CREATE POLICY "Solo autenticados pueden subir imágenes"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'productos' AND
    auth.role() = 'authenticated'
  );
```

6. Clic en "Review" y luego "Save policy"

---

## 4. Conectar la App

### Paso 4.1: Obtener Credenciales

1. En Supabase, ve a "Settings" (⚙️) → "API"
2. Copia:
   - **Project URL** (ej: `https://abcdefgh.supabase.co`)
   - **anon public** key (la clave larga que empieza con `eyJ...`)

### Paso 4.2: Configurar Variables de Entorno

1. En tu proyecto, abre el archivo `.env`
2. Reemplaza con tus credenciales:

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Guarda el archivo
4. **IMPORTANTE**: Verifica que `.env` esté en `.gitignore`

### Paso 4.3: Reiniciar el Servidor

```bash
# Detener el servidor (Ctrl+C)
# Iniciar de nuevo
npm run dev
```

---

## 5. Insertar Productos de Prueba

### Opción A: Desde el Panel de Supabase

1. Ve a "Table Editor" → "productos"
2. Clic en "Insert row"
3. Completa los campos:
   - **nombre**: "Zapatillas Deportivas"
   - **descripcion**: "Zapatillas cómodas para correr"
   - **precio**: 4500
   - **categoria**: "Ropa y calzado"
   - **imagen_url**: URL de una imagen (ej: de Unsplash)
   - **disponible**: true
   - **destacado**: false
4. Clic en "Save"

### Opción B: Desde SQL Editor

```sql
INSERT INTO productos (nombre, descripcion, precio, categoria, imagen_url, disponible, destacado)
VALUES
  ('Zapatillas Urbanas', 'Zapatillas cómodas para el día a día', 4500, 'Ropa y calzado', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', true, true),
  ('Hamburguesa Triple', 'Triple carne con queso, bacon y salsa especial', 1200, 'Comida y bebida', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400', true, true),
  ('Auriculares Inalámbricos', 'Cancelación de ruido activa, 20h de batería', 5000, 'Electrónica', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400', true, false);
```

### Opción C: Con Galería de Imágenes

```sql
INSERT INTO productos (nombre, descripcion, precio, categoria, imagenes, disponible, destacado)
VALUES
  (
    'Smartphone Pro',
    'Teléfono de última generación con cámara de 108MP',
    8500,
    'Electrónica',
    ARRAY[
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1592286927505-c0d5e9d6e87c?auto=format&fit=crop&q=80&w=400'
    ],
    true,
    true
  );
```

---

## 6. Migrar Datos Mock

Si quieres migrar los datos mock actuales a Supabase:

### Script de Migración

```sql
-- Productos mock actuales
INSERT INTO productos (nombre, descripcion, precio, categoria, imagen_url, disponible, destacado)
VALUES
  ('Zapatillas Urbanas', 'Zapatillas cómodas para el día a día', 4500, 'Ropa y calzado', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', true, true),
  ('Hamburguesa Triple', 'Triple carne con queso, bacon y salsa especial', 1200, 'Comida y bebida', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400', true, true),
  ('Auriculares Inalámbricos', 'Cancelación de ruido activa, 20h de batería', 5000, 'Electrónica', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400', true, false),
  ('Lámpara de Escritorio LED', 'Lámpara regulable con puerto USB', 2500, 'Hogar y muebles', 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=400', false, false),
  ('Kit de Maquillaje', 'Paleta de sombras y labiales mate', 3000, 'Belleza y cuidado personal', 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=400', true, false),
  ('Mantenimiento de PC', 'Limpieza de hardware y optimización de Windows', 1500, 'Servicios', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=400', true, false);
```

---

## 📊 Verificar que Funciona

### Test 1: Ver Productos en la App
1. Abre tu app en el navegador
2. Deberías ver los productos de Supabase
3. El mensaje "Usando datos de demostración" debería desaparecer

### Test 2: Buscar Productos
1. Usa la barra de búsqueda
2. Filtra por categoría
3. Todo debería funcionar normalmente

### Test 3: Ver Detalle
1. Clic en un producto
2. Deberías ver toda la información
3. Si tiene múltiples imágenes, prueba el swipe

---

## 🔧 Troubleshooting

### Error: "Failed to fetch"
- Verifica que las credenciales en `.env` sean correctas
- Reinicia el servidor de desarrollo
- Verifica que el proyecto de Supabase esté activo

### Error: "Row Level Security"
- Verifica que las políticas RLS estén creadas
- Asegúrate de que la política de SELECT permita acceso público

### Las imágenes no cargan
- Verifica que el bucket `productos` sea público
- Verifica las políticas de storage
- Usa URLs completas (https://)

---

## 🚀 Próximos Pasos

### Subir Imágenes Propias

1. Ve a Storage → productos
2. Clic en "Upload file"
3. Selecciona tu imagen
4. Copia la URL pública
5. Úsala en el campo `imagen_url` o `imagenes`

### Crear Panel de Administración

Puedes usar:
- **Supabase Studio** (incluido, básico)
- **Retool** (gratis para uso personal)
- **Crear tu propio panel** con React

### Backup Automático

Supabase hace backups automáticos en el plan gratuito, pero puedes:
1. Exportar datos: Table Editor → Export to CSV
2. Guardar en GitHub como respaldo

---

## 📝 Resumen de Comandos SQL Útiles

```sql
-- Ver todos los productos
SELECT * FROM productos ORDER BY created_at DESC;

-- Ver solo disponibles
SELECT * FROM productos WHERE disponible = true;

-- Ver destacados
SELECT * FROM productos WHERE destacado = true;

-- Buscar por nombre
SELECT * FROM productos WHERE nombre ILIKE '%zapatillas%';

-- Contar productos por categoría
SELECT categoria, COUNT(*) as total
FROM productos
GROUP BY categoria
ORDER BY total DESC;

-- Actualizar precio
UPDATE productos
SET precio = 5000
WHERE nombre = 'Zapatillas Urbanas';

-- Marcar como agotado
UPDATE productos
SET disponible = false
WHERE id = 'UUID-DEL-PRODUCTO';

-- Eliminar producto
DELETE FROM productos WHERE id = 'UUID-DEL-PRODUCTO';
```

---

## ✅ Checklist Final

- [ ] Proyecto de Supabase creado
- [ ] Tabla `productos` creada con todas las columnas
- [ ] Políticas RLS configuradas
- [ ] Bucket `productos` creado y público
- [ ] Variables de entorno configuradas en `.env`
- [ ] Servidor reiniciado
- [ ] Productos de prueba insertados
- [ ] App funcionando con datos de Supabase
- [ ] Galería de imágenes probada (si aplica)

---

¡Listo! Ahora tienes Market Sur conectado a Supabase y funcionando con una base de datos real. 🎉
