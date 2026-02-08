
// Design by suritargets

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUp, MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Youtube, MessageCircle, Share2, Twitter, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { AppContent } from '../types';

interface Props {
  content: AppContent;
}

const Footer: React.FC<Props> = ({ content }) => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    const fullUrl = `${window.location.origin}${window.location.pathname}#${location.pathname}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.branding.companyName,
          text: content.heroText,
          url: fullUrl,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="w-5 h-5" />;
      case 'Facebook': return <Facebook className="w-5 h-5" />;
      case 'LinkedIn': return <Linkedin className="w-5 h-5" />;
      case 'YouTube': return <Youtube className="w-5 h-5" />;
      case 'WhatsApp': return <MessageCircle className="w-5 h-5" />;
      case 'X': return <Twitter className="w-5 h-5" />;
      default: return <Share2 className="w-5 h-5" />;
    }
  };

  return (
    <footer className="bg-cfl-blue text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-cfl-orange" /> Onze Locaties
            </h3>
            <div className="space-y-6">
              <p className="text-blue-100 text-sm">
                <strong className="text-white">Hoofdvestiging (Gouda):</strong><br />
                Antwerpseweg 2, 2803 PB Gouda<br />
                <span className="text-[10px] opacity-75 italic uppercase tracking-widest font-bold">Uitsluitend op afspraak</span>
              </p>
              <p className="text-blue-100 text-sm">
                <strong className="text-white">Nevenvestiging (Ridderkerk):</strong><br />
                Nijverheidsstraat 14e, 2984 AH Ridderkerk<br />
                <span className="text-[10px] opacity-75 italic uppercase tracking-widest font-bold">Woe t/m Zat: 10:00 – 15:00</span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center">
              <Phone className="w-6 h-6 mr-3 text-cfl-orange" /> Contact
            </h3>
            <div className="space-y-4">
              <p className="text-blue-100 text-sm">
                Kantoor: <span className="text-white font-bold">{content.contact.phoneKantoor}</span><br />
                Klantenservice: <span className="text-white font-bold">{content.contact.phoneKlantenservice}</span>
              </p>
              <p className="text-blue-100 text-sm bg-blue-800/50 p-3 rounded-xl inline-block border border-blue-700">
                Radj (Operationeel): <span className="text-cfl-orange font-black">{content.contact.phoneRadj}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-lg font-black uppercase tracking-tight mb-6">Volg ons</h3>
            <div className="flex flex-wrap gap-4 mb-8 md:justify-end">
              {content.socialLinks?.map((link) => (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/10 hover:bg-cfl-orange p-3 rounded-xl transition-all transform hover:scale-110 shadow-lg"
                  title={link.platform}
                >
                  {getIcon(link.platform)}
                </a>
              ))}
              <a href={`mailto:${content.contact.email}`} className="bg-white/10 hover:bg-cfl-orange p-3 rounded-xl transition-all transform hover:scale-110 shadow-lg" title="E-mail">
                <Mail className="w-5 h-5" />
              </a>
              <button 
                onClick={handleShare}
                className={`${copied ? 'bg-green-500' : 'bg-white/10 hover:bg-cfl-orange'} p-3 rounded-xl transition-all transform hover:scale-110 shadow-lg group relative`}
                title="Deel deze pagina"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-white" /> : <Share2 className="w-5 h-5" />}
                {copied && (
                  <span className="absolute -top-10 right-0 bg-green-600 text-[8px] px-2 py-1 rounded font-black uppercase tracking-widest whitespace-nowrap animate-fadeIn">
                    Link Gekopieerd!
                  </span>
                )}
              </button>
            </div>
            
            <div className="flex flex-col md:items-end space-y-3 mb-8">
              <Link to="/legal/algemene-voorwaarden" className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 hover:text-white transition-colors">Algemene Voorwaarden</Link>
              <Link to="/legal/privacy-policy" className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/legal/terms-of-use" className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 hover:text-white transition-colors">Terms of Use</Link>
            </div>

            <button 
              onClick={scrollToTop}
              className="flex items-center text-xs font-black uppercase tracking-widest text-cfl-orange hover:text-white transition-colors group"
            >
              Back to top
              <ArrowUp className="ml-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
        <div className="border-t border-blue-800/50 pt-8 text-center">
          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} {content.branding.footerCopyrightText || (content.branding.companyName + ' • MADE WITH PRIDE')}
          </p>
          <p className="text-[9px] text-blue-500/60 font-bold uppercase tracking-[0.25em] mt-3">
            Design by suritargets
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
