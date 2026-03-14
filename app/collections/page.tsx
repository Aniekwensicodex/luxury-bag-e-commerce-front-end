'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { collections } from '@/lib/data';

export default function CollectionsPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-primary/90" />
          <div className="relative z-10 text-center text-primary-foreground px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm tracking-[0.3em] uppercase mb-4"
            >
              Curated Excellence
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-light mb-6"
            >
              Our Collections
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-light max-w-xl mx-auto text-primary-foreground/80"
            >
              Each collection tells a unique story, crafted with passion and perfected through generations of artistry.
            </motion.p>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group block"
                    onMouseEnter={() => setHoveredId(collection.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                      <div className={`relative aspect-[4/5] overflow-hidden rounded-sm ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                        <Image
                          src={collection.image}
                          alt={collection.name}
                          fill
                          className={`object-cover transition-transform duration-700 ${
                            hoveredId === collection.id ? 'scale-105' : 'scale-100'
                          }`}
                        />
                        <div className={`absolute inset-0 bg-primary/20 transition-opacity duration-500 ${
                          hoveredId === collection.id ? 'opacity-0' : 'opacity-100'
                        }`} />
                      </div>
                      <div className={`py-8 ${index % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                        <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">
                          {collection.season}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
                          {collection.name}
                        </h2>
                        <p className="text-lg text-muted-foreground font-light mb-8 max-w-md">
                          {collection.description}
                        </p>
                        <span className={`inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-foreground group-hover:text-accent transition-colors ${
                          index % 2 === 1 ? 'flex-row-reverse' : ''
                        }`}>
                          <span>Explore Collection</span>
                          <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                            index % 2 === 1 ? 'rotate-180 group-hover:-translate-x-1' : ''
                          }`} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Seasonal Preview */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Coming Soon
              </p>
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
                Spring/Summer 2025
              </h2>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto mb-10">
                A celebration of light, color, and the eternal dance between tradition and modernity. 
                Register to be the first to discover our upcoming collection.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-colors"
              >
                <span>Join the Waitlist</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
