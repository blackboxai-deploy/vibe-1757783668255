import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Zathaya Soft - Professional Web Development Solutions',
    template: '%s | Zathaya Soft'
  },
  description: 'Zathaya Soft adalah perusahaan pengembangan website profesional yang mengkhususkan diri dalam solusi Drupal dan ReactJS. Kami menyediakan layanan web development, e-commerce, dan aplikasi custom untuk bisnis Anda.',
  keywords: [
    'web development',
    'drupal development',
    'reactjs development',
    'website company',
    'e-commerce development',
    'custom web solutions',
    'indonesia web developer',
    'jakarta web development',
    'professional website',
    'cms development'
  ],
  authors: [{ name: 'Zathaya Soft' }],
  creator: 'Zathaya Soft',
  publisher: 'Zathaya Soft',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://zathayasoft.com',
    siteName: 'Zathaya Soft',
    title: 'Zathaya Soft - Professional Web Development Solutions',
    description: 'Solusi pengembangan website profesional dengan teknologi Drupal dan ReactJS untuk kebutuhan bisnis Anda.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zathaya Soft - Web Development Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zathayasoft',
    creator: '@zathayasoft',
    title: 'Zathaya Soft - Professional Web Development Solutions',
    description: 'Solusi pengembangan website profesional dengan teknologi Drupal dan ReactJS untuk kebutuhan bisnis Anda.',
    images: ['/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-site-verification',
  },
  alternates: {
    canonical: 'https://zathayasoft.com',
    languages: {
      'id-ID': 'https://zathayasoft.com',
      'en-US': 'https://zathayasoft.com/en',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${inter.variable} ${openSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Zathaya Soft",
              "description": "Professional web development company specializing in Drupal and ReactJS solutions",
              "url": "https://zathayasoft.com",
              "logo": "https://zathayasoft.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+62-21-1234-5678",
                "contactType": "customer service",
                "availableLanguage": ["Indonesian", "English"]
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Sudirman No. 123",
                "addressLocality": "Jakarta",
                "addressRegion": "DKI Jakarta",
                "postalCode": "12190",
                "addressCountry": "ID"
              },
              "sameAs": [
                "https://linkedin.com/company/zathayasoft",
                "https://twitter.com/zathayasoft",
                "https://facebook.com/zathayasoft"
              ],
              "foundingDate": "2020",
              "knowsAbout": ["Web Development", "Drupal", "ReactJS", "E-commerce", "Custom Software"],
              "areaServed": {
                "@type": "Country",
                "name": "Indonesia"
              }
            }),
          }}
        />
      </head>
      <body className="font-open-sans antialiased bg-white text-gray-900 overflow-x-hidden">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}