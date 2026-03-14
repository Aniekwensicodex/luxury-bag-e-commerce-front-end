'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/lib/data';

export function CollectionsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Exclusive Collections
          </p>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Our Collections
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">
            Each collection tells a unique story, inspired by art, culture, and 
            the timeless pursuit of beauty.
          </p>
        </div>

        {/* Collections grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm luxury-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                {collection.season && (
                  <p className="text-gold text-xs tracking-[0.2em] uppercase mb-2 font-sans">
                    {collection.season}
                  </p>
                )}
                <h3 className="text-white text-2xl md:text-3xl font-serif mb-2">
                  {collection.name}
                </h3>
                <p className="text-white/70 text-sm font-sans mb-4 line-clamp-2">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 text-white text-sm font-sans tracking-wider group-hover:gap-4 transition-all">
                  Explore Collection
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
