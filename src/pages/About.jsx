/* eslint-disable no-unused-vars */
import { WhatsappLogo, MapPin, Clock, Storefront, Heart } from '@phosphor-icons/react';

const FEATURES = [
  { Icon: Storefront,   title: 'Catálogo digital',     desc: 'Explora cientos de productos locales desde tu móvil, organizados por categorías.' },
  { Icon: WhatsappLogo, title: 'Pedidos por WhatsApp', desc: 'Sin registros, sin contraseñas. Un toque y tu pedido llega directo al vendedor.' },
  { Icon: MapPin,       title: 'Productos locales',    desc: 'Todo de vendedores en Cienfuegos. Apoya la economía de tu ciudad.' },
  { Icon: Heart,        title: 'Seguro y confiable',   desc: 'Tratas directamente con el vendedor sin intermediarios ni comisiones.' },
];

const STEPS = [
  { num: '1', text: 'Navega el catálogo y elige lo que te gusta.' },
  { num: '2', text: 'Añade los productos a tu carrito.' },
  { num: '3', text: 'Toca "Pedir por WhatsApp" y envía tu pedido.' },
  { num: '4', text: 'El vendedor te confirma y coordina la entrega.' },
];

export function About() {
  return (
    <div className="pb-28 animate-fade-in">
      {/* Hero — Glassmorphism + Gradient */}
      <div className="hero-gradient text-white px-6 pt-10 pb-16 rounded-b-[48px] mb-8 text-center relative overflow-hidden shadow-xl shadow-indigo-500/20">
        {/* Decorative orbs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-xl animate-orb-float" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-xl animate-orb-float-2" />
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg ring-1 ring-white/30">
            <Storefront className="w-8 h-8 text-white" weight="duotone" />
          </div>
          <h1 className="text-3xl font-extrabold mb-2">Sobre Market Sur</h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-[280px] mx-auto">
            El mercadillo digital que conecta compradores y vendedores locales en Cienfuegos, Cuba.
          </p>
        </div>
      </div>

      <div className="px-5 space-y-8">
        {/* Features */}
        <section>
          <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-4">¿Qué ofrecemos?</h2>
          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className="glass-card rounded-2xl p-4">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center mb-3 shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
                  <Icon className="w-5 h-5 text-white" weight="duotone" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-4">¿Cómo funciona?</h2>
          <div className="space-y-3">
            {STEPS.map(({ num, text }) => (
              <div key={num} className="flex items-center gap-4 glass-card rounded-2xl px-4 py-3.5">
                <span className="w-9 h-9 flex-shrink-0 rounded-xl gradient-primary text-white text-sm font-extrabold flex items-center justify-center shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
                  {num}
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="glass-card rounded-2xl p-5">
          <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-4">Contacto</h2>
          <div className="space-y-3">
            <a
              href="https://wa.me/5353770707"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-[#25D366] hover:bg-[#1ebd5a] rounded-xl text-white font-bold text-sm transition-colors shadow-lg shadow-green-500/20 ring-1 ring-white/20"
            >
              <WhatsappLogo className="w-5 h-5" weight="fill" />
              WhatsApp: +53 5377 0707
            </a>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
              <MapPin className="w-5 h-5 gradient-text flex-shrink-0" weight="duotone" />
              <span>Cienfuegos, Cuba</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
              <Clock className="w-5 h-5 gradient-text flex-shrink-0" weight="duotone" />
              <span>Disponible todos los días, 8am – 10pm</span>
            </div>
          </div>
        </section>

        {/* Footer credit */}
        <p className="text-center text-slate-400 dark:text-slate-500 text-xs flex items-center justify-center gap-1 pb-2">
          Hecho con <Heart className="w-3 h-3 text-rose-500" weight="fill" /> para Cienfuegos — Market Sur © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
