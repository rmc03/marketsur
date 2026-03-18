/**
 * Normaliza las imágenes de un producto para soportar tanto formato antiguo (imagen_url)
 * como nuevo formato (imagenes array)
 */
export function getProductImages(producto) {
  if (!producto) return [];

  // Formato nuevo: array de imágenes
  if (producto.imagenes && Array.isArray(producto.imagenes) && producto.imagenes.length > 0) {
    return producto.imagenes;
  }

  // Formato antiguo: imagen_url única
  if (producto.imagen_url) {
    return [producto.imagen_url];
  }

  // Placeholder por defecto
  return ['https://placehold.co/600x800/e2e8f0/94a3b8?text=Sin+Imagen'];
}

/**
 * Obtiene la imagen principal de un producto (primera imagen)
 */
export function getProductMainImage(producto) {
  const images = getProductImages(producto);
  return images[0];
}
