'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/lib/data';

export function CategoriesGrid() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Shop By Category
          </p>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Find Your Perfect Piece
          </h2>
        </div>

        {/* Categories grid - bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className={`group relative overflow-hidden rounded-sm ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`relative ${index === 0 ? 'aspect-square' : 'aspect-[4/5]'}`}>
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className={`text-white font-serif ${index === 0 ? 'text-3xl' : 'text-xl'} mb-1`}>
                        {category.name}
                      </h3>
                      <p className="text-white/70 text-sm font-sans">
                        {category.description}
                      </p>
                    </div>
                    <div className="shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal transition-colors">
                      <ArrowUpRight className="h-5 w-5 text-white group-hover:text-charcoal" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
