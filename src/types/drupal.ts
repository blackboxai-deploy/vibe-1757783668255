// TypeScript interfaces untuk data dari Drupal API

export interface DrupalService {
  id: string;
  title: string;
  description: string;
  features: string[];
  price_range: string;
  image_url: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface DrupalPortfolio {
  id: string;
  title: string;
  description: string;
  client_name: string;
  project_url?: string;
  technologies: string[];
  images: string[];
  category: string;
  completion_date: string;
  slug: string;
}

export interface DrupalTestimonial {
  id: string;
  client_name: string;
  client_position: string;
  company: string;
  rating: number;
  content: string;
  avatar_url?: string;
  project_title?: string;
  created_at: string;
}

export interface DrupalTeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  avatar_url: string;
  specializations: string[];
  social_links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface DrupalBlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  published_date: string;
  category: string;
  tags: string[];
  slug: string;
}

export interface DrupalContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest: string;
  budget_range: string;
  project_timeline: string;
  message: string;
}

export interface DrupalApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  total?: number;
  page?: number;
  per_page?: number;
}

export interface DrupalSiteSettings {
  site_name: string;
  site_tagline: string;
  contact_email: string;
  contact_phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  social_links: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  business_hours: {
    monday_friday: string;
    saturday: string;
    sunday: string;
  };
}

export type ServiceCategory = 'web-development' | 'mobile-apps' | 'e-commerce' | 'custom-solutions';
export type PortfolioCategory = 'web' | 'mobile' | 'ecommerce' | 'enterprise';
export type BudgetRange = 'under-5k' | '5k-15k' | '15k-30k' | '30k-plus';
export type ProjectTimeline = '1-month' | '2-3-months' | '3-6-months' | '6-months-plus';