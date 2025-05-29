import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Project } from '@/pages/Index';

interface StructuredDataProps {
  type: 'website' | 'project' | 'organization' | 'breadcrumb';
  data?: any;
  project?: Project;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data, project }) => {
  const generateStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "BrainyBox",
          "alternateName": "BrainyBox Student Project Marketplace",
          "description": "The ultimate student project marketplace for computer science engineering students",
          "url": "https://brainybox-marketplace.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://brainybox-marketplace.com/projects?search={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://github.com/brainybox-dev",
            "https://linkedin.com/company/brainybox",
            "https://twitter.com/brainybox_dev"
          ]
        };

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BrainyBox",
          "legalName": "BrainyBox Student Solutions",
          "description": "Educational technology company providing programming projects and learning resources for computer science students",
          "url": "https://brainybox-marketplace.com",
          "logo": "https://brainybox-marketplace.com/logo.png",
          "foundingDate": "2024",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "India"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-XXXXXXXXXX",
            "contactType": "customer service",
            "availableLanguage": ["English", "Hindi"]
          },
          "sameAs": [
            "https://github.com/brainybox-dev",
            "https://linkedin.com/company/brainybox",
            "https://twitter.com/brainybox_dev"
          ]
        };

      case 'project':
        if (!project) return null;
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": project.title,
          "description": project.description,
          "applicationCategory": "Educational Software",
          "programmingLanguage": project.tags,
          "creator": {
            "@type": "Organization",
            "name": "BrainyBox"
          },
          "offers": {
            "@type": "Offer",
            "price": "Free",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "operatingSystem": "Cross-platform",
          "softwareRequirements": project.tags.join(', ')
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data || []
        };

      default:
        return null;
    }
  };

  const structuredData = generateStructuredData();

  if (!structuredData) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;