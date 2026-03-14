'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { products } from '@/lib/data';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(products.slice(0, 4));

  useEffect(() => {
    if (query.trim() === '') {
      setResults(products.slice(0, 4));
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered.slice(0, 6));
  }, [query]);

  const handleClose = () => {
    setQuery('');
    onOpenChange(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0">
        <VisuallyHidden>
          <DialogTitle>Search Products</DialogTitle>
        </VisuallyHidden>
        
        <div className="flex items-center border-b border-border px-4">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <Input
            type="text"
            placeholder="Search our collection..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-lg font-sans py-6"
            autoFocus
          />
          <button 
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-sans">
                No results found for "{query}"
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground font-sans mb-4">
                {query ? `${results.length} results` : 'Popular searches'}
              </p>
              <div className="space-y-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={handleClose}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm line-clamp-1">{product.name}</h4>
                      <p className="text-sm text-muted-foreground font-sans capitalize">
                        {product.category.replace('-', ' ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif">{formatPrice(product.price)}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>

              {query && results.length > 0 && (
                <Link
                  href={`/shop?search=${encodeURIComponent(query)}`}
                  onClick={handleClose}
                  className="flex items-center justify-center gap-2 mt-4 py-3 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
                >
                  View all results
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
