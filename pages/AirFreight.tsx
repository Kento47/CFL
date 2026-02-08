
// Design by suritargets

import React from 'react';
import { AppContent } from '../types';
import { Plane, Info, Calendar, MapPin, Scale } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOTools from '../components/SEOTools';

interface Props {
  content: AppContent;
}

const AirFreight: React.FC<Props> = ({ content }) => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen animate-fadeIn">
      {/* SEO Logic (Invisible) */}
      <SEOTools settings={content.seo.luchtvracht} pagePath="/luchtvracht" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs currentPage="Luchtvracht" />
        
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="p-4 bg-cfl-orange rounded-2xl text-white shadow-lg mb-6 md:mb-0 md:mr-6">
            <Plane className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Luchtvracht</h1>
            <p className="text-lg text-gray-600 mt-2">Snel, efficiënt en wereldwijd transport van uw goederen.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            {content.airFreightIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.airFreightCountries.map((country, index) => {
            const countryRates = content.rates.filter(r => r.destination === country.name);
            const isOrange = index % 2 !== 0;

            return (
              <div key={country.id} className={`bg-white rounded-3xl overflow-hidden shadow-md border-t-4 ${isOrange ? 'border-cfl-orange' : 'border-cfl-blue'}`}>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 mr-3 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                        {country.flagUrl ? (
                          <img src={country.flagUrl} alt={country.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">{country.flag}</span>
                        )}
                      </div>
                      <h2 className={`text-2xl font-bold ${isOrange ? 'text-cfl-orange' : 'text-cfl-blue'}`}>{country.name}</h2>
                    </div>
                    <div className={`${isOrange ? 'bg-orange-50 text-cfl-orange' : 'bg-blue-50 text-cfl-blue'} px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest`}>
                      {country.tagline}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900">Sluitingsdagen</h4>
                        <p className="text-gray-600 text-sm">{country.closingDays}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Info className="w-5 h-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900">Afhandeling</h4>
                        <p className="text-gray-600 text-sm">{country.handlingInfo}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900">Afhandelaar</h4>
                        <p className="text-gray-600 text-sm">{country.handlerName}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center">
                        <Scale className="w-3 h-3 mr-2" /> Tariefinformatie
                      </h4>
                      <div className="space-y-3">
                        {countryRates.map((rate) => (
                          <div key={rate.id} className="flex items-center justify-between border-b border-gray-200/50 pb-2 last:border-0 last:pb-0">
                            <span className="text-xs text-gray-600 font-medium">{rate.label}</span>
                            <span className={`text-lg font-black ${isOrange ? 'text-cfl-orange' : 'text-cfl-blue'}`}>{rate.value}</span>
                          </div>
                        ))}
                        {countryRates.length === 0 && <p className="text-xs text-gray-400 italic">Geen tarieven gevonden.</p>}
                      </div>
                      <p className="text-[9px] text-gray-400 mt-4 italic">{country.footerInfo}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center p-8 bg-blue-600 rounded-3xl text-white shadow-xl relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">Wereldwijde Luchtvracht</h3>
              <p className="text-blue-100 max-w-2xl mx-auto font-medium">
                Naast onze vaste verbindingen verzorgen wij luchttransport naar ELK land ter wereld. Neem contact op voor een offerte op maat.
              </p>
           </div>
           <Plane className="absolute right-0 bottom-0 w-48 h-48 text-white/10 -mr-10 -mb-10 rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default AirFreight;
