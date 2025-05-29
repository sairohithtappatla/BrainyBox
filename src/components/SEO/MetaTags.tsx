import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title = "BrainyBox - Student Project Marketplace | 300+ Programming Projects",
  description = "Discover 300+ academic programming projects for CSE students. AI/ML, Web Development, Python, Java, Data Structures, Algorithms, and more. Perfect for college assignments and learning.",
  keywords = ["programming projects", "student projects", "CSE projects", "computer science", "academic projects", "coding", "software development", "AI projects", "web development", "Python projects", "Java projects"],
  image = "https://brainybox-marketplace.com/og-image.jpg",
  url = "https://brainybox-marketplace.com",
  type = "website",
  author = "BrainyBox Team",
  publishedTime,
  modifiedTime
}) => {
  const fullTitle = title.includes('BrainyBox') ? title : `${title} | BrainyBox`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="BrainyBox" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@brainybox_dev" />
      <meta name="twitter:creator" content="@brainybox_dev" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#c3073f" />
      <meta name="msapplication-TileColor" content="#c3073f" />
      <meta name="application-name" content="BrainyBox" />

      {/* Article Meta Tags (for blog posts/project pages) */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default MetaTags;