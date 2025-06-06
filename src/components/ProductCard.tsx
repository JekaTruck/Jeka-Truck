import React from 'react';
import { Star, Truck, ShieldCheck, Phone } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
      onClick={() => onClick(product)}
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            -{discountPercentage}%
          </div>
        )}
        {product.stock <= 5 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-md text-xs">
            Últimas unidades
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 font-medium">{product.code}</span>
          {product.isOEM && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Original
            </span>
          )}
        </div>

        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-lg">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-2">{product.brand}</p>

        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">(4.8)</span>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <Truck className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-600">Entrega rápida</span>
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-600">{product.warranty}</span>
        </div>

        <div className="mb-4">
          {product.originalPrice && (
            <p className="text-sm text-gray-500 line-through">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </p>
          )}
          <p className="text-2xl font-bold text-blue-900">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-sm text-gray-600">
            ou 12x de R$ {(product.price / 12).toFixed(2).replace('.', ',')}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-sm ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
            {product.stock > 0 ? `${product.stock} em estoque` : 'Sem estoque'}
          </span>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <Phone className="w-4 h-4" />
            <span>Consultar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;