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
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-[#242526] shadow-2xl z-[60] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-[#3E4042] bg-[#F0F2F5] dark:bg-[#18191A]">
          <div className="flex items-center gap-2 text-[#1877F2]">
            <Storefront className="w-8 h-8" weight="duotone" />
            <span className="font-extrabold text-xl tracking-tight">Market Sur</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-6 h-6" weight="bold" />
          </button>
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
                  ? 'bg-[#E7F3FF] dark:bg-[#1877F2]/20 text-[#1877F2]' 
                  : 'text-slate-700 dark:text-[#E4E6EB] hover:bg-slate-100 dark:hover:bg-[#3A3B3C]'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-6 h-6" weight={isActive ? 'fill' : 'duotone'} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-5 border-t border-slate-100 dark:border-[#3E4042]">
          <p className="text-xs text-center font-medium text-slate-400 dark:text-slate-500">
            Market Sur © {new Date().getFullYear()}<br />
            Hecho en Cienfuegos
          </p>
        </div>
      </div>
    </>
  );
}
