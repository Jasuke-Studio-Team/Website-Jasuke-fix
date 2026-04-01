export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  video_url?: string;      // Video Teaser column
  project_link?: string;   // Project Link column
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
  video_url?: string;
}

/** One launched / published IP (sheet: "IP Ready") */
export interface IPReadyItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  teaser_url?: string;       // Teaser column
  download_link?: string;    // Link Download column
}

/** One progress stage for the in-progress IP project (sheet: "IP In Progress") */
export interface IPInProgressStage {
  id: string;
  project_title: string;       // Project Title  (col A)
  project_description: string; // Project Description (col B)
  stage_name: string;          // Stage Name (col C)
  status: string;              // Status (col D)
  progress_note: string;       // Lore Update / Progress Note (col E)
  target_date: string;         // Target Date (col F)
  image_url: string;           // Image Url (col H)
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  portfolio?: string;
  photo_url: string;
}

export interface CMSData {
  portfolio: PortfolioItem[];
  articles: Article[];
  ip_ready: IPReadyItem[];
  ip_in_progress: IPInProgressStage[];
  team: TeamMember[];
  lastUpdated: string;
}
