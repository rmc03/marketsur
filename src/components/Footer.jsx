import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-12 py-8 px-4 border-t border-slate-200 dark:border-[#3E4042] text-center text-slate-500 dark:text-slate-400 text-sm transition-colors">
      <p className="flex items-center justify-center gap-1">
        Hecho con <Heart className="w-4 h-4 text-[#E41E3F] fill-[#E41E3F]" /> para Cienfuegos
      </p>
      <p className="mt-2 text-slate-400 dark:text-slate-500">Market Sur © {new Date().getFullYear()}</p>
    </footer>
  );
}
