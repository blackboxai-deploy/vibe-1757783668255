'use client'

import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '',
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative">
        {/* Main spinner */}
        <div className={`${sizeClasses[size]} border-4 border-blue-100 rounded-full animate-spin`}>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin" 
               style={{ animationDuration: '1s' }} />
        </div>
        
        {/* Inner spinner for more dynamic effect */}
        <div className={`absolute inset-2 border-2 border-blue-200 rounded-full animate-spin`}
             style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}>
          <div className="absolute inset-0 border-2 border-transparent border-b-blue-400 rounded-full" />
        </div>
      </div>
      
      {text && (
        <p className={`text-gray-600 font-medium animate-pulse ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  )
}

// Skeleton loader for cards
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
        
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded mb-3"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        {/* Tags skeleton */}
        <div className="flex space-x-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-14"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

// Skeleton loader for text content
export const SkeletonText: React.FC<{ 
  lines?: number
  className?: string 
}> = ({ lines = 3, className = '' }) => {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <div 
          key={index}
          className={`h-4 bg-gray-200 rounded ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  )
}

// Page loading component
export const PageLoading: React.FC<{ text?: string }> = ({ 
  text = 'Memuat konten...' 
}) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <LoadingSpinner size="lg" text={text} />
    </div>
  )
}

export default LoadingSpinner