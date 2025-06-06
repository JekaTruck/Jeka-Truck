import React, { useState } from 'react';
import { X, Star, Truck, ShieldCheck, ChevronLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { Product } from '../types/product';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.price) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-xl"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-semibold">
                    -{discountPercentage}%
                  </div>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-orange-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500 font-medium">{product.code}</span>
                  {product.isOEM && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Peça Original
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <p className="text-xl text-gray-600 mb-4">{product.brand}</p>

                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-500 ml-2">(4.8) • 127 avaliações</span>
                </div>
              </div>

              <div className="space-y-2">
                {product.originalPrice && (
                  <p className="text-gray-500 line-through text-lg">
                    De: R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </p>
                )}
                <p className="text-4xl font-bold text-blue-900">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-gray-600">
                  ou 12x de R$ {(product.price / 12).toFixed(2).replace('.', ',')} sem juros
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">Entrega rápida</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-600 font-medium">Garantia {product.warranty}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Compatível com:</h4>
                <div className="space-y-1">
                  {product.compatibleVehicles.slice(0, 3).map((vehicle, index) => (
                    <p key={index} className="text-sm text-gray-600">• {vehicle}</p>
                  ))}
                  {product.compatibleVehicles.length > 3 && (
                    <p className="text-sm text-blue-600">+ {product.compatibleVehicles.length - 3} outros modelos</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`text-sm ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                  {product.stock} em estoque
                </span>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-colors">
                  <Phone className="w-6 h-6" />
                  <span>Ligar para Consultar</span>
                </button>
                
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Descrição:</h4>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Especificações:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;