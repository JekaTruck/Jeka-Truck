import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductFormProps {
  product?: Product;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel, isOpen }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    code: '',
    name: '',
    brand: '',
    category: '',
    subcategory: '',
    description: '',
    specifications: {},
    compatibleVehicles: [],
    price: 0,
    originalPrice: 0,
    stock: 0,
    images: [''],
    tags: [],
    isOEM: false,
    warranty: ''
  });

  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [newBrand, setNewBrand] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSpec, setNewSpec] = useState({ key: '', value: '' });
  const [newVehicle, setNewVehicle] = useState('');
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    // Carrega marcas e categorias do localStorage sempre que o modal abrir
    const savedBrands = localStorage.getItem('brands');
    const savedCategories = localStorage.getItem('categories');
    setBrands(savedBrands ? JSON.parse(savedBrands) : []);
    setCategories(savedCategories ? JSON.parse(savedCategories) : []);
  }, [isOpen]);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        code: '',
        name: '',
        brand: '',
        category: '',
        subcategory: '',
        description: '',
        specifications: {},
        compatibleVehicles: [],
        price: 0,
        originalPrice: 0,
        stock: 0,
        images: [''],
        tags: [],
        isOEM: false,
        warranty: ''
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== ''),
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      stock: Number(formData.stock)
    };
    onSave(cleanedData);
  };

  const addSpecification = () => {
    if (newSpec.key && newSpec.value) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpec.key]: newSpec.value
        }
      }));
      setNewSpec({ key: '', value: '' });
    }
  };

  const removeSpecification = (key: string) => {
    const { [key]: removed, ...rest } = formData.specifications;
    setFormData(prev => ({ ...prev, specifications: rest }));
  };

  const addVehicle = () => {
    if (newVehicle.trim()) {
      setFormData(prev => ({
        ...prev,
        compatibleVehicles: [...prev.compatibleVehicles, newVehicle.trim()]
      }));
      setNewVehicle('');
    }
  };

  const removeVehicle = (index: number) => {
    setFormData(prev => ({
      ...prev,
      compatibleVehicles: prev.compatibleVehicles.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Função para adicionar nova marca
  const handleAddBrand = () => {
    if (newBrand.trim() && !brands.includes(newBrand.trim())) {
      const updatedBrands = [...brands, newBrand.trim()];
      setBrands(updatedBrands);
      localStorage.setItem('brands', JSON.stringify(updatedBrands));
      setFormData(prev => ({ ...prev, brand: newBrand.trim() }));
      setNewBrand('');
    }
  };

  // Função para adicionar nova categoria
  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      setFormData(prev => ({ ...prev, category: newCategory.trim() }));
      setNewCategory('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Editar Produto' : 'Adicionar Produto'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código do Produto *
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Produto *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            {/* Marca */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Marca *
  </label>
  <select
    value={formData.brand}
    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
    required
  >
    <option value="">Selecione uma marca</option>
    {brands.map(brand => (
      <option key={brand} value={brand}>{brand}</option>
    ))}
  </select>
  <div className="flex mt-2 space-x-2">
    <input
      type="text"
      value={newBrand}
      onChange={e => setNewBrand(e.target.value)}
      placeholder="Adicionar nova marca"
      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
    />
    <button
      type="button"
      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      onClick={handleAddBrand}
    >
      Adicionar
    </button>
  </div>
</div>

{/* Categoria */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Categoria *
  </label>
  <select
    value={formData.category}
    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
    required
  >
    <option value="">Selecione uma categoria</option>
    {categories.map(category => (
      <option key={category} value={category}>{category}</option>
    ))}
  </select>
  <div className="flex mt-2 space-x-2">
    <input
      type="text"
      value={newCategory}
      onChange={e => setNewCategory(e.target.value)}
      placeholder="Adicionar nova categoria"
      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
    />
    <button
      type="button"
      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      onClick={handleAddCategory}
    >
      Adicionar
    </button>
  </div>
</div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategoria
              </label>
              <input
                type="text"
                value={formData.subcategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Garantia
              </label>
              <input
                type="text"
                value={formData.warranty}
                onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ex: 12 meses"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço Original
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || undefined }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estoque *
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isOEM}
                  onChange={(e) => setFormData(prev => ({ ...prev, isOEM: e.target.checked }))}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                />
                <span className="text-sm font-medium text-gray-700">Peça Original (OEM)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagens (URLs)
            </label>
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar imagem</span>
              </button>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Especificações
            </label>
            <div className="space-y-2">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                  <span className="font-medium">{key}:</span>
                  <span>{value}</span>
                  <button
                    type="button"
                    onClick={() => removeSpecification(key)}
                    className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSpec.key}
                  onChange={(e) => setNewSpec(prev => ({ ...prev, key: e.target.value }))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Nome da especificação"
                />
                <input
                  type="text"
                  value={newSpec.value}
                  onChange={(e) => setNewSpec(prev => ({ ...prev, value: e.target.value }))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Valor"
                />
                <button
                  type="button"
                  onClick={addSpecification}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Compatible Vehicles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Veículos Compatíveis
            </label>
            <div className="space-y-2">
              {formData.compatibleVehicles.map((vehicle, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                  <span>{vehicle}</span>
                  <button
                    type="button"
                    onClick={() => removeVehicle(index)}
                    className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newVehicle}
                  onChange={(e) => setNewVehicle(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ex: Chevrolet Onix 1.0"
                />
                <button
                  type="button"
                  onClick={addVehicle}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center space-x-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-orange-600 hover:text-orange-800 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Nova tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {product ? 'Atualizar Produto' : 'Adicionar Produto'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;