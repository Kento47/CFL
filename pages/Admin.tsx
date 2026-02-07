
import React, { useState, useRef } from 'react';
import { AppContent, SailingEntry, RateEntry, CountryCard, SeaFreightCountry, SocialLink, LegalContent, SEOSettings } from '../types';
import { Lock, Save, LayoutDashboard, Globe, Phone, DollarSign, LogOut, Plane, Ship, Plus, Trash2, Palette, Image as ImageIcon, Upload, XCircle, List, Calendar, Type, Info, MapPin, Hash, CheckCircle2, Flag, Share2, BookOpen, Instagram, Facebook, Linkedin, FileText, Youtube, MessageCircle, ChevronRight, Search, Twitter } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

interface Props {
  content: AppContent;
  onUpdate: (content: AppContent) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

type Tab = 'algemeen' | 'branding' | 'seo_config' | 'social' | 'legal_editor' | 'tarieven' | 'contact' | 'afvaart' | 'luchtvracht_editor' | 'zeevracht_editor' | 'docs';

const AVAILABLE_COUNTRIES = [
  'Aruba', 'Bonaire', 'Curaçao', 'St. Maarten', 'Suriname', 'Nederlandse Antillen', 'Caribbean (Algemeen)'
];

const SOCIAL_PLATFORMS = ['Instagram', 'Facebook', 'LinkedIn', 'WhatsApp', 'X', 'YouTube'];

const Admin: React.FC<Props> = ({ content, onUpdate, isAdmin, setIsAdmin }) => {
  const [password, setPassword] = useState('');
  const [localContent, setLocalContent] = useState<AppContent>(JSON.parse(JSON.stringify(content)));
  const [activeTab, setActiveTab] = useState<Tab>('algemeen');
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const flagInputRef = useRef<HTMLInputElement>(null);
  const seoInputRef = useRef<HTMLInputElement>(null);
  
  const [activeFlagUpload, setActiveFlagUpload] = useState<{ type: 'air' | 'sea', id: string } | null>(null);
  const [activeSeoPage, setActiveSeoPage] = useState<keyof AppContent['seo']>('home');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') setIsAdmin(true);
    else alert('Ongeldig wachtwoord.');
  };

  const handleSave = () => {
    onUpdate(localContent);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'logo' | 'hero' | 'flag' | 'seo') => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Bestand te groot (>2MB)"); return; }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (target === 'logo') setLocalContent({ ...localContent, branding: { ...localContent.branding, logoUrl: result } });
      else if (target === 'hero') setLocalContent({ ...localContent, branding: { ...localContent.branding, heroImages: [...(localContent.branding.heroImages || []), result] } });
      else if (target === 'seo') setLocalContent({ ...localContent, seo: { ...localContent.seo, [activeSeoPage]: { ...localContent.seo[activeSeoPage], shareImage: result } } });
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

