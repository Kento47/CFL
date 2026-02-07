
import React, { useState } from 'react';
import { AppContent } from '../types';
import { Phone, Mail, Clock, MapPin, Send, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

interface Props {
  content: AppContent;
}

const Contact: React.FC<Props> = ({ content }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs currentPage="Contact" />
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Contact Ons</h1>
          <p className="text-lg text-gray-600 font-medium">Heeft u vragen over uw zending? Ons team staat klaar!</p>
          <div className="w-20 h-2 bg-cfl-orange mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
              <h2 className="text-2xl font-black text-cfl-blue mb-8 uppercase tracking-tight">Onze Locaties</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="p-3 bg-blue-50 rounded-xl mr-4 text-cfl-blue">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 uppercase text-sm tracking-widest">Hoofdvestiging (B2B)</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Antwerpseweg 2, 2803 PB Gouda<br />
                      <span className="italic font-bold text-cfl-orange">Uitsluitend op afspraak</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 bg-orange-50 rounded-xl mr-4 text-cfl-orange">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 uppercase text-sm tracking-widest">Nevenvestiging (B2C)</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Nijverheidsstraat 14e, 2984 AH Ridderkerk<br />
                      <span className="italic">Voor alle particuliere zendingen</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 bg-gray-50 rounded-xl mr-4 text-gray-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 uppercase text-sm tracking-widest">Openingstijden Ridderkerk</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Woe t/m Zat: 10:00 – 15:00
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-black text-cfl-blue mb-4 uppercase text-sm tracking-widest">Maak een afspraak</h3>
                  <div className="space-y-4">
                    <a href={`tel:${content.contact.phoneKantoor}`} className="flex items-center text-sm text-gray-700 hover:text-cfl-blue transition-colors font-medium">
                      <Phone className="w-4 h-4 mr-3 text-gray-400" /> Kantoor: {content.contact.phoneKantoor}
                    </a>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Klantenservice (Rays)</p>
                      <a href={`tel:${content.contact.phoneKlantenservice}`} className="flex items-center text-sm text-gray-900 hover:text-cfl-blue transition-colors font-bold mb-2">
                        <Phone className="w-4 h-4 mr-3 text-cfl-blue" /> {content.contact.phoneKlantenservice}
                      </a>
                      <a href={`https://wa.me/${content.contact.whatsapp.replace(/[^0-9]/g, '')}`} className="flex items-center text-sm text-green-600 hover:text-green-700 transition-colors font-bold">
                        <MessageCircle className="w-4 h-4 mr-3" /> WhatsApp Rays
                      </a>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Operationeel (Radj)</p>
                      <a href={`tel:${content.contact.phoneRadj}`} className="flex items-center text-sm text-gray-900 hover:text-cfl-blue transition-colors font-bold">
                        <Phone className="w-4 h-4 mr-3 text-cfl-orange" /> {content.contact.phoneRadj}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
              <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Stuur ons een bericht</h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-2xl text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Bedankt voor uw bericht!</h3>
                  <p>Wij nemen zo spoedig mogelijk contact met u op.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Uw Naam</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cfl-blue focus:border-transparent outline-none transition-all font-medium"
                        placeholder="Naam"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">E-mailadres</label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cfl-blue focus:border-transparent outline-none transition-all font-medium"
                        placeholder="e-mail"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Uw Bericht</label>
                    <textarea 
                      required
                      rows={6}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cfl-blue focus:border-transparent outline-none transition-all resize-none font-medium"
                      placeholder="Hoe kunnen we u helpen?"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full md:w-auto bg-cfl-blue hover:bg-cfl-orange text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center"
                  >
                    Versturen
                    <Send className="ml-3 w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Ridderkerk Map */}
        <div className="mt-12 bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden h-96">
          <div className="w-full h-full bg-gray-100 rounded-[2rem] flex items-center justify-center relative">
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200&h=400" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" alt="Map area" />
             <div className="relative z-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 text-center max-w-sm">
               <div className="w-12 h-12 bg-orange-50 text-cfl-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                 <MapPin className="w-6 h-6" />
               </div>
               <h3 className="font-black text-gray-900 uppercase tracking-tight">Bezoek Ridderkerk</h3>
               <p className="text-sm text-gray-600 mt-2 font-medium">Nijverheidsstraat 14e, 2984 AH Ridderkerk</p>
               <a 
                 href="https://www.google.com/maps/search/?api=1&query=Nijverheidsstraat+14e+Ridderkerk" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="mt-6 inline-block bg-cfl-blue text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-cfl-orange transition-all"
               >
                 Google Maps
               </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
