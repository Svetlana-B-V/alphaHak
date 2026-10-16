import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/dashboard', label: 'Соты инсайтов' },
    { path: '/analyze', label: 'ИИ-Агент' },
    { path: '/showcase', label: 'UI-Kit' },
  ];

  return (
    <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
      <div className="max-w-6xl mx-auto glass rounded-full border border-border/80 shadow-sm px-5 py-3 flex items-center justify-between">
        {/* Логотип в стиле Young & Yandex */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-white text-base gradient-bg shadow-md group-hover:scale-105 transition-transform font-display">
            Я
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-extrabold text-text-primary tracking-tight leading-none">
              ИНСАЙТ<span className="text-primary">//</span>РАДАР
            </span>
            <span className="text-[11px] text-text-hint font-medium">
              Yandex Executive Panel
            </span>
          </div>
        </Link>

        {/* Десктопное капсульное меню */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/80 p-1 rounded-full border border-border">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  active
                    ? 'bg-text-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA справа */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/analyze">
            <Button size="sm" variant="primary">
              ✦ Проверить новость
            </Button>
          </Link>
        </div>

        {/* Кнопка мобильного меню */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-text-primary font-bold"
          aria-label="Меню"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Мобильное выпадающее меню */}
      {mobileOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto glass rounded-3xl border border-border p-4 shadow-xl flex flex-col gap-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-2xl text-sm font-semibold ${
                  active
                    ? 'gradient-bg text-white'
                    : 'text-text-primary hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}