
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '../types';
import { Plane, Ship, CheckCircle2, Globe2, ArrowRight, ShieldCheck, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import SEOTools from '../components/SEOTools';

interface Props {
  content: AppContent;
}

const Home: React.FC<Props> = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = content.branding.heroImages || [];

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="animate-fadeIn">
      {/* SEO Logic (Invisible) */}
      <SEOTools settings={content.seo.home} pagePath="/" />

      {/* Hero Section Slider */}
      <section className="relative h-[650px] flex items-center overflow-hidden bg-gray-900">
        {heroImages.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 z-0 transition-all duration-1000 ease-in-out transform ${
              idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
            <img 
              src={img} 
              className="w-full h-full object-cover"
              alt={`Freight background ${idx + 1}`}
            />
          </div>
        ))}

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-fadeIn">
              {content.heroTitle.split(' ').map((word, i) => i === content.heroTitle.split(' ').length - 1 ? <span key={i} className="text-cfl-orange">{word} </span> : word + ' ')}
            </h1>
            <p className="text-xl mb-10 text-gray-100 leading-relaxed font-medium">
              {content.heroText}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="bg-cfl-orange hover:bg-orange-600 text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all transform hover:scale-105 shadow-xl flex items-center"
              >
                Maak een afspraak
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/diensten" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/30 px-10 py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center"
              >
                Onze Diensten
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Navigation */}
        {heroImages.length > 1 && (
          <>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-cfl-orange w-8' : 'bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Ga naar slide ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all backdrop-blur-sm md:flex hidden"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all backdrop-blur-sm md:flex hidden"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}
      </section>

      {/* Stats/Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="group">
              <div className="w-20 h-20 bg-blue-50 text-cfl-blue rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all group-hover:bg-cfl-blue group-hover:text-white shadow-sm">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-3">20 Jaar Ervaring</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Expertise waarop u kunt vertrouwen voor al uw internationale zendingen.</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 bg-orange-50 text-cfl-orange rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all group-hover:bg-cfl-orange group-hover:text-white shadow-sm">
                <Globe2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-3">Wereldwijd Netwerk</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Specialisatie in Suriname en de Caribbean, maar actief over de hele wereld.</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 bg-blue-50 text-cfl-blue rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all group-hover:bg-cfl-blue group-hover:text-white shadow-sm">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-3">Snelle Levering</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Geoptimaliseerde routes voor de kortste doorlooptijden naar Paramaribo en Willemstad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Import & Export Content */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">Import & Export</h2>
            <div className="w-24 h-2 bg-cfl-orange mx-auto mb-8 rounded-full"></div>
            <p className="max-w-3xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
              {content.importExportText}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Luchtvracht Box */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-blue-100 transition-all group border border-gray-100 flex flex-col">
              <div className="p-10 flex-grow">
                <div className="flex items-center mb-8">
                  <div className="p-5 bg-blue-600 text-white rounded-2xl shadow-xl group-hover:bg-cfl-blue transition-all transform group-hover:rotate-6">
                    <Plane className="w-10 h-10" />
                  </div>
                  <h3 className="ml-6 text-3xl font-black text-gray-900 uppercase tracking-tight">Luchtvracht</h3>
                </div>
                <p className="text-gray-500 mb-10 text-lg leading-relaxed font-medium">
                  {content.airFreightIntro}
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center text-gray-600 font-bold">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-4" /> Wekelijkse vluchten naar Suriname
                  </div>
                  <div className="flex items-center text-gray-600 font-bold">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-4" /> Snelle afhandeling in Curaçao
                  </div>
                </div>
              </div>
              <div className="p-10 bg-gray-50 border-t border-gray-100">
                <Link to="/luchtvracht" className="inline-flex items-center font-black uppercase tracking-widest text-sm text-cfl-blue hover:text-cfl-orange transition-all">
                  Onze Tarieven Bekijken <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Zeevracht Box */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-orange-100 transition-all group border border-gray-100 flex flex-col">
              <div className="p-10 flex-grow">
                <div className="flex items-center mb-8">
                  <div className="p-5 bg-cfl-blue text-white rounded-2xl shadow-xl group-hover:bg-cfl-orange transition-all transform group-hover:-rotate-6">
                    <Ship className="w-10 h-10" />
                  </div>
                  <h3 className="ml-6 text-3xl font-black text-gray-900 uppercase tracking-tight">Zeevracht</h3>
                </div>
                <p className="text-gray-500 mb-10 text-lg leading-relaxed font-medium">
                  {content.seaFreightIntro}
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center text-gray-600 font-bold">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-4" /> Full-container & Groupage zendingen
                  </div>
                  <div className="flex items-center text-gray-600 font-bold">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-4" /> Gecertificeerde logistieke processen
                  </div>
                </div>
              </div>
              <div className="p-10 bg-gray-50 border-t border-gray-100">
                <Link to="/zeevracht" className="inline-flex items-center font-black uppercase tracking-widest text-sm text-cfl-blue hover:text-cfl-orange transition-all">
                  Alles over Zeevracht <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-32 bg-cfl-blue relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 -mr-24 -mt-24 pointer-events-none">
          <Globe2 className="w-[500px] h-[500px] text-white" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-light italic text-white mb-10 leading-snug">
            "Onze ervaring is uw voordeel!! Wij maken het verschil in logistiek naar de Caribbean."
          </h2>
          <div className="h-2 w-32 bg-cfl-orange mx-auto rounded-full shadow-lg shadow-orange-900/40"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
