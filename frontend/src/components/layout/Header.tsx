import { useState } from 'react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/home' },
    { name: 'Sobre', href: '/home' },
    { name: 'Serviços', href: '/healthcheck' },
    { name: 'Contato', href: '/home' },
  ];

  return (
    <header className="shadow-md border-b border-blue-400 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-400 drop-shadow-lg">
              Logo
            </h1>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex h-16">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 h-full flex items-center text-blue-400 font-medium
                hover:bg-slate-900
                transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Animated Hamburger Button - Mobile Only */}
          <button
            className="md:hidden p-2 text-blue-400 hover:text-blue-300 focus:outline-none relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              {/* Top line */}
              <span
                className={`absolute left-0 h-0.5 w-6 bg-current rounded-full transform transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? 'top-1/2 -translate-y-1/2 rotate-45'
                    : 'top-0'
                }`}
              />
              {/* Middle line */}
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              {/* Bottom line */}
              <span
                className={`absolute left-0 h-0.5 w-6 bg-current rounded-full transform transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? 'top-1/2 -translate-y-1/2 -rotate-45'
                    : 'bottom-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu with slide animation */}
      <nav
        className={`md:hidden bg-slate-900 border-t border-blue-400/50 absolute w-full z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        {menuItems.map((item, index) => (
          <a
            key={item.name}
            href={item.href}
            className={`block px-4 py-3 text-blue-400 font-medium hover:bg-slate-800 hover:text-blue-300
              transition-all duration-300 border-b border-slate-800 last:border-b-0
              transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
            style={{
              transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
