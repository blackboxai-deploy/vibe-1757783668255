import {
  DrupalService,
  DrupalPortfolio,
  DrupalTestimonial,
  DrupalTeamMember,
  DrupalBlogPost,
  DrupalContactForm,
  DrupalApiResponse,
  DrupalSiteSettings,
} from '@/types/drupal';

// Konfigurasi API Drupal
const DRUPAL_BASE_URL = typeof window !== 'undefined' 
  ? 'http://localhost:8080' 
  : process.env.NEXT_PUBLIC_DRUPAL_API_URL || 'http://localhost:8080';
const API_PREFIX = '/jsonapi';

class DrupalApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'DrupalApiError';
  }
}

async function fetchFromDrupal<T>(endpoint: string): Promise<DrupalApiResponse<T>> {
  try {
    const url = `${DRUPAL_BASE_URL}${API_PREFIX}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
      },
      cache: 'force-cache', // Cache for Next.js
    });

    if (!response.ok) {
      throw new DrupalApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        await response.json().catch(() => null)
      );
    }

    const data = await response.json();
    
    return {
      data: data.data || data,
      status: 'success',
      total: data.meta?.count,
    };
  } catch (error) {
    console.error('Drupal API Error:', error);
    
    if (error instanceof DrupalApiError) {
      throw error;
    }
    
    // Return mock data for development/fallback
    return {
      data: getMockData<T>(endpoint),
      status: 'error',
      message: 'Using mock data - API unavailable',
    };
  }
}

// Mock data untuk development tanpa Drupal backend
function getMockData<T>(endpoint: string): T {
  const mockData: Record<string, any> = {
    '/node/service': [
      {
        id: '1',
        title: 'Web Development dengan Drupal',
        description: 'Pembuatan website profesional menggunakan Drupal CMS dengan fitur lengkap dan keamanan tinggi.',
        features: ['Custom Theme Design', 'Responsive Layout', 'SEO Optimization', 'Admin Panel', 'Security Features'],
        price_range: 'Rp 15.000.000 - Rp 50.000.000',
        image_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8d4ae469-d114-4574-8eab-0b829e21bfe1.png',
        slug: 'web-development-drupal',
        created_at: '2024-01-15',
        updated_at: '2024-01-15',
      },
      {
        id: '2',
        title: 'ReactJS Frontend Development',
        description: 'Pengembangan aplikasi web modern dengan ReactJS dan teknologi frontend terkini.',
        features: ['Modern UI/UX', 'Fast Performance', 'Component-based', 'API Integration', 'Cross-browser Support'],
        price_range: 'Rp 10.000.000 - Rp 30.000.000',
        image_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/77fa85aa-a02a-4754-b657-3a52ea4524a6.png',
        slug: 'reactjs-frontend',
        created_at: '2024-01-15',
        updated_at: '2024-01-15',
      },
      {
        id: '3',
        title: 'E-commerce Solutions',
        description: 'Platform e-commerce lengkap dengan sistem pembayaran dan manajemen inventory.',
        features: ['Payment Gateway', 'Inventory Management', 'Order Tracking', 'Customer Portal', 'Analytics'],
        price_range: 'Rp 25.000.000 - Rp 100.000.000',
        image_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d89cc465-25d4-46f2-95cf-e3b4ea4d3dd6.png',
        slug: 'ecommerce-solutions',
        created_at: '2024-01-15',
        updated_at: '2024-01-15',
      },
    ],
    '/node/portfolio': [
      {
        id: '1',
        title: 'PT. Indonesia Digital Solutions',
        description: 'Website corporate dengan portal employee dan sistem manajemen dokumen.',
        client_name: 'PT. Indonesia Digital',
        project_url: 'https://indonesiadigital.co.id',
        technologies: ['Drupal 10', 'ReactJS', 'PostgreSQL', 'Docker'],
        images: ['https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8f8718bf-f921-403e-a3dc-f032d6451825.png'],
        category: 'enterprise',
        completion_date: '2023-12-01',
        slug: 'indonesia-digital-corporate',
      },
      {
        id: '2',
        title: 'Marketplace Fashion Online',
        description: 'Platform marketplace untuk produk fashion dengan fitur multi-vendor.',
        client_name: 'Fashion Hub Indonesia',
        project_url: 'https://fashionhub.id',
        technologies: ['Drupal Commerce', 'ReactJS', 'Stripe API', 'AWS'],
        images: ['https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9a98de9c-7519-4475-84d7-bbb6b4d407c5.png'],
        category: 'ecommerce',
        completion_date: '2024-01-10',
        slug: 'fashion-marketplace',
      },
    ],
    '/node/testimonial': [
      {
        id: '1',
        client_name: 'Budi Santoso',
        client_position: 'IT Manager',
        company: 'PT. Indonesia Digital',
        rating: 5,
        content: 'Zathaya Soft sangat profesional dalam pengembangan website perusahaan kami. Hasil kerja melampaui ekspektasi.',
        avatar_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9868e316-799d-4d5a-ac12-99163ecaca98.png',
        project_title: 'Corporate Website Development',
        created_at: '2024-01-01',
      },
      {
        id: '2',
        client_name: 'Sarah Wijaya',
        client_position: 'Founder',
        company: 'Fashion Hub Indonesia',
        rating: 5,
        content: 'Platform marketplace yang dibuat sangat user-friendly dan performa sangat baik. Highly recommended!',
        avatar_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6130f77d-1def-4cb2-95a1-e3c6e8f94021.png',
        project_title: 'E-commerce Marketplace',
        created_at: '2024-01-05',
      },
    ],
  };

  return mockData[endpoint] || [];
}

// API Service functions
export const drupalApi = {
  // Fetch all services
  async getServices(): Promise<DrupalService[]> {
    const response = await fetchFromDrupal<DrupalService[]>('/node/service');
    return Array.isArray(response.data) ? response.data : [];
  },

  // Fetch service by slug
  async getServiceBySlug(slug: string): Promise<DrupalService | null> {
    try {
      const response = await fetchFromDrupal<DrupalService[]>(`/node/service?filter[field_slug][value]=${slug}`);
      return Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error('Error fetching service by slug:', error);
      return null;
    }
  },

  // Fetch all portfolio items
  async getPortfolio(): Promise<DrupalPortfolio[]> {
    const response = await fetchFromDrupal<DrupalPortfolio[]>('/node/portfolio');
    return Array.isArray(response.data) ? response.data : [];
  },

  // Fetch portfolio by category
  async getPortfolioByCategory(category: string): Promise<DrupalPortfolio[]> {
    const response = await fetchFromDrupal<DrupalPortfolio[]>(`/node/portfolio?filter[field_category][value]=${category}`);
    return Array.isArray(response.data) ? response.data : [];
  },

  // Fetch testimonials
  async getTestimonials(limit = 6): Promise<DrupalTestimonial[]> {
    const response = await fetchFromDrupal<DrupalTestimonial[]>(`/node/testimonial?sort=-created&page[limit]=${limit}`);
    return Array.isArray(response.data) ? response.data : [];
  },

  // Fetch team members
  async getTeamMembers(): Promise<DrupalTeamMember[]> {
    const response = await fetchFromDrupal<DrupalTeamMember[]>('/node/team_member');
    return Array.isArray(response.data) ? response.data : [];
  },

  // Fetch blog posts
  async getBlogPosts(limit = 3): Promise<DrupalBlogPost[]> {
    const response = await fetchFromDrupal<DrupalBlogPost[]>(`/node/article?sort=-created&page[limit]=${limit}`);
    return Array.isArray(response.data) ? response.data : [];
  },

  // Submit contact form
  async submitContactForm(formData: DrupalContactForm): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${DRUPAL_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      return {
        success: true,
        message: 'Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.',
      };
    } catch (error) {
      console.error('Contact form submission error:', error);
      return {
        success: false,
        message: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.',
      };
    }
  },

  // Fetch site settings
  async getSiteSettings(): Promise<DrupalSiteSettings> {
    try {
      const response = await fetchFromDrupal<DrupalSiteSettings>('/config/site_settings');
      return response.data;
    } catch (error) {
      // Return default settings
      return {
        site_name: 'Zathaya Soft',
        site_tagline: 'Professional Web Development Solutions',
        contact_email: 'info@zathayasoft.com',
        contact_phone: '+62 21 1234 5678',
        address: {
          street: 'Jl. Sudirman No. 123',
          city: 'Jakarta',
          state: 'DKI Jakarta',
          zip: '12190',
          country: 'Indonesia',
        },
        social_links: {
          linkedin: 'https://linkedin.com/company/zathayasoft',
          twitter: 'https://twitter.com/zathayasoft',
          facebook: 'https://facebook.com/zathayasoft',
        },
        business_hours: {
          monday_friday: '09:00 - 18:00',
          saturday: '09:00 - 15:00',
          sunday: 'Closed',
        },
      };
    }
  },
};

export { DrupalApiError };