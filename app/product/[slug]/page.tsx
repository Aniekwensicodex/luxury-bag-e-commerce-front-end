'use client';

import { useState, use, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ProductCard } from '@/components/product/product-card';
import { getProductBySlug, products } from '@/lib/data';
import { useCart } from '@/lib/store-context';
import { toast } from 'sonner';
import { Heart, Minus, Plus, ShoppingBag, Truck, RotateCcw, Shield, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const product = getProductBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleCart } = useCart();
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist_items');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error('Error loading wishlist:', error);
        localStorage.removeItem('wishlist_items');
      }
    }
  }, []);

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-24 px-4 text-center">
          <h1 className="text-3xl font-serif mb-4">Product Not Found</h1>
          <p className="text-muted-foreground font-sans mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Button asChild className="font-sans">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, product.colors[selectedColor]);
    toast.success('Added to bag', {
      description: `${product.name} - ${product.colors[selectedColor]}`,
      action: {
        label: 'View Bag',
        onClick: () => toggleCart(true),
      },
    });
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      const newWishlist = wishlist.filter(item => item.id !== product.id);
      setWishlist(newWishlist);
      localStorage.setItem('wishlist_items', JSON.stringify(newWishlist));
      toast.success('Removed from wishlist');
    } else {
      const newWishlist = [...wishlist, product];
      setWishlist(newWishlist);
      localStorage.setItem('wishlist_items', JSON.stringify(newWishlist));
      toast.success('Added to wishlist');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, product.colors[selectedColor]);
    router.push('/checkout');
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-4 w-4" />
            <Link 
              href={`/shop?category=${product.category}`}
              className="hover:text-foreground transition-colors capitalize"
            >
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-muted">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
                {product.newArrival && (
                  <Badge className="absolute top-4 left-4 bg-gold text-charcoal font-sans">
                    New Arrival
                  </Badge>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-24 rounded-sm overflow-hidden transition-all',
                      selectedImage === index
                        ? 'ring-2 ring-gold'
                        : 'opacity-70 hover:opacity-100'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="space-y-6">
                {/* Title and price */}
                <div>
                  <p className="text-gold text-sm tracking-[0.2em] uppercase mb-2 font-sans">
                    {product.collection.replace('-', ' ')}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h1>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-serif">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-muted-foreground line-through font-sans">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <Badge variant="destructive" className="font-sans text-xs">
                          Save {formatPrice(product.originalPrice - product.price)}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground font-sans leading-relaxed">
                  {product.description}
                </p>

                {/* Color selection */}
                <div>
                  <p className="font-sans text-sm mb-3">
                    Color: <span className="font-medium">{product.colors[selectedColor]}</span>
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(index)}
                        className={cn(
                          'w-10 h-10 rounded-full border-2 transition-all',
                          selectedColor === index
                            ? 'border-gold scale-110'
                            : 'border-transparent hover:scale-105'
                        )}
                        style={{ backgroundColor: getColorHex(color) }}
                        title={color}
                        aria-label={`Select ${color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <p className="font-sans text-sm mb-3">Quantity</p>
                  <div className="flex items-center border border-border rounded-sm w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-muted disabled:opacity-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 font-sans">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-muted transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90 font-sans tracking-wider gap-2"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Add to Bag
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    size="lg"
                    variant="outline"
                    className="flex-1 font-sans tracking-wider"
                  >
                    Buy Now
                  </Button>
                  <Button
                    onClick={handleWishlist}
                    size="lg"
                    variant="outline"
                    className={cn(
                      'font-sans',
                      isWishlisted && 'border-red-500 text-red-500'
                    )}
                  >
                    <Heart className={cn('h-5 w-5', isWishlisted && 'fill-red-500')} />
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-border">
                  <div className="text-center">
                    <Truck className="h-6 w-6 mx-auto mb-2 text-gold" />
                    <p className="text-xs font-sans text-muted-foreground">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="h-6 w-6 mx-auto mb-2 text-gold" />
                    <p className="text-xs font-sans text-muted-foreground">30-Day Returns</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-gold" />
                    <p className="text-xs font-sans text-muted-foreground">2-Year Warranty</p>
                  </div>
                </div>

                {/* Accordion details */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="description">
                    <AccordionTrigger className="font-serif text-lg">Description</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-sans leading-relaxed">
                      {product.longDescription || product.description}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="materials">
                    <AccordionTrigger className="font-serif text-lg">Materials</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-muted-foreground font-sans">
                        {(Array.isArray(product.materials) ? product.materials : [product.materials]).map((material: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                            {material}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="dimensions">
                    <AccordionTrigger className="font-serif text-lg">Dimensions</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-sans">
                      {product.dimensions || 'Contact us for detailed dimensions.'}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="shipping">
                    <AccordionTrigger className="font-serif text-lg">Shipping & Returns</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-sans space-y-3">
                      <p>Complimentary standard shipping on all orders over $500.</p>
                      <p>Express shipping available at checkout.</p>
                      <p>Free returns within 30 days of delivery. Items must be unworn and in original packaging.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-12">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

function getColorHex(colorName: string): string {
  const colors: Record<string, string> = {
    'Noir': '#1a1a1a',
    'Black': '#000000',
    'Cognac': '#9A5B4F',
    'Burgundy': '#722F37',
    'Champagne': '#F7E7CE',
    'Rose Gold': '#B76E79',
    'Silver Mist': '#C0C0C0',
    'Midnight Black': '#191970',
    'Royal Blue': '#4169E1',
    'Emerald': '#50C878',
    'Camel': '#C19A6B',
    'Ivory': '#FFFFF0',
    'Navy': '#000080',
    'Bordeaux': '#5C2C2C',
    'Gold': '#D4AF37',
    'Silver': '#C0C0C0',
    'Rose': '#FF007F',
    'Cream': '#FFFDD0',
    'Blush': '#DE5D83',
    'Sage': '#9DC183',
    'Tan': '#D2B48C',
    'Chocolate': '#7B3F00',
    'Forest': '#228B22',
  };
  return colors[colorName] || '#888888';
}
