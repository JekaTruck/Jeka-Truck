import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { products as initialProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load products from localStorage or use initial data
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch {
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }
    setIsLoading(false);
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...updates } : product
    );
    saveProducts(updatedProducts);
    return updatedProducts.find(p => p.id === id);
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    saveProducts(updatedProducts);
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct
  };
};