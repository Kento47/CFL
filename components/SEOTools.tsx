
// Design by suritargets

import React, { useEffect } from 'react';
import { SEOSettings } from '../types';

interface Props {
  settings: SEOSettings;
  pagePath: string;
}

const SEOTools: React.FC<Props> = ({ settings, pagePath }) => {
  const fullUrl = `${window.location.origin}${window.location.pathname}#${pagePath}`;

  useEffect(() => {
    // Update Document Title
    document.title = settings.title || 'Caribbean Freight Logisticss';

    // Update Meta Tags
    const updateMeta = (name: string, content: string, property: boolean = false) => {
      let el = document.querySelector(property ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (property) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content || '');
    };

    updateMeta('description', settings.description);
    updateMeta('keywords', settings.keywords);
    
    // Open Graph
    updateMeta('og:title', settings.title, true);
    updateMeta('og:description', settings.description, true);
    updateMeta('og:url', fullUrl, true);
    updateMeta('og:type', 'website', true);
    if (settings.shareImage) {
      updateMeta('og:image', settings.shareImage, true);
    }
  }, [settings, fullUrl]);

  // Return null to hide the UI component as requested
  return null;
};

export default SEOTools;
