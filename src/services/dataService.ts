import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface ProductItem {
  id: string;
  name: string;
  domain: string;
  description?: string;
  image: string;
  showOnLanding?: boolean;
  createdAt: number;
}

export interface PortfolioItem {
  id: string;
  name: string;
  domain: string;
  description?: string;
  image: string;
  category?: string;
  showOnLanding?: boolean;
  createdAt: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  company?: string;
  createdAt: number;
  read?: boolean;
}

export interface VisibilitySettings {
  pages: {
    about: boolean;
    products: boolean;
    services: boolean;
    portfolio: boolean;
    contact: boolean;
  };
  sections: {
    aboutSection: boolean;
    servicesSection: boolean;
    portfolioSection: boolean;
    productsSection: boolean;
    statsBar: boolean;
  };
}

const PRODUCTS_STORAGE_KEY = 'devtasoft_admin_products_v4';
const PORTFOLIO_STORAGE_KEY = 'devtasoft_admin_portfolio_v5';
const VISIBILITY_STORAGE_KEY = 'devtasoft_admin_visibility_v1';
const MESSAGES_STORAGE_KEY = 'devtasoft_admin_messages_v2';

const defaultVisibility: VisibilitySettings = {
  pages: {
    about: true,
    products: true,
    services: true,
    portfolio: true,
    contact: true,
  },
  sections: {
    aboutSection: true,
    servicesSection: true,
    portfolioSection: true,
    productsSection: true,
    statsBar: true,
  },
};

const defaultMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Sarah Connor',
    email: 'sarah.c@techventure.io',
    company: 'TechVenture Inc.',
    phone: '+1 (555) 234-5678',
    subject: 'Custom Web & Mobile App Development Quote',
    message: 'Hello DevtaSoft team! We are looking for an experienced engineering team to build a high-performance SaaS platform and mobile application for our logistics network. Could we schedule a call to discuss our scope and roadmap?',
    createdAt: Date.now() - 3600000 * 4,
    read: false,
  },
  {
    id: 'msg-2',
    name: 'Michael Vance',
    email: 'm.vance@apexretail.com',
    company: 'Apex Retail Solutions',
    phone: '+92 300 1234567',
    subject: 'Shopify Store Customization & Speed Optimization',
    message: 'Hi! We loved your work on the cosme.store project. We have an existing e-commerce storefront with high traffic that needs custom checkout integrations and speed optimizations. Please send over your portfolio & pricing tiers.',
    createdAt: Date.now() - 3600000 * 18,
    read: true,
  },
];


// All 15 Pre-existing Products
const defaultProducts: ProductItem[] = [
  {
    id: 'repostseo',
    name: 'REPOSTSEO',
    domain: 'https://repostseo.com',
    description: 'Plagiarism remover and content reposter with AI-powered rewriting.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 150000,
  },
  {
    id: 'editpad',
    name: 'Editpad',
    domain: 'https://editpad.org',
    description: 'Online text editor for writing, editing, and managing text content.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 140000,
  },
  {
    id: 'allmath',
    name: 'AllMath',
    domain: 'https://allmath.com',
    description: 'Smart math solver and calculator for students and engineers.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 130000,
  },
  {
    id: 'calculators',
    name: 'Calculators.tech',
    domain: 'https://calculators.tech',
    description: 'Collection of free online calculators for fast everyday calculations.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 120000,
  },
  {
    id: 'dapachecker',
    name: 'DA PA Checker',
    domain: 'https://dapachecker.com',
    description: 'Check Domain Authority and Page Authority instantly.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 110000,
  },
  {
    id: 'summarizer',
    name: 'SUMMARIZER',
    domain: 'https://summarizer.org',
    description: 'Summarize long articles and text into short, clear content.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 100000,
  },
  {
    id: 'notepad',
    name: 'Online Notepad',
    domain: 'https://onlinenotepad.io',
    description: 'Quick and simple online notepad for your notes.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 90000,
  },
  {
    id: 'lcmcalc',
    name: 'LCM Calculator',
    domain: 'https://lcmcalculator.dev',
    description: 'Find LCM of numbers quickly and accurately.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 80000,
  },
  {
    id: 'utilities',
    name: 'Utilities Online',
    domain: 'https://utilitiesonline.info',
    description: 'Free essential online tools in one convenient place.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 70000,
  },
  {
    id: 'imagetotext',
    name: 'Image To Text',
    domain: 'https://imagetotext.info',
    description: 'Extract text from images using AI OCR technology.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 60000,
  },
  {
    id: 'pdfaword',
    name: 'PDF A WORD',
    domain: 'https://pdfaword.com',
    description: 'Convert PDF files to editable Word documents instantly.',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 50000,
  },
  {
    id: 'aiessay',
    name: 'AI Essay Writer',
    domain: 'https://aiessaywriter.com',
    description: 'Generate high-quality essays in seconds with AI.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 40000,
  },
  {
    id: 'invisiblechar',
    name: 'Invisible Character',
    domain: 'https://invisiblecharacter.com',
    description: 'Remove invisible characters from your text.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 30000,
  },
  {
    id: 'aestheticfont',
    name: 'Aesthetic Font',
    domain: 'https://aestheticfont.com',
    description: 'Beautiful and stylish fonts for your design projects.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 20000,
  },
  {
    id: 'numblee',
    name: 'Numblee',
    domain: 'https://numblee.com',
    description: 'Smart math game & brain trainer for all ages.',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 10000,
  },
];

