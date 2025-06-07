import React from 'react';
import { Product } from '../types/product';

interface SEOHeadProps {
  product?: Product;
  searchQuery?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ product, searchQuery }) => {
  React.useEffect(() => {
    if (product) {
      // Update page title for product
      document.title = `${product.code} - ${product.name} | Jeka Truck - Qualidade e Confiança`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDescription) {
        metaDescription.content = `${product.name} ${product.brand} - Código: ${product.code}. ${product.description} Compatível com: ${product.compatibleVehicles.join(', ')}. Preço: R$ ${product.price.toFixed(2)}`;
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = `${product.name} ${product.brand} - Código: ${product.code}. ${product.description} Compatível com: ${product.compatibleVehicles.join(', ')}. Preço: R$ ${product.price.toFixed(2)}`;
        document.head.appendChild(meta);
      }

      // Add structured data for product
      const structuredData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.images,
        "description": product.description,
        "sku": product.code,
        "brand": {
          "@type": "Brand",
          "name": product.brand
        },
        "offers": {
          "@type": "Offer",
          "url": window.location.href,
          "priceCurrency": "BRL",
          "price": product.price,
          "itemCondition": "https://schema.org/NewCondition",
          "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
      };

      let scriptTag = document.querySelector('#structured-data') as HTMLScriptElement;
      if (scriptTag) {
        scriptTag.textContent = JSON.stringify(structuredData);
      } else {
        scriptTag = document.createElement('script');
        scriptTag.id = 'structured-data';
        scriptTag.type = 'application/ld+json';
        scriptTag.textContent = JSON.stringify(structuredData);
        document.head.appendChild(scriptTag);
      }
    } else if (searchQuery) {
      // Update title for search
      document.title = `Busca: ${searchQuery} | Jeka Truck - Qualidade e Confiança`;
      
      const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDescription) {
        metaDescription.content = `Resultados da busca para "${searchQuery}" - Jeka Truck com qualidade e garantia. Encontre peças para seu veículo com os melhores preços.`;
      }
    } else {
      // Default homepage
      document.title = 'Jeka Truck - Qualidade e Confiança | Peças Automotivas Online';
      
      const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDescription) {
        metaDescription.content = 'Loja da Jeka Truck com qualidade e garantia. Filtros, freios, ignição, suspensão e mais.';
      }
    }

    // Add keywords meta tag
    let keywordsMeta = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.name = 'keywords';
      document.head.appendChild(keywordsMeta);
    }
    
    if (product) {
      keywordsMeta.content = `${product.code}, ${product.name}, ${product.brand}, ${product.tags.join(', ')}, , peças automotivas`;
    } else {
      keywordsMeta.content = ', peças automotivas, filtros, freios, ignição, suspensão, bateria, pneus, loja online';
    }

  }, [product, searchQuery]);

  return null;
};

export default SEOHead;