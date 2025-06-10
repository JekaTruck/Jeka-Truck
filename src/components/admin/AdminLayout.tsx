
import React, { useState } from 'react';
import { LogOut, Package, Plus, Settings, Menu, X } from 'lucide-react';
import { User } from '../../types/admin';

interface AdminLayoutProps {
  user: User;
  onLogout: () => void;
  onAddProduct: () => void; // Adicionada prop
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ user, onLogout, onAddProduct, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out z-50 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white">
                 <img src="https://jekatruck.com.br/wp-content/uploads/2021/01/cropped-logo_small-1.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-sm text-blue-300">Jeka Truck</p>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-800 text-white">
              <Package className="w-5 h-5" />
              <span>Produtos</span>
            </a>
            <button
              onClick={onAddProduct}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors w-full"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar Produto</span>
            </button>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Configurações</span>
            </a>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-blue-300 capitalize">{user.role}</p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Gestão de Produtos</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Bem-vindo, {user.username}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;