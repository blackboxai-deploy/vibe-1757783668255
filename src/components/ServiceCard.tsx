'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DrupalService } from '@/types/drupal'

interface ServiceCardProps {
  service: DrupalService
  className?: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, className }) => {
  return (
    <Card className={`group overflow-hidden border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-xl ${className || ''}`}>
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        <Image
          src={service.image_url}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-inter font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          {service.title}
        </CardTitle>
        <CardDescription className="text-gray-600 leading-relaxed">
          {service.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        {/* Features List */}
        {service.features && service.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Fitur Utama:</h4>
            <div className="flex flex-wrap gap-1.5">
              {service.features.slice(0, 3).map((feature, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                >
                  {feature}
                </Badge>
              ))}
              {service.features.length > 3 && (
                <Badge variant="outline" className="text-xs text-gray-500">
                  +{service.features.length - 3} lainnya
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Estimasi Harga</div>
          <div className="text-base font-semibold text-gray-900 mt-1">
            {service.price_range}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-6">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link href={`/services/${service.slug}`} className="flex-1">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm hover:shadow-md transition-all duration-300"
            >
              Lihat Detail
            </Button>
          </Link>
          <Link href="/contact" className="flex-1">
            <Button 
              variant="outline" 
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 font-medium transition-all duration-300"
            >
              Konsultasi
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ServiceCard