import React from 'react';
import { Filter, X } from 'lucide-react';
import { SearchFilters } from '../types/product';

interface FiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const brands = ['Bosch', 'Tecfil', 'NGK', 'Monroe', 'Moura', 'Goodyear'];
const categories = ['Filtros', 'Freios', 'Ignição', 'Suspensão', 'Elétrica', 'Pneus'];
const vehicles = ['Chevrolet', 'Volkswagen', 'Ford', 'Hyundai', 'Honda', 'Toyota'];

const Filters: React.FC<FiltersProps> = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === filters[key] ? undefined : value
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <>
      {/* Mobile filter button */}
      <button
        onClick={onToggle}
        className="md:hidden flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Filtros</span>
      </button>

      {/* Filters sidebar */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Filtros</h3>
            <div className="flex space-x-2">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Limpar
              </button>
              <button
                onClick={onToggle}
                className="md:hidden text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Brand filter */}
          <div>
            <h4 className="font-medium mb-3">Marca</h4>
            <div className="space-y-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brand === brand}
                    onChange={() => updateFilter('brand', brand)}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div>
            <h4 className="font-medium mb-3">Categoria</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.category === category}
                    onChange={() => updateFilter('category', category)}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Vehicle filter */}
          <div>
            <h4 className="font-medium mb-3">Veículo</h4>
            <div className="space-y-2">
              {vehicles.map(vehicle => (
                <label key={vehicle} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.vehicle === vehicle}
                    onChange={() => updateFilter('vehicle', vehicle)}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm">{vehicle}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <h4 className="font-medium mb-3">Faixa de Preço</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={!filters.priceRange}
                  onChange={() => updateFilter('priceRange', undefined)}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="text-sm">Todos</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange?.[0] === 0 && filters.priceRange?.[1] === 50}
                  onChange={() => updateFilter('priceRange', [0, 50])}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="text-sm">Até R$ 50</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange?.[0] === 50 && filters.priceRange?.[1] === 150}
                  onChange={() => updateFilter('priceRange', [50, 150])}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="text-sm">R$ 50 - R$ 150</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange?.[0] === 150}
                  onChange={() => updateFilter('priceRange', [150, Infinity])}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="text-sm">Acima de R$ 150</span>
              </label>
            </div>
          </div>

          {/* Stock filter */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock || false}
                onChange={() => updateFilter('inStock', !filters.inStock)}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-sm">Apenas com estoque</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;