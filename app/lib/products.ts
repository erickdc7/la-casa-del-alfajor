export interface Product {
  id: string
  slug: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  rating: number
  reviewsCount: number
  description: string
  ingredients: string
  nutritionalInfo?: string
  category: string
  subcategory?: string                            
  heladoType?: 'paleta' | 'galleton' | 'artesanal'                  
  heladoFlavor?: 'chocolate' | 'lucuma' | 'fresa' | 'vainilla' | 'mango'
  kitType?: 'alfa-pack' | 'dulce-pack'                
  inStock: boolean
  badge?: string
  badgeType?: 'new' | 'sale' | 'soldout' | 'pickup'
  mixType?: '2' | '3' | '4'
  specialType?: 'personal' | 'cobertura-bitter' | 'alfajoreable' | 'disenado' | 'tematico'
  variants: {
    id: string
    label: string
    units?: number
    price: number
    priceMultiplier?: number
  }[]
  variantType?: 'size' | 'flavor' | 'type' | 'color'
  variantLabel?: string
}

let currentId = 0;
const generateId = () => (++currentId).toString();

export const products: Product[] = [
  // ========== ALFAJORES INDIVIDUALES (por sabor) ==========
  {
    id: generateId(),
    slug: 'tradicional',
    name: 'Alfajor Tradicional',
    price: 7.90, 
    image: '../images/alfajores/alfajor-tradicional-x5.jpg',
    images: [
      '../images/alfajores/alfajor-tradicional-x5.jpg',
      '../images/alfajores/alfajor-tradicional-x10.jpg',
      '../images/alfajores/alfajor-tradicional-x20.jpg',
    ],
    rating: 4.5,
    reviewsCount: 127,
    description: 'Nuestro alfajor tradicional es preparado con receta casera, utilizando solo ingredientes naturales. El manjar de leche es cremoso con el punto perfecto de dulzura.',
    ingredients: 'Harina de trigo, mantequilla, azúcar, huevos, esencia de vainilla, polvo de hornear, sal, manjar blanco casero.',
    nutritionalInfo: 'Porción: 100g\nEnergía: 450 kcal\nProteínas: 6g\nCarbohidratos: 55g\nGrasas: 22g',
    category: 'alfajores',
    inStock: true,
    variants: [
      { id: 'caja-5', label: 'Caja x5', units: 5, price: 7.90 },
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 12.90 },
      { id: 'caja-20', label: 'Caja x20', units: 20, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'maicena',
    name: 'Alfajor de Maicena',
    price: 7.90,
    image:  '../images/alfajores/alfajor-maicena-x4.jpg', 
    images: [
       '../images/alfajores/alfajor-maicena-x4.jpg', 
       '../images/alfajores/alfajor-maicena-x8.jpg', 
       '../images/alfajores/alfajor-maicena-x18.jpg', 
    ],
    rating: 4,
    reviewsCount: 98,
    description: 'Suaves galletas de maicena con dulce de leche cremoso. Un clásico que se derrite en tu boca.',
    ingredients: 'Harina de maicena, mantequilla, azúcar, yemas de huevo, esencia de limón, manjar blanco.',
    nutritionalInfo: 'Porción: 100g\nEnergía: 420 kcal\nProteínas: 5g\nCarbohidratos: 52g\nGrasas: 20g',
    category: 'alfajores',
    inStock: true,
    variants: [
      { id: 'caja-4', label: 'Caja x4', units: 4, price: 7.90 },
      { id: 'caja-8', label: 'Caja x8', units: 8, price: 12.90 },
      { id: 'caja-18', label: 'Caja x18', units: 18, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'chocolate',
    name: 'Alfajor de Chocolate',
    price: 7.90,
    image: '../images/alfajores/alfajor-chocolate-x5.jpg', 
    images: [
       '../images/alfajores/alfajor-chocolate-x5.jpg', 
       '../images/alfajores/alfajor-chocolate-x10.jpg', 
       '../images/alfajores/alfajor-chocolate-x20.jpg', 
    ],
    rating: 3,
    reviewsCount: 85,
    description: 'Intenso sabor a chocolate con cobertura de chocolate premium.',
    ingredients: 'Harina de trigo, cacao, chocolate (70%), mantequilla, azúcar, huevos, manjar.',
    nutritionalInfo: 'Porción: 100g\nEnergía: 480 kcal\nProteínas: 7g\nCarbohidratos: 58g\nGrasas: 24g',
    category: 'alfajores',
    inStock: true,
    badge: 'NUEVO',
    badgeType: 'new',
    variants: [
      { id: 'caja-5', label: 'Caja x5', units: 5, price: 7.90 },
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 12.90 },
      { id: 'caja-20', label: 'Caja x20', units: 20, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'lucuma',
    name: 'Alfajor de Lúcuma',
    price: 7.90,
    image: '../images/alfajores/alfajor-lucuma-x5.jpg', 
    images: [
       '../images/alfajores/alfajor-lucuma-x5.jpg', 
       '../images/alfajores/alfajor-lucuma-x10.jpg', 
       '../images/alfajores/alfajor-lucuma-x20.jpg', 
    ],
    rating: 5,
    reviewsCount: 76,
    description: 'Delicioso alfajor con el sabor único de la lúcuma peruana.',
    ingredients: 'Harina de trigo, lúcuma, mantequilla, azúcar, huevos, manjar de lúcuma.',
    category: 'alfajores',
    inStock: true,
    variants: [
      { id: 'caja-5', label: 'Caja x5', units: 5, price: 7.90 },
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 12.90 },
      { id: 'caja-20', label: 'Caja x20', units: 20, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'miel',
    name: 'Alfajor de Miel',
    price: 7.90,
    image: '../images/alfajores/alfajor-miel-x4.jpg', 
    images: [
       '../images/alfajores/alfajor-miel-x4.jpg', 
       '../images/alfajores/alfajor-miel-x8.jpg', 
       '../images/alfajores/alfajor-miel-x18.jpg', 
    ],
    rating: 5,
    reviewsCount: 62,
    description: 'Con miel de abeja natural y un toque de canela.',
    ingredients: 'Harina, miel de abeja, mantequilla, azúcar, canela, manjar.',
    category: 'alfajores',
    inStock: true,
    variants: [
      { id: 'caja-4', label: 'Caja x4', units: 4, price: 7.90 },
      { id: 'caja-8', label: 'Caja x8', units: 8, price: 12.90 },
      { id: 'caja-18', label: 'Caja x18', units: 18, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'multicereal',
    name: 'Alfajor Multicereal',
    price: 7.90,
    image: '../images/alfajores/alfajor-multicereal-x5.jpg', 
    images: [
       '../images/alfajores/alfajor-multicereal-x5.jpg', 
       '../images/alfajores/alfajor-multicereal-x10.jpg', 
       '../images/alfajores/alfajor-multicereal-x20.jpg', 
    ],
    rating: 4,
    reviewsCount: 54,
    description: 'Saludable alfajor con cereales integrales.',
    ingredients: 'Harina integral, avena, quinua, chía, miel, manjar light.',
    category: 'alfajores',
    inStock: true,
    variants: [
      { id: 'caja-5', label: 'Caja x5', units: 5, price: 7.90 },
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 12.90 },
      { id: 'caja-20', label: 'Caja x20', units: 20, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'castana',
    name: 'Alfajor de Castaña',
    price: 7.90,
    image: '../images/alfajores/alfajor-castana-x5.jpg', 
    images: [
       '../images/alfajores/alfajor-castana-x5.jpg', 
       '../images/alfajores/alfajor-castana-x10.jpg', 
       '../images/alfajores/alfajor-castana-x20.jpg', 
    ],
    rating: 5,
    reviewsCount: 45,
    description: 'Con trozos de castaña amazónica.',
    ingredients: 'Harina, castaña amazónica, mantequilla, azúcar, manjar.',
    category: 'alfajores',
    inStock: true,
    variants: [
      { id: 'caja-5', label: 'Caja x5', units: 5, price: 7.90 },
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 12.90 },
      { id: 'caja-20', label: 'Caja x20', units: 20, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'chocolucuma',
    name: 'Alfajor Chocolúcuma',
    price: 7.90,
    image: '../images/alfajores/alfajor-chocolucuma-x5.jpg', 
    images: [
       '../images/alfajores/alfajor-chocolucuma-x5.jpg', 
       '../images/alfajores/alfajor-chocolucuma-x10.jpg', 
       '../images/alfajores/alfajor-chocolucuma-x20.jpg', 
    ],
    rating: 5,
    reviewsCount: 89,
    description: 'Fusión perfecta de chocolate y lúcuma.',
    ingredients: 'Harina, chocolate, lúcuma, mantequilla, manjar mixto.',
    category: 'alfajores',
    inStock: true,
    variants: [
      { id: 'caja-5', label: 'Caja x5', units: 5, price: 7.90 },
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 12.90 },
      { id: 'caja-20', label: 'Caja x20', units: 20, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'pecanas',
    name: 'Alfajor de Pecanas',
    price: 7.90,
    image: '../images/alfajores/alfajor-pecana-x4.jpg', 
    images: [
       '../images/alfajores/alfajor-pecana-x4.jpg', 
       '../images/alfajores/alfajor-pecana-x8.jpg', 
       '../images/alfajores/alfajor-pecana-x16.jpg', 
    ],
    rating: 5,
    reviewsCount: 71,
    description: 'Con pecanas caramelizadas crujientes.',
    ingredients: 'Harina, pecanas, caramelo, mantequilla, manjar.',
    category: 'alfajores',
    inStock: true,
    variants: [
      { id: 'caja-4', label: 'Caja x4', units: 4, price: 7.90 },
      { id: 'caja-8', label: 'Caja x8', units: 8, price: 12.90 },
      { id: 'caja-16', label: 'Caja x16', units: 16, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'limon',
    name: 'Alfajor de Limón',
    price: 7.90,
    image: '../images/alfajores/alfajor-limon-x4.jpg', 
    images: [
       '../images/alfajores/alfajor-limon-x4.jpg', 
       '../images/alfajores/alfajor-limon-x8.jpg', 
       '../images/alfajores/alfajor-limon-x18.jpg', 
    ],
    rating: 4,
    reviewsCount: 58,
    description: 'Refrescante alfajor con crema de limón natural.',
    ingredients: 'Harina, limón, ralladura de limón, mantequilla, crema de limón.',
    category: 'alfajores',
    inStock: true,
    variants: [
      { id: 'caja-4', label: 'Caja x4', units: 4, price: 7.90 },
      { id: 'caja-8', label: 'Caja x8', units: 8, price: 12.90 },
      { id: 'caja-18', label: 'Caja x18', units: 18, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'cheesecake',
    name: 'Alfajor Cheesecake',
    price: 7.90,
    image: '../images/alfajores/alfajor-cheesecake-x5.jpg', 
    images: [
       '../images/alfajores/alfajor-cheesecake-x5.jpg', 
       '../images/alfajores/alfajor-cheesecake-x10.jpg', 
       '../images/alfajores/alfajor-cheesecake-x20.jpg', 
    ],
    rating: 5,
    reviewsCount: 92,
    description: 'Innovador sabor a cheesecake en alfajor.',
    ingredients: 'Harina, queso crema, galleta graham, mantequilla, manjar.',
    category: 'alfajores',
    inStock: true,
    badge: 'NUEVO',
    badgeType: 'new',
    variants: [
      { id: 'caja-5', label: 'Caja x5', units: 5, price: 7.90 },
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 12.90 },
      { id: 'caja-20', label: 'Caja x20', units: 20, price: 19.90 }
    ]
  },
  {
    id:generateId(),
    slug: 'pistacho',
    name: 'Alfajor de Pistacho',
    price: 7.90,
    image: '../images/alfajores/alfajor-pistacho-x4.jpg', 
    images: [
       '../images/alfajores/alfajor-pistacho-x4.jpg', 
       '../images/alfajores/alfajor-pistacho-x8.jpg', 
       '../images/alfajores/alfajor-pistacho-x16.jpg', 
    ],
    rating: 5,
    reviewsCount: 103,
    description: 'Premium alfajor con pistachos importados.',
    ingredients: 'Harina, pistachos, mantequilla, azúcar, crema de pistacho.',
    category: 'alfajores',
    inStock: true,
    badge: 'PREMIUM',
    badgeType: 'new',
    variants: [
      { id: 'caja-4', label: 'Caja x4', units: 4, price: 7.90 },
      { id: 'caja-8', label: 'Caja x8', units: 8, price: 12.90 },
      { id: 'caja-16', label: 'Caja x16', units: 16, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'chocochips',
    name: 'Alfajor Chocochips',
    price: 7.90,
    image: '../images/alfajores/alfajor-chocochips-x4.jpg', 
    images: [
       '../images/alfajores/alfajor-chocochips-x4.jpg', 
       '../images/alfajores/alfajor-chocochips-x8.jpg', 
       '../images/alfajores/alfajor-chocochips-x16.jpg', 
    ],
    rating: 5,
    reviewsCount: 67,
    description: 'Con chips de chocolate en cada bocado.',
    ingredients: 'Harina, chips de chocolate, mantequilla, manjar, cacao.',
    category: 'alfajores',
    inStock: true,
    variants: [
      { id: 'caja-4', label: 'Caja x4', units: 4, price: 7.90 },
      { id: 'caja-8', label: 'Caja x8', units: 8, price: 12.90 },
      { id: 'caja-16', label: 'Caja x16', units: 16, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'harina-de-arroz',
    name: 'Alfajor de Harina de Arroz',
    price: 12.90,
    image: '../images/alfajores/alfajor-harina-de-arroz-x3.jpg', 
    images: [
       '../images/alfajores/alfajor-harina-de-arroz-x3.jpg', 
       '../images/alfajores/alfajor-harina-de-arroz-x6.jpg', 
       '../images/alfajores/alfajor-harina-de-arroz-x12.jpg', 
    ],
    rating: 4,
    reviewsCount: 41,
    description: 'Opción sin gluten, ideal para celíacos.',
    ingredients: 'Harina de arroz, mantequilla, azúcar, manjar sin gluten.',
    category: 'alfajores',
    inStock: true,
    badge: 'SIN GLUTEN',
    badgeType: 'pickup',
    variants: [
      { id: 'caja-3', label: 'Caja x3', units: 3, price: 7.90 },
      { id: 'caja-6', label: 'Caja x6', units: 6, price: 12.90 },
      { id: 'caja-12', label: 'Caja x12', units: 12, price: 19.90 }
    ]
  }, 
  {
    id: generateId(),
    slug: 'maicena-de-colores',
    name: 'Alfajor de Maicena de Colores',
    price: 21.90,
    image:  '../images/alfajores/alfajor-maicena-colores-x4.jpg', 
    images: [
       '../images/alfajores/alfajor-maicena-colores-x4.jpg', 
       '../images/alfajores/alfajor-maicena-colores-x8.jpg', 
       '../images/alfajores/alfajor-maicena-colores-x18.jpg', 
    ],
    rating: 5,
    reviewsCount: 156,
    description: 'Alfajores de maicena con toques de colores naturales. Perfectos para eventos infantiles y celebraciones.',
    ingredients: 'Harina de maicena, mantequilla, azúcar, colorantes naturales, manjar blanco.',
    nutritionalInfo: 'Porción: 100g\nEnergía: 430 kcal\nProteínas: 5g\nCarbohidratos: 53g\nGrasas: 20g',
    category: 'alfajores',
    inStock: true,
    badge: 'NUEVO',
    badgeType: 'new',
    variants: [
      { id: 'caja-4', label: 'Caja x4', units: 4, price: 7.90 },
      { id: 'caja-8', label: 'Caja x8', units: 8, price: 12.90 },
      { id: 'caja-18', label: 'Caja x18', units: 18, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'manzana',
    name: 'Alfajor de Manzana',
    price: 7.90,
    image: '../images/alfajores/alfajor-manzana-x3.jpg', 
    images: [
       '../images/alfajores/alfajor-manzana-x3.jpg', 
       '../images/alfajores/alfajor-manzana-x6.jpg', 
       '../images/alfajores/alfajor-manzana-x12.jpg', 
    ],
    rating: 5,
    reviewsCount: 134,
    description: 'Alfajor con compota de manzana casera y un toque de canela.',
    ingredients: 'Harina de trigo, compota de manzana, canela, mantequilla, manjar.',
    nutritionalInfo: 'Porción: 100g\nEnergía: 410 kcal\nProteínas: 5g\nCarbohidratos: 50g\nGrasas: 19g',
    category: 'alfajores',
    inStock: true,
    variants: [
      { id: 'caja-3', label: 'Caja x3', units: 3, price: 7.90 },
      { id: 'caja-6', label: 'Caja x6', units: 6, price: 12.90 },
      { id: 'caja-12', label: 'Caja x12', units: 12, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'maracuya',
    name: 'Alfajor de Maracuyá',
    price: 7.90,
    image: '../images/alfajores/alfajor-maracuya-x5.jpg', 
    images: [
       '../images/alfajores/alfajor-maracuya-x5.jpg', 
       '../images/alfajores/alfajor-maracuya-x10.jpg', 
       '../images/alfajores/alfajor-maracuya-x20.jpg', 
    ],
    rating: 5,
    reviewsCount: 178,
    description: 'Sabor tropical y refrescante de maracuyá peruana en cada bocado.',
    ingredients: 'Harina de trigo, pulpa de maracuyá, mantequilla, azúcar, manjar de maracuyá.',
    nutritionalInfo: 'Porción: 100g\nEnergía: 425 kcal\nProteínas: 5g\nCarbohidratos: 52g\nGrasas: 20g',
    category: 'alfajores',
    inStock: true,
    badge: 'TROPICAL',
    badgeType: 'new',
    variants: [
      { id: 'caja-5', label: 'Caja x5', units: 5, price: 7.90 },
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 12.90 },
      { id: 'caja-20', label: 'Caja x20', units: 20, price: 19.90 }
    ]
  },
  {
    id: generateId(),
    slug: 'crema-pastelera',
    name: 'Alfajor de Crema Pastelera',
    price: 7.90,
    image: '../images/alfajores/alfajor-crema-pastelera-x5.jpg', 
    images: [
       '../images/alfajores/alfajor-crema-pastelera-x5.jpg', 
       '../images/alfajores/alfajor-crema-pastelera-x10.jpg', 
       '../images/alfajores/alfajor-crema-pastelera-x20.jpg', 
    ],
    rating: 5,
    reviewsCount: 145,
    description: 'Alfajor relleno con suave crema pastelera casera de vainilla.',
    ingredients: 'Harina de trigo, crema pastelera, vainilla, mantequilla, huevos.',
    nutritionalInfo: 'Porción: 100g\nEnergía: 460 kcal\nProteínas: 6g\nCarbohidratos: 56g\nGrasas: 23g',
    category: 'alfajores',
    inStock: true,
    variants: [
      { id: 'caja-5', label: 'Caja x5', units: 5, price: 7.90 },
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 12.90 },
      { id: 'caja-20', label: 'Caja x20', units: 20, price: 19.90  }
    ]
  },
  {
    id: generateId(),
    slug: 'clasica-especial',
    name: 'Alfajor Clásica Especial',
    price: 28.90,
    image: '../images/alfajores/alfajor-clasica-especial-x4.jpg', 
    images: [
       '../images/alfajores/alfajor-clasica-especial-x4.jpg', 
       '../images/alfajores/alfajor-clasica-especial-x8.jpg', 
       '../images/alfajores/alfajor-clasica-especial-x18.jpg', 
    ],
    rating: 5,
    reviewsCount: 289,
    description: 'Nuestra versión premium del alfajor clásico con ingredientes selectos y presentación especial.',
    ingredients: 'Harina de trigo premium, mantequilla europea, manjar artesanal, vainilla de Madagascar.',
    nutritionalInfo: 'Porción: 100g\nEnergía: 470 kcal\nProteínas: 7g\nCarbohidratos: 57g\nGrasas: 24g',
    category: 'alfajores',
    inStock: true,
    badge: 'PREMIUM',
    badgeType: 'new',
    variants: [
      { id: 'caja-4', label: 'Caja x4', units: 4, price: 7.90  },
      { id: 'caja-8', label: 'Caja x8', units: 8, price: 12.90 },
      { id: 'caja-18', label: 'Caja x18', units: 18, price: 19.90  }
    ]
  },

  // ========== CAJAS MIXTAS - 2 SABORES ==========
 
  {
    id: generateId(),
    slug: 'mix-chocolate-harina-de-arroz',
    name: 'Mix Chocolate & Harina de Arroz',
    price: 19.90,
    image: '../images/alfajores/mix-chocolate-harina-de-arroz.jpg',
    images: ['../images/alfajores/mix-chocolate-harina-de-arroz.jpg'],
    rating: 5,
    reviewsCount: 48,
    description: 'Caja con 10 alfajores de chocolate y 6 de harina de arroz. Edición especial.',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '2',
    variants: [
      { id: 'caja-16', label: 'Caja x16', units: 16, price: 19.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'mix-chocolate-castana',
    name: 'Mix Chocolate & Castaña',
    price: 7.90,
    image: '../images/alfajores/mix-chocolate-castana-x5.jpg',
    images: [
      '../images/alfajores/mix-chocolate-castana-x5.jpg',
      '../images/alfajores/mix-chocolate-castana-x10.jpg',
      '../images/alfajores/mix-chocolate-castana-x20.jpg'
    ],
    rating: 5,
    reviewsCount: 48,
    description: 'Deliciosos alfajores sabor chocolate y castañas, rellenos de manjar blanco y fudge con castañas molidas en los bordes.',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '2',
      variants: [
      { id: 'caja-5', label: 'Caja x5', units: 5, price: 7.90  }, 
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 12.90  }, 
      { id: 'caja-20', label: 'Caja x20', units: 20, price: 19.90  }, 
    ]
  },
 {
    id: generateId(),
    slug: 'mix-maicena-chocolate',
    name: 'Mix Maicena & Chocolate',
    price: 7.90,
    image: '../images/alfajores/mix-maicena-chocolate-x4.jpg',
    images: [
      '../images/alfajores/mix-maicena-chocolate-x4.jpg',
      '../images/alfajores/mix-maicena-chocolate-x9.jpg',
      '../images/alfajores/mix-maicena-chocolate-x19.jpg'
    ],
    rating: 5,
    reviewsCount: 48,
    description: 'Deliciosos alfajores sabor chocolate y castañas, rellenos de manjar blanco y fudge con castañas molidas en los bordes.',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '2',
      variants: [
      { id: 'caja-4', label: 'Caja x4', units: 4, price: 7.90  }, 
      { id: 'caja-9', label: 'Caja x9', units: 9, price: 12.90  }, 
      { id: 'caja-19', label: 'Caja x19', units: 19, price: 19.90  }, 
    ]
  },
 {
    id: generateId(),
    slug: 'mix-multicereal-castana',
    name: 'Mix Multicereal & Castaña',
    price: 7.90,
    image: '../images/alfajores/mix-multicereal-castana-x5.jpg',
    images: [
      '../images/alfajores/mix-multicereal-castana-x5.jpg',
      '../images/alfajores/mix-multicereal-castana-x10.jpg',
      '../images/alfajores/mix-multicereal-castana-x20.jpg'
    ],
    rating: 5,
    reviewsCount: 48,
    description: 'Deliciosos alfajores sabor chocolate y castañas, rellenos de manjar blanco y fudge con castañas molidas en los bordes.',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '2',
      variants: [
      { id: 'caja-5', label: 'Caja x5', units: 5, price: 7.90  }, 
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 12.90  }, 
      { id: 'caja-20', label: 'Caja x20', units: 20, price: 19.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'mix-tradicional-chocolucuma',
    name: 'Mix Tradicional & Chocolúcuma',
    price: 7.90,
    image: '../images/alfajores/mix-tradicional-chocolucuma-x4.jpg',
    images: [
      '../images/alfajores/mix-tradicional-chocolucuma-x4.jpg',
      '../images/alfajores/mix-tradicional-chocolucuma-x10.jpg',
      '../images/alfajores/mix-tradicional-chocolucuma-x20.jpg'
    ],
    rating: 5,
    reviewsCount: 48,
    description: 'Deliciosos alfajores sabor chocolate y castañas, rellenos de manjar blanco y fudge con castañas molidas en los bordes.',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '2',
      variants: [
      { id: 'caja-4', label: 'Caja x4', units: 4, price: 7.90  }, 
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 12.90  }, 
      { id: 'caja-20', label: 'Caja x20', units: 20, price: 19.90  }, 
    ]
  },
  // ========== CAJAS MIXTAS - 3 SABORES ==========
  {
    id: generateId(),
    slug: 'mix-castana-maicena-chocolate',
    name: 'Mix Castaña, Maicena & Chocolate',
    price: 19.90,
    image: '../images/alfajores/mix-castana-maicena-chocolate.jpg',
    images: ['../images/alfajores/mix-castana-maicena-chocolate.jpg'],
    rating: 5,
    reviewsCount: 48,
    description: 'Caja con 10 castaña /4 maicena /5 chocolate',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '3',
      variants: [
      { id: 'caja-19', label: 'Caja x19', units: 19, price: 19.90  }, 
    ]
  },
   {
    id: generateId(),
    slug: 'mix-multicereal-maicena-chocolate',
    name: 'Mix Multicereal, Maicena & Chocolate',
    price: 7.90,
    image: '../images/alfajores/mix-multicereal-maicena-chocolate-x4.jpg',
    images: [
      '../images/alfajores/mix-multicereal-maicena-chocolate-x4.jpg',
      '../images/alfajores/mix-multicereal-maicena-chocolate-x9.jpg',
      '../images/alfajores/mix-multicereal-maicena-chocolate-x19.jpg',
    ],
    rating: 5,
    reviewsCount: 48,
    description: 'Caja con 10 castaña /4 maicena /5 chocolate',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '3',
      variants: [
      { id: 'caja-4', label: 'Caja x4', units: 4, price: 7.90 }, 
      { id: 'caja-9', label: 'Caja x9', units: 9, price: 12.90 }, 
      { id: 'caja-19', label: 'Caja x19', units: 19, price: 19.90 }, 
    ]
  },
  {
    id: generateId(),
    slug: 'mix-pecana-maicena-chocolate',
    name: 'Mix Pecana, Maicena & Chocolate',
    price: 19.90,
    image: '../images/alfajores/mix-pecana-maicena-chocolate.jpg',
    images: ['../images/alfajores/mix-pecana-maicena-chocolate.jpg'],
    rating: 5,
    reviewsCount: 48,
    description: 'Caja con 8 pecana /4 maicena /5 chocolate',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '3',
      variants: [
      { id: 'caja-17', label: 'Caja x17', units: 17, price: 19.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'mix-tradicional-chocolate-maicena',
    name: 'Mix Tradicional, Chocolate & Maicena',
    price: 19.90,
    image: '../images/alfajores/mix-tradicional-chocolate-maicena.jpg',
    images: ['../images/alfajores/mix-tradicional-chocolate-maicena.jpg'],
    rating: 5,
    reviewsCount: 48,
    description: 'Caja con 10 Tradicional / 5 Chocolate / 4 Maicena',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '3',
      variants: [
      { id: 'caja-19', label: 'Caja x19', units: 19, price: 19.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'mix-tradicional-maicena-multicereal',
    name: 'Mix Tradicional, Maicena & Multicereal',
    price: 19.90,
    image: '../images/alfajores/mix-tradicional-maicena-multicereal.jpg',
    images: ['../images/alfajores/mix-tradicional-maicena-multicereal.jpg'],
    rating: 5,
    reviewsCount: 48,
    description: 'Caja con 10 Tradicional / 4 Maicena / 4 Multicereal',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '3',
      variants: [
      { id: 'caja-19', label: 'Caja x19', units: 19, price: 19.90  }, 
    ]
  },

  // ========== CAJAS MIXTAS - 4 SABORES ==========
  {
    id: generateId(),
    slug: 'mix-tradicional-chocolate-castana-maicena',
    name: 'Mix Tradicional, Chocolate, Castaña & Maicena',
    price: 19.90,
    image: '../images/alfajores/mix-tradicional-chocolate-castana-maicena.jpg',
    images: ['../images/alfajores/mix-tradicional-chocolate-castana-maicena.jpg'],
    rating: 5,
    reviewsCount: 48,
    description: 'Caja con 4 deliciosos sabores de alfajores: 5 tradicionales, 5 sabor a chocolate, 5 castaña y 4 maicena',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '4',
      variants: [
      { id: 'caja-19', label: 'Caja x19', units: 19, price: 19.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'mix-tradicional-multicereal-castana-maicena',
    name: 'Mix Tradicional, Multicereal, Castaña & Maicena',
    price: 19.90,
    image: '../images/alfajores/mix-tradicional-multicereal-castana-maicena.jpg',
    images: ['../images/alfajores/mix-tradicional-multicereal-castana-maicena.jpg'],
    rating: 5,
    reviewsCount: 48,
    description: 'Deliciosa caja de 5 alfajores tradicional / 5 multicereal /5 castaña / 4 maicena',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '4',
      variants: [
      { id: 'caja-19', label: 'Caja x19', units: 19, price: 19.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'mix-pecana-maicena-chocolate-castana',
    name: 'Mix Pecana, Maicena, Chocolate & Castaña',
    price: 19.90,
    image: '../images/alfajores/mix-pecana-maicena-chocolate-castana.jpg',
    images: ['../images/alfajores/mix-pecana-maicena-chocolate-castana.jpg'],
    rating: 5,
    reviewsCount: 48,
    description: 'Deliciosa caja de 4 pecana /4 maicena /5 chocolate / 5 castaña',
    ingredients: 'Variado según sabores incluidos: pistacho y chocolúcuma.',
    category: 'alfajores',
    inStock: true,
    mixType: '4',
      variants: [
      { id: 'caja-18', label: 'Caja x18', units: 18, price: 19.90  }, 
    ]
  },

  // ========== ALFAJORES PERSONALES (individuales) ==========
  {
    id: generateId(),
    slug: 'castana-personal',
    name: 'Alfajor de Castaña Personal',
    price: 6.90,
    image: '../images/alfajores/castana-personal.jpg',
    images: [
      '../images/alfajores/castana-personal.jpg'
    ],
    rating: 5,
    reviewsCount: 189,
    description: 'Suave alfajor de maicena en porción individual.',
    ingredients: 'Harina de maicena, mantequilla, manjar blanco.',
    category: 'alfajores',
    inStock: true,
    specialType: 'personal',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 6.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'harina-de-arroz-personal',
    name: 'Alfajor de Harina de Arroz Personal',
    price: 6.90,
    image: '../images/alfajores/harina-de-arroz-personal.jpg',
    images: [
      '../images/alfajores/harina-de-arroz-personal.jpg'
    ],
    rating: 5,
    reviewsCount: 189,
    description: 'Alfajor a base de harina de arroz, relleno de abundante manjar blanco.',
    ingredients: 'Harina de maicena, mantequilla, manjar blanco.',
    category: 'alfajores',
    inStock: true,
    specialType: 'personal',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 6.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'maicena-personal',
    name: 'Alfajor de Maicena Personal',
    price: 6.90,
    image: '../images/alfajores/maicena-personal.jpg',
    images: [
      '../images/alfajores/maicena-personal.jpg'
    ],
    rating: 5,
    reviewsCount: 189,
    description: 'Alfajor a base de harina de arroz, relleno de abundante manjar blanco.',
    ingredients: 'Harina de maicena, mantequilla, manjar blanco.',
    category: 'alfajores',
    inStock: true,
    specialType: 'personal',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 6.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'manzana-personal',
    name: 'Alfajor de Manzana Personal',
    price: 6.90,
    image: '../images/alfajores/manzana-personal.jpg',
    images: [
      '../images/alfajores/manzana-personal.jpg'
    ],
    rating: 5,
    reviewsCount: 189,
    description: 'Alfajor a base de harina de trigo, mantequilla y relleno con crema pastelera, puré de manzana con azúcar en polvo y canela.',
    ingredients: 'Harina de maicena, mantequilla, manjar blanco.',
    category: 'alfajores',
    inStock: true,
    specialType: 'personal',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 6.90  }, 
    ]
  },
   {
    id: generateId(),
    slug: 'miel-personal',
    name: 'Alfajor de Miel Personal',
    price: 6.90,
    image: '../images/alfajores/miel-personal.jpg',
    images: [
      '../images/alfajores/miel-personal.jpg'
    ],
    rating: 5,
    reviewsCount: 189,
    description: 'Alfajor preparado a base de harina de trigo, anís y relleno con miel de frutas.',
    ingredients: 'Harina de maicena, mantequilla, manjar blanco.',
    category: 'alfajores',
    inStock: true,
    specialType: 'personal',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 6.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'pecana-personal',
    name: 'Alfajor de Pecana Personal',
    price: 6.90,
    image: '../images/alfajores/pecana-personal.jpg',
    images: [
      '../images/alfajores/pecana-personal.jpg'
    ],
    rating: 5,
    reviewsCount: 189,
    description: 'Alfajor de pecana relleno de exquisito manjar blanco y pecana molida en los bordes.',
    ingredients: 'Harina de maicena, mantequilla, manjar blanco.',
    category: 'alfajores',
    inStock: true,
    specialType: 'personal',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 6.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'chocolate-personal',
    name: 'Alfajor de Chocolate Personal',
    price: 6.90,
    image: '../images/alfajores/chocolate-personal.jpg',
    images: [
      '../images/alfajores/chocolate-personal.jpg'
    ],
    rating: 5,
    reviewsCount: 189,
    description: 'Alfajor hecho con harina de trigo, cocoa y relleno con abundante fudge de la casa.',
    ingredients: 'Harina de maicena, mantequilla, manjar blanco.',
    category: 'alfajores',
    inStock: true,
    specialType: 'personal',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 6.90  }, 
    ]
  },

  // ========== CON COBERTURA BITTER ==========
  {
    id: generateId(),
    slug: 'tradicional-cobertura-bitter',
    name: 'Alfajor Tradicional con Cobertura Bitter',
    price: 7.90,
    image: '../images/alfajores/tradicional-cobertura-bitter.jpg',
    images: [
      '../images/alfajores/tradicional-cobertura-bitter.jpg'
    ],
    rating: 5,
    reviewsCount: 145,
    description: 'Tradicional alfajor hecho con la receta de la abuela a base de harina de trigo y relleno de abundante manjar blanco, bañado con cobertura bitter.',
    ingredients: 'Harina de trigo, mantequilla, manjar, chocolate bitter 70%.',
    category: 'alfajores',
    inStock: true,
    specialType: 'cobertura-bitter',
    badge: 'PREMIUM',
    badgeType: 'new',
   variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 7.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'maicena-cobertura-bitter',
    name: 'Alfajor de Maicena con Cobertura Bitter',
    price: 7.90,
    image: '../images/alfajores/maicena-cobertura-bitter.jpg',
    images: [
      '../images/alfajores/maicena-cobertura-bitter.jpg'
    ],
    rating: 5,
    reviewsCount: 189,
    description: 'Suave alfajor hecho con maicena, harina de trigo y relleno de manjar blanco bañado con cobertura bitter.',
    ingredients: 'Harina de maicena, mantequilla, manjar blanco.',
    category: 'alfajores',
    inStock: true,
    specialType: 'cobertura-bitter',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 7.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'chocolate-cobertura-bitter',
    name: 'Alfajor de Chocolate con Cobertura Bitter',
    price: 7.90,
    image: '../images/alfajores/chocolate-cobertura-bitter.jpg',
    images: [
      '../images/alfajores/chocolate-cobertura-bitter.jpg'
    ],
    rating: 5,
    reviewsCount: 189,
    description: 'Alfajor hecho con harina de trigo, cocoa y relleno con abundante fudge de la casa, bañado con cobertura bitter.',
    ingredients: 'Harina de maicena, mantequilla, manjar blanco.',
    category: 'alfajores',
    inStock: true,
    specialType: 'cobertura-bitter',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 7.90  }, 
    ]
  },

  // ========== ALFAJOREABLES ==========
  {
    id: generateId(),
    slug: 'alfajoreable-tradicional',
    name: 'Alfajoreable Tradicional',
    price: 14.90,
    image: '../images/alfajores/alfajoreable-tradicional.jpg',
    images: [
      '../images/alfajores/alfajoreable-tradicional.jpg'
    ],
    rating: 5,
    reviewsCount: 156,
    description: 'Diez alfajores tradicionales, rellenas al instante con suave manjar blanco de leche. Pura tradición en cada cucharada.',
    ingredients: 'Harina de trigo, mantequilla, azúcar, manjar blanco.',
    category: 'alfajores',
    inStock: true,
    specialType: 'alfajoreable',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'alfajoreable-maicena',
    name: 'Alfajoreable de Maicena',
    price: 14.90,
    image: '../images/alfajores/alfajoreable-maicena.jpg',
    images: [
      '../images/alfajores/alfajoreable-maicena.jpg'
    ],
    rating: 5,
    reviewsCount: 143,
    description: 'Alfajores de maicena rellenas con nuestro irresistible manjar blanco. Simplemente delicioso.',
    ingredients: 'Harina, chocolate, mantequilla, manjar.',
    category: 'alfajores',
    inStock: true,
    specialType: 'alfajoreable',
    badge: 'NUEVO',
    badgeType: 'new',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'alfajoreable-pionono-de-chocolate',
    name: 'Alfajoreable de Pionono de Chocolate',
    price: 14.90,
    image: '../images/alfajores/alfajoreable-pionono-de-chocolate.jpg',
    images: [
      '../images/alfajores/alfajoreable-pionono-de-chocolate.jpg'
    ],
    rating: 5,
    reviewsCount: 143,
    description: 'Deliciosas capas de biscochuelo de pionono de chocolate, bañado con crema pastelera, almíbar y fudge.... irresistible!!',
    ingredients: 'Harina, chocolate, mantequilla, manjar.',
    category: 'alfajores',
    inStock: true,
    specialType: 'alfajoreable',
    badge: 'NUEVO',
    badgeType: 'new',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'alfajoreable-pionono-de-vainilla',
    name: 'Alfajoreable de Pionono de Vainilla',
    price: 14.90,
    image: '../images/alfajores/alfajoreable-pionono-de-vainilla.jpg',
    images: [
      '../images/alfajores/alfajoreable-pionono-de-vainilla.jpg'
    ],
    rating: 5,
    reviewsCount: 143,
    description: 'Deliciosas capas de biscochuelo de pionono tradicional, bañado con almibar, crema pastelera, manjarblanco y fudge... delicia en cada bocado!!',
    ingredients: 'Harina, chocolate, mantequilla, manjar.',
    category: 'alfajores',
    inStock: true,
    specialType: 'alfajoreable',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'alfajoreable-turron',
    name: 'Alfajoreable de Turrón',
    price: 14.90,
    image: '../images/alfajores/alfajoreable-turron.jpg',
    images: [
      '../images/alfajores/alfajoreable-turron.jpg'
    ],
    rating: 5,
    reviewsCount: 143,
    description: 'Deliciosas capas de turrón de doña pepa, miel de frutas selectas, galletas de alfajor de miel con grageas multicolor',
    ingredients: 'Harina, chocolate, mantequilla, manjar.',
    category: 'alfajores',
    inStock: true,
    specialType: 'alfajoreable',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'alfajoreable-encanelado',
    name: 'Alfajoreable de Encanelado',
    price: 14.90,
    image: '../images/alfajores/alfajoreable-encanelado.jpg',
    images: [
      '../images/alfajores/alfajoreable-encanelado.jpg'
    ],
    rating: 5,
    reviewsCount: 143,
    description: 'Suave bizcocho de canela, relleno de manjar y bañado en almíbar especiado. Un abrazo cálido con cada bocado.',
    ingredients: 'Harina, chocolate, mantequilla, manjar.',
    category: 'alfajores',
    inStock: true,
    specialType: 'alfajoreable',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
    {
    id: generateId(),
    slug: 'alfajoreable-limon',
    name: 'Alfajoreable de Limón',
    price: 14.90,
    image: '../images/alfajores/alfajoreable-limon.jpg',
    images: [
      '../images/alfajores/alfajoreable-limon.jpg'
    ],
    rating: 5,
    reviewsCount: 143,
    description: 'Cuatro finas tapas de maicena, rellenas con suave manjar blanco y una delicada crema pastelera de limón. Un clásico reinventado con frescura y elegancia.',
    ingredients: 'Harina, chocolate, mantequilla, manjar.',
    category: 'alfajores',
    inStock: true,
    specialType: 'alfajoreable',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
   {
    id: generateId(),
    slug: 'alfajoreable-chocolate',
    name: 'Alfajoreable de Chocolate',
    price: 14.90,
    image: '../images/alfajores/alfajoreable-chocolate.jpg',
    images: [
      '../images/alfajores/alfajoreable-chocolate.jpg'
    ],
    rating: 5,
    reviewsCount: 143,
    description: 'Alfajor de chocolate en capas con manjar. El postre más peruano en su versión más provocadora.',
    ingredients: 'Harina, chocolate, mantequilla, manjar.',
    category: 'alfajores',
    inStock: true,
    specialType: 'alfajoreable',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
   {
    id: generateId(),
    slug: 'alfajoreable-chocolucuma',
    name: 'Alfajoreable de Chocolúcuma',
    price: 14.90,
    image: '../images/alfajores/alfajoreable-chocolucuma.jpg',
    images: [
      '../images/alfajores/alfajoreable-chocolucuma.jpg'
    ],
    rating: 5,
    reviewsCount: 143,
    description: 'Seis capas de alfajor de sabor a chocolate, con doble relleno de manjar de leche y lúcuma. Un encuentro irresistible entre lo andino y lo dulce.',
    ingredients: 'Harina, chocolate, mantequilla, manjar.',
    category: 'alfajores',
    inStock: true,
    specialType: 'alfajoreable',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'alfajoreable-brownie',
    name: 'Alfajoreable de Brownie',
    price: 14.90,
    image: '../images/alfajores/alfajoreable-brownie.jpg',
    images: [
      '../images/alfajores/alfajoreable-brownie.jpg'
    ],
    rating: 5,
    reviewsCount: 143,
    description: 'Brownie húmedo con pecanas crocantes, relleno de manjar de leche y fudge. Puro placer en cada mordida.',
    ingredients: 'Harina, chocolate, mantequilla, manjar.',
    category: 'alfajores',
    inStock: true,
    specialType: 'alfajoreable',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },

  // ========== DISEÑADOS (personalizados) ==========
  // ========== DISEÑADOS (personalizados) ==========
  {
    id: generateId(),
    slug: 'alfajor-cumpleanos',
    name: 'Alfajor Diseñado - Feliz Cumpleaños',
    price: 14.90,
    image: '../images/alfajores/alfajor-cumpleanos.jpg',
    images: [
      '../images/alfajores/alfajor-cumpleanos.jpg'
    ],
    rating: 5,
    reviewsCount: 201,
    description: 'Alfajor personalizado con diseño de cumpleaños. Solo recojo en tienda.',
    ingredients: 'Harina, mantequilla, manjar, decoración comestible.',
    category: 'alfajores',
    inStock: true,
    specialType: 'disenado',
    badge: 'SOLO RECOJO',
    badgeType: 'pickup',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
   {
    id: generateId(),
    slug: 'alfajor-te-quiero',
    name: 'Alfajor Diseñado - Te Quiero',
    price: 14.90,
    image: '../images/alfajores/alfajor-disenado-te-quiero.jpg',
    images: [
      '../images/alfajores/alfajor-disenado-te-quiero.jpg'
    ],
    rating: 5,
    reviewsCount: 201,
    description: 'Alfajor personalizado con diseño de cumpleaños. Solo recojo en tienda.',
    ingredients: 'Harina, mantequilla, manjar, decoración comestible.',
    category: 'alfajores',
    inStock: true,
    specialType: 'disenado',
    badge: 'SOLO RECOJO',
    badgeType: 'pickup',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'alfajor-feliz-aniversario.',
    name: 'Alfajor Diseñado - Feliz Aniversario',
    price: 14.90,
    image: '../images/alfajores/alfajor-disenado-feliz-aniversario.jpg',
    images: [
      '../images/alfajores/alfajor-disenado-feliz-aniversario.jpg'
    ],
    rating: 5,
    reviewsCount: 201,
    description: 'Alfajor personalizado con diseño de cumpleaños. Solo recojo en tienda.',
    ingredients: 'Harina, mantequilla, manjar, decoración comestible.',
    category: 'alfajores',
    inStock: true,
    specialType: 'disenado',
    badge: 'SOLO RECOJO',
    badgeType: 'pickup',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },

  // ========== TEMÁTICOS ==========
  {
    id: generateId(),
    slug: 'alfajor-bautizo',
    name: 'Alfajor Temático - Bautizo',
    price: 14.90,
    image: '../images/alfajores/alfajor-tematico-bautizo.jpg',
    images: [
      '../images/alfajores/alfajor-tematico-bautizo.jpg'
    ],
    rating: 5,
    reviewsCount: 234,
    description: 'Alfajor con diseño temático de Halloween. Edición limitada.',
    ingredients: 'Harina, mantequilla, manjar, decoración temática.',
    category: 'alfajores',
    inStock: true,
    specialType: 'tematico',
     variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'alfajor-mandala',
    name: 'Alfajor Temático - Mandala',
    price: 14.90,
    image: '../images/alfajores/alfajor-tematico-mandala.jpg',
    images: [
      '../images/alfajores/alfajor-tematico-mandala.jpg'
    ],
    rating: 5,
    reviewsCount: 234,
    description: 'Alfajor con diseño temático de Halloween. Edición limitada.',
    ingredients: 'Harina, mantequilla, manjar, decoración temática.',
    category: 'alfajores',
    inStock: true,
    specialType: 'tematico',
     variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 14.90  }, 
    ]
  },
  
  /* 
    POSTRES PERSONALES
  */
   {
    id: generateId(),
    slug: 'brownie',
    name: 'Brownie Personal',
    price: 8.90,
    image: '../images/postres/brownie-manjar.jpg',
    images: [
      '../images/postres/brownie-manjar.jpg',
      '../images/postres/brownie-fudge.jpg',
    ],
    rating: 5,
    reviewsCount: 156,
    description: 'Brownie de chocolate intenso con trozos de nueces. Servido caliente con helado de vainilla.',
    ingredients: 'Chocolate belga, mantequilla, azúcar, huevos, harina, nueces.',
    nutritionalInfo: 'Porción: 120g\nEnergía: 380 kcal\nProteínas: 5g\nCarbohidratos: 45g\nGrasas: 20g',
    category: 'postres',
    inStock: true,
    badge: 'MÁS VENDIDO',
    badgeType: 'new',
    variantType: 'flavor',
    variantLabel: 'Sabores',
    variants: [
      { 
        id: 'manjar', 
        label: 'Con Manjar', 
        price: 8.90 
      },
      { 
        id: 'fudge', 
        label: 'Con Fudge', 
        price: 8.90 
      }
    ]
  },
  {
    id: generateId(),
    slug: 'budin',
    name: 'Budín Personal',
    price: 9.90,
    image: '../images/postres/budin-personal.jpg',
    images: [
      '../images/postres/budin-personal.jpg',  
    ],
    rating: 5,
    reviewsCount: 134,
    description: 'Dlicioso budín elaborado a base de miga de pan, leche fresca, pasas y bañado con miel de frutas de olla.',
    ingredients: 'Harina, mantequilla, huevos, azúcar, vainilla, crema pastelera.',
    category: 'postres',
    inStock: true,
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 9.90  }, 
    ]
  },
  
  {
    id: generateId(),
    slug: 'milhojas-personal',
    name: 'Milhojas Personal',
    price: 8.90,
    image: '../images/postres/milhojas-personal.jpg',
    images: [
      '../images/postres/milhojas-personal.jpg',  
    ],
    rating: 5,
    reviewsCount: 187,
    description: 'Capas de hojaldre con manjar blanco y crema chantilly.',
    ingredients: 'Hojaldre, manjar blanco, crema chantilly, azúcar glas.',
    category: 'postres',
    inStock: true,
    variantType: 'flavor',
    variantLabel: 'Sabores',
    variants: [
      { 
        id: 'manjar', 
        label: 'De Manjar', 
        price: 8.90 
      },
      { 
        id: 'crema-pastelera', 
        label: 'De Crema Pastelera', 
        price: 8.90 
      },
      { 
        id: 'albaricoque', 
        label: 'De Albaricoque', 
        price: 9.90 
      }
    ]
  },
  {
    id: generateId(),
    slug: 'pionono-personal',
    name: 'Pionono Personal',
    price: 8.50,
    image: '../images/postres/pionono-chocolate-personal.jpg',
    images: [
      '../images/postres/pionono-chocolate-personal.jpg',  
      '../images/postres/pionono-vainilla-personal.jpg',  
    ],
    rating: 5,
    reviewsCount: 165,
    description: 'Pionono relleno de manjar blanco con cobertura de chocolate.',
    ingredients: 'Bizcocho, manjar blanco, chocolate, crema.',
    category: 'postres',
    inStock: true,
    variantType: 'flavor',
    variantLabel: 'Sabores',
    variants: [
      { 
        id: 'chocolate', 
        label: 'De Chocolate', 
        price: 9.90 
      },
      { 
        id: 'vainilla', 
        label: 'De Vainilla', 
        price: 9.90 
      }
    ]
  },
  {
    id: generateId(),
    slug: 'pye-limon-personal',
    name: 'Pye de Limón Personal',
    price: 9.90,
    image: '../images/postres/pye-limon-personal.jpg',
    images: [
      '../images/postres/pye-limon-personal.jpg',
    ],
    rating: 5,
    reviewsCount: 201,
    description: 'Pye de limón con merengue italiano tostado.',
    ingredients: 'Limón, galleta, mantequilla, huevos, azúcar, merengue.',
    category: 'postres',
    inStock: true,
    badge: 'FAVORITO',
    badgeType: 'new',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 9.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'pye-manzana-personal',
    name: 'Pye de Manzana Personal',
    price: 9.90,
    image: '../images/postres/pye-manzana-personal.jpg',
    images: [
      '../images/postres/pye-manzana-personal.jpg',
    ],
    rating: 5,
    reviewsCount: 178,
    description: 'Pye de manzana con canela, servido caliente.',
    ingredients: 'Manzanas, canela, azúcar, mantequilla, masa de pye.',
    category: 'postres',
    inStock: true,
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 9.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'queque-personal',
    name: 'Queque de Zanahoria Personal',
    price: 7.90,
    image: '../images/postres/queque-zanahoria-personal.jpg',
    images: [
      '../images/postres/queque-zanahoria-personal.jpg',
    ],
    rating: 5,
    reviewsCount: 145,
    description: 'Queque de zanahoria con frosting de queso crema.',
    ingredients: 'Zanahoria, harina, nueces, especias, queso crema.',
    category: 'postres',
    inStock: true,
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 7.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'trufas',
    name: 'Trufas de Chocolate (x10)',
    price: 15.90,
    image: '../images/postres/trufas.jpg',
    images: [
      '../images/postres/trufas.jpg',
    ],
    rating: 5,
    reviewsCount: 223,
    description: 'Caja con 10 trufas artesanales de chocolate. Variedades: negro, con leche y blanco.',
    ingredients: 'Chocolate belga, crema, mantequilla, licor (opcional).',
    category: 'postres',
    inStock: true,
    badge: 'PREMIUM',
    badgeType: 'new',
     variants: [
      { id: 'caja-10', label: 'Caja x10', units: 10, price: 15.90  }, 
    ]
  },
  // ========== NUEVOS POSTRES PERSONALES ==========
  {
    id: generateId(),
    slug: 'relampago-fudge',
    name: 'Relámpago con Fudge',
    price: 8.90,
    image: '../images/postres/relampago-fudge-personal.jpg',
    images: [
      '../images/postres/relampago-fudge-personal.jpg',
    ],
    rating: 5,
    reviewsCount: 198,
    description: 'Delicioso relámpago relleno de crema y cubierto con fudge de chocolate.',
    ingredients: 'Masa choux, crema pastelera, fudge de chocolate.',
    nutritionalInfo: 'Porción: 100g\nEnergía: 340 kcal\nProteínas: 5g\nCarbohidratos: 42g\nGrasas: 16g',
    category: 'postres',
    inStock: true,
    badge: 'NUEVO',
    badgeType: 'new',
     variantType: 'flavor',
    variantLabel: 'Crema',
    variants: [
      { 
        id: 'tradicional', 
        label: 'Tradicional', 
        price: 8.90 
      },
      { 
        id: 'limon', 
        label: 'Limón', 
        price: 8.90 
      },
      { 
        id: 'maracuya', 
        label: 'Maracuyá', 
        price: 8.90 
      }
    ]
  },
  {
    id: generateId(),
    slug: 'chocogalletas',
    name: 'Chocogalletas',
    price: 7.90,
     image: '../images/postres/chocogalletas-tradicional.jpg',
    images: [
      '../images/postres/chocogalletas-tradicional.jpg',
      '../images/postres/chocogalletas-maicena.jpg',
    ],
    rating: 5,
    reviewsCount: 267,
    description: 'Galletas crujientes con chips de chocolate belga. Perfectas con un café.',
    ingredients: 'Harina de trigo, chips de chocolate, mantequilla, azúcar morena, huevos.',
    nutritionalInfo: 'Porción: 100g\nEnergía: 480 kcal\nProteínas: 6g\nCarbohidratos: 58g\nGrasas: 24g',
    category: 'postres',
    inStock: true,
    variantType: 'flavor',
    variantLabel: 'Crema',
    variants: [
      { 
        id: 'tradicional', 
        label: 'Tradicional', 
        price: 7.90 
      },
      { 
        id: 'maicena', 
        label: 'Maicena', 
        price: 7.90 
      }
    ]
  },

  // ========== POSTRES FAMILIARES ==========
  {
    id: generateId(),
    slug: 'cheesecake-familiar',
    name: 'Cheesecake de Alfajor Familiar',
    price: 45.90,
    originalPrice: 52.90,
    image: '../images/postres/cheesecake-familiar.jpg',
    images: [
      '../images/postres/cheesecake-familiar.jpg',
    ],
    rating: 5,
    reviewsCount: 267,
    description: 'Cheesecake de Nueva York con base de galleta. Perfecto para 8 personas.',
    ingredients: 'Queso crema, galleta graham, mantequilla, azúcar, vainilla.',
    nutritionalInfo: 'Por porción\nEnergía: 420 kcal\nProteínas: 8g\nCarbohidratos: 38g\nGrasas: 26g',
    category: 'postres',
    inStock: true,
    badge: '15% OFF',
    badgeType: 'sale',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 45.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'milhojas-familiar',
    name: 'Milhojas Familiar',
    price: 24.90,
   image: '../images/postres/milhojas-chico.jpg',
    images: [
      '../images/postres/milhojas-chico.jpg',
      '../images/postres/milhojas-grande.jpg',
    ],
    rating: 5,
    reviewsCount: 198,
    description: 'Milhojas grande con capas de hojaldre, manjar y crema chantilly.',
    ingredients: 'Hojaldre, manjar blanco, crema chantilly, azúcar glas.',
    category: 'postres',
    inStock: true,
    variantType: 'flavor',
    variantLabel: 'Tamaño',
    variants: [
      { 
        id: 'chico', 
        label: 'Chico (4-5 porciones)', 
        price: 24.90 
      },
      { 
        id: 'grande', 
        label: 'Grande (10-12 porciones)', 
        price: 52.90 
      }
    ]
  },
  {
    id: generateId(),
    slug: 'pionono-chocolate-grande',
    name: 'Pionono de Chocolate Grande',
    price: 23.90,
    image: '../images/postres/pionono-chocolate-chico.jpg',
    images: [
      '../images/postres/pionono-chocolate-chico.jpg',
      '../images/postres/pionono-chocolate-grande.jpg',
    ],
    rating: 5,
    reviewsCount: 176,
    description: 'Pionono grande relleno de manjar y cubierto con chocolate.',
    ingredients: 'Bizcocho, manjar blanco, chocolate, crema.',
    category: 'postres',
    inStock: true,
    variantType: 'flavor',
    variantLabel: 'Tamaño',
    variants: [
      { 
        id: 'chico', 
        label: 'Chico', 
        price: 23.90 
      },
      { 
        id: 'grande', 
        label: 'Grande', 
        price: 46.90 
      }
    ]
  },
  {
    id: generateId(),
    slug: 'pionono-vainilla-grande',
    name: 'Pionono de Vainilla Grande',
    price: 22.90,
    image: '../images/postres/pionono-vainilla-chico.jpg',
    images: [
      '../images/postres/pionono-vainilla-chico.jpg',
      '../images/postres/pionono-vainilla-grande.jpg',
    ],
    rating: 5,
    reviewsCount: 176,
    description: 'Pionono grande relleno de manjar y cubierto con chocolate.',
    ingredients: 'Bizcocho, manjar blanco, chocolate, crema.',
    category: 'postres',
    inStock: true,
    variantType: 'flavor',
    variantLabel: 'Tamaño',
    variants: [
      { 
        id: 'chico', 
        label: 'Chico', 
        price: 22.90 
      },
      { 
        id: 'grande', 
        label: 'Grande', 
        price: 45.90 
      }
    ]
  },
  {
    id: generateId(),
    slug: 'pye-limon-grande',
    name: 'Pye de Limón Grande',
    price: 30.90,
    image: '../images/postres/pye-limon-chico.jpg',
    images: [
      '../images/postres/pye-limon-chico.jpg',
      '../images/postres/pye-limon-grande.jpg',
    ],
    rating: 5,
    reviewsCount: 234,
    description: 'Pye de limón grande con merengue italiano.',
    ingredients: 'Limón, galleta, mantequilla, huevos, azúcar, merengue.',
    category: 'postres',
    inStock: true,
     variantType: 'flavor',
    variantLabel: 'Tamaño',
    variants: [
      { 
        id: 'chico', 
        label: 'Chico (4-6 porciones)', 
        price: 30.90 
      },
      { 
        id: 'grande', 
        label: 'Grande (8-10 porciones)', 
        price: 56.90 
      }
    ]
  },
   {
    id: generateId(),
    slug: 'pye-manzana-grande',
    name: 'Pye de Manzana Grande',
    price: 30.90,
    image: '../images/postres/pye-manzana-chico.jpg',
    images: [
      '../images/postres/pye-manzana-chico.jpg',
      '../images/postres/pye-manzana-grande.jpg',
    ],
    rating: 5,
    reviewsCount: 189,
    description: 'Pye de manzana grande con canela y azúcar.',
    ingredients: 'Manzanas, canela, azúcar, mantequilla, masa.',
    category: 'postres',
    inStock: true,
    variantType: 'flavor',
    variantLabel: 'Tamaño',
    variants: [
      { 
        id: 'chico', 
        label: 'Chico (4-6 porciones)', 
        price: 30.90 
      },
      { 
        id: 'grande', 
        label: 'Grande (8-10 porciones)', 
        price: 56.90 
      }
    ]
  },
  {
    id: generateId(),
    slug: 'queque-familiar',
    name: 'Queque Familiar',
    price: 32.90,
    image: '../images/postres/queque-zanahoria-familiar.jpg',
    images: [
      '../images/postres/queque-zanahoria-familiar.jpg', 
    ],
    rating: 5,
    reviewsCount: 167,
    description: 'Queque de zanahoria familiar con frosting de queso crema.',
    ingredients: 'Zanahoria, harina, nueces, queso crema, especias.',
    category: 'postres',
    inStock: true,
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 32.90  }, 
    ]
  }, 
  {
    id: generateId(),
    slug: 'chifon-naranja',
    name: 'Chifón de Naranja Familiar',
    price: 14.90,
    image: '../images/postres/chifon-naranja-chico.jpg',
    images: [
      '../images/postres/chifon-naranja-chico.jpg', 
      '../images/postres/chifon-naranja-grande.jpg', 
    ],
    rating: 5,
    reviewsCount: 203,
    description: 'Esponjoso chifón de naranja con glaseado de naranja natural. Rinde para 10 porciones. Ligero y delicioso.',
    ingredients: 'Harina, naranjas frescas, aceite vegetal, huevos, azúcar, ralladura de naranja.',
    nutritionalInfo: 'Por porción\nEnergía: 280 kcal\nProteínas: 5g\nCarbohidratos: 42g\nGrasas: 10g',
    category: 'postres',
    inStock: true,
    badge: 'NUEVO',
    badgeType: 'new',
     variantType: 'flavor',
    variantLabel: 'Tamaño',
    variants: [
      { 
        id: 'chico', 
        label: 'Chico (5 porciones)', 
        price: 14.90 
      },
      { 
        id: 'grande', 
        label: 'Grande (8-10 porciones)', 
        price: 24.90 
      }
    ]
  },

  // ========== BOCADITOS PARA EVENTOS ==========
  // ========== BOCADITOS PARA EVENTOS ==========
  // ========== BOCADITOS PARA EVENTOS ==========
  // ========== BOCADITOS PARA EVENTOS ==========
  // ========== BOCADITOS PARA EVENTOS ==========
  // ========== BOCADITOS PARA EVENTOS ==========
  // ========== BOCADITOS PARA EVENTOS ==========
  {
    id: generateId(),
    slug: 'alfajores-coctel',
    name: 'Alfajores Cóctel (x25 unidades)',
    price: 32.90,
     image: '../images/postres/alfajor-coctel-castana-x25.jpg',
    images: [
      '../images/postres/alfajor-coctel-castana-x25.jpg', 
      '../images/postres/alfajor-coctel-lucuma-x25.jpg', 
      '../images/postres/alfajor-coctel-maicena-x25.jpg', 
      '../images/postres/alfajor-coctel-manzana-x25.jpg', 
      '../images/postres/alfajor-coctel-miel-x25.jpg', 
    ],
    rating: 5,
    reviewsCount: 145,
    description: 'Mini alfajores perfectos para eventos y reuniones. 25 unidades.',
    ingredients: 'Harina, mantequilla, manjar blanco.',
    category: 'postres',
    inStock: true, 
     variantType: 'flavor',
    variantLabel: 'Sabor',
    variants: [
      { 
        id: 'castana', 
        label: 'Castaña', 
        price: 24.90 
      },
      { 
        id: 'lucuma', 
        label: 'Lucuma', 
        price: 52.90 
      },
      { 
        id: 'maicena', 
        label: 'Maicena', 
        price: 52.90 
      },
      { 
        id: 'manzana', 
        label: 'Manzana', 
        price: 52.90 
      },
      { 
        id: 'miel', 
        label: 'Miel', 
        price: 52.90 
      }
    ]
  },
  {
    id: generateId(),
    slug: 'piononitos',
    name: 'Piononitos Cóctel (x10 unidades)',
    price: 22.00,
      image: '../images/postres/piononitos-caja-x10.jpg',
    images: [
      '../images/postres/piononitos-caja-x10.jpg',  
    ],
    rating: 5,
    reviewsCount: 112,
    description: 'Mini piononos rellenos de manjar. 10 unidades.',
    ingredients: 'Bizcocho, manjar blanco, chocolate.',
    category: 'postres',
    inStock: true,
     variants: [
      { id: 'caja-1', label: 'Caja x10', units: 10, price: 22.00  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'pyes-coctel',
    name: 'Pyes Cóctel (x10 unidades)',
    price: 22.00,
       image: '../images/postres/pye-limon-coctel-x10.jpg',
    images: [
      '../images/postres/pye-limon-coctel-x10.jpg',  
      '../images/postres/pye-manzana-coctel-x10.jpg',  
    ],
    rating: 5,
    reviewsCount: 98,
    description: 'Surtido de mini pyes: limón y manzana. 12 unidades.',
    ingredients: 'Variado según sabor.',
    category: 'postres',
    inStock: true,
    variantType: 'flavor',
    variantLabel: 'Sabor',
    variants: [
      { 
        id: 'limon', 
        label: 'Limón', 
        price: 22.00 
      },
      { 
        id: 'manzana', 
        label: 'Manzana', 
        price: 22.00 
      },
      
    ]
  },
  {
    id: generateId(),
    slug: 'bocaditos-combinados',
    name: 'Bocaditos Combinados (x10 unidades)',
    price: 22.00,
    image: '../images/postres/combinado-piononitos-pye-manzana-coctel-x10.jpg',
    images: [
      '../images/postres/combinado-piononitos-pye-manzana-coctel-x10.jpg',  
      '../images/postres/combinado-pye-limon-piononitos-coctel-x10.jpg',  
      '../images/postres/combinado-pye-limon-pye-manzana-coctel-x10.jpg',  
    ],
    rating: 5,
    reviewsCount: 178,
    description: 'Surtido variado: alfajores, piononitos y mini pyes. 30 unidades.',
    ingredients: 'Variado.',
    category: 'postres',
    inStock: true,
    badge: 'SURTIDO',
    badgeType: 'new',
    variantType: 'flavor',
    variantLabel: 'Sabor',
    variants: [
      { 
        id: 'piononitos-manzana', 
        label: 'Piononitos & Manzana', 
        price: 22.00 
      },
      { 
        id: 'limon-piononitos', 
        label: 'Limón & Piononitos', 
        price: 22.00 
      },
       { 
        id: 'manzana-limon', 
        label: 'Manzana & Limón', 
        price: 22.00 
      },
    ]
  },
  // ========== REGALOS - PARA CELEBRAR ==========
  // ========== REGALOS - PARA CELEBRAR ==========
  // ========== REGALOS - PARA CELEBRAR ==========
  // ========== REGALOS - PARA CELEBRAR ==========
  // ========== REGALOS - PARA CELEBRAR ==========
  // ========== REGALOS - PARA CELEBRAR ==========
  {
    id: generateId(),
    slug: 'box-cumpleanos-5-personas',
    name: 'Box Cumpleañero (5 personas)',
    price: 89.90,
    image: '../images/regalos/box-cumpleanero-5.jpg',
    images: [
      '../images/regalos/box-cumpleanero-5.jpg',  
    ],
    rating: 5,
    reviewsCount: 189,
    description: 'Box especial para celebrar cumpleaños con 15 alfajores variados, mini pionono y decoración temática. Perfecto para 5 personas.',
    ingredients: 'Alfajores variados, mini pionono, decoración, tarjeta personalizable.',
    category: 'regalos',
    inStock: true,
    badge: 'MÁS VENDIDO',
    badgeType: 'new',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 89.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'box-cumpleanos-10-personas',
    name: 'Box Cumpleañero (10 personas)',
    price: 177.90, 
    image: '../images/regalos/box-cumpleanero-10.jpg',
    images: [
      '../images/regalos/box-cumpleanero-10.jpg',  
    ],
    rating: 5,
    reviewsCount: 145,
    description: 'Box cumpleañero grande con 30 alfajores gourmet, pionono mediano, globo y velas. Ideal para 10 personas.',
    ingredients: 'Alfajores gourmet, pionono, decoración premium, globo, velas.',
    category: 'regalos',
    inStock: true,
    badge: '10% OFF',
    badgeType: 'sale',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 177.90  }, 
    ]
  },
   {
    id: generateId(),
    slug: 'box-cumpleanos-20-personas',
    name: 'Box Cumpleañero (20 personas)',
    price: 177.90, 
    image: '../images/regalos/box-cumpleanero-20.jpg',
    images: [
      '../images/regalos/box-cumpleanero-20.jpg',  
    ],
    rating: 5,
    reviewsCount: 98,
    description: 'Box cumpleañero XL con 60 alfajores premium variados, pionono grande, torta de alfajor pequeña, decoración especial y globos. Perfecto para celebraciones grandes de 20 personas.',
    ingredients: 'Alfajores premium variados, pionono grande, torta de alfajor, decoración completa, globos, velas.',
    category: 'regalos',
    inStock: true,
    badge: 'GRANDE',
    badgeType: 'new',
     variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 177.90  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'caja-regalo-x15',
    name: 'Caja de Regalo x15',
    price: 22.90,
     image: '../images/regalos/caja-regalo-x15.jpg',
    images: [
      '../images/regalos/caja-regalo-x15.jpg',  
    ],
    rating: 5,
    reviewsCount: 234,
    description: 'Caja elegante con 15 alfajores selectos en sabores premium. Empaque de regalo incluido.',
    ingredients: 'Alfajores premium variados, empaque elegante, moño.',
    category: 'regalos',
    inStock: true,
     variants: [
      { id: 'caja-1', label: 'Caja x15', units: 1, price: 22.90  }, 
    ]
  }, 
  //   HORA DE LA AMISTAD
  //   HORA DE LA AMISTAD
  //   HORA DE LA AMISTAD
  {
    id: generateId(),
    slug: 'hora-amistad',
    name: 'Hora de la Amistad',
    price: 20.90,
    image: '../images/regalos/hora-de-la-amistad-para-1.jpg',
    images: [
      '../images/regalos/hora-de-la-amistad-para-1.jpg',  
      '../images/regalos/hora-de-la-amistad-para-2.jpg',  
    ],
    rating: 5,
    reviewsCount: 187,
    description: 'Box especial para compartir con amigos. Incluye 20 alfajores variados, 10 chocogalletas, pack de bebidas (jugos o café) y tarjeta de amistad personalizable. Ideal para reuniones casuales.',
    ingredients: 'Alfajores variados, chocogalletas, bebidas, tarjeta personalizable.',
    category: 'regalos',
    inStock: true,
    badge: 'NUEVO',
    badgeType: 'new',
     variants: [
      { id: 'caja-1', label: 'Para 1', units: 1, price: 20.90  }, 
      { id: 'caja-2', label: 'Para 2', units: 1, price: 29.90  }, 
    ]
  },
  //   TORTA DE ALFAJOR
  //   TORTA DE ALFAJOR
  //   TORTA DE ALFAJOR
  {
    id: generateId(),
    slug: 'torta-de-alfajor',
    name: 'Torta de Alfajor',
    price: 12.90,
    image: '../images/regalos/torta-alfajor-chocolucuma-personal.jpg',
    images: [
      '../images/regalos/torta-alfajor-chocolucuma-personal.jpg',  
      '../images/regalos/torta-alfajor-maicena-personal.jpg',  
    ],
    rating: 5,
    reviewsCount: 178,
    description: 'Impresionante torta hecha con capas de alfajores y manjar. Rinde para 12-15 personas. Pedido con 48h de anticipación.',
    ingredients: 'Alfajores apilados, manjar blanco, crema chantilly, decoración personalizable.',
    nutritionalInfo: 'Por porción\nEnergía: 380 kcal\nProteínas: 6g\nCarbohidratos: 48g\nGrasas: 18g',
    category: 'regalos',
    inStock: true, 
    variantType: 'flavor',
    variantLabel: 'Sabor',
    variants: [
      { 
        id: 'torta-alfajor-chocolucuma-personal', 
        label: 'Chocolúcuma', 
        price: 12.90 
      },
      { 
        id: 'torta-alfajor-maicena-personal', 
        label: 'Maicena', 
        price: 12.90 
      }, 
    ]
  },

  // ========== REGALOS - CAJAS ESPECIALES ==========
  {
    id: generateId(),
    slug: 'caja-del-mes',
    name: 'Caja del Mes',
    price: 49.90,
    image: 'https://images.unsplash.com/photo-1513104487127-95ae60ce7c70?w=800',
    images: [
      'https://images.unsplash.com/photo-1513104487127-95ae60ce7c70?w=800',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'
    ],
    rating: 5,
    reviewsCount: 567,
    description: 'Recibe cada mes una caja sorpresa con 18 alfajores exclusivos y sabores de temporada. Suscripción renovable mensualmente.',
    ingredients: 'Varía cada mes - alfajores exclusivos, sorpresas, receta del mes.',
    category: 'regalos',
    inStock: true,
    badge: 'SUSCRIPCIÓN',
    badgeType: 'new',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 49.90  },  
    ]
  },
  {
    id: generateId(),
    slug: 'edicion-halloween',
    name: 'Edición Halloween',
    price: 20.90,
    image: 'https://images.unsplash.com/photo-1603320284194-db4276c54f0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1603320284194-db4276c54f0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    rating: 5,
    reviewsCount: 234,
    description: 'Caja temática de Halloween con alfajores decorados, trufas de chocolate bitter y sorpresas espeluznantes. ¡Edición limitada!',
    ingredients: 'Alfajores temáticos Halloween, trufas bitter, decoración especial.',
    category: 'regalos',
    inStock: true,
    badge: '🎃 EDICIÓN LIMITADA',
    badgeType: 'new',
      variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 20.90  },  
    ]
  },
  {
    id: generateId(),
    slug: 'edicion-navidad',
    name: 'Edición Navidad',
    price: 20.90,
    image: 'https://images.unsplash.com/photo-1640998011471-5d79071a2ae3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1640998011471-5d79071a2ae3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    rating: 5,
    reviewsCount: 412,
    description: 'Caja navideña premium con alfajores decorados, pionono especial y sorpresas festivas. Disponible desde noviembre.',
    ingredients: 'Alfajores navideños, pionono especial, decoración festiva.',
    category: 'regalos',
    inStock: false,
    badge: '🎄 PRÓXIMAMENTE',
    badgeType: 'soldout',
      variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 20.90  },  
    ]
  },
  {
    id: generateId(),
    slug: 'causas-especiales',
    name: 'Causas Especiales',
    price: 20.90,
    image: 'https://images.unsplash.com/photo-1707665013852-8edf9d38ad8a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1707665013852-8edf9d38ad8a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    rating: 5,
    reviewsCount: 198,
    description: 'Caja solidaria donde el 20% de las ventas se dona a una causa benéfica. Incluye 20 alfajores variados y certificado de donación.',
    ingredients: 'Alfajores variados premium, certificado de donación.',
    category: 'regalos',
    inStock: true,
    badge: '💝 SOLIDARIO',
    badgeType: 'new',
        variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 20.90  },  
    ]
  },

  // ========== REGALOS - PERSONALIZACIÓN ==========
  // ========== REGALOS - PERSONALIZACIÓN ==========
  // ========== REGALOS - PERSONALIZACIÓN ==========
  // ========== REGALOS - PERSONALIZACIÓN ==========
  // ========== REGALOS - PERSONALIZACIÓN ==========
   
  {
    id: generateId(),
    slug: 'eventos-corporativos',
    name: 'Eventos Corporativos',
    price: 280.00,
    image: 'https://images.unsplash.com/photo-1731304442821-b6aba7fef257?q=80&w=815&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1731304442821-b6aba7fef257?q=80&w=815&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    ],
    rating: 5,
    reviewsCount: 89,
    description: 'Pack corporativo para eventos empresariales. Incluye 100 alfajores personalizados con logo, empaque premium y servicio de entrega.',
    ingredients: 'Alfajores variados, branding corporativo, empaque premium.',
    category: 'regalos',
    inStock: true,
    badge: 'CORPORATIVO',
    badgeType: 'new',
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 280.00  },  
    ]
  },
  {
    id: generateId(),
    slug: 'bodas',
    name: 'Bodas',
    price: 420.00,
    image: 'https://images.unsplash.com/photo-1557803056-4acbacad87d2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1557803056-4acbacad87d2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    rating: 5,
    reviewsCount: 134,
    description: 'Pack especial para bodas con 150 alfajores elegantes personalizados. Incluye mesa dulce completa y coordinación del evento.',
    ingredients: 'Alfajores premium variados, decoración de boda, etiquetas personalizadas.',
    category: 'regalos',
    inStock: true,
    badge: '💍 BODAS',
    badgeType: 'new',
       variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 420.00  },  
    ]
  }, 
  // ========== TIENDA - SALADOS ==========
  // ========== TIENDA - SALADOS ==========
  // ========== TIENDA - SALADOS ==========
  // ========== TIENDA - SALADOS ==========
  // ========== TIENDA - SALADOS ==========
  {
    id: generateId(),
    slug: 'croissants',
    name: 'Croissants',
    price: 15.90,
    image: '../images/tienda/croissant-huevo-tocino.jpg',
    images: [
      '../images/tienda/croissant-huevo-tocino.jpg',
      '../images/tienda/croissant-jamon-queso.jpg',
      '../images/tienda/croissant-pollo.jpg', 
    ],
    rating: 5,
    reviewsCount: 234,
    description: 'Croissant de mantequilla recién horneado, relleno de jamón inglés y queso suizo. Perfecto para desayuno o merienda.',
    ingredients: 'Harina de trigo, mantequilla, jamón inglés, queso suizo, huevo.',
    nutritionalInfo: 'Porción: 120g\nEnergía: 310 kcal\nProteínas: 12g\nCarbohidratos: 28g\nGrasas: 16g',
    category: 'tienda',
    inStock: true, 
    variantType: 'flavor',
    variantLabel: 'Tipo',
    variants: [
      { 
        id: 'croissant-huevo-con-tocino', 
        label: 'Huevo con Tocino', 
        price: 15.90 
      },
      { 
        id: 'croissant-jamon-queso', 
        label: 'Jamón y Queso', 
        price: 15.90 
      },
      { 
        id: 'croissant-pollo', 
        label: 'De Pollo', 
        price: 15.90 
      }, 
    ]
  }, 
  {
    id: generateId(),
    slug: 'empanadas',
    name: 'Empanadas',
    price: 9.90,
     image: '../images/tienda/empanada-carne.jpg',
    images: [
      '../images/tienda/empanada-carne.jpg',
      '../images/tienda/empanada-pollo.jpg',
      '../images/tienda/empanaditas-de-carne-caja-x10.jpg',
      '../images/tienda/empanaditas-de-pollo-caja-x10.jpg',
      '../images/tienda/empanaditas-mixta-caja-x10.jpg',
    ],
    rating: 4,
    reviewsCount: 176,
    description: 'Empanada al horno con relleno de pollo deshilachado, cebolla y especias peruanas.',
    ingredients: 'Masa de empanada, pollo, cebolla, ají amarillo, especias.',
    category: 'tienda',
    inStock: true,
    variantType: 'flavor',
    variantLabel: 'Sabor',
    variants: [
      { 
        id: 'empanada-carne', 
        label: 'De Carne', 
        price: 9.90
      },
      { 
        id: 'empanada-pollo', 
        label: 'De Pollo', 
        price: 9.90
      },  
       { 
        id: 'empanada-carne-x10', 
        label: 'De Carne (x10)', 
        price: 20.90
      }, 
       { 
        id: 'empanada-pollo-x10', 
        label: 'De Pollo (x10)', 
        price: 20.90
      },
      { 
        id: 'empanada-mixto-x10', 
        label: 'Mixto (x10)', 
        price: 20.90
      }, 
    ]
  },
  {
    id: generateId(),
    slug: 'wrap',
    name: 'Wraps',
    price: 17.90,
    image: '../images/tienda/wrap-pollo.jpg',
    images: [
      '../images/tienda/wrap-pollo.jpg',
      '../images/tienda/wrap-asado.jpg',
    ],
    rating: 5,
    reviewsCount: 145,
    description: 'Wrap fresco con pollo grillado, lechuga, tomate, palta y salsa especial de la casa.',
    ingredients: 'Tortilla de trigo, pollo, lechuga, tomate, palta, queso, salsa especial.',
    nutritionalInfo: 'Porción: 280g\nEnergía: 420 kcal\nProteínas: 25g\nCarbohidratos: 38g\nGrasas: 18g',
    category: 'tienda',
    inStock: true,
    badge: 'SALUDABLE',
    badgeType: 'new',
    variantType: 'flavor',
    variantLabel: 'Sabor',
    variants: [
      { 
        id: 'wrap-pollo', 
        label: 'De Pollo', 
        price: 17.90
      },
      { 
        id: 'wrap-asado', 
        label: 'De Asado', 
        price: 19.90
      }, 
    ]
  },
  {
    id: generateId(),
    slug: 'sandwiches',
    name: 'Sándwiches',
    price: 12.90,
    image: '../images/tienda/sandwich-triple-clasico-palta-tomate-y-huevo.jpg',
    images: [
      '../images/tienda/sandwich-triple-clasico-palta-tomate-y-huevo.jpg', 
      '../images/tienda/sandwich-pollo-con-palta.jpg', 
      '../images/tienda/sandwich-jamon-del-pais.jpg', 
      '../images/tienda/sandwich-asado.jpg', 
      '../images/tienda/sandwich-aceituna-con-huevo.jpg', 
      '../images/tienda/sandwich-palta-tomate-y-pollo.jpg', 
      '../images/tienda/sandwich-pollo.jpg', 
      '../images/tienda/sandwich-pollo-con-durazno.jpg', 
    ],
    rating: 5,
    reviewsCount: 198,
    description: 'Sándwich triple con pavo, jamón, queso, lechuga, tomate y nuestra mayonesa casera en pan ciabatta.',
    ingredients: 'Pan ciabatta, pavo, jamón, queso cheddar, lechuga, tomate, mayonesa casera.',
    category: 'tienda',
    inStock: true,
     variantLabel: 'Sabor',
    variants: [
      { 
        id: 'sandwich-triple-clasico-palta-tomate-y-huevo', 
        label: 'Triple clásico con palta, tomate y huevo', 
        price: 12.90
      },
      { 
        id: 'sandwich-pollo-con-palta', 
        label: 'De pollo con palta', 
        price: 12.90
      }, 
       { 
        id: 'sandwich-jamon-del-pais', 
        label: 'De jamón del país', 
        price: 13.90
      }, 
       { 
        id: 'sandwich-asado', 
        label: 'De asado', 
        price: 13.90
      }, 
       { 
        id: 'sandwich-aceituna-con-huevo', 
        label: 'De aceituna con huevo', 
        price: 12.90
      }, 
       { 
        id: 'sandwich-palta-tomate-y-pollo', 
        label: 'De palta, tomate y pollo', 
        price: 12.90
      }, 
       { 
        id: 'sandwich-pollo', 
        label: 'De pollo', 
        price: 12.90
      }, 
       { 
        id: 'sandwich-pollo-con-durazno', 
        label: 'De pollo con durazno', 
        price: 12.90
      }, 
    ]
  },

  // ========== TIENDA - BEBIDAS ==========
  // ========== TIENDA - BEBIDAS ==========
  // ========== TIENDA - BEBIDAS ==========
  // ========== TIENDA - BEBIDAS ==========
  // ========== TIENDA - BEBIDAS ==========
  {
    id: generateId(),
    slug: 'cafe',
    name: 'Café',
    price: 5.50,
    image: '../images/tienda/cafe-americano.jpg',
    images: [
      '../images/tienda/cafe-americano.jpg',
      '../images/tienda/cafe-capuchino.jpg',
      '../images/tienda/cafe-con-leche.jpg',
      '../images/tienda/cafe-espresso.jpg'
    ],
    rating: 5,
    reviewsCount: 312,
    description: 'Café americano preparado con granos seleccionados de la selva peruana. Disponible caliente o frío.',
    ingredients: 'Café 100% peruano, agua filtrada.',
    category: 'tienda',
    inStock: true, 
    variantType: 'flavor',
    variantLabel: 'Tipo',
    variants: [
      { 
        id: 'americano', 
        label: 'Americano', 
        price: 7.90 
      },
      { 
        id: 'capuchino', 
        label: 'Capuchino', 
        price: 8.90 
      },
      { 
        id: 'leche', 
        label: 'Con Leche', 
        price: 8.90 
      },
       { 
        id: 'espresso', 
        label: 'Espresso', 
        price: 6.90 
      }
    ]
  },
  {
    id: generateId(),
    slug: 'cappuccino',
    name: 'Cappuccino',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800',
    images: [
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800'
    ],
    rating: 5,
    reviewsCount: 267,
    description: 'Cappuccino cremoso con espresso doble y espuma de leche perfecta. Disponible con arte latte.',
    ingredients: 'Espresso, leche vaporizada, espuma de leche.',
    category: 'tienda',
    inStock: true,
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 7.50  },  
    ]
  },
  {
    id: generateId(),
    slug: 'chocolate-caliente',
    name: 'Chocolate Caliente',
    price: 8.90,
   image: '../images/tienda/chocolate-caliente.jpg',
    images: [
      '../images/tienda/chocolate-caliente.jpg', 
    ],
    rating: 5,
    reviewsCount: 234,
    description: 'Chocolate caliente cremoso hecho con chocolate belga de 70% cacao y leche entera.',
    ingredients: 'Chocolate belga 70%, leche entera, azúcar, crema batida.',
    category: 'tienda',
    inStock: true,
      variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 8.90  }, 
    ]
  },
  {
    id: '82',
    slug: 'jugos-naturales',
    name: 'Jugos Naturales',
    price: 8.90,
   image: '../images/tienda/jugo-de-frutas.jpg',
    images: [
      '../images/tienda/jugo-de-frutas.jpg',
    ],
    rating: 5,
    reviewsCount: 189,
    description: 'Jugos naturales recién preparados. Sabores: naranja, papaya, piña, fresa, maracuyá.',
    ingredients: 'Frutas frescas, agua filtrada, azúcar (opcional).',
    category: 'tienda',
    inStock: true,
    badge: '100% NATURAL',
    badgeType: 'new',
    variantType: 'flavor',
    variantLabel: 'Sabor',
    variants: [
      { 
        id: 'papaya', 
        label: 'Papaya', 
        price: 8.90 
      },
      { 
        id: 'piña', 
        label: 'Piña', 
        price: 8.90 
      },
      { 
        id: 'surtido', 
        label: 'Surtido', 
        price: 8.90 
      },
    ]
  },
  {
    id: generateId(),
    slug: 'limonada-frozen',
    name: 'Limonada Frozen',
    price: 10.90,
    image: '../images/tienda/limonada-frozen.jpg',
    images: [
      '../images/tienda/limonada-frozen.jpg',
    ],
    rating: 5,
    reviewsCount: 276,
    description: 'Limonada frozen refrescante hecha con limones peruanos y hielo frappé. Disponible con o sin azúcar.',
    ingredients: 'Limón peruano, hielo, azúcar, hojas de hierbabuena.',
    category: 'tienda',
    inStock: true,
    badge: 'REFRESCANTE',
    badgeType: 'new',
    variants: [
      { id: 'caja-12oz', label: '12oz', units: 1, price: 10.90 },
      { id: 'caja-16oz', label: '16oz', units: 1, price: 13.90 }, 
    ]
  },
  {
    id: generateId(),
    slug: 'chicha-morada',
    name: 'Chicha Morada',
    price: 6.90,
     image: '../images/tienda/chicha-morada.jpg',
    images: [
      '../images/tienda/chicha-morada.jpg',
    ],
    rating: 5,
    reviewsCount: 342,
    description: 'Tradicional chicha morada peruana preparada con maíz morado, piña, manzana y especias. Refrescante y natural.',
    ingredients: 'Maíz morado, piña, manzana, canela, clavo de olor, azúcar, limón.',
    nutritionalInfo: 'Porción: 250ml\nEnergía: 120 kcal\nProteínas: 1g\nCarbohidratos: 28g\nGrasas: 0g',
    category: 'tienda',
    inStock: true,
    badge: 'TRADICIONAL',
    badgeType: 'new',
    variantType: 'size',
    variantLabel: 'Tamaño',
    variants: [
      { 
        id: 'tradicional', 
        label: 'Tradicional', 
        price: 6.90 
      },
      { 
        id: 'grande', 
        label: 'Grande', 
        price: 11.90 
      }, 
    ]
  },
  {
    id: generateId(),
    slug: 'milkshake',
    name: 'Milkshake',
    price: 13.90,
    image: '../images/tienda/milkshake.jpg',
    images: [
      '../images/tienda/milkshake.jpg',
    ],
    rating: 5,
    reviewsCount: 289,
    description: 'Cremoso milkshake preparado con helado artesanal y leche. Disponible en varios sabores.',
    ingredients: 'Helado artesanal, leche entera, crema batida, jarabe de sabor.',
    nutritionalInfo: 'Porción: 400ml\nEnergía: 380 kcal\nProteínas: 8g\nCarbohidratos: 52g\nGrasas: 16g',
    category: 'tienda',
    inStock: true,
    badge: 'CREMOSO',
    badgeType: 'new',
    variantType: 'size',
    variantLabel: 'Tamaño',
    variants: [
      { id: 'caja-12oz', label: '12oz', units: 1, price: 13.90 },
      { id: 'caja-16oz', label: '16oz', units: 1, price: 15.90 }, 
    ]
  },
  {
    id: generateId(),
    slug: 'gaseosas',
    name: 'Gaseosas',
    price: 4.90,
    image: '../images/tienda/inca-kola.jpg',
    images: [
      '../images/tienda/inca-kola.jpg',
      '../images/tienda/inca-kola-zero.jpg',
      '../images/tienda/coca-cola.jpg',
      '../images/tienda/coca-cola-zero.jpg',
      '../images/tienda/fanta.jpg',
      '../images/tienda/agua-mineral-san-mateo.jpg',
    ],
    rating: 4,
    reviewsCount: 156,
    description: 'Gaseosas nacionales e importadas. Variedad de marcas y sabores disponibles.',
    ingredients: 'Agua carbonatada, azúcar, saborizantes.',
    category: 'tienda',
    inStock: true,
    variantType: 'type',
    variantLabel: 'Tipo',
    variants: [
      { id: 'inca-kola', label: 'Inca Kola', price: 4.90 },
      { id: 'inca-kola-zero', label: 'Inca Kola Zero', price: 4.90 },
      { id: 'coca-cola', label: 'Coca-Cola', price: 4.90 },
      { id: 'coca-cola-zero', label: 'Coca-Cola Zero', price: 4.90 },
      { id: 'fanta', label: 'Fanta', price: 4.90 },
      { id: 'agua-mineral', label: 'Agua Mineral', price: 4.90 }
    ]
  },

  // ========== TIENDA - OTROS ==========
  // ========== TIENDA - HELADOS (PALETAS) ==========
  // ========== TIENDA - HELADOS (PALETAS) ==========
  // ========== TIENDA - HELADOS (PALETAS) ==========
  // ========== TIENDA - HELADOS (PALETAS) ==========
  // ========== TIENDA - HELADOS (PALETAS) ==========
  {
    id: generateId(),
    slug: 'cookies-and-cream-paleta',
    name: 'Helado de Galletas y Crema',
    price: 11.90,
    image: '../images/tienda/cookies-and-cream-paleta.jpg',
    images: [
      '../images/tienda/cookies-and-cream-paleta.jpg', 
    ],
    rating: 5,
    reviewsCount: 234,
    description: 'Paleta de helado artesanal de chocolate belga. Cremosa y deliciosa.',
    ingredients: 'Leche, crema, chocolate belga 70%, azúcar.',
    nutritionalInfo: 'Porción: 80g\nEnergía: 180 kcal\nProteínas: 3g\nCarbohidratos: 22g\nGrasas: 9g',
    category: 'tienda',
    subcategory: 'helados',
    heladoType: 'paleta',
    heladoFlavor: 'chocolate',
    inStock: true, 
    variantType: 'type',
    variantLabel: 'Tipo',
    variants: [
      { id: 'cookies-and-cream', label: 'Paleta', price: 11.90 }, 
    ]
  },
  {
    id: generateId(),
    slug: 'mango-coco-paleta',
    name: 'Helado de Mango y Coco',
    price: 11.90,
    image: '../images/tienda/mango-coco-paleta.jpg',
    images: [
      '../images/tienda/mango-coco-paleta.jpg', 
    ],
    rating: 5,
    reviewsCount: 234,
    description: 'Paleta de helado artesanal de chocolate belga. Cremosa y deliciosa.',
    ingredients: 'Leche, crema, chocolate belga 70%, azúcar.',
    nutritionalInfo: 'Porción: 80g\nEnergía: 180 kcal\nProteínas: 3g\nCarbohidratos: 22g\nGrasas: 9g',
    category: 'tienda',
    subcategory: 'helados',
    heladoType: 'paleta',
    heladoFlavor: 'mango',
    inStock: true, 
    variantType: 'type',
    variantLabel: 'Tipo',
    variants: [
      { id: 'mango-coco-paleta', label: 'Paleta', price: 11.90 }, 
    ]
  },
  // ========== TIENDA - HELADOS (ARTESANAL) ==========
  // ========== TIENDA - HELADOS (ARTESANAL) ==========
  // ========== TIENDA - HELADOS (ARTESANAL) ==========
  // ========== TIENDA - HELADOS (ARTESANAL) ==========
  // ========== TIENDA - HELADOS (ARTESANAL) ==========
   {
    id: generateId(),
    slug: 'helado-choco-brownie-artesanal',
    name: 'Helado de Choco Brownie',
    price: 10.90,
    image: '../images/tienda/choco-brownie-118-ml.jpg',
    images: [
      '../images/tienda/choco-brownie-118-ml.jpg', 
      '../images/tienda/choco-brownie-500-ml.jpg', 
      '../images/tienda/choco-brownie-1-litro.jpg', 
    ],
    rating: 5,
    reviewsCount: 267,
    description: 'Galletón de helado de chocolate entre dos galletas crujientes.',
    ingredients: 'Helado de chocolate, galletas de chocolate, chips de chocolate.',
    nutritionalInfo: 'Porción: 120g\nEnergía: 320 kcal\nProteínas: 5g\nCarbohidratos: 42g\nGrasas: 15g',
    category: 'tienda',
    subcategory: 'helados',
    heladoType: 'artesanal',
    heladoFlavor: 'chocolate',
    inStock: true, 
    variantType: 'size',
    variantLabel: 'Tamaño',
    variants: [
      { id: 'choco-brownie-118-ml', label: '118 ml', price: 10.90 }, 
      { id: 'choco-brownie-500-ml', label: '500 ml', price: 30.90 }, 
      { id: 'choco-brownie-1-litro', label: '1 L', price: 50.90 }, 
    ]
  },
  {
    id: generateId(),
    slug: 'helado-lucuma-artesanal',
    name: 'Helado de Lúcuma',
    price: 10.90,
     image: '../images/tienda/lucuma-118-ml.jpg',
    images: [
      '../images/tienda/lucuma-118-ml.jpg', 
      '../images/tienda/lucuma-1-litro.jpg',  
    ],
    rating: 5,
    reviewsCount: 312,
    description: 'Galletón de helado de lúcuma entre galletas de vainilla.',
    ingredients: 'Helado de lúcuma, galletas de vainilla.',
    category: 'tienda',
    subcategory: 'helados',
    heladoType: 'artesanal',
    heladoFlavor: 'lucuma',
    inStock: true,
    badge: 'MÁS VENDIDO',
    badgeType: 'new',
    variantType: 'size',
    variantLabel: 'Tamaño',
    variants: [
      { id: 'lucuma-118-ml', label: '118 ml', price: 10.90 },  
      { id: 'lucuma-1-litro', label: '1 L', price: 50.90 }, 
    ]
  },
   {
    id: generateId(),
    slug: 'helado-vainilla-french-artesanal',
    name: 'Helado de Vainilla French',
    price: 10.90,
     image: '../images/tienda/vainilla-118-ml.jpg',
    images: [
      '../images/tienda/vainilla-118-ml.jpg', 
      '../images/tienda/vainilla-500-ml.jpg', 
      '../images/tienda/vainilla-1-litro.jpg',  
    ],
    rating: 5,
    reviewsCount: 312,
    description: 'Galletón de helado de lúcuma entre galletas de vainilla.',
    ingredients: 'Helado de lúcuma, galletas de vainilla.',
    category: 'tienda',
    subcategory: 'helados',
    heladoType: 'artesanal',
    heladoFlavor: 'vainilla',
    inStock: true, 
    variantType: 'size',
    variantLabel: 'Tamaño',
    variants: [
      { id: 'vainilla-french-118-ml', label: '118 ml', price: 10.90 }, 
      { id: 'vainilla-french-500-ml', label: '500 ml', price: 30.90 }, 
      { id: 'vainilla-french-1-litro', label: '1 L', price: 50.90 }, 
    ]
  },
   {
    id: generateId(),
    slug: 'helado-fresa-chocochips-artesanal',
    name: 'Helado de Fresa con Chocochips',
    price: 10.90,
    image: '../images/tienda/fresa-chocochips-118-ml.jpg',
    images: [
      '../images/tienda/fresa-chocochips-118-ml.jpg', 
      '../images/tienda/fresa-chocochips-500-ml.jpg', 
      '../images/tienda/fresa-chocochips-1-litro.jpg',  
    ],
    rating: 5,
    reviewsCount: 312,
    description: 'Galletón de helado de lúcuma entre galletas de vainilla.',
    ingredients: 'Helado de lúcuma, galletas de vainilla.',
    category: 'tienda',
    subcategory: 'helados',
    heladoType: 'artesanal',
    heladoFlavor: 'fresa',
    inStock: true, 
    variantType: 'size',
    variantLabel: 'Tamaño',
    variants: [
      { id: 'fresa-chocochips-118-ml', label: '118 ml', price: 10.90 }, 
      { id: 'fresa-chocochips-500-ml', label: '500 ml', price: 30.90 }, 
      { id: 'fresa-chocochips-1-litro', label: '1 L', price: 50.90 }, 
    ]
  }, 
  
  // ========== TIENDA - HELADOS (GALLETONES) ==========
  // ========== TIENDA - HELADOS (GALLETONES) ==========
  // ========== TIENDA - HELADOS (GALLETONES) ==========
  // ========== TIENDA - HELADOS (GALLETONES) ==========
  // ========== TIENDA - HELADOS (GALLETONES) ==========
 
  
  {
    id: generateId(),
    slug: 'chocobrownie-galleton',
    name: 'Galletón Helado de Chocobrownie',
    price: 15.00,
      image: '../images/tienda/chocobrownie-galleton.jpg',
    images: [
      '../images/tienda/chocobrownie-galleton.jpg',  
    ],
    rating: 5,
    reviewsCount: 198,
    description: 'Galletón de helado de fresa entre galletas de fresa.',
    ingredients: 'Helado de fresa, galletas de fresa.',
    category: 'tienda',
    subcategory: 'helados',
    heladoType: 'galleton',
    heladoFlavor: 'chocolate',
    inStock: true,
    variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 15.00  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'vegano-lucuma-galleton',
    name: 'Galletón Helado Vegano de Lúcuma',
    price: 15.00,
      image: '../images/tienda/vegano-lucuma-galleton.jpg',
    images: [
      '../images/tienda/vegano-lucuma-galleton.jpg',  
    ],
    rating: 5,
    reviewsCount: 176,
    description: 'Galletón clásico de helado de vainilla entre galletas de chocolate.',
    ingredients: 'Helado de vainilla, galletas de chocolate.',
    category: 'tienda',
    subcategory: 'helados',
    heladoType: 'galleton',
    heladoFlavor: 'lucuma',
    inStock: true,
     variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 15.00  }, 
    ]
  }, 
  // ========== TIENDA - KITS DIY (ALFA PACK) ==========
  // ========== TIENDA - KITS DIY (ALFA PACK) ==========
  // ========== TIENDA - KITS DIY (ALFA PACK) ==========
  // ========== TIENDA - KITS DIY (ALFA PACK) ==========
  // ========== TIENDA - KITS DIY (ALFA PACK) ==========
  {
    id: generateId(),
    slug: 'alfa-pack-chocolate',
    name: 'Alfa-Pack Chocolate',
    price: 15.50,
    image: '../images/tienda/alfa-pack-chocolate-x20.jpg',
    images: [
      '../images/tienda/alfa-pack-chocolate-x20.jpg',  
    ],
    rating: 5,
    reviewsCount: 187,
    description: 'Kit básico para hacer 20 alfajores en casa. Incluye ingredientes pre-medidos, moldes desechables y receta paso a paso ilustrada.',
    ingredients: 'Harina pre-mezclada, manjar blanco (250g), moldes desechables (x12), receta ilustrada.',
    category: 'tienda',
    subcategory: 'kits',
    kitType: 'alfa-pack',
    inStock: true,
    badge: 'BÁSICO',
    badgeType: 'new',
     variants: [
      { id: 'caja-20', label: 'Caja x20', units: 1, price: 15.50  }, 
    ]
  },
  {
    id: generateId(),
    slug: 'alfa-pack-maicena',
    name: 'Alfa-Pack Maicena',
    price: 45.90,
     image: '../images/tienda/alfa-pack-maicena-x18.jpg',
    images: [
      '../images/tienda/alfa-pack-maicena-x18.jpg',  
      '../images/tienda/alfa-pack-maicena-x36.jpg',  
    ],
    rating: 5,
    reviewsCount: 234,
    description: 'Kit premium para hacer 24 alfajores artesanales. Incluye ingredientes gourmet, moldes reutilizables de silicona, receta en video QR y tips profesionales.',
    ingredients: 'Harina premium, manjar artesanal (500g), moldes de silicona (x24), coco rallado, chocolate para bañar, receta digital con video.',
    category: 'tienda',
    subcategory: 'kits',
    kitType: 'alfa-pack',
    inStock: true,
    badge: 'PREMIUM',
    badgeType: 'new',
    variants: [
      { id: 'caja-18', label: 'Caja x18', units: 1, price: 15.50  }, 
      { id: 'caja-36', label: 'Caja x36', units: 1, price: 22.50  }, 
    ]
  },
   
  // ========== TIENDA - KITS DIY (DULCE PACK) ==========
  // ========== TIENDA - KITS DIY (DULCE PACK) ==========
  // ========== TIENDA - KITS DIY (DULCE PACK) ==========
  // ========== TIENDA - KITS DIY (DULCE PACK) ==========
  // ========== TIENDA - KITS DIY (DULCE PACK) ==========
  {
    id: generateId(),
    slug: 'dulce-pack-turron-dona-pepa',
    name: 'Dulce-Pack Turrón de Doña Pepa',
    price: 19.00,
   image: '../images/tienda/dulce-pack-turron-dona-pepa.jpg',
    images: [
      '../images/tienda/dulce-pack-turron-dona-pepa.jpg',  
    ],
    rating: 5,
    reviewsCount: 245,
    description: 'Kit completo para hacer 16 brownies caseros. Incluye chocolate belga premium, nueces y receta del chef.',
    ingredients: 'Chocolate belga, harina, azúcar morena, nueces, mantequilla en polvo, receta profesional.',
    category: 'tienda',
    subcategory: 'kits',
    kitType: 'dulce-pack',
    inStock: true,
    badge: 'NUEVO',
    badgeType: 'new',
     variants: [
      { id: 'caja-1', label: 'Caja x1', units: 1, price: 19.00  },  
    ]
  },
   
  // ========== DESAYUNOS ==========
  // ========== DESAYUNOS ==========
  // ========== DESAYUNOS ==========
  // ========== DESAYUNOS ==========
  // ========== DESAYUNOS ==========
 
  {
    id: generateId(),
    slug: 'combo-desayuno',
    name: 'Combo Desayuno Clásico',
    price: 18.90, 
     image: '../images/tienda/combo-desayuno-empanada.jpg',
    images: [
      '../images/tienda/combo-desayuno-empanada.jpg',  
      '../images/tienda/combo-desayuno-sandwich.jpg',  
      '../images/tienda/combo-sandwich-triple-bebida.jpg',  
    ],
    rating: 5,
    reviewsCount: 298,
    description: 'Combo desayuno completo: croissant de jamón y queso, café americano o jugo natural y 2 alfajores.',
    ingredients: 'Croissant, café/jugo, alfajores tradicionales.',
    category: 'tienda',
    inStock: true, 
     variantType: 'type',
    variantLabel: 'Tipo',
    variants: [
      { 
        id: 'combo-empanada', 
        label: 'Combo Empanada', 
        price: 21.90 
      },
      { 
        id: 'combo-sandwich', 
        label: 'Combo Sandwich', 
        price: 22.90 
      },
      { 
        id: 'combo-sandwich-triple-bebida', 
        label: 'Combo Sandwich Triple + Bebida', 
        price: 14.90 
      }
    ]
  },
  
  // ========== MANJAR BLANCO ==========
  // ========== MANJAR BLANCO ==========
  // ========== MANJAR BLANCO ==========
  // ========== MANJAR BLANCO ==========
  // ========== MANJAR BLANCO ==========
  {
    id: generateId(),
    slug: 'manjar-blanco',
    name: 'Manjar Blanco',
    price: 4.00,
    image: '../images/tienda/manjar-blanco-130gr.jpg',
    images: [
      '../images/tienda/manjar-blanco-130gr.jpg',  
      '../images/tienda/manjar-blanco-400gr.jpg',  
    ],
    rating: 5,
    reviewsCount: 456,
    description: 'Manjar blanco casero en frasco de 500g. Hecho con nuestra receta tradicional. Perfecto para untar o cocinar.',
    ingredients: 'Leche entera, azúcar, esencia de vainilla.',
    nutritionalInfo: 'Porción: 100g\nEnergía: 320 kcal\nProteínas: 5g\nCarbohidratos: 55g\nGrasas: 10g',
    category: 'tienda',
    inStock: true,
    badge: 'MÁS VENDIDO',
    badgeType: 'new',
       variants: [
      { id: 'sobre-130gr', label: '130 gr', units: 1, price: 4.00  },  
      { id: 'sobre-400gr', label: '400 gr', units: 1, price: 10.00  },  
    ]
  }
];

// Obtiene un producto según su slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

// Obtiene todos los productos que pertenezcan a una categoría específica
export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

// Devuelve todos los productos sin filtrar
export function getAllProducts(): Product[] {
  return products
}

// Filtra productos según el tipo de mix (2, 3, 4 o todos)
export function getProductsByMixType(mixType: '2' | '3' | '4' | 'all'): Product[] {
  if (mixType === 'all') {
    // Devuelve solo productos que tengan mixType definido
    return products.filter(p => p.mixType !== undefined)
  }
  return products.filter(p => p.mixType === mixType)
}

// Filtra productos según su tipo especial
export function getProductsBySpecialType(specialType: 'personal' | 'cobertura-bitter' | 'alfajoreable' | 'disenado' | 'tematico'): Product[] {
  return products.filter(p => p.specialType === specialType)
}

// Obtiene todos los productos de la subcategoría "helados"
export function getHelados(): Product[] {
  return products.filter(p => p.subcategory === 'helados')
}

// Filtra helados por tipo y/o por sabores
export function filterHelados(type?: string, flavors?: string[]): Product[] {
  let filtered = getHelados();
  
  // Filtra por tipo de helado si se especifica
  if (type && type !== 'all') {
    filtered = filtered.filter(p => p.heladoType === type);
  }
  
  // Filtra por sabores si se envía una lista
  if (flavors && flavors.length > 0) {
    filtered = filtered.filter(p => 
      flavors.some(flavor => p.heladoFlavor === flavor)
    );
  }
  
  return filtered;
}