'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { DrupalContactForm } from '@/types/drupal'
import { drupalApi } from '@/lib/drupal-api'
import LoadingSpinner from './LoadingSpinner'

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<DrupalContactForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_interest: '',
    budget_range: '',
    project_timeline: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const [errors, setErrors] = useState<Partial<DrupalContactForm>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<DrupalContactForm> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid'
    }

    if (!formData.service_interest) {
      newErrors.service_interest = 'Pilih layanan yang diminati'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Pesan wajib diisi'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Pesan minimal 10 karakter'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof DrupalContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const result = await drupalApi.submitContactForm(formData)

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        })
        
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service_interest: '',
          budget_range: '',
          project_timeline: '',
          message: '',
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Terjadi kesalahan sistem. Silakan coba lagi nanti.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border border-gray-200 shadow-lg">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-inter font-bold text-gray-900">
          Konsultasi Gratis
        </CardTitle>
        <CardDescription className="text-gray-600 leading-relaxed">
          Ceritakan kebutuhan project Anda kepada kami. Tim ahli akan menghubungi Anda 
          dalam 24 jam untuk konsultasi gratis.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {submitStatus.type && (
          <Alert className={`mb-6 ${
            submitStatus.type === 'success' 
              ? 'border-green-200 bg-green-50' 
              : 'border-red-200 bg-red-50'
          }`}>
            <AlertDescription className={
              submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
            }>
              {submitStatus.message}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Nama Lengkap *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`${errors.name ? 'border-red-300 focus:border-red-400' : 'border-gray-300 focus:border-blue-400'}`}
                placeholder="Masukkan nama lengkap"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`${errors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-300 focus:border-blue-400'}`}
                placeholder="nama@email.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                No. Telepon
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="border-gray-300 focus:border-blue-400"
                placeholder="+62 812 3456 7890"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-semibold text-gray-700">
                Perusahaan
              </Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="border-gray-300 focus:border-blue-400"
                placeholder="Nama perusahaan"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Layanan yang Diminati *
            </Label>
            <Select 
              value={formData.service_interest} 
              onValueChange={(value) => handleInputChange('service_interest', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className={`${
                errors.service_interest ? 'border-red-300 focus:border-red-400' : 'border-gray-300 focus:border-blue-400'
              }`}>
                <SelectValue placeholder="Pilih layanan yang Anda butuhkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="drupal-development">Drupal Development</SelectItem>
                <SelectItem value="reactjs-development">ReactJS Development</SelectItem>
                <SelectItem value="ecommerce-solutions">E-commerce Solutions</SelectItem>
                <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                <SelectItem value="custom-solutions">Custom Solutions</SelectItem>
                <SelectItem value="consultation">Konsultasi IT</SelectItem>
              </SelectContent>
            </Select>
            {errors.service_interest && (
              <p className="text-xs text-red-600 mt-1">{errors.service_interest}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Budget Range</Label>
              <Select 
                value={formData.budget_range} 
                onValueChange={(value) => handleInputChange('budget_range', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="border-gray-300 focus:border-blue-400">
                  <SelectValue placeholder="Estimasi budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-10m">Di bawah Rp 10 juta</SelectItem>
                  <SelectItem value="10m-25m">Rp 10 - 25 juta</SelectItem>
                  <SelectItem value="25m-50m">Rp 25 - 50 juta</SelectItem>
                  <SelectItem value="50m-100m">Rp 50 - 100 juta</SelectItem>
                  <SelectItem value="above-100m">Di atas Rp 100 juta</SelectItem>
                  <SelectItem value="discuss">Diskusikan nanti</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Timeline Project</Label>
              <Select 
                value={formData.project_timeline} 
                onValueChange={(value) => handleInputChange('project_timeline', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="border-gray-300 focus:border-blue-400">
                  <SelectValue placeholder="Kapan dimulai?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">Segera (dalam 1 bulan)</SelectItem>
                  <SelectItem value="1-3-months">1-3 bulan ke depan</SelectItem>
                  <SelectItem value="3-6-months">3-6 bulan ke depan</SelectItem>
                  <SelectItem value="6-months-plus">Lebih dari 6 bulan</SelectItem>
                  <SelectItem value="flexible">Fleksibel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
              Detail Project / Pesan *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className={`min-h-[120px] ${
                errors.message ? 'border-red-300 focus:border-red-400' : 'border-gray-300 focus:border-blue-400'
              }`}
              placeholder="Ceritakan detail kebutuhan project Anda. Semakin detail, semakin baik estimasi yang bisa kami berikan."
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-xs text-red-600 mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <LoadingSpinner size="sm" />
                <span>Mengirim Pesan...</span>
              </div>
            ) : (
              'Kirim Pesan'
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center leading-relaxed">
            Dengan mengirim form ini, Anda menyetujui bahwa tim Zathaya Soft dapat menghubungi Anda 
            untuk diskusi project dan penawaran layanan.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactForm