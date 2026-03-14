'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Our Flagship',
    details: ['12 Rue du Faubourg Saint-Honoré', '75008 Paris, France'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+33 1 42 65 00 00', '+1 (212) 555-0150'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['clientservice@maisonelegance.com', 'press@maisonelegance.com'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    details: ['Monday - Saturday: 10:00 - 19:00', 'Sunday: By Appointment'],
  },
];

const boutiques = [
  {
    city: 'Paris',
    address: '12 Rue du Faubourg Saint-Honoré, 75008',
    phone: '+33 1 42 65 00 00',
    image: '/images/products/heritage-tote.jpg',
  },
  {
    city: 'New York',
    address: '680 Madison Avenue, NY 10065',
    phone: '+1 (212) 555-0150',
    image: '/images/products/evening-clutch.jpg',
  },
  {
    city: 'Milan',
    address: 'Via Montenapoleone 8, 20121',
    phone: '+39 02 7601 6000',
    image: '/images/products/shoulder-bag.jpg',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Message sent successfully. We will be in touch shortly.');

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
              Get in Touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-light mb-6"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-light max-w-xl mx-auto text-primary-foreground/80"
            >
              We would be delighted to hear from you. Our team is here to assist with any inquiries.
            </motion.p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 bg-card border border-border rounded-sm"
                >
                  <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center text-accent">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-4 text-foreground">
                    {info.title}
                  </h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground font-light text-sm">
                      {detail}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">
                  Send a Message
                </p>
                <h2 className="text-4xl md:text-5xl font-light mb-8 text-foreground">
                  We&apos;d Love to Hear From You
                </h2>
                <p className="text-muted-foreground font-light mb-8 leading-relaxed">
                  Whether you have questions about our collections, need assistance with an order, 
                  or wish to schedule a private appointment at one of our boutiques, we are here to help.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        First Name
                      </label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="bg-background"
                        placeholder="Marie"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="bg-background"
                        placeholder="Beaumont"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background"
                        placeholder="marie@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-background"
                        placeholder="+33 6 00 00 00 00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full h-10 px-3 rounded-sm border border-input bg-background text-foreground"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Assistance</option>
                      <option value="appointment">Book an Appointment</option>
                      <option value="press">Press Inquiry</option>
                      <option value="partnership">Partnership Opportunity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-background resize-none"
                      placeholder="How can we assist you?"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full sm:w-auto px-10 py-6 bg-primary text-primary-foreground hover:bg-primary/90 text-sm tracking-[0.15em] uppercase"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Message Sent
                      </>
                    ) : isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/5] rounded-sm overflow-hidden lg:aspect-auto"
              >
                <Image
                  src="/images/brand-story.jpg"
                  alt="Maison Elegance boutique"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Boutiques Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">
                Visit Us
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-foreground">
                Our Boutiques
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {boutiques.map((boutique, index) => (
                <motion.div
                  key={boutique.city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-6">
                    <Image
                      src={boutique.image}
                      alt={`${boutique.city} boutique`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-light mb-3 text-foreground">
                    {boutique.city}
                  </h3>
                  <p className="text-muted-foreground font-light text-sm mb-2">
                    {boutique.address}
                  </p>
                  <p className="text-muted-foreground font-light text-sm">
                    {boutique.phone}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Placeholder Section */}
        <section className="h-[400px] bg-muted relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-accent" />
              <p className="text-muted-foreground font-light">
                Interactive map coming soon
              </p>
              <p className="text-sm text-muted-foreground/60 mt-2">
                12 Rue du Faubourg Saint-Honore, 75008 Paris, France
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
