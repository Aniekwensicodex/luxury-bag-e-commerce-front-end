'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/store-context';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart, toggleCart } = useCart();
  const [wishlist, setWishlist] = useState<any[]>([]);

  // Load wishlist from localStorage on mount
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

  const isWishlisted = wishlist.some(item => item.id === product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors[0]);
    toast.success('Added to bag', {
      description: product.name,
      action: {
        label: 'View Bag',
        onClick: () => toggleCart(true),
      },
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      const newWishlist = wishlist.filter(item => item.id !== product.id);
      setWishlist(newWishlist);
      localStorage.setItem('wishlist_items', JSON.stringify(newWishlist));
      toast.success('Removed from wishlist');
    } else {
      const newWishlist = [...wishlist, product];
      setWishlist(newWishlist);
      localStorage.setItem('wishlist_items', JSON.stringify(newWishlist));
      toast.success('Added to wishlist', {
        description: product.name,
      });
    }
  };

  return (
    <div className={cn('group', className)}>
      <Link href={`/product/${product.slug}`}>
        {/* Image container */}
        <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-muted">
          <Image
            src={product.images[currentImage]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.newArrival && (
              <Badge className="bg-gold text-charcoal font-sans text-xs">New</Badge>
            )}
            {product.bestSeller && (
              <Badge className="bg-primary text-primary-foreground font-sans text-xs">Best Seller</Badge>
            )}
            {product.originalPrice && (
              <Badge variant="destructive" className="font-sans text-xs">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
              </Badge>
            )}
          </div>

          {/* Quick actions overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-white text-charcoal hover:bg-white/90 font-sans text-xs gap-1"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Bag
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/90 border-white text-charcoal hover:bg-white font-sans"
              asChild
            >
              <span>
                <Eye className="h-4 w-4" />
              </span>
            </Button>
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart 
              className={cn(
                'h-4 w-4 transition-colors',
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal'
              )} 
            />
          </button>

          {/* Image hover switch */}
          {product.images.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {product.images.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  onMouseEnter={() => setCurrentImage(index)}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-colors',
                    index === currentImage ? 'bg-white' : 'bg-white/50'
                  )}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-sans tracking-wider uppercase mb-1">
            {product.category.replace('-', ' ')}
          </p>
          <h3 className="font-serif text-lg mb-2 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className="font-serif text-lg">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-sm font-sans">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Color swatches */}
          <div className="flex justify-center gap-1.5 mt-3">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-border"
                style={{ 
                  backgroundColor: getColorHex(color) 
                }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground font-sans">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
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
