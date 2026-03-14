'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    quote: "The attention to detail is extraordinary. My Aristocrat Tote has become my daily companion, and it looks even more beautiful after two years of use.",
    author: "Isabella Martinez",
    title: "Fashion Director, Vogue",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    id: 2,
    quote: "I've collected luxury bags for decades, and Maison Élégance stands apart. The craftsmanship is on par with the most prestigious houses in the world.",
    author: "Charlotte Windsor",
    title: "Art Collector",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    id: 3,
    quote: "From the moment I opened the box, I knew this was something special. The Heritage Shoulder Bag is everything I dreamed of and more.",
    author: "Sophia Chen",
    title: "CEO, Chen Enterprises",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-serif">
            Words From Our Clients
          </h2>
        </div>

        {/* Testimonial slider */}
        <div className="relative">
          <Quote className="h-12 w-12 text-gold/30 mx-auto mb-8" />
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full shrink-0 px-4"
                >
                  <blockquote className="text-center">
                    <p className="text-xl md:text-2xl font-serif leading-relaxed mb-8 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex flex-col items-center">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="font-serif text-lg">{testimonial.author}</p>
                      <p className="text-primary-foreground/60 text-sm font-sans">
                        {testimonial.title}
                      </p>
                    </div>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 border border-primary-foreground/30 rounded-full hover:border-gold hover:text-gold transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    index === currentIndex ? 'bg-gold' : 'bg-primary-foreground/30'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 border border-primary-foreground/30 rounded-full hover:border-gold hover:text-gold transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