// All 22 Pre-existing Portfolio Projects
const defaultPortfolio: PortfolioItem[] = [
  {
    id: 'cosme-store',
    name: 'cosme.store',
    domain: 'https://cosme.store',
    description: 'Luxury cosmetics, makeup, face washes, and perfume e-commerce storefront with custom shade finder and instant checkout.',
    image: '/cosme.png',
    category: 'Shopify Store Development',
    showOnLanding: true,
    createdAt: Date.now() - 220000,
  },
  {
    id: 'quikeat-com',
    name: 'QuikEat.com',
    domain: 'https://quikeat.com',
    description: 'Online restaurant ordering & dining reservation website with digital menu, table booking, and real-time delivery tracking.',
    image: '/quik.png',
    category: 'Web Development',
    showOnLanding: true,
    createdAt: Date.now() - 210000,
  },
  {
    id: 'lms-software',
    name: 'LMS Software',
    domain: 'https://lms.devtasoft.com',
    description: 'Enterprise Learning Management System with automated course builder, student analytics dashboard, live class streaming, and automated grading.',
    image: '/lms.png',
    category: 'Custom Software Development',
    showOnLanding: true,
    createdAt: Date.now() - 200000,
  },
  {
    id: 'plservices-co',
    name: 'Plservices.co',
    domain: 'https://plservices.co',
    description: 'Professional handyman & home maintenance service portal with instant quote builder, online booking system, and technician dispatch tracking.',
    image: '/pl.png',
    category: 'Web Development',
    showOnLanding: true,
    createdAt: Date.now() - 190000,
  },
  {
    id: 'nexflow-com',
    name: 'nexflow.com',
    domain: 'https://nexflow.com',
    description: 'Plumbing & commercial piping contractor web platform with instant booking, emergency service dispatch, and service estimate calculator.',
    image: '/nexf.png',
    category: 'Web Development',
    showOnLanding: true,
    createdAt: Date.now() - 180000,
  },
  {
    id: 'ironclad-co',
    name: 'ironclad.co',
    domain: 'https://ironclad.co',
    description: 'Commercial & residential roofing contractor digital platform with instant estimate calculator, project portfolio, and inspection scheduling.',
    image: '/icr.png',
    category: 'Web Development',
    showOnLanding: true,
    createdAt: Date.now() - 170000,
  },
  {
    id: 'greendoors-com',
    name: 'GreenDoors.com',
    domain: 'https://greendoors.com',
    description: 'Luxury hotel booking & hospitality web portal with real-time reservation management, room customization, and instant payment integration.',
    image: '/hw1.png',
    category: 'Web Development',
    showOnLanding: true,
    createdAt: Date.now() - 160000,
  },
  {
    id: 'nexcojapan-com',
    name: 'nexcojapan.com',
    domain: 'https://nexcojapan.com',
    description: 'Global Japanese vehicle sourcing & auction portal with real-time bidding system and container shipping tracking.',
    image: '/nexcoj.png',
    category: 'Web Development',
    showOnLanding: true,
    createdAt: Date.now() - 150000,
  },
  {
    id: 'logistics-fleet-management',
    name: 'Logistics Fleet Management',
    domain: 'https://fleet-management.devtasoft.com',
    description: 'Real-time GPS tracking and fleet dispatch management software.',
    image: '/lfm.png',
    category: 'Custom Software Development',
    showOnLanding: true,
    createdAt: Date.now() - 140000,
  },
  {
    id: 'mirrormate-com',
    name: 'mirrormate.com',
    domain: 'https://mirrormate.com',
    description: 'Custom mirror framing and home decor e-commerce platform.',
    image: '/mirrorm.png',
    category: 'Shopify Store Development',
    createdAt: Date.now() - 130000,
  },
  {
    id: 'sarastore-pk',
    name: 'sarastore.pk',
    domain: 'https://sarastore.pk',
    description: 'High-performance custom WordPress & WooCommerce e-commerce platform built for SaraStore with instant search and custom payment checkout.',
    image: '/sspc.png',
    category: 'WordPress Development',
    createdAt: Date.now() - 120000,
  },
  {
    id: 'boxwala-pk',
    name: 'boxwala.pk',
    domain: 'https://boxwala.pk',
    description: 'Custom packaging boxes and product packaging solution e-commerce platform.',
    image: '/boxwala.png',
    category: 'WordPress Development',
    createdAt: Date.now() - 110000,
  },
  {
    id: 'hafiztalha-com',
    name: 'hafiztalha.com',
    domain: 'https://hafiztalha.com',
    description: 'Personalized online Quran learning portal with live audio & video sessions.',
    image: '/hafiztalha.png',
    category: 'WordPress Development',
    createdAt: Date.now() - 100000,
  },
  {
    id: 'trendfits-net',
    name: 'trendfits.net',
    domain: 'https://trendfits.net',
    description: 'Fashion e-commerce apparel storefront for TrendFits.',
    image: '/trendfits.png',
    category: 'WordPress Development',
    createdAt: Date.now() - 90000,
  },
  {
    id: 'shortconverter-com',
    name: 'shortconverter.com',
    domain: 'https://shortconverter.com',
    description: 'Lightning-fast media conversion and online video utility web platform built with React, Next.js, and browser WebAssembly.',
    image: '/shortc.png',
    category: 'Web Development',
    createdAt: Date.now() - 80000,
  },
  {
    id: 'coursepro-today',
    name: 'coursepro.today',
    domain: 'https://coursepro.today',
    description: 'Online learning and digital course platform for CoursePro.',
    image: '/coursepro.png',
    category: 'Web Development',
    createdAt: Date.now() - 70000,
  },
  {
    id: 'lookingglassacademy-net',
    name: 'lookingglassacademy.net',
    domain: 'https://lookingglassacademy.net',
    description: 'Educational academy portal and online learning platform.',
    image: '/lga.png',
    category: 'Web Development',
    createdAt: Date.now() - 60000,
  },
  {
    id: 'pos-software',
    name: 'POS Software',
    domain: 'https://pos-software.devtasoft.com',
    description: 'All-in-one retail POS and inventory management software with offline receipt printing.',
    image: '/possw.png',
    category: 'Custom Software Development',
    createdAt: Date.now() - 50000,
  },
  {
    id: 'coffee-shop-pos',
    name: 'Coffee Shop POS',
    domain: 'https://coffeeshop-pos.devtasoft.com',
    description: 'Custom order management and point of sale solution for coffee shops.',
    image: '/coffeesp.png',
    category: 'Custom Software Development',
    createdAt: Date.now() - 40000,
  },
  {
    id: 'essence-vault-fragrances',
    name: 'Essence Vault Fragrances',
    domain: 'https://theessencevault.com',
    description: 'Luxury fragrance and perfume e-commerce storefront.',
    image: '/evf.png',
    category: 'Shopify Store Development',
    createdAt: Date.now() - 30000,
  },
  {
    id: 'oakcha-fragrances',
    name: 'OAKCHA Fragrances',
    domain: 'https://oakcha.com',
    description: 'Artisanal fragrance e-commerce store for OAKCHA Perfumes.',
    image: '/of.png',
    category: 'Shopify Store Development',
    createdAt: Date.now() - 20000,
  },
  {
    id: 'herman-miller',
    name: 'HermanMiller',
    domain: 'https://hermanmiller.com',
    description: 'Iconic furniture brand luxury digital store & ergonomic showcase.',
    image: '/hm.png',
    category: 'Shopify Store Development',
    createdAt: Date.now() - 10000,
  },
];

