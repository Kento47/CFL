
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AirFreight from './pages/AirFreight';
import SeaFreight from './pages/SeaFreight';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import SailingSchedule from './pages/SailingSchedule';
import Legal from './pages/Legal';
import { AppContent } from './types';
import { DEFAULT_CONTENT } from './constants';

const App: React.FC = () => {
  const [content, setContent] = useState<AppContent>(DEFAULT_CONTENT);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const savedContent = localStorage.getItem('cfl_content');
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        // We mergen diep om er zeker van te zijn dat nieuwe velden in DEFAULT_CONTENT 
        // niet ontbreken als een oude versie is opgeslagen
        setContent({ 
          ...DEFAULT_CONTENT, 
          ...parsed,
          branding: { ...DEFAULT_CONTENT.branding, ...parsed.branding },
          contact: { ...DEFAULT_CONTENT.contact, ...parsed.contact },
          seo: { ...DEFAULT_CONTENT.seo, ...parsed.seo }
        });
      }
    } catch (e) {
      console.error("Fout bij laden van opgeslagen content", e);
    }
  }, []);

  useEffect(() => {
    if (content.theme) {
      document.documentElement.style.setProperty('--primary-color', content.theme.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', content.theme.secondaryColor);
    }
  }, [content.theme]);

  const updateContent = (newContent: AppContent) => {
    try {
      setContent(newContent);
      localStorage.setItem('cfl_content', JSON.stringify(newContent));
    } catch (e) {
      console.error("Opslaglimiet bereikt. Gebruik de Export-functie in het beheerpaneel.");
      throw e; // Zodat Admin component dit kan afvangen
    }
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar content={content} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home content={content} />} />
            <Route path="/luchtvracht" element={<AirFreight content={content} />} />
            <Route path="/zeevracht" element={<SeaFreight content={content} />} />
            <Route path="/diensten" element={<Services content={content} />} />
            <Route path="/afvaart-schema" element={<SailingSchedule content={content} />} />
            <Route path="/contact" element={<Contact content={content} />} />
            <Route path="/legal/:type" element={<Legal content={content} />} />
            <Route 
              path="/admin" 
              element={<Admin content={content} onUpdate={updateContent} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer content={content} />
      </div>
    </HashRouter>
  );
};

export default App;
