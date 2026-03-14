'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, User, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, useCart } from '@/lib/store-context';
import { cn } from '@/lib/utils';
import { CartSidebar } from './cart-sidebar';
import { SearchDialog } from './search-dialog';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Collections', href: '/collections' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const { getCartCount, toggleCart } = useCart();
  const [wishlist] = useState<any[]>([]);
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  const headerBg = isScrolled || !isHomePage 
    ? 'bg-background/95 backdrop-blur-md border-b border-border' 
    : 'bg-transparent';
  const textColor = isScrolled || !isHomePage ? 'text-foreground' : 'text-white';

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          headerBg
        )}
      >
        {/* Top announcement bar */}
        <div className="bg-primary text-primary-foreground text-center py-2 text-sm tracking-widest font-sans">
          Complimentary Shipping on Orders Over $500
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn('lg:hidden p-2 -ml-2', textColor)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo */}
            <Link 
              href="/" 
              className={cn(
                'text-2xl md:text-3xl font-serif tracking-[0.2em] transition-colors',
                textColor
              )}
            >
              MAISON ÉLÉGANCE
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm tracking-widest uppercase font-sans transition-all duration-300 hover:opacity-70',
                    textColor,
                    pathname === item.href && 'border-b-2 border-current pb-1'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={cn('p-2 transition-opacity hover:opacity-70', textColor)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <Link 
                href="/wishlist"
                className={cn('p-2 relative transition-opacity hover:opacity-70', textColor)}
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-xs w-5 h-5 rounded-full flex items-center justify-center font-sans">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link 
                href={user ? '/account' : '/login'}
                className={cn('p-2 transition-opacity hover:opacity-70', textColor)}
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>
              
              <button 
                onClick={() => toggleCart(true)}
                className={cn('p-2 relative transition-opacity hover:opacity-70', textColor)}
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-xs w-5 h-5 rounded-full flex items-center justify-center font-sans">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div 
          className={cn(
            'lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <nav className="flex flex-col py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'px-6 py-3 text-sm tracking-widest uppercase font-sans hover:bg-muted transition-colors',
                  pathname === item.href && 'bg-muted font-medium'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <CartSidebar />
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
