
import { AppContent } from './types';

export const DEFAULT_CONTENT: AppContent = {
  heroTitle: "Welkom bij Caribbean Freight Logistics",
  heroText: "Wij zijn de specialist in luchtvracht en zeevracht. Wij hebben 20 jaren ervaring op deze markt. Onze ervaring is uw voordeel!!",
  importExportText: "Caribbean Freight Logistics B.V. is de partner voor al uw logistieke diensten van Nederland naar diverse landen met als specialisatie Suriname en de Caribbean.",
  
  airFreightIntro: "Caribbean Freight Logistics heeft door haar jarenlange ervaring de beste en snelste mogelijkheden om uw luchtvracht wereldwijd op plaats van bestemming te krijgen.",
  airFreightCountries: [
    {
      id: '1',
      name: 'Suriname',
      flag: '🇸🇷',
      tagline: 'Wekelijks',
      closingDays: 'Elke Woensdag & Zaterdag (10:00 - 14:00u)',
      handlingInfo: 'Gemiddeld na 3 werkdagen beschikbaar in Paramaribo.',
      handlerName: 'SeAir Freight Services, Paramaribo.',
      footerInfo: '* Alle gewichten worden naar boven afgerond op hele kilo\'s.'
    },
    {
      id: '2',
      name: 'Curaçao',
      flag: '🇨🇼',
      tagline: 'Snel',
      closingDays: 'Elke Zaterdag (tot 14:00u)',
      handlingInfo: 'Vliegt op dinsdag/donderdag, aankomst uiterlijk vrijdag in Curaçao.',
      handlerName: 'Lokale afhandelaar neemt contact op voor ophaling.',
      footerInfo: '* Alle gewichten worden naar boven afgerond op hele kilo\'s.'
    }
  ],

  seaFreightIntro: "Caribbean Freight Logistics is actief in zeevracht en beschikt over de connecties om vracht naar de juiste bestemming te verschepen.",
  seaFreightCountries: [
    {
      id: '1',
      name: 'Suriname',
      flag: '🇸🇷',
      type: 'Particulieren',
      details: [
        'Sluitingsdagen: Zaterdagen om de week (even weken).',
        'Afhandelaar: SeAir Freight Services, Paramaribo.',
        'Ontvanger wordt gecontacteerd voor ophaling.'
      ]
    },
    {
      id: '2',
      name: 'Curaçao',
      flag: '🇨🇼',
      type: 'Particulieren',
      details: [
        'Sluitingsdag: Elke donderdag tot 15:00 uur.',
        'Levertijd: Pakket gemiddeld 4 weken na afvaart.',
        'Afhandelaar: I.C.S. Curacao.'
      ]
    }
  ],

  rates: [
    { id: '1', destination: 'Suriname', label: 'Luchtvracht per kg', value: '€6,50' },
    { id: '2', destination: 'Suriname', label: 'Startgewicht', value: '2 kg' },
    { id: '3', destination: 'Curaçao', label: 'Luchtvracht per kg', value: '€7,50' },
    { id: '4', destination: 'Curaçao', label: 'Startgewicht', value: '2 kg' }
  ],
  contact: {
    phoneKantoor: "085 401 6325",
    phoneKlantenservice: "0610308965",
    phoneRadj: "0684698787",
    whatsapp: "0610308965",
    email: "info@caribbeanfreightline.nl"
  },
  branding: {
    logoUrl: "",
    companyName: "CARIBBEAN FREIGHT",
    heroImages: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920",
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1920",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1920"
    ],
    footerCopyrightText: "CARIBBEAN FREIGHT • MADE WITH PRIDE"
  },
  socialLinks: [
    { id: '1', platform: 'Instagram', url: 'https://instagram.com' },
    { id: '2', platform: 'Facebook', url: 'https://facebook.com' },
    { id: '3', platform: 'LinkedIn', url: 'https://linkedin.com' }
  ],
  legalContent: {
    algemeneVoorwaarden: "Onze algemene voorwaarden zijn van toepassing op alle diensten...",
    privacyPolicy: "Wij respecteren uw privacy en verwerken uw gegevens zorgvuldig...",
    termsOfUse: "Door gebruik te maken van deze website gaat u akkoord met de volgende voorwaarden..."
  },
  theme: {
    primaryColor: "#3B3E98",
    secondaryColor: "#F15A24"
  },
  sailingSchedules: [
    {
      id: '1',
      destination: 'Suriname',
      closingDate: '2024-03-15',
      departureDate: '2024-03-20',
      arrivalDate: '2024-04-10',
      vessel: 'MSC Caribbean I'
    },
    {
      id: '2',
      destination: 'Curaçao',
      closingDate: '2024-03-18',
      departureDate: '2024-03-22',
      arrivalDate: '2024-04-15',
      vessel: 'Atlantic Star'
    }
  ],
  seo: {
    home: {
      title: "Caribbean Freight Logisticss | Expert in Suriname & Caribbean",
      description: "20 jaar ervaring in luchtvracht en zeevracht naar Suriname en de Caribbean. Uw logistieke partner vanuit Nederland.",
      keywords: "vrachtvervoer, suriname, caribbean, luchtvracht, zeevracht, logistiek",
      shareImage: ""
    },
    luchtvracht: {
      title: "Luchtvracht naar Suriname & Caribbean | Snel & Betrouwbaar",
      description: "Wekelijkse vluchten naar Paramaribo en Curaçao. Scherpe tarieven en snelle afhandeling.",
      keywords: "luchtvracht suriname, pakket sturen suriname, cargo curacao",
      shareImage: ""
    },
    zeevracht: {
      title: "Zeevracht Suriname & Caribbean | Container & Groupage",
      description: "Verstuur containers of losse pakketten via zeevracht. Deskundig advies en scherpe prijzen.",
      keywords: "container suriname, zeevracht paramaribo, groupage caribbean",
      shareImage: ""
    },
    diensten: {
      title: "Logistieke Diensten | Caribbean Freight Logisticss",
      description: "Bekijk ons complete aanbod van logistieke oplossingen voor particulieren en bedrijven.",
      keywords: "diensten, logistiek, transport, warehousing",
      shareImage: ""
    },
    afvaart: {
      title: "Actueel Afvaartschema | Boot naar Suriname & Caribbean",
      description: "Bekijk de meest recente planning voor vertrek en aankomst van onze vrachtschepen.",
      keywords: "afvaartschema, boot suriname, vertrekdata zeevracht",
      shareImage: ""
    },
    contact: {
      title: "Contact Caribbean Freight Logisticss | Gouda & Ridderkerk",
      description: "Neem contact op met ons team in Gouda of Ridderkerk voor al uw vragen over vrachtvervoer.",
      keywords: "contact, klantenservice, adres ridderkerk, telefoon gouda",
      shareImage: ""
    }
  }
};

export const COLORS = {
  blue: '#3B3E98',
  orange: '#F15A24',
  darkBlue: '#1E2050'
};
