
// Design by suritargets

import React from 'react';
import { useParams } from 'react-router-dom';
import { AppContent } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';

interface Props {
  content: AppContent;
}

const Legal: React.FC<Props> = ({ content }) => {
  const { type } = useParams<{ type: string }>();

  const getPageData = () => {
    switch (type) {
      case 'algemene-voorwaarden': 
        return { title: 'Algemene Voorwaarden', text: content.legalContent.algemeneVoorwaarden };
      case 'privacy-policy': 
        return { title: 'Privacy Policy', text: content.legalContent.privacyPolicy };
      case 'terms-of-use': 
        return { title: 'Terms of Use', text: content.legalContent.termsOfUse };
      default: 
        return { title: 'Juridische Informatie', text: '' };
    }
  };

  const { title, text } = getPageData();

  return (
    <div className="py-12 bg-gray-50 min-h-screen animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs currentPage={title} />
        
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
          <h1 className="text-3xl font-black text-cfl-blue uppercase tracking-tight mb-8">{title}</h1>
          
          <div className="prose prose-blue max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
            {text || "Geen inhoud gevonden voor deze pagina."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
