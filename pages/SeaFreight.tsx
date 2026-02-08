
// Design by suritargets

import React from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '../types';
import { Ship, Anchor, AlertCircle, Users, Briefcase, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

interface Props {
  content: AppContent;
}

const SeaFreight: React.FC<Props> = ({ content }) => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs currentPage="Zeevracht" />
        
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="p-4 bg-cfl-blue rounded-2xl text-white shadow-lg mb-6 md:mb-0 md:mr-6">
            <Ship className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Zeevracht</h1>
            <p className="text-lg text-gray-600 mt-2">Betrouwbaar en kostenbesparend transport voor grote volumes.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {content.seaFreightIntro}
          </p>
          <div className="flex items-start bg-orange-50 p-4 rounded-xl border border-orange-100">
            <AlertCircle className="w-5 h-5 text-cfl-orange mr-3 mt-1 flex-shrink-0" />
            <p className="text-xs text-orange-800 italic font-medium">
              Vanwege wereldwijde logistieke uitdagingen zijn er continue veranderingen. Wij adviseren u altijd contact op te nemen voor de meest actuele planning.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {content.seaFreightCountries.map((country, index) => {
            const isOrange = index % 2 !== 0;
            return (
              <div key={country.id} className="space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-md relative overflow-hidden border border-gray-100 h-full">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Anchor className="w-24 h-24" />
                  </div>
                  <div className="flex items-center mb-6 border-b-2 border-gray-50 pb-4">
                    <div className="w-12 h-12 mr-3 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                      {country.flagUrl ? (
                        <img src={country.flagUrl} alt={country.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">{country.flag}</span>
                      )}
                    </div>
                    <h2 className={`text-2xl font-black uppercase tracking-tight ${isOrange ? 'text-cfl-orange' : 'text-cfl-blue'}`}>
                      {country.name}
                    </h2>
                  </div>
                  
                  <div className="space-y-8">
                    <section>
                      <div className="flex items-center text-gray-900 font-black uppercase tracking-widest text-[11px] mb-4">
                        <Users className={`w-4 h-4 mr-2 ${isOrange ? 'text-cfl-blue' : 'text-cfl-orange'}`} /> {country.type}
                      </div>
                      <ul className="space-y-4 text-gray-600">
                        {country.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start text-sm leading-relaxed">
                            <ChevronRight className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${isOrange ? 'text-cfl-orange' : 'text-cfl-blue'}`} /> 
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-8 bg-gray-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-black uppercase tracking-tight">Container verschepen?</h3>
            <p className="text-gray-400 font-medium">Wij bieden FCL (Full Container Load) diensten op maat voor zakelijke klanten.</p>
          </div>
          <Link to="/contact" className="bg-cfl-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl whitespace-nowrap">
            Offerte aanvragen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeaFreight;