const notifyDataChanged = () => {
  window.dispatchEvent(new Event('devtasoft-data-changed'));
};

const mysqlApiUrl = ((import.meta as any).env?.VITE_MYSQL_API_URL || '').replace(/\/$/, '');
const isMysqlConfigured = Boolean(mysqlApiUrl);

// Initial MySQL Sync setup
if (isMysqlConfigured) {
  const syncFromMysql = async () => {
    try {
      const [prodRes, portRes, visRes] = await Promise.all([
        fetch(`${mysqlApiUrl}/products.php`).then((r) => r.json()).catch(() => fetch(`${mysqlApiUrl}/products`).then((r) => r.json())),
        fetch(`${mysqlApiUrl}/portfolio.php`).then((r) => r.json()).catch(() => fetch(`${mysqlApiUrl}/portfolio`).then((r) => r.json())),
        fetch(`${mysqlApiUrl}/visibility.php`).then((r) => r.json()).catch(() => fetch(`${mysqlApiUrl}/visibility`).then((r) => r.json())),
      ]);

      if (Array.isArray(prodRes) && prodRes.length > 0) {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(prodRes));
      }
      if (Array.isArray(portRes) && portRes.length > 0) {
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portRes));
      }
      if (visRes && typeof visRes === 'object') {
        localStorage.setItem(VISIBILITY_STORAGE_KEY, JSON.stringify(visRes));
      }
      notifyDataChanged();
    } catch (err) {
      console.error('MySQL initial fetch error:', err);
    }
  };

  syncFromMysql();
}

