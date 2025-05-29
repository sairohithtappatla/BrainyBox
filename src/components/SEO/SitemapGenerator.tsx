import { Project } from '@/pages/Index';

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export class SitemapGenerator {
  private baseUrl: string;
  private entries: SitemapEntry[] = [];

  constructor(baseUrl: string = 'https://brainybox-marketplace.com') {
    this.baseUrl = baseUrl;
  }

  addPage(path: string, options: Omit<SitemapEntry, 'url'> = {}) {
    this.entries.push({
      url: `${this.baseUrl}${path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.8,
      ...options
    });
  }

  addProjects(projects: Project[]) {
    projects.forEach(project => {
      this.addPage(`/project/${project.id}`, {
        changefreq: 'monthly',
        priority: 0.6
      });
    });
  }

  generateXML(): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    const urlsetClose = '</urlset>';

    const urls = this.entries.map(entry => {
      return `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>\n` : ''}
    ${entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>\n` : ''}
    ${entry.priority ? `    <priority>${entry.priority}</priority>\n` : ''}
  </url>`;
    }).join('\n');

    return xmlHeader + urlsetOpen + urls + '\n' + urlsetClose;
  }

  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

Sitemap: ${this.baseUrl}/sitemap.xml

# Disallow sensitive areas
Disallow: /admin/
Disallow: /api/
Disallow: /.well-known/

# Crawl delay for bots
Crawl-delay: 1`;
  }

  static generateDefaultSitemap(projects: Project[]): string {
    const generator = new SitemapGenerator();

    // Add main pages
    generator.addPage('/', { priority: 1.0, changefreq: 'daily' });
    generator.addPage('/projects', { priority: 0.9, changefreq: 'daily' });
    generator.addPage('/about', { priority: 0.7, changefreq: 'monthly' });
    generator.addPage('/contact', { priority: 0.6, changefreq: 'monthly' });

    // Add category pages
    const categories = ['PPS', 'OODP', 'APP', 'DSA', 'DBMS', 'AI/ML', 'Cryptography', 'Digital Image Processing', 'Computer Vision', 'FSD', 'Python', 'Java'];
    categories.forEach(category => {
      generator.addPage(`/projects?category=${encodeURIComponent(category)}`, {
        priority: 0.8,
        changefreq: 'weekly'
      });
    });

    // Add individual projects
    generator.addProjects(projects);

    return generator.generateXML();
  }
}