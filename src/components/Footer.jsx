import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-12 py-8 px-4 border-t border-slate-200 text-center text-slate-500 text-sm">
      <p className="flex items-center justify-center gap-1">
        Hecho con <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" /> para Cienfuegos
      </p>
      <p className="mt-2 text-slate-400">Market Sur © {new Date().getFullYear()}</p>
    </footer>
  );
}