// Initial Supabase Sync setup
if (isSupabaseConfigured && supabase) {
  const syncFromSupabase = async () => {
    try {
      const [prodRes, portRes, visRes] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('portfolio').select('*'),
        supabase.from('visibility').select('settings').eq('id', 'settings').single(),
      ]);

      if (!prodRes.error && prodRes.data && prodRes.data.length > 0) {
        const mappedProducts: ProductItem[] = prodRes.data.map((row) => ({
          id: row.id,
          name: row.name,
          domain: row.domain,
          description: row.description || undefined,
          image: row.image,
          showOnLanding: row.show_on_landing,
          createdAt: Number(row.created_at || Date.now()),
        }));
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(mappedProducts));
      }

      if (!portRes.error && portRes.data && portRes.data.length > 0) {
        const mappedPortfolio: PortfolioItem[] = portRes.data.map((row) => ({
          id: row.id,
          name: row.name,
          domain: row.domain,
          description: row.description || undefined,
          image: row.image,
          category: row.category || undefined,
          showOnLanding: row.show_on_landing,
          createdAt: Number(row.created_at || Date.now()),
        }));
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(mappedPortfolio));
      }

      if (!visRes.error && visRes.data?.settings) {
        localStorage.setItem(VISIBILITY_STORAGE_KEY, JSON.stringify(visRes.data.settings));
      }

      notifyDataChanged();
    } catch (err) {
      console.error('Supabase initial fetch error:', err);
    }
  };

  syncFromSupabase();

  // Listen for real-time changes across devices
  supabase
    .channel('devtasoft-db-changes')
    .on('postgres_changes', { event: '*', schema: 'public' }, () => {
      syncFromSupabase();
    })
    .subscribe();
}

