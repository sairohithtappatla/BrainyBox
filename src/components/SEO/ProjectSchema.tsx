import React from 'react';
import { Project } from '@/pages/Index';

interface ProjectSchemaProps {
  project: Project;
}

const ProjectSchema: React.FC<ProjectSchemaProps> = ({ project }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.title,
    "description": project.description,
    "programmingLanguage": project.tags,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "999",
      "priceCurrency": "INR"
    },
    "author": {
      "@type": "Organization",
      "name": "BrainyBox"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default ProjectSchema;