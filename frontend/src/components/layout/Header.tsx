export function Header() {
  const menuItems = [
    { name: "Home", href: "/home" },
    { name: "Sobre", href: "/home" },
    { name: "Serviços", href: "/healthcheck" },
    { name: "Contato", href: "/home" },
  ];

  return (
    <header className="shadow-md border-b border-yellow-400 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-yellow-400 drop-shadow-lg">Logo</h1>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex h-16">
            {menuItems.map((item) => (
            <a
                key={item.name}
                href={item.href}
                className="px-4 h-full flex items-center text-yellow-400 font-medium 
                border-l border-r border-r-black border-l-black
                hover:bg-yellow-400 hover:text-black 
                transition-all duration-300"
            >
                {item.name}
            </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}