export const dataService = {
  getProducts(): ProductItem[] {
    try {
      const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(defaultProducts));
        return defaultProducts;
      }
      const parsed: ProductItem[] = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(defaultProducts));
        return defaultProducts;
      }
      const missingDefaults = defaultProducts.filter(
        (def) => !parsed.some((p) => p.id === def.id || p.name.toLowerCase() === def.name.toLowerCase())
      );
      if (missingDefaults.length > 0) {
        const merged = [...parsed, ...missingDefaults];
        return merged;
      }
      return parsed;
    } catch {
      return defaultProducts;
    }
  },

  saveProduct(data: Omit<ProductItem, 'id' | 'createdAt'>, editId?: string): ProductItem {
    const products = this.getProducts();
    let updatedItem: ProductItem;

    if (editId) {
      const index = products.findIndex((p) => p.id === editId);
      if (index !== -1) {
        updatedItem = {
          ...products[index],
          ...data,
        };
        products[index] = updatedItem;
      } else {
        updatedItem = {
          ...data,
          id: `prod-${Date.now()}`,
          createdAt: Date.now(),
        };
        products.unshift(updatedItem);
      }
    } else {
      updatedItem = {
        ...data,
        id: `prod-${Date.now()}`,
        createdAt: Date.now(),
      };
      products.unshift(updatedItem);
    }

    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
      notifyDataChanged();
    } catch (err) {
      console.error('Failed to save product to storage:', err);
    }

    // Sync to MySQL Database if configured
    if (isMysqlConfigured) {
      fetch(`${mysqlApiUrl}/products.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      }).catch(() => {
        fetch(`${mysqlApiUrl}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        }).catch((err) => console.error('MySQL product save error:', err));
      });
    }

    // Sync to Supabase Cloud Database if configured
    if (isSupabaseConfigured && supabase) {
      supabase
        .from('products')
        .upsert({
          id: updatedItem.id,
          name: updatedItem.name,
          domain: updatedItem.domain,
          description: updatedItem.description || null,
          image: updatedItem.image,
          show_on_landing: updatedItem.showOnLanding !== false,
          created_at: updatedItem.createdAt,
        })
        .then(({ error }) => {
          if (error) console.error('Supabase product save error:', error);
        });
    }

    return updatedItem;
  },

  deleteProduct(id: string): void {
    const products = this.getProducts().filter((p) => p.id !== id);
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
      notifyDataChanged();
    } catch (err) {
      console.error('Failed to delete product from storage:', err);
    }

    if (isMysqlConfigured) {
      fetch(`${mysqlApiUrl}/products.php?id=${id}`, { method: 'DELETE' }).catch(() => {
        fetch(`${mysqlApiUrl}/products/${id}`, { method: 'DELETE' }).catch((err) => console.error('MySQL product delete error:', err));
      });
    }

    if (isSupabaseConfigured && supabase) {
      supabase.from('products').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase product delete error:', error);
      });
    }
  },

  getPortfolio(): PortfolioItem[] {
    try {
      const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(defaultPortfolio));
        return defaultPortfolio;
      }
      const parsed: PortfolioItem[] = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(defaultPortfolio));
        return defaultPortfolio;
      }
      const missingDefaults = defaultPortfolio.filter(
        (def) => !parsed.some((p) => p.id === def.id || p.name.toLowerCase() === def.name.toLowerCase())
      );
      if (missingDefaults.length > 0) {
        const merged = [...parsed, ...missingDefaults];
        return merged;
      }
      return parsed;
    } catch {
      return defaultPortfolio;
    }
  },

  savePortfolio(data: Omit<PortfolioItem, 'id' | 'createdAt'>, editId?: string): PortfolioItem {
    const portfolio = this.getPortfolio();
    let updatedItem: PortfolioItem;

    if (editId) {
      const index = portfolio.findIndex((p) => p.id === editId);
      if (index !== -1) {
        updatedItem = {
          ...portfolio[index],
          ...data,
        };
        portfolio[index] = updatedItem;
      } else {
        updatedItem = {
          ...data,
          id: `port-${Date.now()}`,
          createdAt: Date.now(),
        };
        portfolio.unshift(updatedItem);
      }
    } else {
      updatedItem = {
        ...data,
        id: `port-${Date.now()}`,
        createdAt: Date.now(),
      };
      portfolio.unshift(updatedItem);
    }

    try {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
      notifyDataChanged();
    } catch (err) {
      console.error('Failed to save portfolio item to storage:', err);
    }

    // Sync to MySQL Database if configured
    if (isMysqlConfigured) {
      fetch(`${mysqlApiUrl}/portfolio.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      }).catch(() => {
        fetch(`${mysqlApiUrl}/portfolio`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        }).catch((err) => console.error('MySQL portfolio save error:', err));
      });
    }

    // Sync to Supabase Cloud Database if configured
    if (isSupabaseConfigured && supabase) {
      supabase
        .from('portfolio')
        .upsert({
          id: updatedItem.id,
          name: updatedItem.name,
          domain: updatedItem.domain,
          description: updatedItem.description || null,
          image: updatedItem.image,
          category: updatedItem.category || null,
          show_on_landing: updatedItem.showOnLanding === true,
          created_at: updatedItem.createdAt,
        })
        .then(({ error }) => {
          if (error) console.error('Supabase portfolio save error:', error);
        });
    }

    return updatedItem;
  },

  deletePortfolio(id: string): void {
    const portfolio = this.getPortfolio().filter((p) => p.id !== id);
    try {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
      notifyDataChanged();
    } catch (err) {
      console.error('Failed to delete portfolio item from storage:', err);
    }

    if (isMysqlConfigured) {
      fetch(`${mysqlApiUrl}/portfolio.php?id=${id}`, { method: 'DELETE' }).catch(() => {
        fetch(`${mysqlApiUrl}/portfolio/${id}`, { method: 'DELETE' }).catch((err) => console.error('MySQL portfolio delete error:', err));
      });
    }

    if (isSupabaseConfigured && supabase) {
      supabase.from('portfolio').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase portfolio delete error:', error);
      });
    }
  },

  toggleProductLanding(id: string): ProductItem[] {
    const products = this.getProducts().map((p) => {
      if (p.id === id) {
        return { ...p, showOnLanding: p.showOnLanding === false ? true : false };
      }
      return p;
    });
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    notifyDataChanged();

    if (isSupabaseConfigured && supabase) {
      const updated = products.find((p) => p.id === id);
      if (updated) {
        supabase.from('products').update({ show_on_landing: updated.showOnLanding }).eq('id', id).then();
      }
    }

    return products;
  },

  togglePortfolioLanding(id: string): PortfolioItem[] {
    const portfolio = this.getPortfolio().map((p) => {
      if (p.id === id) {
        return { ...p, showOnLanding: p.showOnLanding === true ? false : true };
      }
      return p;
    });
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
    notifyDataChanged();

    if (isSupabaseConfigured && supabase) {
      const updated = portfolio.find((p) => p.id === id);
      if (updated) {
        supabase.from('portfolio').update({ show_on_landing: updated.showOnLanding }).eq('id', id).then();
      }
    }

    return portfolio;
  },

  getVisibility(): VisibilitySettings {
    try {
      const stored = localStorage.getItem(VISIBILITY_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(VISIBILITY_STORAGE_KEY, JSON.stringify(defaultVisibility));
        return defaultVisibility;
      }
      return JSON.parse(stored);
    } catch {
      return defaultVisibility;
    }
  },

  saveVisibility(settings: VisibilitySettings): void {
    localStorage.setItem(VISIBILITY_STORAGE_KEY, JSON.stringify(settings));
    notifyDataChanged();

    if (isMysqlConfigured) {
      fetch(`${mysqlApiUrl}/visibility.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      }).catch(() => {
        fetch(`${mysqlApiUrl}/visibility`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(settings),
        }).catch((err) => console.error('MySQL visibility save error:', err));
      });
    }

    if (isSupabaseConfigured && supabase) {
      supabase.from('visibility').upsert({ id: 'settings', settings }).then();
    }
  },

  togglePageVisibility(pageKey: keyof VisibilitySettings['pages']): VisibilitySettings {
    const current = this.getVisibility();
    current.pages[pageKey] = !current.pages[pageKey];
    this.saveVisibility(current);
    return current;
  },

  toggleSectionVisibility(sectionKey: keyof VisibilitySettings['sections']): VisibilitySettings {
    const current = this.getVisibility();
    current.sections[sectionKey] = !current.sections[sectionKey];
    this.saveVisibility(current);
    return current;
  },

  async uploadImageToSupabase(file: File): Promise<string | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const ext = file.name.split('.').pop() || 'png';
        const filePath = `mockups/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
        const { data, error } = await supabase.storage.from('devtasoft-assets').upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage.from('devtasoft-assets').getPublicUrl(filePath);
          if (publicUrlData?.publicUrl) {
            return publicUrlData.publicUrl;
          }
        }
      } catch (err) {
        console.error('Supabase Storage upload error:', err);
      }
    }
    return null;
  },

  getMessages(): ContactMessage[] {
    try {
      const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(defaultMessages));
        return defaultMessages;
      }
      const parsed: ContactMessage[] = JSON.parse(stored);
      if (!Array.isArray(parsed)) return defaultMessages;
      return parsed;
    } catch {
      return defaultMessages;
    }
  },

  saveMessage(data: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
    const messages = this.getMessages();
    const newMessage: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      createdAt: Date.now(),
      read: false,
    };
    messages.unshift(newMessage);

    try {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
      notifyDataChanged();
    } catch (err) {
      console.error('Failed to save message to storage:', err);
    }

    if (isSupabaseConfigured && supabase) {
      supabase.from('messages').upsert({
        id: newMessage.id,
        name: newMessage.name,
        email: newMessage.email,
        subject: newMessage.subject || null,
        message: newMessage.message,
        phone: newMessage.phone || null,
        company: newMessage.company || null,
        created_at: newMessage.createdAt,
        read: false,
      }).then();
    }

    if (isMysqlConfigured) {
      fetch(`${mysqlApiUrl}/messages.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      }).catch(() => {
        fetch(`${mysqlApiUrl}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMessage),
        }).catch();
      });
    }

    return newMessage;
  },

  markMessageRead(id: string): void {
    const messages = this.getMessages().map((m) => (m.id === id ? { ...m, read: true } : m));
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    notifyDataChanged();

    if (isSupabaseConfigured && supabase) {
      supabase.from('messages').update({ read: true }).eq('id', id).then();
    }
  },

  deleteMessage(id: string): void {
    const messages = this.getMessages().filter((m) => m.id !== id);
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    notifyDataChanged();

    if (isSupabaseConfigured && supabase) {
      supabase.from('messages').delete().eq('id', id).then();
    }
    if (isMysqlConfigured) {
      fetch(`${mysqlApiUrl}/messages.php?id=${id}`, { method: 'DELETE' }).catch(() => {
        fetch(`${mysqlApiUrl}/messages/${id}`, { method: 'DELETE' }).catch();
      });
    }
  },

  exportDataJSON(): string {
    return JSON.stringify(
      {
        products: this.getProducts(),
        portfolio: this.getPortfolio(),
        visibility: this.getVisibility(),
        messages: this.getMessages(),
      },
      null,
      2
    );
  },

  importDataJSON(jsonStr: string): void {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.products && Array.isArray(parsed.products)) {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(parsed.products));
      }
      if (parsed.portfolio && Array.isArray(parsed.portfolio)) {
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(parsed.portfolio));
      }
      if (parsed.visibility) {
        localStorage.setItem(VISIBILITY_STORAGE_KEY, JSON.stringify(parsed.visibility));
      }
      if (parsed.messages && Array.isArray(parsed.messages)) {
        localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(parsed.messages));
      }
      notifyDataChanged();
    } catch (err) {
      throw new Error('Invalid JSON data format');
    }
  },

  resetToDefaults(): void {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(defaultProducts));
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(defaultPortfolio));
    localStorage.setItem(VISIBILITY_STORAGE_KEY, JSON.stringify(defaultVisibility));
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(defaultMessages));
    notifyDataChanged();
  },

  subscribe(callback: () => void): () => void {
    window.addEventListener('devtasoft-data-changed', callback);
    return () => {
      window.removeEventListener('devtasoft-data-changed', callback);
    };
  },
};
