export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  video_url?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image_url: string;
  category: string;
}

export interface OriginalIP {
  id: string;
  title: string;
  description: string;
  status: string;
  image_url: string;
  lore_index: string;
}

export interface CMSData {
  portfolio: PortfolioItem[];
  articles: Article[];
  original_ip: OriginalIP[];
  lastUpdated: string;
}