  // Helper Functions
  const updateSeo = (page: keyof AppContent['seo'], field: keyof SEOSettings, value: string) => setLocalContent({ ...localContent, seo: { ...localContent.seo, [page]: { ...localContent.seo[page], [field]: value } } });
  const updateAirCountry = (id: string, field: keyof CountryCard, value: string) => setLocalContent({ ...localContent, airFreightCountries: localContent.airFreightCountries.map(c => c.id === id ? { ...c, [field]: value } : c) });
  const updateSeaCountry = (id: string, field: keyof SeaFreightCountry, value: any) => setLocalContent({ ...localContent, seaFreightCountries: localContent.seaFreightCountries.map(c => c.id === id ? { ...c, [field]: value } : c) });
  const updateSailing = (id: string, field: keyof SailingEntry, value: string) => setLocalContent({ ...localContent, sailingSchedules: localContent.sailingSchedules.map(s => s.id === id ? { ...s, [field]: value } : s) });
  const updateRate = (id: string, field: keyof RateEntry, value: string) => setLocalContent({ ...localContent, rates: localContent.rates.map(r => r.id === id ? { ...r, [field]: value } : r) });
  const updateSocial = (id: string, field: keyof SocialLink, value: string) => setLocalContent({ ...localContent, socialLinks: localContent.socialLinks.map(s => s.id === id ? { ...s, [field]: value } : s) });

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 text-center animate-fadeIn">
          <div className="w-20 h-20 bg-blue-50 text-cfl-blue rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"><Lock className="w-10 h-10" /></div>
          <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">Systeembeheer</h2>
          <p className="text-gray-400 text-sm mb-10 font-medium">Voer uw wachtwoord in om door te gaan</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              className="w-full px-6 py-5 rounded-2xl border-2 border-gray-100 outline-none focus:border-cfl-blue text-gray-900 font-bold text-center transition-all" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••" 
              autoFocus
            />
            <button type="submit" className="w-full bg-cfl-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-cfl-orange transition-all shadow-xl active:scale-95">Inloggen</button>
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
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs currentPage="Beheerpaneel" />
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="flex items-center">
            <div className="p-4 bg-cfl-blue text-white rounded-2xl mr-5 shadow-xl"><LayoutDashboard className="w-7 h-7" /></div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight leading-none">Beheerpaneel</h1>
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2 block">CFL Editor • Volledig Hersteld</span>
            </div>
          </div>
          <button onClick={() => setIsAdmin(false)} className="text-gray-400 hover:text-red-600 font-black uppercase tracking-widest text-[10px] flex items-center transition-colors px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
            <LogOut className="w-4 h-4 mr-2" /> Uitloggen
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden p-6 space-y-2">
              {menuItems.map((t) => (
                <button 
                  key={t.id} 
                  onClick={() => setActiveTab(t.id as Tab)} 
                  className={`w-full flex items-center px-6 py-5 rounded-2xl font-black text-[11px] transition-all tracking-widest ${
                    activeTab === t.id ? 'bg-cfl-blue text-white shadow-lg translate-x-1' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                  }`}
                >
                  <t.icon className="w-5 h-5 mr-4" /> {t.label}
                </button>
              ))}
            </div>
            <button onClick={handleSave} className="w-full bg-cfl-orange text-white py-6 rounded-[2.5rem] font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center group active:scale-95">
              <Save className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" /> 
              <span>{saveSuccess ? 'BIJGEWERKT!' : 'ALLES OPSLAAN'}</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 h-full">
            {/* INHOUD HOME */}
            {activeTab === 'algemeen' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><Globe className="w-8 h-8 mr-4" /> Home Inhoud</h3>
                <div className="space-y-8">
                  <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Hero Titel</label><input type="text" className="w-full px-8 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-cfl-blue outline-none transition-all" value={localContent.heroTitle} onChange={e => setLocalContent({...localContent, heroTitle: e.target.value})} /></div>
                  <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Intro Tekst</label><textarea rows={4} className="w-full px-8 py-5 bg-gray-50 border-2 border-gray-100 rounded-[2rem] font-medium text-gray-900 focus:bg-white focus:border-cfl-blue outline-none transition-all" value={localContent.heroText} onChange={e => setLocalContent({...localContent, heroText: e.target.value})} /></div>
                  <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Import & Export Tekst</label><textarea rows={4} className="w-full px-8 py-5 bg-gray-50 border-2 border-gray-100 rounded-[2rem] font-medium text-gray-900 focus:bg-white focus:border-cfl-blue outline-none transition-all" value={localContent.importExportText} onChange={e => setLocalContent({...localContent, importExportText: e.target.value})} /></div>
                </div>
              </div>
            )}

            {/* HUISSTIJL */}
            {activeTab === 'branding' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-12 animate-fadeIn">
                <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><Palette className="w-8 h-8 mr-4" /> Huisstijl & Branding</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Bedrijfsnaam</label>
                    <input type="text" className="w-full px-8 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900" value={localContent.branding.companyName} onChange={e => setLocalContent({ ...localContent, branding: { ...localContent.branding, companyName: e.target.value } })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Hoofdkleur</label>
                      <input type="color" className="w-full h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl p-1" value={localContent.theme.primaryColor} onChange={e => setLocalContent({ ...localContent, theme: { ...localContent.theme, primaryColor: e.target.value } })} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Accentkleur</label>
                      <input type="color" className="w-full h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl p-1" value={localContent.theme.secondaryColor} onChange={e => setLocalContent({ ...localContent, theme: { ...localContent.theme, secondaryColor: e.target.value } })} />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Logo Upload</label>
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-auto min-w-[120px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center p-2">
                       {localContent.branding.logoUrl ? <img src={localContent.branding.logoUrl} className="max-h-full" /> : <ImageIcon className="text-gray-200" />}
                    </div>
                    <button onClick={() => logoInputRef.current?.click()} className="bg-white border-2 border-gray-100 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 flex items-center"><Upload className="w-4 h-4 mr-2" /> Logo Wijzigen</button>
                    <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'logo')} />
                  </div>
                </div>
                <div className="space-y-6">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Hero Slider Afbeeldingen</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {localContent.branding.heroImages.map((img, idx) => (
                      <div key={idx} className="relative group aspect-video rounded-3xl overflow-hidden border-2 border-gray-100 shadow-lg">
                        <img src={img} className="w-full h-full object-cover" />
                        <button onClick={() => { const newHeros = [...localContent.branding.heroImages]; newHeros.splice(idx, 1); setLocalContent({ ...localContent, branding: { ...localContent.branding, heroImages: newHeros } }); }} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Trash2 className="w-6 h-6"/></button>
                      </div>
                    ))}
                    <button onClick={() => heroInputRef.current?.click()} className="aspect-video border-4 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-300 hover:text-cfl-blue transition-all"><Upload className="w-10 h-10 mb-2" /><span className="text-[10px] font-black uppercase tracking-widest">Nieuwe Hero</span></button>
                    <input type="file" ref={heroInputRef} className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'hero')} />
                  </div>
                </div>
              </div>
            )}

            {/* SOCIAL MEDIA */}
            {activeTab === 'social' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><Share2 className="w-8 h-8 mr-4" /> Social Media Links</h3>
                   <button onClick={() => setLocalContent({...localContent, socialLinks: [...localContent.socialLinks, { id: Date.now().toString(), platform: 'Facebook', url: '' }]})} className="bg-cfl-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg flex items-center"><Plus className="w-4 h-4 mr-2"/>Toevoegen</button>
                </div>
                <div className="space-y-4">
                  {localContent.socialLinks.map((s) => (
                    <div key={s.id} className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <div className="w-40">
                        <select className="w-full bg-white border border-gray-200 p-3 rounded-xl font-bold text-xs" value={s.platform} onChange={e => updateSocial(s.id, 'platform', e.target.value as any)}>
                          {SOCIAL_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div className="flex-grow">
                        <input type="text" className="w-full bg-white border border-gray-200 p-3 rounded-xl text-sm" value={s.url} onChange={e => updateSocial(s.id, 'url', e.target.value)} placeholder="https://..." />
                      </div>
                      <button onClick={() => setLocalContent({...localContent, socialLinks: localContent.socialLinks.filter(x => x.id !== s.id)})} className="text-gray-300 hover:text-red-500 p-2 transition-colors"><Trash2 className="w-5 h-5"/></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TARIEVEN */}
            {activeTab === 'tarieven' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><DollarSign className="w-8 h-8 mr-4" /> Tarieven</h3>
                   <button onClick={() => setLocalContent({...localContent, rates: [...localContent.rates, { id: Date.now().toString(), destination: AVAILABLE_COUNTRIES[0], label: '', value: '' }]})} className="bg-cfl-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg flex items-center"><Plus className="w-4 h-4 mr-2"/>Toevoegen</button>
                </div>
                <div className="space-y-4">
                  {localContent.rates.map((r) => (
                    <div key={r.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all">
                      <div className="md:col-span-3">
                        <select className="w-full bg-white border border-gray-200 p-4 rounded-xl font-bold text-gray-900" value={r.destination} onChange={e => updateRate(r.id, 'destination', e.target.value)}>
                          {AVAILABLE_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="md:col-span-5"><input type="text" className="w-full bg-white border border-gray-200 p-4 rounded-xl font-medium" value={r.label} onChange={e => updateRate(r.id, 'label', e.target.value)} placeholder="Luchtvracht per kg" /></div>
                      <div className="md:col-span-3"><input type="text" className="w-full bg-white border border-gray-200 p-4 rounded-xl font-black text-cfl-blue" value={r.value} onChange={e => updateRate(r.id, 'value', e.target.value)} placeholder="€6,50" /></div>
                      <div className="md:col-span-1 flex justify-end"><button onClick={() => setLocalContent({...localContent, rates: localContent.rates.filter(x => x.id !== r.id)})} className="text-gray-300 hover:text-red-500 p-2"><Trash2 className="w-6 h-6"/></button></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT */}
            {activeTab === 'contact' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <h3 className="text-2xl font-black text-cfl-orange uppercase tracking-tighter flex items-center"><Phone className="w-8 h-8 mr-4" /> Contactgegevens</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.keys(localContent.contact).map((key) => (
                    <div key={key}>
                       <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                       <input type="text" className="w-full px-8 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:bg-white outline-none" value={(localContent.contact as any)[key]} onChange={e => setLocalContent({ ...localContent, contact: { ...localContent.contact, [key]: e.target.value } })} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AFVAARTSCHEMA */}
            {activeTab === 'afvaart' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 animate-fadeIn">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter flex items-center"><List className="w-8 h-8 mr-4 text-cfl-blue" /> Afvaartschema</h2>
                  <button onClick={() => setLocalContent({...localContent, sailingSchedules: [{ id: Date.now().toString(), destination: AVAILABLE_COUNTRIES[0], closingDate: '', departureDate: '', arrivalDate: '', vessel: '' }, ...localContent.sailingSchedules]})} className="bg-cfl-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all flex items-center"><Plus className="w-5 h-5 mr-2" /> Toevoegen</button>
                </div>
                <div className="space-y-10">
                  {localContent.sailingSchedules.map((s) => (
                    <div key={s.id} className="relative bg-gray-50 p-10 rounded-[2.5rem] border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-2xl transition-all group">
                      {/* Verwijder knop (zwevend aan de rechterkant) */}
                      <button 
                        onClick={() => setLocalContent({...localContent, sailingSchedules: localContent.sailingSchedules.filter(x => x.id !== s.id)})} 
                        className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white text-gray-300 hover:text-red-500 p-4 rounded-2xl shadow-xl border border-gray-100 hover:border-red-100 transition-all z-10"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>

                      <div className="space-y-8">
                        {/* RIJ 1: Bestemming en Schip */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Bestemming</label>
                            <select 
                              className="w-full bg-white border border-gray-200 p-5 rounded-2xl font-bold text-gray-900 outline-none focus:border-cfl-blue transition-all" 
                              value={s.destination} 
                              onChange={(e) => updateSailing(s.id, 'destination', e.target.value)}
                            >
                              {AVAILABLE_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Schip</label>
                            <input 
                              type="text" 
                              placeholder="Bijv. MSC Caribbean I"
                              className="w-full bg-white border border-gray-200 p-5 rounded-2xl font-bold text-gray-900 outline-none focus:border-cfl-blue transition-all" 
                              value={s.vessel} 
                              onChange={(e) => updateSailing(s.id, 'vessel', e.target.value)} 
                            />
                          </div>
                        </div>

                        {/* RIJ 2: Sluiting, Vertrek, Aankomst */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="text-[10px] font-black text-cfl-orange uppercase tracking-widest mb-3 block ml-1">Sluiting (Deadline)</label>
                            <input 
                              type="date" 
                              className="w-full bg-white border border-gray-200 p-5 rounded-2xl font-bold text-gray-900 outline-none focus:border-cfl-orange transition-all" 
                              value={s.closingDate} 
                              onChange={(e) => updateSailing(s.id, 'closingDate', e.target.value)} 
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Vertrek</label>
                            <input 
                              type="date" 
                              className="w-full bg-white border border-gray-200 p-5 rounded-2xl font-bold text-gray-900 outline-none focus:border-cfl-blue transition-all" 
                              value={s.departureDate} 
                              onChange={(e) => updateSailing(s.id, 'departureDate', e.target.value)} 
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Aankomst (Verwacht)</label>
                            <input 
                              type="date" 
                              className="w-full bg-white border border-gray-200 p-5 rounded-2xl font-bold text-gray-900 outline-none focus:border-cfl-blue transition-all" 
                              value={s.arrivalDate} 
                              onChange={(e) => updateSailing(s.id, 'arrivalDate', e.target.value)} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {localContent.sailingSchedules.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                      <Calendar className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                      <p className="text-gray-400 font-bold">Nog geen afvaarten toegevoegd.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LUCHTVRACHT EDITOR */}
            {activeTab === 'luchtvracht_editor' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black text-cfl-orange uppercase tracking-tighter flex items-center"><Plane className="w-8 h-8 mr-4" /> Luchtvracht Beheer</h3>
                  <button onClick={() => setLocalContent({...localContent, airFreightCountries: [...localContent.airFreightCountries, { id: Date.now().toString(), name: 'Nieuw Land', flag: '🌐', tagline: 'Wekelijks', closingDays: '', handlingInfo: '', handlerName: '', footerInfo: '' }]})} className="bg-cfl-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg flex items-center"><Plus className="w-5 h-5 mr-2"/> Land Toevoegen</button>
                </div>
                <div className="space-y-8">
                  {localContent.airFreightCountries.map((c) => (
                    <div key={c.id} className="relative bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-6 group">
                      <button onClick={() => setLocalContent({...localContent, airFreightCountries: localContent.airFreightCountries.filter(x => x.id !== c.id)})} className="absolute top-6 right-6 text-gray-300 hover:text-red-500 p-2"><Trash2 className="w-5 h-5"/></button>
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                         <div className="w-full md:w-48 text-center">
                            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-3 block">Vlag / Icoon</label>
                            <div className="relative group w-full aspect-video bg-white rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                               {c.flagUrl ? <img src={c.flagUrl} className="w-full h-full object-cover" /> : <span className="text-4xl">{c.flag}</span>}
                               <button onClick={() => { setActiveFlagUpload({type: 'air', id: c.id}); flagInputRef.current?.click(); }} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest"><Upload className="w-5 h-5 mr-2" /> Upload</button>
                            </div>
                            <input type="text" className="w-full mt-2 bg-white border border-gray-100 p-2 rounded-xl text-center text-xl" value={c.flag} onChange={e => updateAirCountry(c.id, 'flag', e.target.value)} />
                         </div>
                         <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="text-[9px] font-black uppercase mb-1">Naam</label><input type="text" className="w-full bg-white p-3 rounded-xl font-bold" value={c.name} onChange={e => updateAirCountry(c.id, 'name', e.target.value)} /></div>
                            <div><label className="text-[9px] font-black uppercase mb-1">Tagline</label><input type="text" className="w-full bg-white p-3 rounded-xl font-bold text-cfl-orange" value={c.tagline} onChange={e => updateAirCountry(c.id, 'tagline', e.target.value)} /></div>
                            <div className="md:col-span-2"><label className="text-[9px] font-black uppercase mb-1">Sluitingsdagen</label><input type="text" className="w-full bg-white p-3 rounded-xl font-medium" value={c.closingDays} onChange={e => updateAirCountry(c.id, 'closingDays', e.target.value)} /></div>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ZEEVRACHT EDITOR */}
            {activeTab === 'zeevracht_editor' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><Ship className="w-8 h-8 mr-4" /> Zeevracht Beheer</h3>
                  <button onClick={() => setLocalContent({...localContent, seaFreightCountries: [...localContent.seaFreightCountries, { id: Date.now().toString(), name: 'Nieuwe Bestemming', flag: '🚢', type: 'Particulieren', details: [] }]})} className="bg-cfl-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg flex items-center"><Plus className="w-5 h-5 mr-2"/> Toevoegen</button>
                </div>
                <div className="space-y-8">
                  {localContent.seaFreightCountries.map((c) => (
                    <div key={c.id} className="relative bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-6 group">
                      <button onClick={() => setLocalContent({...localContent, seaFreightCountries: localContent.seaFreightCountries.filter(x => x.id !== c.id)})} className="absolute top-6 right-6 text-gray-300 hover:text-red-500 p-2"><Trash2 className="w-5 h-5"/></button>
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                         <div className="w-full md:w-48 text-center">
                            <label className="text-[9px] font-black uppercase mb-3 block">Vlag / Icoon</label>
                            <div className="relative group w-full aspect-video bg-white rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden shadow-inner">
                               {c.flagUrl ? <img src={c.flagUrl} className="w-full h-full object-cover" /> : <span className="text-4xl">{c.flag}</span>}
                               <button onClick={() => { setActiveFlagUpload({type: 'sea', id: c.id}); flagInputRef.current?.click(); }} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest"><Upload className="w-5 h-5 mr-2" /> Upload</button>
                            </div>
                         </div>
                         <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="text-[9px] font-black uppercase mb-1">Land</label><input type="text" className="w-full bg-white p-3 rounded-xl font-bold" value={c.name} onChange={e => updateSeaCountry(c.id, 'name', e.target.value)} /></div>
                            <div><label className="text-[9px] font-black uppercase mb-1">Doelgroep</label><select className="w-full bg-white p-3 rounded-xl font-bold" value={c.type} onChange={e => updateSeaCountry(c.id, 'type', e.target.value as any)}><option value="Particulieren">Particulieren</option><option value="Zakelijk">Zakelijk</option></select></div>
                            <div className="md:col-span-2"><label className="text-[9px] font-black uppercase mb-1">Details (één per regel)</label><textarea className="w-full bg-white p-3 rounded-xl font-medium text-sm" rows={4} value={c.details.join('\n')} onChange={e => updateSeaCountry(c.id, 'details', e.target.value.split('\n'))} /></div>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* JURIDISCH EDITOR */}
            {activeTab === 'legal_editor' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><FileText className="w-8 h-8 mr-4" /> Juridisch Beheer</h3>
                <div className="space-y-8">
                  <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Algemene Voorwaarden</label><textarea rows={10} className="w-full px-8 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-700 outline-none focus:bg-white focus:border-cfl-blue transition-all" value={localContent.legalContent.algemeneVoorwaarden} onChange={e => setLocalContent({ ...localContent, legalContent: { ...localContent.legalContent, algemeneVoorwaarden: e.target.value } })} /></div>
                  <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Privacy Policy</label><textarea rows={10} className="w-full px-8 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-700 outline-none focus:bg-white focus:border-cfl-blue transition-all" value={localContent.legalContent.privacyPolicy} onChange={e => setLocalContent({ ...localContent, legalContent: { ...localContent.legalContent, privacyPolicy: e.target.value } })} /></div>
                  <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Terms of Use</label><textarea rows={10} className="w-full px-8 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium text-gray-700 outline-none focus:bg-white focus:border-cfl-blue transition-all" value={localContent.legalContent.termsOfUse} onChange={e => setLocalContent({ ...localContent, legalContent: { ...localContent.legalContent, termsOfUse: e.target.value } })} /></div>
                </div>
              </div>
            )}

            {/* SEO CONFIG */}
            {activeTab === 'seo_config' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10 animate-fadeIn">
                <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center"><Search className="w-8 h-8 mr-4" /> SEO & Vindbaarheid</h3>
                <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-2xl">
                  {Object.keys(localContent.seo).map((page) => (
                    <button key={page} onClick={() => setActiveSeoPage(page as any)} className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${activeSeoPage === page ? 'bg-cfl-blue text-white shadow-md' : 'text-gray-400 hover:text-gray-600 hover:bg-white'}`}>{page}</button>
                  ))}
                </div>
                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-8 animate-fadeIn">
                  <h4 className="font-black text-gray-900 uppercase tracking-tight">Pagina: {activeSeoPage.toUpperCase()}</h4>
                  <div className="space-y-6">
                    <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Pagina Titel</label><input type="text" className="w-full bg-white border border-gray-200 p-5 rounded-xl font-bold text-gray-900 focus:border-cfl-blue outline-none" value={localContent.seo[activeSeoPage].title} onChange={e => updateSeo(activeSeoPage, 'title', e.target.value)} /></div>
                    <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Omschrijving (Google)</label><textarea rows={3} className="w-full bg-white border border-gray-200 p-5 rounded-xl font-medium text-gray-900 outline-none focus:border-cfl-blue" value={localContent.seo[activeSeoPage].description} onChange={e => updateSeo(activeSeoPage, 'description', e.target.value)} /></div>
                    <div><label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Share Afbeelding</label><div className="flex items-center gap-6"><div className="w-40 h-24 bg-white border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">{localContent.seo[activeSeoPage].shareImage ? <img src={localContent.seo[activeSeoPage].shareImage} className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-gray-200" />}</div><button onClick={() => seoInputRef.current?.click()} className="bg-white border-2 border-gray-100 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 flex items-center"><Upload className="w-4 h-4 mr-2" /> Upload</button></div><input type="file" ref={seoInputRef} className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'seo')} /></div>
                  </div>
                </div>
              </div>
            )}

            {/* DOCUMENTATIE */}
            {activeTab === 'docs' && (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 animate-fadeIn">
                <h3 className="text-2xl font-black text-cfl-blue uppercase tracking-tighter flex items-center mb-10"><BookOpen className="w-8 h-8 mr-4" /> Help & Documentatie</h3>
                <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                  <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                    <h4 className="text-cfl-blue font-black uppercase text-sm tracking-widest mb-4">Hoe werkt dit paneel?</h4>
                    <p className="text-sm leading-relaxed">Dit beheerpaneel is ontworpen om direct wijzigingen aan te brengen aan de live website. Zodra je klaar bent met bewerken, klik je op de grote oranje <strong>ALLES OPSLAAN</strong> knop om de wijzigingen definitief te maken voor alle bezoekers.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 bg-gray-50 rounded-2xl"><h5 className="font-bold text-gray-900 mb-2">Afbeeldingen</h5><p className="text-xs">De hero-slider kan meerdere afbeeldingen bevatten die automatisch roteren op de homepagina. Gebruik bij voorkeur brede foto's (landscape).</p></div>
                    <div className="p-6 bg-gray-50 rounded-2xl"><h5 className="font-bold text-gray-900 mb-2">Vlaggen</h5><p className="text-xs">Je kunt voor elk land een emoji vlag instellen, of een eigen afbeelding (icoon) uploaden die de emoji vervangt.</p></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <input type="file" ref={flagInputRef} className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'flag')} />
      <input type="file" ref={heroInputRef} className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'hero')} />
    </div>
  );
};

export default Admin;
