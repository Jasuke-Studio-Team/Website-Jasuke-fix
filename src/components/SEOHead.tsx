import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
}

const SITE_NAME = 'Jasuke Studio';
const BASE_URL = 'https://jasukestudio.netlify.app';
const DEFAULT_DESCRIPTION = 'Jasuke Studio — Game Studio & Creative Outsourcing Hub. We craft immersive games, 3D art, AR/VR experiences, and digital worlds for brands that refuse to be forgotten.';
const DEFAULT_OG_IMAGE = `${BASE_URL}/Asset/logo%20Jasuke%20New.png`;

export function SEOHead({ 
  title, 
  description = DEFAULT_DESCRIPTION, 
  canonicalPath = '/',
  ogImage = DEFAULT_OG_IMAGE,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Game Studio & Outsourcing Hub`;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to set or create a meta tag
    function setMeta(nameOrProperty: string, content: string, isProperty = false) {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, nameOrProperty);
        document.head.appendChild(el);
      }
      el.content = content;
    }

    // Helper to set or create a link tag
    function setLink(rel: string, href: string) {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    }

    // Standard meta
    setMeta('description', description);

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', SITE_NAME, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Canonical
    setLink('canonical', canonicalUrl);
  }, [fullTitle, description, canonicalUrl, ogImage]);

  return null;
}
