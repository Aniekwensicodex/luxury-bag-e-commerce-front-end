'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Leaf, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Award,
    title: 'Master Craftsmanship',
    description: 'Each piece is handcrafted by artisans with decades of experience.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Luxury',
    description: 'Ethically sourced materials and responsible manufacturing.',
  },
  {
    icon: Heart,
    title: 'Lifetime Warranty',
    description: 'Every bag comes with our commitment to lasting quality.',
  },
];

export function BrandStory() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                  <Image
                    src="/images/brand-story.jpg"
                    alt="Craftsmanship detail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-sm overflow-hidden">
                  <Image
                    src="/images/products/structured-satchel.jpg"
                    alt="Luxury materials"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="relative aspect-[3/5] rounded-sm overflow-hidden">
                  <Image
                    src="/images/products/heritage-tote.jpg"
                    alt="Artisan at work"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-0 bg-gold text-charcoal p-6 rounded-sm">
              <p className="text-4xl font-serif">100</p>
              <p className="text-sm font-sans tracking-wider">Years of Excellence</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-sans">
              Our Heritage
            </p>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-balance">
              The Art of Creating Timeless Beauty
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed mb-6">
              Since 1924, Maison Élégance has been at the forefront of luxury leather goods. 
              What began as a small atelier in Paris has grown into a global symbol of 
              sophistication and impeccable taste. Our commitment to excellence remains 
              unchanged—every stitch, every detail, every moment of creation is infused 
              with passion and precision.
            </p>
            <p className="text-muted-foreground font-sans leading-relaxed mb-8">
              We believe that true luxury lies not in logos or trends, but in the 
              quiet confidence of knowing you carry something extraordinary. Something 
              that will only grow more beautiful with time.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-muted rounded-sm flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm font-sans">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 font-sans tracking-wider group"
            >
              <Link href="/about">
                Our Story
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
