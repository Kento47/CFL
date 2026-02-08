
// Design by suritargets

import React from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '../types';
import { Plane, Ship, Calendar, Search, ArrowRight, Globe2 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

interface Props {
  content: AppContent;
}

const Services: React.FC<Props> = ({ content }) => {
  const services = [
    {
      title: 'Luchtvracht',
      description: content.airFreightIntro,
      icon: Plane,
      path: '/luchtvracht',
      color: 'bg-cfl-blue',
      hoverBorder: 'hover:border-cfl-blue'
    },
    {
      title: 'Zeevracht',
      description: content.seaFreightIntro,
      icon: Ship,
      path: '/zeevracht',
      color: 'bg-cfl-orange',
      hoverBorder: 'hover:border-cfl-orange'
    },
    {
      title: 'Afvaartschema',
      description: 'Bekijk onze actuele planning voor zeevracht naar de Caribbean en andere wereldwijde bestemmingen.',
      icon: Calendar,
      path: '/afvaart-schema',
      color: 'bg-cfl-blue',
      hoverBorder: 'hover:border-cfl-blue'
    },
    {
      title: 'Track & Trace',
      description: 'Volg uw zending in real-time met ons geavanceerde tracking systeem. Altijd op de hoogte van de status.',
      icon: Search,
      path: 'https://fms.xmatiq.com/tracking/17',
      isExternal: true,
      color: 'bg-gray-800',
      hoverBorder: 'hover:border-gray-800'
    }
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs currentPage="Onze Diensten" />
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Onze Diensten</h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            Caribbean Freight Logistics biedt een compleet pakket aan logistieke oplossingen voor zowel particulieren als zakelijke klanten.
          </p>
          <div className="w-20 h-2 bg-cfl-orange mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const content = (
              <div className={`bg-white p-10 rounded-[2.5rem] shadow-xl border-2 border-transparent transition-all h-full flex flex-col group ${service.hoverBorder}`}>
                <div className="flex items-center mb-8">
                  <div className={`p-5 ${service.color} text-white rounded-2xl shadow-lg transition-transform group-hover:rotate-6`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="ml-6 text-2xl font-black text-gray-900 uppercase tracking-tight">{service.title}</h3>
                </div>
                <p className="text-gray-500 mb-10 text-lg leading-relaxed font-medium flex-grow">
                  {service.description}
                </p>
                <div className="flex items-center font-black uppercase tracking-widest text-sm text-cfl-blue group-hover:text-cfl-orange transition-colors">
                  Bekijk details <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            );

            return service.isExternal ? (
              <a key={idx} href={service.path} target="_blank" rel="noopener noreferrer" className="block h-full">
                {content}
              </a>
            ) : (
              <Link key={idx} to={service.path} className="block h-full">
                {content}
              </Link>
            );
          })}
        </div>

        {/* Global Network Callout */}
        <div className="bg-cfl-blue p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 opacity-10 -mr-20 -mt-20 pointer-events-none">
            <Globe2 className="w-96 h-96" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6">Expertise in elke zending</h2>
            <p className="text-xl text-blue-100 font-medium leading-relaxed mb-8">
              Of het nu gaat om een klein pakketje naar familie of een volledige container voor uw bedrijf, wij verzorgen het volledige traject van A tot Z. Onze jarenlange ervaring is uw grootste voordeel.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-cfl-orange text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-cfl-orange transition-all shadow-xl">
              Neem contact op voor advies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
