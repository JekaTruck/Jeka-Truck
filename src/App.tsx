import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import Filters from './components/Filters';
import SEOHead from './components/SEOHead';
import AdminPanel from './components/admin/AdminPanel';
import { useProducts } from './hooks/useProducts';
import { Product, SearchFilters } from './types/product';

// HomePage separada para usar nas rotas
function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { products, isLoading } = useProducts();

  useEffect(() => {
    let filtered = products;

    // Text search
    if (searchQuery) {
      filtered = filtered.filter((product: Product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.compatibleVehicles.some(vehicle => vehicle.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Brand filter
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(product => 
        product.price >= min && (max === Infinity || product.price <= max)
      );
    }

    // Vehicle filter
    if (filters.vehicle) {
      filtered = filtered.filter(product =>
        product.compatibleVehicles.some(vehicle =>
          vehicle.toLowerCase().includes(filters.vehicle!.toLowerCase())
        )
      );
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, filters, products]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== undefined && value !== null && 
    (typeof value !== 'object' || (Array.isArray(value) && value.length > 0))
  ).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead searchQuery={searchQuery} product={selectedProduct || undefined} />
      
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Filters
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFiltersOpen}
              onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `Resultados para "${searchQuery}"` : 'Nossos Produtos'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                  {activeFiltersCount > 0 && ` • ${activeFiltersCount} filtro${activeFiltersCount !== 1 ? 's' : ''} ativo${activeFiltersCount !== 1 ? 's' : ''}`}
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>Ordenar por</option>
                  <option>Menor preço</option>
                  <option>Maior preço</option>
                  <option>Mais vendidos</option>
                  <option>Melhor avaliados</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={handleProductClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-gray-400">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar seus filtros ou fazer uma nova busca
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({});
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Ver todos os produtos
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AP</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">JEKA TRUCK</h3>
                  <p className="text-sm text-blue-300">Qualidade e Confiança</p>
                </div>
              </div>
              <p className="text-blue-200 text-sm">
                Contamos com segurança e preços que cabem no seu bolso.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Filtros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Freios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Suspensão</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ignição</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Elétrica</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>Segunda a Sexta: 8h às 18h</li>
                <li>Sábado: 8h às 12h</li>
                <li>Telefone: (11) 3456-7890</li>
                <li>WhatsApp: (11) 94567-8901</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Informações</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Políticas de troca</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Garantia</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="/Jeka-Truck/admin" className="hover:text-white transition-colors text-xs opacity-50">Admin</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-blue-200">
            <p>&copy; 2024 Jeka Truck. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/Jeka-Truck">
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;