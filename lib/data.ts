import { Product, Category, Collection } from './types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Tote Bags',
    slug: 'tote-bags',
    description: 'Spacious elegance for the modern woman',
    image: '/images/products/heritage-tote.jpg',
  },
  {
    id: '2',
    name: 'Crossbody',
    slug: 'crossbody',
    description: 'Effortless style, hands-free luxury',
    image: '/images/products/crossbody-saddle.jpg',
  },
  {
    id: '3',
    name: 'Clutches',
    slug: 'clutches',
    description: 'Evening sophistication',
    image: '/images/products/evening-clutch.jpg',
  },
  {
    id: '4',
    name: 'Shoulder Bags',
    slug: 'shoulder-bags',
    description: 'Timeless classics reimagined',
    image: '/images/products/shoulder-bag.jpg',
  },
];

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Noir Essence',
    slug: 'noir-essence',
    description: 'A celebration of understated luxury in timeless black',
    image: '/images/products/heritage-tote.jpg',
    season: 'Fall/Winter 2024',
  },
  {
    id: '2',
    name: 'Golden Hour',
    slug: 'golden-hour',
    description: 'Warm metallic accents meet soft neutral tones',
    image: '/images/products/evening-clutch.jpg',
    season: 'Spring/Summer 2024',
  },
  {
    id: '3',
    name: 'Artisan Heritage',
    slug: 'artisan-heritage',
    description: 'Handcrafted pieces celebrating traditional craftsmanship',
    image: '/images/brand-story.jpg',
    season: 'Timeless',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'The Aristocrat Tote',
    slug: 'aristocrat-tote',
    price: 2850,
    originalPrice: 3200,
    description: 'A masterpiece of Italian craftsmanship, the Aristocrat Tote combines practicality with unparalleled elegance.',
    longDescription: 'Hand-stitched by master artisans in Florence, the Aristocrat Tote represents the pinnacle of luxury leather goods. Each bag takes over 18 hours to complete, using only the finest full-grain calfskin leather sourced from heritage tanneries. The interior features our signature suede lining with gold-plated hardware accents.',
    category: 'tote-bags',
    collection: 'noir-essence',
    images: [
      '/images/products/heritage-tote.jpg',
      '/images/products/shoulder-bag.jpg',
      '/images/products/structured-satchel.jpg',
    ],
    colors: ['Noir', 'Cognac', 'Burgundy'],
    materials: ['Full-grain Italian Calfskin', 'Suede Interior', '24k Gold-plated Hardware'],
    dimensions: '38cm x 28cm x 15cm',
    inStock: true,
    featured: true,
    newArrival: false,
    bestSeller: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Parisian Crossbody',
    slug: 'parisian-crossbody',
    price: 1650,
    description: 'Inspired by the boulevards of Paris, this crossbody embodies effortless French elegance.',
    longDescription: 'The Parisian Crossbody is designed for the woman who moves through life with grace and purpose. Featuring an adjustable chain strap with leather shoulder pad, this versatile piece transitions seamlessly from day to evening.',
    category: 'crossbody',
    collection: 'golden-hour',
    images: [
      '/images/products/crossbody-saddle.jpg',
      '/images/products/mini-bucket.jpg',
    ],
    colors: ['Champagne', 'Rose Gold', 'Silver Mist'],
    materials: ['Nappa Leather', 'Silk Lining', 'Palladium Hardware'],
    dimensions: '22cm x 15cm x 7cm',
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: false,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Midnight Soirée Clutch',
    slug: 'midnight-soiree-clutch',
    price: 1280,
    description: 'For moments that demand nothing less than perfection.',
    longDescription: 'The Midnight Soirée Clutch is an ode to glamorous evenings and unforgettable nights. Hand-embellished with Swarovski crystals, each clutch is a unique work of art.',
    category: 'clutches',
    collection: 'noir-essence',
    images: [
      '/images/products/evening-clutch.jpg',
      '/images/products/shoulder-bag.jpg',
    ],
    colors: ['Midnight Black', 'Royal Blue', 'Emerald'],
    materials: ['Satin', 'Swarovski Crystals', 'Gold-plated Clasp'],
    dimensions: '25cm x 12cm x 4cm',
    inStock: true,
    featured: false,
    newArrival: true,
    bestSeller: false,
    createdAt: '2024-03-01',
  },
  {
    id: '4',
    name: 'Heritage Shoulder Bag',
    slug: 'heritage-shoulder-bag',
    price: 2200,
    description: 'A timeless silhouette that transcends seasons and trends.',
    longDescription: 'The Heritage Shoulder Bag draws inspiration from our archives, reimagined for the contemporary connoisseur. Features our signature quilted pattern and antiqued brass hardware.',
    category: 'shoulder-bags',
    collection: 'artisan-heritage',
    images: [
      '/images/products/shoulder-bag.jpg',
      '/images/products/heritage-tote.jpg',
    ],
    colors: ['Camel', 'Ivory', 'Noir'],
    materials: ['Lambskin Leather', 'Cotton Canvas Lining', 'Antiqued Brass'],
    dimensions: '30cm x 22cm x 10cm',
    inStock: true,
    featured: true,
    newArrival: false,
    bestSeller: true,
    createdAt: '2024-01-10',
  },
  {
    id: '5',
    name: 'The Executive Tote',
    slug: 'executive-tote',
    price: 3100,
    description: 'Power dressing, reimagined for the modern leader.',
    longDescription: 'Designed for the woman who commands attention in every room. The Executive Tote features a padded laptop compartment, multiple organizational pockets, and our signature structured silhouette.',
    category: 'tote-bags',
    collection: 'noir-essence',
    images: [
      '/images/products/structured-satchel.jpg',
      '/images/products/heritage-tote.jpg',
    ],
    colors: ['Black', 'Navy', 'Bordeaux'],
    materials: ['Pebbled Calfskin', 'Microfiber Lining', 'Palladium Hardware'],
    dimensions: '40cm x 30cm x 14cm',
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: true,
    createdAt: '2024-01-05',
  },
  {
    id: '6',
    name: 'La Petite Crossbody',
    slug: 'la-petite-crossbody',
    price: 980,
    description: 'Small in size, grand in impact.',
    longDescription: 'La Petite is the perfect companion for essentials. Despite its compact size, it comfortably holds your phone, cards, keys, and lipstick. The detachable strap allows for versatile styling.',
    category: 'crossbody',
    collection: 'golden-hour',
    images: [
      '/images/products/mini-bucket.jpg',
      '/images/products/crossbody-saddle.jpg',
    ],
    colors: ['Gold', 'Silver', 'Rose'],
    materials: ['Metallic Leather', 'Suede Lining', '18k Gold-plated Chain'],
    dimensions: '18cm x 12cm x 5cm',
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: false,
    createdAt: '2024-03-10',
  },
  {
    id: '7',
    name: 'The Envelope Clutch',
    slug: 'envelope-clutch',
    price: 890,
    description: 'Sleek minimalism for the modern sophisticate.',
    longDescription: 'The Envelope Clutch embodies our philosophy of refined simplicity. Its clean lines and impeccable proportions make it a versatile addition to any wardrobe.',
    category: 'clutches',
    collection: 'artisan-heritage',
    images: [
      '/images/products/evening-clutch.jpg',
      '/images/products/shoulder-bag.jpg',
    ],
    colors: ['Cream', 'Blush', 'Sage'],
    materials: ['Smooth Calfskin', 'Leather Lining', 'Hidden Magnetic Closure'],
    dimensions: '28cm x 16cm x 2cm',
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: false,
    createdAt: '2024-02-01',
  },
  {
    id: '8',
    name: 'Vintage Revival Hobo',
    slug: 'vintage-revival-hobo',
    price: 1890,
    description: 'Nostalgia meets contemporary design.',
    longDescription: 'Inspired by the glamour of the 1970s, the Vintage Revival Hobo brings back the beloved slouchy silhouette with modern refinements. Butter-soft leather that only improves with age.',
    category: 'shoulder-bags',
    collection: 'artisan-heritage',
    images: [
      '/images/products/crossbody-saddle.jpg',
      '/images/products/structured-satchel.jpg',
    ],
    colors: ['Tan', 'Chocolate', 'Forest'],
    materials: ['Vegetable-tanned Leather', 'Cotton Lining', 'Brass Hardware'],
    dimensions: '35cm x 32cm x 12cm',
    inStock: true,
    featured: true,
    newArrival: false,
    bestSeller: false,
    createdAt: '2024-01-20',
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getProductsByCollection = (collection: string): Product[] => {
  return products.filter(p => p.collection === collection);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(p => p.newArrival);
};

export const getBestSellers = (): Product[] => {
  return products.filter(p => p.bestSeller);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find(c => c.slug === slug);
};
