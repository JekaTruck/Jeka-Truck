import React, { useState } from 'react';
import { Search, Menu, X, User, Phone, MapPin } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    onSearch(input.value);
  };

  return (
    <header className="bg-white shadow-lg relative z-50">
      {/* Top bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>(11) 3456-7890</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>São Paulo - SP</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>Frete Grátis acima de R$ 199</span>
            <span>Parcelamos em até 12x</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AP</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-900">AutoPeças</h1>
              <p className="text-sm text-gray-600">Qualidade e Confiança</p>
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Digite o código da peça ou produto..."
                defaultValue={searchQuery}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-900 transition-colors">
              <User className="w-6 h-6" />
              <span>Minha Conta</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearchSubmit} className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Digite o código da peça..."
              defaultValue={searchQuery}
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-md"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className={`bg-blue-900 text-white ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="container mx-auto px-4">
          <ul className="flex flex-col md:flex-row md:space-x-8 py-4">
            <li><a href="#" className="block py-2 hover:text-orange-300 transition-colors">Início</a></li>
            <li><a href="#" className="block py-2 hover:text-orange-300 transition-colors">Filtros</a></li>
            <li><a href="#" className="block py-2 hover:text-orange-300 transition-colors">Freios</a></li>
            <li><a href="#" className="block py-2 hover:text-orange-300 transition-colors">Suspensão</a></li>
            <li><a href="#" className="block py-2 hover:text-orange-300 transition-colors">Ignição</a></li>
            <li><a href="#" className="block py-2 hover:text-orange-300 transition-colors">Pneus</a></li>
            <li><a href="#" className="block py-2 hover:text-orange-300 transition-colors">Elétrica</a></li>
            <li><a href="#" className="block py-2 hover:text-orange-300 transition-colors">Ofertas</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;