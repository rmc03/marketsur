/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router-dom';
import { X, House, ClockCounterClockwise, Info, Storefront } from '@phosphor-icons/react';

const MENU_ITEMS = [
  { to: '/',          label: 'Inicio',    Icon: House },
  { to: '/historial', label: 'Mis Pedidos',   Icon: ClockCounterClockwise },
  { to: '/nosotros',  label: 'Sobre Nosotros',  Icon: Info },
];

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-[300px] glass-panel shadow-2xl z-[110] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Gradient header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
          <div className="relative z-10 flex items-center justify-between p-5">
            <div className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-1 ring-white/20">
                <Storefront className="w-5 h-5" weight="fill" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">Market Sur</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 -mr-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" weight="bold" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {MENU_ITEMS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold text-[15px] transition-all
                ${isActive 
                  ? 'bg-indigo-50/80 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/[0.06]'
                }
              `}
            >
              {({ isActive }) => {
                const Icon = MENU_ITEMS.find(item => item.to === to)?.Icon;
                return (
                  <>
                    {Icon && <Icon className="w-6 h-6" weight={isActive ? 'fill' : 'duotone'} />}
                    {label}
                  </>
                );
              }}
            </NavLink>
          ))}
        </nav>

        <div className="p-5 border-t border-white/20 dark:border-white/[0.08]">
          <p className="text-xs text-center font-medium text-slate-500 dark:text-slate-400">
            Market Sur © {new Date().getFullYear()}<br />
            Hecho en Cienfuegos
          </p>
        </div>
      </div>
    </>
  );
}
