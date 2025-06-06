import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    code: 'FLT-001-GM',
    name: 'Filtro de Óleo Tecfil',
    brand: 'Tecfil',
    category: 'Filtros',
    subcategory: 'Filtro de Óleo',
    description: 'Filtro de óleo de alta qualidade para motores GM. Garante excelente filtragem e proteção do motor.',
    specifications: {
      'Rosca': 'M20 x 1,5',
      'Altura': '95mm',
      'Diâmetro Externo': '76mm',
      'Material': 'Metal e papel filtrante',
      'Capacidade': '4.5L'
    },
    compatibleVehicles: [
      'Chevrolet Onix 1.0/1.4',
      'Chevrolet Prisma 1.0/1.4',
      'Chevrolet Cobalt 1.4/1.8',
      'Chevrolet Spin 1.8'
    ],
    price: 24.90,
    originalPrice: 32.90,
    stock: 45,
    images: [
      'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['filtro', 'óleo', 'GM', 'Chevrolet', 'manutenção'],
    isOEM: false,
    warranty: '12 meses'
  },
  {
    id: '2',
    code: 'BRK-205-VW',
    name: 'Pastilha de Freio Dianteira',
    brand: 'Bosch',
    category: 'Freios',
    subcategory: 'Pastilhas',
    description: 'Pastilha de freio dianteira original Bosch com tecnologia cerâmica para máxima segurança.',
    specifications: {
      'Comprimento': '155mm',
      'Largura': '68mm',
      'Espessura': '17mm',
      'Material': 'Cerâmica',
      'Sensor': 'Não incluso'
    },
    compatibleVehicles: [
      'Volkswagen Gol G5/G6/G7',
      'Volkswagen Voyage',
      'Volkswagen Fox',
      'Volkswagen Up!'
    ],
    price: 89.90,
    stock: 28,
    images: [
      'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['pastilha', 'freio', 'VW', 'Volkswagen', 'segurança'],
    isOEM: true,
    warranty: '24 meses'
  },
  {
    id: '3',
    code: 'SPK-101-FOR',
    name: 'Vela de Ignição NGK',
    brand: 'NGK',
    category: 'Ignição',
    subcategory: 'Velas',
    description: 'Vela de ignição NGK com eletrodo de irídio para máxima performance e durabilidade.',
    specifications: {
      'Rosca': '14mm x 1,25',
      'Alcance': '19mm',
      'Abertura': '0.8mm',
      'Eletrodo': 'Irídio',
      'Resistor': 'Sim'
    },
    compatibleVehicles: [
      'Ford Ka 1.0/1.5',
      'Ford Fiesta 1.6',
      'Ford EcoSport 1.6',
      'Ford Focus 1.6'
    ],
    price: 35.90,
    originalPrice: 42.90,
    stock: 67,
    images: [
      'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['vela', 'ignição', 'Ford', 'NGK', 'performance'],
    isOEM: false,
    warranty: '18 meses'
  },
  {
    id: '4',
    code: 'AMT-350-HYU',
    name: 'Amortecedor Traseiro Monroe',
    brand: 'Monroe',
    category: 'Suspensão',
    subcategory: 'Amortecedores',
    description: 'Amortecedor traseiro Monroe com tecnologia gas-o-matic para máximo conforto e estabilidade.',
    specifications: {
      'Comprimento Comprimido': '320mm',
      'Comprimento Estendido': '510mm',
      'Diâmetro do Pistão': '32mm',
      'Tipo': 'Gás',
      'Rosca Superior': 'M12'
    },
    compatibleVehicles: [
      'Hyundai HB20 1.0/1.6',
      'Hyundai HB20S 1.0/1.6',
      'Hyundai Creta 1.6/2.0'
    ],
    price: 189.90,
    stock: 15,
    images: [
      'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['amortecedor', 'suspensão', 'Hyundai', 'Monroe', 'conforto'],
    isOEM: false,
    warranty: '12 meses'
  },
  {
    id: '5',
    code: 'BAT-12V-60A',
    name: 'Bateria Automotiva Moura',
    brand: 'Moura',
    category: 'Elétrica',
    subcategory: 'Baterias',
    description: 'Bateria 12V 60Ah Moura com tecnologia selada e livre de manutenção.',
    specifications: {
      'Voltagem': '12V',
      'Amperagem': '60Ah',
      'CCA': '460A',
      'Dimensões': '242x175x190mm',
      'Peso': '16kg'
    },
    compatibleVehicles: [
      'Volkswagen Gol',
      'Chevrolet Onix',
      'Ford Ka',
      'Fiat Uno',
      'Renault Sandero'
    ],
    price: 289.90,
    originalPrice: 320.00,
    stock: 8,
    images: [
      'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['bateria', 'elétrica', 'Moura', '12V', '60Ah'],
    isOEM: false,
    warranty: '18 meses'
  },
  {
    id: '6',
    code: 'TIR-195-65-15',
    name: 'Pneu Goodyear Assurance',
    brand: 'Goodyear',
    category: 'Pneus',
    subcategory: 'Pneu Passeio',
    description: 'Pneu 195/65 R15 Goodyear Assurance com tecnologia de baixo ruído e alta durabilidade.',
    specifications: {
      'Medida': '195/65 R15',
      'Índice de Carga': '91',
      'Índice de Velocidade': 'H',
      'Construção': 'Radial',
      'DOT': '2024'
    },
    compatibleVehicles: [
      'Honda Civic',
      'Toyota Corolla',
      'Nissan Sentra',
      'Chevrolet Cruze'
    ],
    price: 285.90,
    stock: 12,
    images: [
      'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['pneu', 'Goodyear', '195/65', 'R15', 'passeio'],
    isOEM: false,
    warranty: '5 anos'
  }
];