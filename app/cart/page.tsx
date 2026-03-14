'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/store-context';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { items: cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const cartTotal = getCartTotal();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const shipping = cartTotal >= 500 ? 0 : 25;
  const tax = (cartTotal - discount) * 0.08;
  const total = cartTotal - discount + shipping + tax;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'LUXURY10') {
      setDiscount(cartTotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-24 px-4 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-6" />
          <h1 className="text-3xl font-serif mb-4">Your Bag is Empty</h1>
          <p className="text-muted-foreground font-sans mb-8 max-w-md mx-auto">
            Discover our exquisite collection of luxury handbags and find your perfect piece.
          </p>
          <Button asChild size="lg" className="font-sans tracking-wider">
            <Link href="/shop">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif mb-8">Shopping Bag</h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="flex gap-6 p-6 bg-card rounded-sm border border-border"
                >
                  {/* Product Image */}
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="relative w-32 h-40 rounded-sm overflow-hidden shrink-0"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-serif text-lg hover:text-gold transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground font-sans mt-1">
                          Color: {item.selectedColor || item.product.colors[0]}
                        </p>
                        <p className="text-sm text-muted-foreground font-sans capitalize">
                          Category: {item.product.category.replace('-', ' ')}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-border rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-muted disabled:opacity-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 font-sans">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-muted transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-serif text-lg">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground font-sans">
                            {formatPrice(item.product.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="ghost"
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-destructive font-sans"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Bag
                </Button>
                <Button asChild variant="outline" className="font-sans">
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-sm border border-border p-6 sticky top-32">
                <h2 className="font-serif text-xl mb-6">Order Summary</h2>

                {/* Promo code */}
                <div className="mb-6">
                  <label className="text-sm font-sans text-muted-foreground mb-2 block">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="pl-10 font-sans"
                      />
                    </div>
                    <Button
                      onClick={applyPromoCode}
                      variant="outline"
                      className="font-sans shrink-0"
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground font-sans mt-2">
                    Try: LUXURY10 for 10% off
                  </p>
                </div>

                <Separator className="my-6" />

                {/* Summary details */}
                <div className="space-y-3 font-sans">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif text-lg">Total</span>
                  <span className="font-serif text-2xl">{formatPrice(total)}</span>
                </div>

                {cartTotal < 500 && (
                  <p className="text-sm text-muted-foreground font-sans text-center mb-4">
                    Add {formatPrice(500 - cartTotal)} more for free shipping
                  </p>
                )}

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 font-sans tracking-wider"
                >
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <p className="text-xs text-muted-foreground font-sans text-center mt-4">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
