import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useProducts } from '../../hooks/useProducts';
import LoginForm from './LoginForm';
import AdminLayout from './AdminLayout';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ProductModal from '../ProductModal';
import { Product } from '../../types/product';

export const AdminPanel: React.FC = () => {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} isLoading={isLoading} />;
  }

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'> | Product) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData as Omit<Product, 'id'>);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product);
  };

  const handleCloseView = () => {
    setViewingProduct(null);
  };

  return (
  <AdminLayout user={user!} onLogout={logout} onAddProduct={handleAddProduct}>
    <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={deleteProduct}
        onView={handleViewProduct} onAdd={function (): void {
          throw new Error('Function not implemented.');
        } }    />
    <ProductForm
      product={editingProduct || undefined}
      isOpen={isFormOpen}
      onSave={handleSaveProduct}
      onCancel={handleCancelForm}
    />
    <ProductModal
      product={viewingProduct}
      isOpen={!!viewingProduct}
      onClose={handleCloseView}
    />
  </AdminLayout>
  );
};

export default AdminPanel;