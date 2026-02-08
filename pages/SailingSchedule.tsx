
// Design by suritargets

import React from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '../types';
import { Calendar, Ship, MapPin, ArrowRight, AlertCircle } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

interface Props {
  content: AppContent;
}

const SailingSchedule: React.FC<Props> = ({ content }) => {
  // Groepeer afvaarten op basis van bestemming
  const groupedSailings = content.sailingSchedules.reduce((acc: any, sailing) => {
    const dest = sailing.destination || 'Overig';
    if (!acc[dest]) acc[dest] = [];
    acc[dest].push(sailing);
    return acc;
  }, {});

  const destinations = Object.keys(groupedSailings).sort();

  const getDestinationFlag = (name: string) => {
    const airCountry = content.airFreightCountries.find(c => c.name === name);
    if (airCountry) return { url: airCountry.flagUrl, emoji: airCountry.flag };
    
    const seaCountry = content.seaFreightCountries.find(c => c.name === name);
    if (seaCountry) return { url: seaCountry.flagUrl, emoji: seaCountry.flag };
    
    return { url: null, emoji: '🌐' };
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'T.B.A.';
    return new Date(dateStr).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const SailingTable = ({ sailings, title, colorClass }: { sailings: any[], title: string, colorClass: string, key?: string }) => {
    const flag = getDestinationFlag(title.replace('Bestemming ', ''));

    return (
      <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 mb-12 animate-fadeIn">
        <div className={`p-6 ${colorClass} text-white`}>
          <div className="flex items-center">
            <div className="w-10 h-10 mr-4 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center overflow-hidden border border-white/30">
              {flag.url ? (
                <img src={flag.url} alt={title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl">{flag.emoji}</span>
              )}
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight">{title}</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Sluiting</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Vertrek</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Aankomst</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Schip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sailings.length > 0 ? sailings.sort((a,b) => new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime()).map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-cfl-orange text-sm uppercase tracking-tighter">Deadline</span>
                      <span className="font-bold text-gray-900">{formatDate(s.closingDate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Vessel Depart</span>
                      <span className="text-gray-700 font-bold">{formatDate(s.departureDate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Estimated Arrival</span>
                      <span className="text-gray-700 font-medium">{formatDate(s.arrivalDate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="px-4 py-2 bg-gray-100 rounded-xl inline-block">
                       <span className="text-cfl-blue text-xs font-black uppercase tracking-widest">{s.vessel || 'T.B.A.'}</span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-medium">
                    Geen geplande afvaarten gevonden voor deze bestemming.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs currentPage="Afvaartschema" />

        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="p-4 bg-cfl-blue rounded-2xl text-white shadow-xl mb-6 md:mb-0 md:mr-6">
            <Calendar className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Afvaartschema</h1>
            <p className="text-lg text-gray-600 mt-2">Actuele planning voor onze zeevracht verbindingen naar de Caribbean.</p>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl mb-12 flex items-start shadow-sm">
          <AlertCircle className="w-6 h-6 text-cfl-orange mr-4 mt-1 flex-shrink-0" />
          <p className="text-orange-900 leading-relaxed font-medium text-sm">
            <strong>Let op:</strong> Alle data zijn indicatief en kunnen veranderen. Wij adviseren om goederen tijdig aan te leveren vóór de genoemde sluitingsdatum. 
            Voor zendingen naar eilanden die niet in het schema staan kunt u contact met ons opnemen.
          </p>
        </div>

        {destinations.length > 0 ? (
          destinations.map((dest, index) => (
            <SailingTable 
              key={dest}
              sailings={groupedSailings[dest]} 
              title={`Bestemming ${dest}`} 
              colorClass={index % 2 === 0 ? "bg-cfl-blue" : "bg-cfl-orange"} 
            />
          ))
        ) : (
          <div className="bg-white p-20 rounded-3xl text-center shadow-sm border border-gray-100">
             <Ship className="w-16 h-16 text-gray-200 mx-auto mb-6" />
             <p className="text-gray-400 text-xl font-bold">Er zijn momenteel geen afvaarten gepland.</p>
          </div>
        )}

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Direct reserveren of vragen?</h3>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto font-medium">Onze experts helpen u graag met het inplannen van uw zending naar welke bestemming dan ook.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="bg-cfl-blue text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-cfl-orange transition-all shadow-lg">
                Neem contact op
              </Link>
              <Link to="/zeevracht" className="bg-gray-100 text-gray-700 px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">
                Meer over Zeevracht
              </Link>
            </div>
          </div>
          <Ship className="absolute -bottom-10 -right-10 w-48 h-48 text-gray-50 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default SailingSchedule;
