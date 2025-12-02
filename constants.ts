import { Project } from "./types";

// ==========================================
// GENEL BUTON LİNKLERİ
// ==========================================
export const GLOBAL_LINKS = {
  // Ana sayfadaki büyük butonun (Hero) gideceği adres
  HERO_BUTTON: "https://github.com/pulsariums", 
};

// ==========================================
// PROJE KARTLARI VE LİNKLERİ
// ==========================================
export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "PixelGen AI",
    description: "Metin girdilerini nöral ağlar üzerinden işleyerek retro estetiğe sahip özgün pixel art görselleri sentezleyen üretken yapay zeka motoru.",
    url: "https://pulsariums.github.io/pixelgen", 
    tags: ["AI", "Generative", "Pixel Art"],
    iconName: "Box",
    featured: true
  },
  {
    id: "2",
    name: "Pulsar Tabloları",
    description: "Karmaşık veri setleri için yüksek performanslı, AMOLED uyumlu ve tamamen özelleştirilebilir modern tablo sistemi.",
    url: "https://pulsariums.github.io/nebula", 
    tags: ["UI", "Data", "Dashboard"],
    iconName: "Layout",
    featured: true
  },
  {
    id: "3",
    name: "Onyx Chat",
    description: "Kişilikler arası kolaylıkla geçiş yapılabilen. Sizi tanıyan bir chatbot.",
    url: "https://pulsariums.github.io/onyx", 
    tags: ["UI", "Data", "Dashboard"],
    iconName: "Layout",
    featured: true
  },
  {
    id: "4",
    name: "Pulsar AI Summarizer",
    description: "Uzun akademik makaleleri ve teknik dokümanları doğal dil işleme (NLP) ile analiz ederek saniyeler içinde özetleyen nöral ağ motoru.",
    url: "https://pulsariums.github.io/summarizer", 
    tags: ["AI", "NLP", "Analysis"],
    iconName: "Cpu",
    featured: true
  },
  {
    id: "5",
    name: "Pulsar Anime",
    description: "Anime yapımları için detaylı teknik analizler, görsel önizlemeler ve eleştirel inceleme matrisleri sunan kapsamlı veri tabanı terminali.",
    url: "https://pulsariums.github.io/anime",
    tags: ["Database", "Reviews", "Preview"],
    iconName: "Zap",
    featured: true
  }
];