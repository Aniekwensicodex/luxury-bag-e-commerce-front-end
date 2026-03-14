'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    title: 'Timeless Elegance',
    subtitle: 'Fall/Winter 2024',
    description: 'Discover our new collection of exquisite handcrafted bags',
    image: '/images/hero-bag.jpg',
    cta: 'Explore Collection',
    href: '/collections/noir-essence',
  },
  {
    id: 2,
    title: 'The Art of Luxury',
    subtitle: 'Handcrafted Excellence',
    description: 'Each piece tells a story of dedication and artistry',
    image: '/images/products/heritage-tote.jpg',
    cta: 'Shop Now',
    href: '/shop',
  },
  {
    id: 3,
    title: 'Golden Hour',
    subtitle: 'Spring/Summer Collection',
    description: 'Warm metallic accents meet soft neutral tones',
    image: '/images/products/evening-clutch.jpg',
    cta: 'View Collection',
    href: '/collections/golden-hour',
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          )}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-3xl">
              <p 
                className={cn(
                  'text-gold text-sm tracking-[0.3em] uppercase mb-4 font-sans',
                  index === currentSlide && 'animate-fade-in-up'
                )}
                style={{ animationDelay: '0.2s' }}
              >
                {slide.subtitle}
              </p>
              <h1 
                className={cn(
                  'text-white text-5xl md:text-7xl lg:text-8xl font-serif mb-6',
                  index === currentSlide && 'animate-fade-in-up'
                )}
                style={{ animationDelay: '0.4s' }}
              >
                {slide.title}
              </h1>
              <p 
                className={cn(
                  'text-white/80 text-lg md:text-xl font-sans mb-8 max-w-xl mx-auto',
                  index === currentSlide && 'animate-fade-in-up'
                )}
                style={{ animationDelay: '0.6s' }}
              >
                {slide.description}
              </p>
              <div
                className={cn(
                  index === currentSlide && 'animate-fade-in-up'
                )}
                style={{ animationDelay: '0.8s' }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-charcoal hover:bg-white/90 font-sans tracking-wider group"
                >
                  <Link href={slide.href}>
                    {slide.cta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'w-12 h-1 transition-all duration-300',
              index === currentSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-white/70">
        <span className="text-xs tracking-widest font-sans rotate-90 origin-center mb-8">SCROLL</span>
        <div className="w-px h-16 bg-white/30 relative overflow-hidden">
          <div className="w-full h-1/2 bg-white animate-bounce" />
        </div>
      </div>
    </section>
  );
}
