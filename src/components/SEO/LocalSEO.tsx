// Add local SEO if targeting specific regions
const LocalSEO = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BrainyBox",
    "description": "Premium programming projects marketplace",
    "url": "https://brainybox.netlify.app",
    "serviceArea": "Worldwide",
    "potentialAction": {
      "@type": "BuyAction",
      "target": "https://brainybox.netlify.app/projects"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};