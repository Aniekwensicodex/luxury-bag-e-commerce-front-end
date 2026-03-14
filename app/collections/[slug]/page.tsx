'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/product/product-card';
import { collections, products } from '@/lib/data';

export default function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-4">Collection Not Found</h1>
            <Link href="/collections" className="text-accent hover:underline">
              View All Collections
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Filter products that might belong to this collection (for demo, show all featured products)
  const collectionProducts = products.filter((p) => p.featured || p.isNew);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
          <div className="relative z-10 w-full px-4 pb-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 text-sm tracking-wider uppercase transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Collections
                </Link>
                <p className="text-sm tracking-[0.3em] uppercase text-primary-foreground/70 mb-3">
                  {collection.season}
                </p>
                <h1 className="text-5xl md:text-7xl font-light text-primary-foreground mb-4">
                  {collection.name}
                </h1>
                <p className="text-xl text-primary-foreground/80 font-light max-w-2xl">
                  {collection.description}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Collection Story */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-8 text-foreground">
                The Story Behind the Collection
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6">
                Inspired by the timeless elegance of European craftsmanship and the modern woman&apos;s 
                discerning taste, this collection represents a harmonious blend of tradition and innovation. 
                Each piece is meticulously handcrafted by our master artisans, using only the finest materials 
                sourced from the most prestigious tanneries in the world.
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                From the initial sketch to the final stitch, every bag in this collection undergoes 
                over 100 hours of careful craftsmanship, ensuring that when you carry a Maison Elegance piece, 
                you carry a work of art.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-4 text-foreground">
                Pieces from {collection.name}
              </h2>
              <p className="text-muted-foreground font-light">
                {collectionProducts.length} exceptional pieces
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {collectionProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-foreground">
                Experience the Collection
              </h2>
              <p className="text-lg text-muted-foreground font-light mb-10 max-w-2xl mx-auto">
                Visit our flagship boutiques for a personal consultation with our style advisors, 
                or explore our full catalog online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-10 py-4 text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-colors"
                >
                  Shop All Products
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-10 py-4 text-sm tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
