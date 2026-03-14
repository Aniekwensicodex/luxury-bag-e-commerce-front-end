'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/lib/store-context';

export function CartSidebar() {
  const { 
    items: cart, 
    isCartOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const cartTotal = getCartTotal();

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2 font-serif text-2xl">
            <ShoppingBag className="h-6 w-6" />
            Your Bag
            <span className="text-muted-foreground text-lg font-sans">
              ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </span>
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="font-serif text-xl mb-2">Your bag is empty</h3>
            <p className="text-muted-foreground font-sans mb-6">
              Discover our exquisite collection of luxury bags.
            </p>
            <Button 
              onClick={() => toggleCart(false)}
              asChild
              className="bg-primary hover:bg-primary/90"
            >
              <Link href="/shop">
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 py-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div 
                    key={`${item.product.id}-${item.selectedColor}`} 
                    className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="relative w-24 h-28 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-serif text-sm line-clamp-1">
                            {item.product.name}
                          </h4>
                          {item.selectedColor && (
                            <p className="text-xs text-muted-foreground font-sans mt-0.5">
                              {item.selectedColor}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border rounded">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1.5 hover:bg-muted disabled:opacity-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-sm font-sans">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-serif text-sm">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-sans">Subtotal</span>
                <span className="font-serif text-lg">{formatPrice(cartTotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground font-sans">
                Shipping and taxes calculated at checkout
              </p>
              
              <div className="space-y-2">
                <Button 
                  asChild 
                  className="w-full bg-primary hover:bg-primary/90 font-sans tracking-wider"
                  onClick={() => toggleCart(false)}
                >
                  <Link href="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  asChild 
                  className="w-full font-sans tracking-wider"
                  onClick={() => toggleCart(false)}
                >
                  <Link href="/cart">
                    View Cart
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
