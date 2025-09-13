'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServiceCard from '@/components/ServiceCard'
import ProjectCard from '@/components/ProjectCard'
import TestimonialCard from '@/components/TestimonialCard'
import LoadingSpinner, { SkeletonCard } from '@/components/LoadingSpinner'
import { drupalApi } from '@/lib/drupal-api'
import { DrupalService, DrupalPortfolio, DrupalTestimonial } from '@/types/drupal'

export default function HomePage() {
  const [services, setServices] = useState<DrupalService[]>([])
  const [portfolio, setPortfolio] = useState<DrupalPortfolio[]>([])
  const [testimonials, setTestimonials] = useState<DrupalTestimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, portfolioData, testimonialsData] = await Promise.all([
          drupalApi.getServices(),
          drupalApi.getPortfolio(),
          drupalApi.getTestimonials(4)
        ])

        setServices(servicesData.slice(0, 3)) // Show only 3 services on homepage
        setPortfolio(portfolioData.slice(0, 4)) // Show only 4 portfolio items
        setTestimonials(testimonialsData)
      } catch (error) {
        console.error('Error fetching homepage data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 to-indigo-800/20"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-24 h-24 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-28 h-28 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-inter font-bold text-white leading-tight mb-6">
              Solusi Website
              <span className="block bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Profesional
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-8 max-w-3xl mx-auto">
              Zathaya Soft mengkhususkan diri dalam pengembangan website dengan 
              <span className="font-semibold text-white"> Drupal </span> dan 
              <span className="font-semibold text-white"> ReactJS</span>. 
              Wujudkan visi digital bisnis Anda bersama kami.
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                '🚀 Modern Technology',
                '⚡ Fast Performance', 
                '🔒 Secure & Reliable',
                '📱 Mobile Responsive',
                '🎯 SEO Optimized'
              ].map((feature, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="bg-white/10 text-blue-100 border border-blue-300/30 px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors duration-300"
                >
                  {feature}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border border-blue-500 hover:border-blue-600"
                >
                  Konsultasi Gratis
                </Button>
              </Link>
              
              <Link href="/portfolio">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                >
                  Lihat Portfolio
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[
                { number: '100+', label: 'Project Selesai' },
                { number: '50+', label: 'Client Puas' },
                { number: '5+', label: 'Tahun Pengalaman' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-inter font-bold text-blue-200 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-blue-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-300 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-gray-900 mb-6">
              Layanan Kami
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Kami menyediakan solusi web development yang komprehensif dengan teknologi terdepan 
              untuk memenuhi kebutuhan digital bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 3 }, (_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Lihat Semua Layanan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-gray-900 mb-6">
              Mengapa Memilih Zathaya Soft?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Keunggulan dan komitmen kami dalam memberikan solusi terbaik untuk bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Expertise Terpercaya',
                description: 'Tim ahli dengan pengalaman 5+ tahun dalam Drupal dan ReactJS development.'
              },
              {
                icon: '⚡',
                title: 'Performance Optimal',
                description: 'Website yang kami bangun dioptimasi untuk kecepatan dan performa terbaik.'
              },
              {
                icon: '🔒',
                title: 'Keamanan Terjamin',
                description: 'Implementasi security best practices untuk melindungi website dan data Anda.'
              },
              {
                icon: '📱',
                title: 'Responsive Design',
                description: 'Semua website dirancang mobile-first dan responsive di semua device.'
              },
              {
                icon: '🛠️',
                title: 'Support 24/7',
                description: 'Layanan maintenance dan support berkelanjutan untuk kelancaran operasional.'
              },
              {
                icon: '💡',
                title: 'Solusi Custom',
                description: 'Pendekatan personal untuk setiap project sesuai kebutuhan bisnis unik Anda.'
              }
            ].map((feature, index) => (
              <Card key={index} className="border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group">
                <CardHeader className="text-center pb-4">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-inter font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-gray-900 mb-6">
              Portfolio Terbaru
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Lihat beberapa project terbaik yang telah kami kerjakan untuk berbagai klien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? (
              Array.from({ length: 2 }, (_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              portfolio.slice(0, 2).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Lihat Semua Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-gray-900 mb-6">
              Apa Kata Klien Kami?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Kepercayaan dan kepuasan klien adalah prioritas utama kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? (
              Array.from({ length: 2 }, (_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              testimonials.slice(0, 2).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-inter font-bold text-white mb-6">
            Siap Memulai Project Anda?
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl mx-auto">
            Konsultasikan kebutuhan website bisnis Anda dengan tim ahli kami. 
            Dapatkan penawaran terbaik dan mulai project sekarang juga!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Konsultasi Sekarang
              </Button>
            </Link>
            
            <Link href="tel:+622112345678">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
              >
                📞 +62 21 1234 5678
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}