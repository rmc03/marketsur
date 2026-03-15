/* eslint-disable no-unused-vars */
import { NavLink, useLocation } from 'react-router-dom';
import { House, ClockCounterClockwise, Info } from '@phosphor-icons/react';

const NAV_ITEMS = [
  { to: '/',          label: 'Inicio',    Icon: House },
  { to: '/historial', label: 'Pedidos',   Icon: ClockCounterClockwise },
  { to: '/nosotros',  label: 'Nosotros',  Icon: Info },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-40 bg-white/90 dark:bg-[#242526]/90 backdrop-blur-xl border-t border-slate-200/70 dark:border-[#3E4042]/70 flex items-center justify-around px-2 py-2 transition-colors">
      {NAV_ITEMS.map(({ to, label, Icon }) => {
        const active = to === '/' ? pathname === '/' : pathname.startsWith(to);
        return (
          <NavLink
            key={to}
            to={to}
            className={`flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-2xl transition-all duration-200 ${
              active
                ? 'text-[#1877F2]'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <div className={`relative transition-all duration-200 ${active ? 'scale-110' : ''}`}>
              {active && (
                <div className="absolute inset-0 bg-[#1877F2]/10 rounded-xl scale-150" />
              )}
              <Icon
                className="relative w-6 h-6"
                weight={active ? 'fill' : 'regular'}
              />
            </div>
            <span className={`text-[11px] font-semibold tracking-wide ${active ? 'text-[#1877F2]' : ''}`}>
              {label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}
