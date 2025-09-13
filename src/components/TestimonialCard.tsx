'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DrupalTestimonial } from '@/types/drupal'

interface TestimonialCardProps {
  testimonial: DrupalTestimonial
  className?: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index}
        className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ⭐
      </span>
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long'
    })
  }

  return (
    <Card className={`group border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-lg bg-white ${className || ''}`}>
      <CardHeader className="pb-4">
        {/* Rating Stars */}
        <div className="flex items-center space-x-1 mb-4">
          {renderStars(testimonial.rating)}
        </div>

        {/* Testimonial Content */}
        <blockquote className="text-gray-700 leading-relaxed relative">
          <span className="text-4xl text-blue-200 absolute -top-2 -left-1 font-serif leading-none select-none">
            "
          </span>
          <span className="relative z-10 block pl-6">
            {testimonial.content}
          </span>
          <span className="text-4xl text-blue-200 absolute -bottom-6 right-0 font-serif leading-none select-none">
            "
          </span>
        </blockquote>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="flex items-center space-x-4">
          {/* Client Avatar */}
          <div className="relative flex-shrink-0">
            {testimonial.avatar_url ? (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm">
                <Image
                  src={testimonial.avatar_url}
                  alt={`${testimonial.client_name} avatar`}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-semibold text-xl">
                  {testimonial.client_name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Client Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-lg leading-tight">
              {testimonial.client_name}
            </h4>
            <p className="text-blue-600 font-medium text-sm leading-tight mt-1">
              {testimonial.client_position}
            </p>
            <p className="text-gray-600 text-sm leading-tight mt-0.5">
              {testimonial.company}
            </p>
            
            {/* Project Title */}
            {testimonial.project_title && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Project
                </p>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  {testimonial.project_title}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            {formatDate(testimonial.created_at)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard