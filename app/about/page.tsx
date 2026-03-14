'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const values = [
  {
    title: 'Artisan Excellence',
    description: 'Every piece is handcrafted by master artisans with decades of experience, ensuring unparalleled quality.',
  },
  {
    title: 'Sustainable Luxury',
    description: 'We source only the finest ethically-produced materials, committed to environmental responsibility.',
  },
  {
    title: 'Timeless Design',
    description: 'Our designs transcend trends, creating pieces that remain elegant for generations.',
  },
  {
    title: 'Personal Service',
    description: 'Each client receives individualized attention, from selection to after-care services.',
  },
];

const milestones = [
  { year: '1952', event: 'Maison Elegance founded in Paris by Marie-Claire Beaumont' },
  { year: '1968', event: 'Introduction of our signature Héritage collection' },
  { year: '1985', event: 'Expansion to international markets' },
  { year: '2001', event: 'Launch of our sustainable craftsmanship initiative' },
  { year: '2015', event: 'Opening of our flagship atelier in Milan' },
  { year: '2024', event: 'Celebrating 70+ years of timeless elegance' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/brand-story.jpg"
            alt="Artisan crafting luxury bag"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/70" />
          <div className="relative z-10 text-center text-primary-foreground px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm tracking-[0.3em] uppercase mb-4"
            >
              Our Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-light mb-6"
            >
              Maison Elegance
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-light max-w-xl mx-auto text-primary-foreground/80"
            >
              Since 1952, crafting timeless luxury with unwavering dedication to excellence.
            </motion.p>
          </div>
        </section>

        {/* Heritage Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">
                  Our Heritage
                </p>
                <h2 className="text-4xl md:text-5xl font-light mb-8 text-foreground">
                  A Legacy of Craftsmanship
                </h2>
                <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
                  <p>
                    Founded in the heart of Paris by visionary designer Marie-Claire Beaumont, 
                    Maison Elegance began as a small atelier dedicated to creating exceptional 
                    leather goods for discerning clientele. What started as a passion project 
                    has evolved into a globally recognized symbol of luxury and refinement.
                  </p>
                  <p>
                    For over seven decades, we have remained true to our founding principles: 
                    uncompromising quality, innovative design, and respect for traditional 
                    craftsmanship. Every bag that leaves our atelier carries with it the 
                    expertise of generations of master artisans.
                  </p>
                  <p>
                    Today, Maison Elegance continues to push the boundaries of luxury fashion 
                    while honoring the time-honored techniques that have defined our house. 
                    Our pieces are not merely accessories; they are heirlooms meant to be 
                    treasured and passed down through generations.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                    <Image
                      src="/images/products/heritage-tote.jpg"
                      alt="Heritage collection piece"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-sm overflow-hidden">
                    <Image
                      src="/images/products/evening-clutch.jpg"
                      alt="Evening clutch"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="pt-8 space-y-4">
                  <div className="relative aspect-square rounded-sm overflow-hidden">
                    <Image
                      src="/images/products/crossbody-saddle.jpg"
                      alt="Crossbody bag"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                    <Image
                      src="/images/products/shoulder-bag.jpg"
                      alt="Shoulder bag"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">
                Our Philosophy
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-foreground">
                Values We Live By
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-px bg-accent mx-auto mb-6" />
                  <h3 className="text-xl font-medium mb-4 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground font-light">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">
                Our Journey
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-foreground">
                Milestones
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-px h-full w-px bg-border" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                      <span className="text-3xl font-light text-accent">{milestone.year}</span>
                      <p className="text-muted-foreground font-light mt-2">{milestone.event}</p>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-accent rounded-full" />
                    <div className="w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">
                  The Artisans
                </p>
                <h2 className="text-4xl md:text-5xl font-light mb-8">
                  Masters of Their Craft
                </h2>
                <div className="space-y-6 text-primary-foreground/80 font-light leading-relaxed">
                  <p>
                    Behind every Maison Elegance creation is a team of dedicated artisans 
                    who have spent decades perfecting their craft. Our master craftspeople 
                    undergo years of rigorous training before they are entrusted with 
                    creating our signature pieces.
                  </p>
                  <p>
                    From selecting the perfect hide to the final quality inspection, 
                    each step in our process is guided by human hands and discerning eyes. 
                    This dedication to handcraftsmanship is what sets Maison Elegance apart 
                    in an age of mass production.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 mt-8 text-accent hover:text-accent/80 transition-colors text-sm tracking-[0.15em] uppercase"
                >
                  <span>Discover Our Creations</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/5] rounded-sm overflow-hidden"
              >
                <Image
                  src="/images/brand-story.jpg"
                  alt="Artisan at work"
                  fill
                  className="object-cover"
                />
              </motion.div>
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
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
                Begin Your Journey
              </h2>
              <p className="text-lg text-muted-foreground font-light mb-10 max-w-2xl mx-auto">
                Discover the world of Maison Elegance and find the perfect piece 
                to accompany you on life&apos;s most precious moments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-10 py-4 text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-colors"
                >
                  Explore Collection
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-10 py-4 text-sm tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Contact Us
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
