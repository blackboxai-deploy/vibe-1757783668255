'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DrupalPortfolio } from '@/types/drupal'

interface ProjectCardProps {
  project: DrupalPortfolio
  className?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      web: 'bg-blue-50 text-blue-700 border-blue-200',
      mobile: 'bg-green-50 text-green-700 border-green-200',
      ecommerce: 'bg-purple-50 text-purple-700 border-purple-200',
      enterprise: 'bg-orange-50 text-orange-700 border-orange-200',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200'
  }

  const getCategoryLabel = (category: string) => {
    const labels = {
      web: 'Website',
      mobile: 'Mobile App',
      ecommerce: 'E-commerce',
      enterprise: 'Enterprise',
    }
    return labels[category as keyof typeof labels] || category
  }

  return (
    <Card className={`group overflow-hidden border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-xl ${className || ''}`}>
      {/* Project Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {project.images && project.images.length > 0 ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <span className="text-4xl">💻</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <Badge className={`${getCategoryColor(project.category)} font-medium border`}>
            {getCategoryLabel(project.category)}
          </Badge>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* External Link Indicator */}
        {project.project_url && (
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <span className="text-blue-600 text-sm">🔗</span>
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-inter font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
              {project.title}
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm text-gray-500">Client:</span>
              <span className="text-sm font-medium text-gray-700">{project.client_name}</span>
            </div>
          </div>
        </div>
        <CardDescription className="text-gray-600 leading-relaxed mt-3">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Teknologi:</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="outline" className="text-xs text-gray-500">
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Completion Date */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Selesai</div>
          <div className="text-sm font-medium text-gray-900 mt-1">
            {formatDate(project.completion_date)}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-6">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link href={`/portfolio/${project.slug}`} className="flex-1">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm hover:shadow-md transition-all duration-300"
            >
              Lihat Detail
            </Button>
          </Link>
          {project.project_url && (
            <Link href={project.project_url} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 font-medium transition-all duration-300"
              >
                Kunjungi Site
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard