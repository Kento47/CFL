
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, Ship, Home, Phone, Settings, Calendar, Globe, Search } from 'lucide-react';
import { AppContent } from '../types';

interface Props {
  content: AppContent;
}

const Navbar: React.FC<Props> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setImgError(false);
  }, [content.branding.logoUrl]);

  const navLinks = [
    { name: 'Luchtvracht', path: '/luchtvracht', icon: Plane },
    { name: 'Zeevracht', path: '/zeevracht', icon: Ship },
    { name: 'Afvaartschema', path: '/afvaart-schema', icon: Calendar },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  const hasCustomLogo = content.branding.logoUrl && !imgError;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              {hasCustomLogo ? (
                <div className="h-20 flex items-center">
                  <img 
                    src={content.branding.logoUrl} 
                    alt="Logo" 
                    className="max-h-full w-auto object-contain py-2 transition-transform group-hover:scale-105"
                    onError={() => setImgError(true)}
                  />
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="bg-cfl-blue p-2.5 rounded-2xl text-white group-hover:bg-cfl-orange transition-all shadow-sm flex items-center justify-center">
                    <Globe className="w-8 h-8" />
                  </div>
                  <div className="ml-4 border-l pl-4 border-gray-200">
                    <span className="text-xl font-black text-cfl-blue block leading-none uppercase tracking-tight">
                      {content.branding.companyName || "CARIBBEAN FREIGHT"}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold mt-1 block">LOGISTICS B.V.</span>
                  </div>
                </div>
              )}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive(link.path) 
                    ? 'text-cfl-orange bg-orange-50' 
                    : 'text-gray-600 hover:text-cfl-blue hover:bg-gray-50'
                }`}
              >
                <link.icon className="w-4 h-4 mr-2" />
                {link.name}
              </Link>
            ))}
            
            <a 
              href="https://fms.xmatiq.com/tracking/17" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-cfl-orange text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-md ml-2 whitespace-nowrap"
            >
              <Search className="w-4 h-4 mr-2" />
              Track & Trace
            </a>

            <div className="w-px h-8 bg-gray-200 mx-2"></div>
            <Link to="/admin" className="p-3 text-gray-400 hover:text-cfl-blue hover:bg-gray-50 rounded-xl transition-all" title="Beheer">
              <Settings className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl text-gray-700 hover:text-cfl-blue hover:bg-gray-100 transition-all focus:outline-none"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-2xl animate-fadeIn">
          <div className="px-4 pt-4 pb-6 space-y-2 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-4 rounded-2xl text-lg font-bold transition-all ${
                  isActive(link.path) 
                    ? 'text-cfl-orange bg-orange-50 border-l-4 border-cfl-orange rounded-l-none' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <link.icon className="w-6 h-6 mr-4" />
                {link.name}
              </Link>
            ))}
            
            <a 
              href="https://fms.xmatiq.com/tracking/17" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-4 rounded-2xl text-lg font-black text-white bg-cfl-orange shadow-lg uppercase tracking-widest whitespace-nowrap"
            >
              <Search className="w-6 h-6 mr-4" />
              Track & Trace
            </a>

            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-4 rounded-2xl text-lg font-bold text-gray-400 hover:bg-gray-50 transition-all border-t border-gray-100 mt-4 pt-4"
            >
              <Settings className="w-6 h-6 mr-4" />
              Systeembeheer
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
