'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/lib/store-context';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const { addToCart: addToCartGlobal, toggleCart } = useCart();

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const removeFromWishlist = (productId: string) => {
    const newWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(newWishlist);
    localStorage.setItem('wishlist_items', JSON.stringify(newWishlist));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (product: any) => {
    addToCartGlobal(product, 1);
    toast.success('Added to cart', {
      description: product.name,
      action: {
        label: 'View Cart',
        onClick: () => toggleCart(true),
      },
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">My Wishlist</h1>
            <p className="text-muted-foreground font-sans">
              Items you've saved for later
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-serif mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground font-sans mb-6">
                Start adding items you love to your wishlist
              </p>
              <Button asChild className="font-sans">
                <Link href="/shop">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-muted mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                      aria-label="Remove from wishlist"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-sm">{product.name}</h3>
                    <p className="text-lg font-serif">{formatPrice(product.price)}</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        size="sm"
                        className="flex-1 text-xs font-sans"
                      >
                        <ShoppingBag className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => removeFromWishlist(product.id)}
                        size="sm"
                        variant="outline"
                        className="p-2"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
