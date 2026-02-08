
// Design by suritargets

import React, { useState, useRef, useEffect } from 'react';
import { AppContent, SailingEntry, RateEntry, CountryCard, SeaFreightCountry, SocialLink, LegalContent, SEOSettings } from '../types';
import { Lock, Save, LayoutDashboard, Globe, Phone, DollarSign, LogOut, Plane, Ship, Plus, Trash2, Palette, Image as ImageIcon, Upload, XCircle, List, Calendar, Type, Info, MapPin, Hash, CheckCircle2, Flag, Share2, BookOpen, Instagram, Facebook, Linkedin, FileText, Youtube, MessageCircle, ChevronRight, Search, Twitter, Code, Download, Copy, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

interface Props {
  content: AppContent;
  onUpdate: (content: AppContent) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

type Tab = 'algemeen' | 'branding' | 'seo_config' | 'social' | 'legal_editor' | 'tarieven' | 'contact' | 'afvaart' | 'luchtvracht_editor' | 'zeevracht_editor' | 'export' | 'docs';

const AVAILABLE_COUNTRIES = [
  'Aruba', 'Bonaire', 'Curaçao', 'St. Maarten', 'Suriname', 'Nederlandse Antillen', 'Caribbean (Algemeen)'
];

const SOCIAL_PLATFORMS = ['Instagram', 'Facebook', 'LinkedIn', 'WhatsApp', 'X', 'YouTube'];

const Admin: React.FC<Props> = ({ content, onUpdate, isAdmin, setIsAdmin }) => {
  const [password, setPassword] = useState('');
  const [localContent, setLocalContent] = useState<AppContent>(JSON.parse(JSON.stringify(content)));
  const [activeTab, setActiveTab] = useState<Tab>('algemeen');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [configSize, setConfigSize] = useState(0);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const flagInputRef = useRef<HTMLInputElement>(null);
  
  const [activeFlagUpload, setActiveFlagUpload] = useState<{ type: 'air' | 'sea', id: string } | null>(null);

  useEffect(() => {
    const size = new Blob([JSON.stringify(localContent)]).size;
    setConfigSize(size);
  }, [localContent]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') setIsAdmin(true);
    else alert('Ongeldig wachtwoord.');
  };

  const handleSave = () => {
    try {
      onUpdate(localContent);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      alert("Fout bij opslaan: Waarschijnlijk zijn de afbeeldingen te groot voor de browser-opslag. Gebruik de Export-functie.");
    }
  };

  const handleCopyConfig = () => {
    const configStr = JSON.stringify(localContent, null, 2);
    navigator.clipboard.writeText(configStr);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const handleDownloadConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localContent, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "cfl_production_config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'logo' | 'hero' | 'flag') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (target === 'logo') setLocalContent({ ...localContent, branding: { ...localContent.branding, logoUrl: result } });
      else if (target === 'hero') setLocalContent({ ...localContent, branding: { ...localContent.branding, heroImages: [...(localContent.branding.heroImages || []), result] } });
      else if (target === 'flag' && activeFlagUpload) {
        if (activeFlagUpload.type === 'air') {
          setLocalContent({ 
            ...localContent, 
            airFreightCountries: localContent.airFreightCountries.map(c => c.id === activeFlagUpload.id ? { ...c, flagUrl: result } : c) 
          });
        } else {
          setLocalContent({ 
            ...localContent, 
            seaFreightCountries: localContent.seaFreightCountries.map(c => c.id === activeFlagUpload.id ? { ...c, flagUrl: result } : c) 
          });
        }
        setActiveFlagUpload(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const updateAirCountry = (id: string, field: keyof CountryCard, value: string) => setLocalContent({ ...localContent, airFreightCountries: localContent.airFreightCountries.map(c => c.id === id ? { ...c, [field]: value } : c) });
  const updateSailing = (id: string, field: keyof SailingEntry, value: string) => setLocalContent({ ...localContent, sailingSchedules: localContent.sailingSchedules.map(s => s.id === id ? { ...s, [field]: value } : s) });
  const updateRate = (id: string, field: keyof RateEntry, value: string) => setLocalContent({ ...localContent, rates: localContent.rates.map(r => r.id === id ? { ...r, [field]: value } : r) });
  const updateSocial = (id: string, field: keyof SocialLink, value: string) => setLocalContent({ ...localContent, socialLinks: localContent.socialLinks.map(s => s.id === id ? { ...s, [field]: value } : s) });

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 text-center animate-fadeIn">
          <div className="w-20 h-20 bg-blue-50 text-cfl-blue rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"><Lock className="w-10 h-10" /></div>
          <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">Systeembeheer</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" className="w-full px-6 py-5 rounded-2xl border-2 border-gray-100 outline-none focus:border-cfl-blue text-gray-900 font-bold text-center" value={password} onChange={e => setPassword(e.target.value)} placeholder="Wachtwoord" />
            <button type="submit" className="w-full bg-cfl-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-cfl-orange transition-all shadow-xl">Inloggen</button>
          </form>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'algemeen', icon: Globe, label: 'INHOUD HOME' },
    { id: 'branding', icon: Palette, label: 'HUISSTIJL' },
    { id: 'seo_config', icon: Search, label: 'SEO & DELEN' },
    { id: 'social', icon: Share2, label: 'SOCIAL MEDIA' },
    { id: 'legal_editor', icon: FileText, label: 'JURIDISCH' },
    { id: 'luchtvracht_editor', icon: Plane, label: 'LUCHTVRACHT' },
    { id: 'zeevracht_editor', icon: Ship, label: 'ZEEVRACHT' },
    { id: 'tarieven', icon: DollarSign, label: 'TARIEVEN' },
    { id: 'contact', icon: Phone, label: 'CONTACT' },
    { id: 'afvaart', icon: List, label: 'SCHEMA' },
    { id: 'docs', icon: BookOpen, label: 'DOCUMENTATIE' },
    { id: 'export', icon: Code, label: 'EXPORT VOOR VERCEL' },
  ];

  const storageUsagePercent = Math.min(100, (configSize / (250 * 1024 * 1024)) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs currentPage="Beheerpaneel" />
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="flex items-center">
            <div className="p-4 bg-cfl-blue text-white rounded-2xl mr-5 shadow-xl"><LayoutDashboard className="w-7 h-7" /></div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Beheerpaneel</h1>
              <div className="flex items-center mt-2">
                 <div className="flex items-center bg-gray-200 h-1.5 w-32 rounded-full overflow-hidden">
                    <div className={`h-full transition-all ${storageUsagePercent > 80 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${storageUsagePercent}%`}}></div>
                 </div>
                 <span className="text-[9px] text-gray-400 font-bold ml-2">Opslag: {(configSize / 1024 / 1024).toFixed(1)}MB / 250MB</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsAdmin(false)} className="text-gray-400 hover:text-red-600 font-black uppercase tracking-widest text-[10px] flex items-center px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
            <LogOut className="w-4 h-4 mr-2" /> Uitloggen
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden p-6 space-y-2">
              {menuItems.map((t) => (
                <button key={t.id} onClick={() => setActiveTab(t.id as Tab)} className={`w-full flex items-center px-6 py-5 rounded-2xl font-black text-[11px] transition-all tracking-widest ${activeTab === t.id ? 'bg-cfl-blue text-white shadow-lg translate-x-1' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}>
                  <t.icon className="w-5 h-5 mr-4" /> {t.label}
                </button>
              ))}
            </div>
            <button onClick={handleSave} className="w-full bg-cfl-orange text-white py-6 rounded-[2.5rem] font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center">
              <Save className="w-6 h-6 mr-3" /> 
              <span>{saveSuccess ? 'TIJDELIJK OPGESLAGEN!' : 'OPSLAAN (BROWSER)'}</span>
            </button>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'export' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <h3 className="text-2xl font-black text-cfl-orange uppercase tracking-tighter flex items-center"><Code className="w-8 h-8 mr-4" /> Export voor Vercel</h3>
                   <div className="flex gap-4">
                      <button onClick={handleCopyConfig} className="bg-cfl-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg flex items-center transition-all hover:scale-105 active:scale-95">
                        {copySuccess ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copySuccess ? 'GEKOPIEERD' : 'CONFIG KOPIËREN'}
                      </button>
                   </div>
                </div>
                <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 space-y-4">
                   <div className="flex items-start">
                      <AlertTriangle className="w-6 h-6 text-cfl-orange mr-4 mt-1 flex-shrink-0" />
                      <div>
                         <h4 className="font-black text-cfl-orange uppercase text-sm tracking-widest mb-2">Maak je wijzigingen permanent</h4>
                         <p className="text-sm text-orange-900 leading-relaxed font-medium">
                            Kopieer de code hieronder en plak deze in het bestand <code>constants.ts</code> in je project. Push daarna naar Vercel. Alleen zo blijven je logo en afbeeldingen voor iedereen zichtbaar.
                         </p>
                      </div>
                   </div>
                </div>
                <pre className="w-full h-96 overflow-auto p-6 bg-gray-900 text-green-400 rounded-3xl text-xs font-mono border-4 border-gray-800 shadow-inner">
                   {JSON.stringify(localContent, null, 2)}
                </pre>
              </div>
            )}
            
            {activeTab === 'algemeen' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><Globe className="w-8 h-8 mr-4" /> Home Inhoud</h3>
                <div className="space-y-8">
                  <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Hero Titel</label><input type="text" className="w-full px-8 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-cfl-blue outline-none" value={localContent.heroTitle} onChange={e => setLocalContent({...localContent, heroTitle: e.target.value})} /></div>
                  <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Intro Tekst</label><textarea rows={4} className="w-full px-8 py-5 bg-gray-50 border-2 border-gray-100 rounded-[2rem] font-medium text-gray-900 focus:bg-white focus:border-cfl-blue outline-none" value={localContent.heroText} onChange={e => setLocalContent({...localContent, heroText: e.target.value})} /></div>
                </div>
              </div>
            )}
            
            
            {activeTab === 'branding' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><Palette className="w-8 h-8 mr-4" /> Huisstijl & Branding</h3>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Bedrijfsnaam</label>
                    <input type="text" className="w-full px-8 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-cfl-blue outline-none" value={localContent.branding.companyName} onChange={e => setLocalContent({...localContent, branding: {...localContent.branding, companyName: e.target.value}})} />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Hoofdkleur</label>
                      <div className="flex items-center gap-4">
                        <input type="color" value={localContent.branding.primaryColor} onChange={e => setLocalContent({...localContent, branding: {...localContent.branding, primaryColor: e.target.value}})} className="h-16 w-24 rounded-xl cursor-pointer" />
                        <input type="text" value={localContent.branding.primaryColor} onChange={e => setLocalContent({...localContent, branding: {...localContent.branding, primaryColor: e.target.value}})} className="flex-1 px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-mono text-gray-900" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Accentkleur</label>
                      <div className="flex items-center gap-4">
                        <input type="color" value={localContent.branding.secondaryColor} onChange={e => setLocalContent({...localContent, branding: {...localContent.branding, secondaryColor: e.target.value}})} className="h-16 w-24 rounded-xl cursor-pointer" />
                        <input type="text" value={localContent.branding.secondaryColor} onChange={e => setLocalContent({...localContent, branding: {...localContent.branding, secondaryColor: e.target.value}})} className="flex-1 px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-mono text-gray-900" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Logo Upload</label>
                    <div className="flex items-center gap-6">
                      {localContent.branding.logoUrl && <img src={localContent.branding.logoUrl} alt="Logo" className="h-20 object-contain bg-gray-50 p-2 rounded-xl border-2 border-gray-100" />}
                      <button onClick={() => logoInputRef.current?.click()} className="bg-cfl-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cfl-orange transition-all flex items-center"><Upload className="w-4 h-4 mr-2" /> Logo Wijzigen</button>
                      {localContent.branding.logoUrl && <button onClick={() => setLocalContent({...localContent, branding: {...localContent.branding, logoUrl: ''}})} className="text-red-500 hover:text-red-700 p-3"><XCircle className="w-6 h-6" /></button>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Hero Slider Afbeeldingen</label>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {localContent.branding.heroImages?.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img src={img} alt={`Hero ${idx+1}`} className="w-full h-32 object-cover rounded-2xl border-2 border-gray-100" />
                          <button onClick={() => setLocalContent({...localContent, branding: {...localContent.branding, heroImages: localContent.branding.heroImages.filter((_, i) => i !== idx)}})} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><XCircle className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => heroInputRef.current?.click()} className="bg-cfl-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all flex items-center"><Plus className="w-4 h-4 mr-2" /> Nieuwe Hero Toevoegen</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><Share2 className="w-8 h-8 mr-4" /> Social Media Links</h3>
                  <button onClick={() => setLocalContent({...localContent, socialLinks: [...localContent.socialLinks, {id: Date.now().toString(), platform: 'Instagram', url: ''}]})} className="bg-cfl-blue text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center"><Plus className="w-4 h-4 mr-2" /> Toevoegen</button>
                </div>
                <div className="space-y-6">
                  {localContent.socialLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <select value={link.platform} onChange={e => updateSocial(link.id, 'platform', e.target.value)} className="px-6 py-4 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-900 focus:border-cfl-blue outline-none">
                        {SOCIAL_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <input type="url" value={link.url} onChange={e => updateSocial(link.id, 'url', e.target.value)} placeholder="https://..." className="flex-1 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-900 focus:border-cfl-blue outline-none" />
                      <button onClick={() => setLocalContent({...localContent, socialLinks: localContent.socialLinks.filter(s => s.id !== link.id)})} className="text-red-500 hover:text-red-700 p-3"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <h3 className="text-2xl font-black text-cfl-orange uppercase tracking-tighter flex items-center"><Phone className="w-8 h-8 mr-4" /> Contactgegevens</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Phone Kantoor</label><input type="tel" value={localContent.contact.phoneKantoor} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, phoneKantoor: e.target.value}})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-cfl-blue outline-none" /></div>
                  <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Phone Klantenservice</label><input type="tel" value={localContent.contact.phoneKlantenservice} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, phoneKlantenservice: e.target.value}})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-cfl-blue outline-none" /></div>
                  <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Phone Radj</label><input type="tel" value={localContent.contact.phoneRadj} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, phoneRadj: e.target.value}})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-cfl-blue outline-none" /></div>
                  <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">WhatsApp</label><input type="tel" value={localContent.contact.whatsapp} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, whatsapp: e.target.value}})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-cfl-blue outline-none" /></div>
                  <div className="col-span-2"><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Email</label><input type="email" value={localContent.contact.email} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, email: e.target.value}})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-cfl-blue outline-none" /></div>
                </div>
              </div>
            )}

            {activeTab === 'seo_config' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><Search className="w-8 h-8 mr-4" /> SEO & Vindbaarheid</h3>
                <p className="text-sm text-gray-600">Optimaliseer de vindbaarheid voor elke pagina in Google en social media.</p>
                
                {['home', 'luchtvracht', 'zeevracht', 'diensten', 'contact'].map((page) => (
                  <div key={page} className="border-2 border-gray-100 rounded-3xl p-8 space-y-6">
                    <h4 className="text-lg font-black text-cfl-orange uppercase tracking-tight">Pagina: {page}</h4>
                    <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Pagina Titel</label><input type="text" value={localContent.seo?.[page]?.title || ''} onChange={e => setLocalContent({...localContent, seo: {...localContent.seo, [page]: {...(localContent.seo?.[page] || {}), title: e.target.value}}})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="SEO titel..." /></div>
                    <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Omschrijving (Google)</label><textarea rows={3} value={localContent.seo?.[page]?.description || ''} onChange={e => setLocalContent({...localContent, seo: {...localContent.seo, [page]: {...(localContent.seo?.[page] || {}), description: e.target.value}}})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="Meta description..."/></div>
                    <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Keywords</label><input type="text" value={localContent.seo?.[page]?.keywords || ''} onChange={e => setLocalContent({...localContent, seo: {...localContent.seo, [page]: {...(localContent.seo?.[page] || {}), keywords: e.target.value}}})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="keyword1, keyword2, keyword3" /></div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'legal_editor' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><FileText className="w-8 h-8 mr-4" /> Juridisch Beheer</h3>
                
                <div className="space-y-8">
                  <div><h4 className="text-lg font-black text-cfl-blue uppercase tracking-tight mb-4">Algemene Voorwaarden</h4><textarea rows={10} value={localContent.legalContent?.algemeneVoorwaarden || ''} onChange={e => setLocalContent({...localContent, legalContent: {...localContent.legalContent, algemeneVoorwaarden: e.target.value}})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="Onze algemene voorwaarden zijn van toepassing op alle diensten..." /></div>
                  
                  <div><h4 className="text-lg font-black text-cfl-orange uppercase tracking-tight mb-4">Privacy Policy</h4><textarea rows={10} value={localContent.legalContent?.privacyPolicy || ''} onChange={e => setLocalContent({...localContent, legalContent: {...localContent.legalContent, privacyPolicy: e.target.value}})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="Wij respecteren uw privacy en verwerken uw gegevens zorgvuldig..." /></div>
                  
                  <div><h4 className="text-lg font-black text-gray-600 uppercase tracking-tight mb-4">Terms of Use</h4><textarea rows={10} value={localContent.legalContent?.termsOfUse || ''} onChange={e => setLocalContent({...localContent, legalContent: {...localContent.legalContent, termsOfUse: e.target.value}})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="Door gebruik te maken van deze website gaat u akkoord..." /></div>
                </div>
              </div>
            )}

            {activeTab === 'luchtvracht_editor' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-cfl-orange uppercase tracking-tighter flex items-center"><Plane className="w-8 h-8 mr-4" /> Luchtvracht Beheer</h3>
                  <button onClick={() => setLocalContent({...localContent, airFreightCountries: [...localContent.airFreightCountries, {id: Date.now().toString(), name: '', flag: '🌐', tagline: '', closingDays: '', handlingInfo: '', handlerName: '', footerInfo: ''}]})} className="bg-cfl-blue text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center"><Plus className="w-4 h-4 mr-2" /> Land Toevoegen</button>
                </div>
                
                <div className="space-y-8">
                  {localContent.airFreightCountries.map((country, idx) => (
                    <div key={country.id} className="border-2 border-gray-100 rounded-3xl p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-black text-cfl-blue uppercase">Land #{idx + 1}</h4>
                        <button onClick={() => setLocalContent({...localContent, airFreightCountries: localContent.airFreightCountries.filter(c => c.id !== country.id)})} className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5" /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Naam</label><input type="text" value={country.name} onChange={e => updateAirCountry(country.id, 'name', e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:border-cfl-blue outline-none" placeholder="Suriname" /></div>
                        <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Vlag Icon</label><input type="text" value={country.flag} onChange={e => updateAirCountry(country.id, 'flag', e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:border-cfl-blue outline-none" placeholder="🇸🇷" /></div>
                        <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tagline</label><input type="text" value={country.tagline} onChange={e => updateAirCountry(country.id, 'tagline', e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="Wekelijks" /></div>
                        <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Sluitingsdagen</label><input type="text" value={country.closingDays} onChange={e => updateAirCountry(country.id, 'closingDays', e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="Elke Woensdag & Zaterdag (10:00 - 14:00u)" /></div>
                        <div className="col-span-2"><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Afhandeling Info</label><textarea rows={3} value={country.handlingInfo} onChange={e => updateAirCountry(country.id, 'handlingInfo', e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="Zendingen die in het weekend binnen komen..."/></div>
                        <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Afhandelaar</label><input type="text" value={country.handlerName} onChange={e => updateAirCountry(country.id, 'handlerName', e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="Caribbean Air Services, Paramaribo" /></div>
                        <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Footer Info</label><input type="text" value={country.footerInfo} onChange={e => updateAirCountry(country.id, 'footerInfo', e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="Prijzen zijn exclusief BTW" /></div>
                      </div>
                      <button onClick={() => {setActiveFlagUpload({type: 'air', id: country.id}); flagInputRef.current?.click();}} className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center hover:bg-gray-200"><Flag className="w-4 h-4 mr-2" /> Vlag Uploaden</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'zeevracht_editor' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><Ship className="w-8 h-8 mr-4" /> Zeevracht Beheer</h3>
                  <button onClick={() => setLocalContent({...localContent, seaFreightCountries: [...localContent.seaFreightCountries, {id: Date.now().toString(), name: '', flag: '🌐', type: 'Particulieren', details: []}]})} className="bg-cfl-orange text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center"><Plus className="w-4 h-4 mr-2" /> Land Toevoegen</button>
                </div>
                
                <div className="space-y-8">
                  {localContent.seaFreightCountries.map((country, idx) => (
                    <div key={country.id} className="border-2 border-gray-100 rounded-3xl p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-black text-cfl-orange uppercase">Land #{idx + 1}</h4>
                        <button onClick={() => setLocalContent({...localContent, seaFreightCountries: localContent.seaFreightCountries.filter(c => c.id !== country.id)})} className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5" /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Land</label><input type="text" value={country.name} onChange={e => setLocalContent({...localContent, seaFreightCountries: localContent.seaFreightCountries.map(c => c.id === country.id ? {...c, name: e.target.value} : c)})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:border-cfl-blue outline-none" placeholder="Suriname" /></div>
                        <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Vlag</label><input type="text" value={country.flag} onChange={e => setLocalContent({...localContent, seaFreightCountries: localContent.seaFreightCountries.map(c => c.id === country.id ? {...c, flag: e.target.value} : c)})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:border-cfl-blue outline-none" placeholder="🇸🇷" /></div>
                        <div className="col-span-2"><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Doelgroep</label><input type="text" value={country.type} onChange={e => setLocalContent({...localContent, seaFreightCountries: localContent.seaFreightCountries.map(c => c.id === country.id ? {...c, type: e.target.value} : c)})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="Particulieren / Zakelijk" /></div>
                        <div className="col-span-2"><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Details (één per regel)</label><textarea rows={5} value={country.details?.join('\n') || ''} onChange={e => setLocalContent({...localContent, seaFreightCountries: localContent.seaFreightCountries.map(c => c.id === country.id ? {...c, details: e.target.value.split('\n').filter(l => l.trim())} : c)})} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-900 focus:border-cfl-blue outline-none" placeholder="Sluitingsdagen: Zaterdagmiddag om de week&#10;Afhandelaar: SeAir Freight Services"/></div>
                      </div>
                      <button onClick={() => {setActiveFlagUpload({type: 'sea', id: country.id}); flagInputRef.current?.click();}} className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center hover:bg-gray-200"><Flag className="w-4 h-4 mr-2" /> Vlag Uploaden</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tarieven' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><DollarSign className="w-8 h-8 mr-4" /> Tarieven</h3>
                  <button onClick={() => setLocalContent({...localContent, rates: [...localContent.rates, {id: Date.now().toString(), destination: '', label: '', value: ''}]})} className="bg-cfl-orange text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center"><Plus className="w-4 h-4 mr-2" /> Tarief Toevoegen</button>
                </div>
                
                <div className="space-y-6">
                  {localContent.rates.map((rate) => (
                    <div key={rate.id} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <select value={rate.destination} onChange={e => updateRate(rate.id, 'destination', e.target.value)} className="px-6 py-4 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-900 focus:border-cfl-blue outline-none">
                        <option value="">Kies land...</option>
                        {AVAILABLE_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input type="text" value={rate.label} onChange={e => updateRate(rate.id, 'label', e.target.value)} placeholder="Luchtvracht per kg" className="flex-1 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-900 focus:border-cfl-blue outline-none" />
                      <input type="text" value={rate.value} onChange={e => updateRate(rate.id, 'value', e.target.value)} placeholder="€6,50" className="w-32 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-900 focus:border-cfl-blue outline-none" />
                      <button onClick={() => setLocalContent({...localContent, rates: localContent.rates.filter(r => r.id !== rate.id)})} className="text-red-500 hover:text-red-700 p-3"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'afvaart' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><Calendar className="w-8 h-8 mr-4" /> Afvaartschema</h3>
                  <button onClick={() => setLocalContent({...localContent, sailingSchedules: [...localContent.sailingSchedules, {id: Date.now().toString(), destination: '', vessel: '', closingDate: '', departureDate: '', arrivalDate: ''}]})} className="bg-cfl-blue text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center"><Plus className="w-4 h-4 mr-2" /> Toevoegen</button>
                </div>
                
                <div className="space-y-6">
                  {localContent.sailingSchedules.map((sailing) => (
                    <div key={sailing.id} className="grid grid-cols-6 gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 items-center">
                      <select value={sailing.destination} onChange={e => updateSailing(sailing.id, 'destination', e.target.value)} className="col-span-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-900 focus:border-cfl-blue outline-none text-sm">
                        <option value="">Bestemming...</option>
                        {AVAILABLE_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input type="text" value={sailing.vessel} onChange={e => updateSailing(sailing.id, 'vessel', e.target.value)} placeholder="Schip" className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-900 focus:border-cfl-blue outline-none text-sm" />
                      <input type="date" value={sailing.closingDate} onChange={e => updateSailing(sailing.id, 'closingDate', e.target.value)} className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-900 focus:border-cfl-blue outline-none text-sm" />
                      <input type="date" value={sailing.departureDate} onChange={e => updateSailing(sailing.id, 'departureDate', e.target.value)} className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-900 focus:border-cfl-blue outline-none text-sm" />
                      <input type="date" value={sailing.arrivalDate} onChange={e => updateSailing(sailing.id, 'arrivalDate', e.target.value)} className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-900 focus:border-cfl-blue outline-none text-sm" />
                      <button onClick={() => setLocalContent({...localContent, sailingSchedules: localContent.sailingSchedules.filter(s => s.id !== sailing.id)})} className="text-red-500 hover:text-red-700 p-3 mx-auto"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'docs' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><BookOpen className="w-8 h-8 mr-4" /> Help & Documentatie</h3>
                <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                  <h4 className="font-black text-cfl-blue uppercase text-sm tracking-widest mb-4">Hoe werkt dit paneel?</h4>
                  <p className="text-sm text-blue-900 leading-relaxed mb-6">Dit beheerpaneel is ontworpen om direct wijzigingen aan te brengen aan de live website. Zodra je klaar bent met bewerken, klik op de grote oranje "ALLES OPSLAAN" knop om de wijzigingen definitief te maken voor alle bezoekers.</p>
                  
                  <h4 className="font-black text-cfl-orange uppercase text-sm tracking-widest mb-4 mt-8">Afbeeldingen</h4>
                  <p className="text-sm text-orange-900 leading-relaxed">De hero-slider kan meerdere afbeeldingen bevatten die automatisch roteren op de homepage. Gebruik voor de beste foto's grote landschap-georiënteerde bestanden.</p>
                  
                  <h4 className="font-black text-gray-600 uppercase text-sm tracking-widest mb-4 mt-8">Vlaggen</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">Je kunt voor elk land een eigen vlag uploaden of het emoji-veriante gebruiken.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'logo')} />
      <input type="file" ref={heroInputRef} className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'hero')} />
      <input type="file" ref={flagInputRef} className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'flag')} />
    </div>
  );
};

export default Admin;
