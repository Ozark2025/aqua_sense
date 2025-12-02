"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Droplet, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Technology', href: '#technology' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Demo', href: '#demo' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Team', href: '/about#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
    ],
    resources: [
      { name: 'Documentation', href: '#docs' },
      { name: 'API Reference', href: '#api' },
      { name: 'Blog', href: '#blog' },
      { name: 'Support', href: '#support' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-shakespeare-950 via-shakespeare-900 to-shakespeare-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-shakespeare-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-aqua-teal rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center"
              >
                <Droplet className="w-7 h-7 text-white" />
              </motion.div>
              <span className="text-2xl font-bold">AquaSense</span>
            </Link>
            <p className="text-shakespeare-300 mb-6 max-w-sm">
              India's smartest water reuse intelligence system. Maximizing water efficiency through AI, IoT, and data-driven insights.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-shakespeare-300">
                <Mail className="w-5 h-5" />
                <span>info@aquasense.in</span>
              </div>
              <div className="flex items-center space-x-3 text-shakespeare-300">
                <Phone className="w-5 h-5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-shakespeare-300">
                <MapPin className="w-5 h-5" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-shakespeare-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-shakespeare-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-shakespeare-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-shakespeare-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.2, y: -3 }}
                className="w-10 h-10 rounded-full bg-shakespeare-800 hover:bg-shakespeare-600 flex items-center justify-center transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
          <div className="text-shakespeare-300 text-sm">
            © 2024 AquaSense. All rights reserved. | Built for Smart India Hackathon
          </div>
        </div>
      </div>
    </footer>
  );
}
