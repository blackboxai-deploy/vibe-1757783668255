'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { label: 'Web Development', href: '/services#web-development' },
      { label: 'Drupal Development', href: '/services#drupal' },
      { label: 'ReactJS Development', href: '/services#reactjs' },
      { label: 'E-commerce Solutions', href: '/services#ecommerce' },
      { label: 'Custom Applications', href: '/services#custom' },
    ],
    company: [
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Tim Kami', href: '/about#team' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Karir', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
    support: [
      { label: 'Kontak', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Dokumentasi', href: '/docs' },
      { label: 'Support', href: '/support' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl font-inter">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-bold text-2xl text-white leading-none">
                  Zathaya Soft
                </span>
                <span className="text-sm font-medium text-blue-300 leading-none mt-1">
                  Professional Web Solutions
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Kami adalah perusahaan pengembangan website profesional yang mengkhususkan diri dalam 
              solusi Drupal dan ReactJS. Memberikan layanan terbaik untuk kebutuhan digital bisnis Anda.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">📍</span>
                </div>
                <span className="text-gray-300 text-sm">
                  Jl. Sudirman No. 123, Jakarta, DKI Jakarta 12190
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">📞</span>
                </div>
                <span className="text-gray-300 text-sm">+62 21 1234 5678</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✉️</span>
                </div>
                <span className="text-gray-300 text-sm">info@zathayasoft.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <Link href="https://linkedin.com/company/zathayasoft" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white transition-all duration-300"
                >
                  <span className="sr-only">LinkedIn</span>
                  <span className="text-sm">in</span>
                </Button>
              </Link>
              
              <Link href="https://twitter.com/zathayasoft" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white transition-all duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <span className="text-sm">tw</span>
                </Button>
              </Link>
              
              <Link href="https://facebook.com/zathayasoft" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white transition-all duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <span className="text-sm">fb</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-inter font-semibold text-white text-lg mb-4">Layanan</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-blue-300 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-inter font-semibold text-white text-lg mb-4">Perusahaan</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-blue-300 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-inter font-semibold text-white text-lg mb-4">Dukungan</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-blue-300 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Zathaya Soft. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-blue-300 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-blue-300 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-blue-300 transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer