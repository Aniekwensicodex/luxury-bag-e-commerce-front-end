'use client';

import Image from 'next/image';
import { Instagram } from 'lucide-react';

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    likes: 1234,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    likes: 2345,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80',
    likes: 987,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
    likes: 1567,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80',
    likes: 876,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    likes: 2109,
  },
];

export function InstagramFeed() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            @maisonelegance
          </p>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Follow Our Journey
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">
            Join our community of connoisseurs and get inspired by how our clients 
            style their pieces.
          </p>
        </div>

        {/* Instagram grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={post.image}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
