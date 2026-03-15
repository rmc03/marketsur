import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const MOCK_PRODUCTS = [
  { id: '1', nombre: 'Zapatillas Urbanas', descripcion: 'Zapatillas cómodas para el día a día', precio: 4500, categoria: 'Ropa y calzado', imagen_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', disponible: true, destacado: true },
  { id: '2', nombre: 'Hamburguesa Triple', descripcion: 'Triple carne con queso, bacon y salsa especial', precio: 1200, categoria: 'Comida y bebida', imagen_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400', disponible: true, destacado: true },
  { id: '3', nombre: 'Auriculares Inalámbricos', descripcion: 'Cancelación de ruido activa, 20h de batería', precio: 5000, categoria: 'Electrónica', imagen_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400', disponible: true, destacado: false },
  { id: '4', nombre: 'Lámpara de Escritorio LED', descripcion: 'Lámpara regulable con puerto USB', precio: 2500, categoria: 'Hogar y muebles', imagen_url: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=400', disponible: false, destacado: false },
  { id: '5', nombre: 'Kit de Maquillaje', descripcion: 'Paleta de sombras y labiales mate', precio: 3000, categoria: 'Belleza y cuidado personal', imagen_url: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=400', disponible: true, destacado: false },
  { id: '6', nombre: 'Mantenimiento de PC', descripcion: 'Limpieza de hardware y optimización de Windows', precio: 1500, categoria: 'Servicios', imagen_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=400', disponible: true, destacado: false },
];

window.MockData = MOCK_PRODUCTS;

export function useProducts(categoria = null, busqueda = '') {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function cargar() {
      setCargando(true);
      setError(null);
      
      try {
        // Skip fetch if placeholder credentials
        const url = import.meta.env.VITE_SUPABASE_URL || '';
        if (url.includes('placeholder') || url.includes('your-project') || !url) {
          throw new Error("Local dev mode");
        }

        let query = supabase.from('productos').select('*').order('destacado', { ascending: false });

        if (categoria && categoria !== 'Todos') {
          query = query.eq('categoria', categoria);
        }
        
        if (busqueda) {
          query = query.ilike('nombre', `%${busqueda}%`);
        }

        const { data, error: fetchError } = await query;
        
        if (fetchError) throw fetchError;
        
        if (mounted) {
          setProductos(data || []);
        }
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to mock data:", err);
        // Fallback to mock data to keep the UI functional
        if (mounted) {
          let filtered = [...MOCK_PRODUCTS];
          if (categoria && categoria !== 'Todos') {
            filtered = filtered.filter(p => p.categoria === categoria);
          }
          if (busqueda) {
            filtered = filtered.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));
          }
          setProductos(filtered);
          setError("Usando datos de demostración (Supabase no configurado)");
        }
      } finally {
        if (mounted) {
          setCargando(false);
        }
      }
    }
    
    cargar();
    
    return () => {
      mounted = false;
    };
  }, [categoria, busqueda]);

  return { productos, cargando, error };
}
