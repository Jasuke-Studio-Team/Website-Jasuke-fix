import { CMSData, PortfolioItem, Article, IPReadyItem, IPInProgressStage } from '../types';

// ─── Mock data (used when VITE_GAS_API_URL is not set) ────────────────────────
const MOCK_DATA: CMSData = {
  portfolio: [
    {
      id: 'P01',
      title: 'RPG Kingdom',
      description: 'Game petualangan kolosal yang dibuat dengan Unity.',
      category: 'Full Dev',
      image_url: 'https://picsum.photos/seed/rpg/800/600',
      video_url: 'https://youtu.be/xdbGC_HQ1ho',
      project_link: 'https://akhmad-tegar.itch.io/the-buzzer-is-real',
    },
    {
      id: 'P02',
      title: 'Knight 3D Model',
      description: 'Karakter high-poly petarung untuk game aksi.',
      category: '3D Asset',
      image_url: 'https://picsum.photos/seed/knight/800/600',
    },
  ],
  articles: [
    {
      id: 'A01',
      title: 'Tips Menjadi Anak DKV',
      excerpt: 'Menjadi anak DKV itu harus...',
      content: 'Menjadi anak DKV itu harus kreatif dan terus berinovasi.',
      date: '1/4/2026',
      author: 'Cia',
      image_url: 'https://picsum.photos/seed/dkv/800/600',
      category: 'Tutorial',
    },
  ],
  ip_ready: [
    {
      id: '1',
      title: 'MANDALA',
      description: 'Bocah skizo — sebuah petualangan roguelike.',
      image_url: 'https://picsum.photos/seed/mandala/800/600',
      teaser_url: 'https://youtu.be/yqrggNy_hKs',
      download_link: 'https://akhmad-tegar.itch.io/the-buzzer-is-real',
    },
  ],
  ip_in_progress: [
    {
      id: '1',
      project_title: 'Project BPKB (IP Name TBA)',
      project_description: 'Bpkb adalah project Tugas Akhir mahasiswa GT di PENS.',
      stage_name: 'Concept & Lore',
      status: 'Completed',
      progress_note: 'Semesta Jasuke sudah terbentuk.',
      target_date: 'Q1 2026',
      image_url: 'https://picsum.photos/seed/bpkb/800/600',
    },
  ],
  lastUpdated: new Date().toISOString(),
};

// ─── GAS key normaliser: "Project Title" → "project_title" ────────────────────
function key(raw: string): string {
  return raw.toString().toLowerCase().replace(/ /g, '_');
}

// ─── Main fetch function ───────────────────────────────────────────────────────
export async function fetchCMSData(): Promise<CMSData> {
  const gasUrl = import.meta.env.VITE_GAS_API_URL;

  if (!gasUrl) {
    console.warn('GAS API URL not found, using mock data.');
    return MOCK_DATA;
  }

  try {
    const response = await fetch(gasUrl);
    if (!response.ok) throw new Error('Failed to fetch CMS data');
    const raw = await response.json();

    // ── Portfolio (sheet: "Portfolio") ───────────────────────────────────────
    const portfolio: PortfolioItem[] = (raw.portfolio || []).map((item: any, i: number) => ({
      id: String(item.id || i),
      title: item.quest_name || item.title || '-',
      description: item.description || item['lore_(description)'] || '-',
      category: item.class_category || item['class_(category)'] || '-',
      image_url: item.thumbnail_url || 'https://picsum.photos/seed/portfolio/800/600',
      video_url: (item.video_teaser || item['vision_crystal_(youtube_link)'] || '').toString().trim() || undefined,
      project_link: (item.project_link || '').toString().trim() || undefined,
    }));

    // ── Articles (sheet: "Articles") ─────────────────────────────────────────
    const articles: Article[] = (raw.articles || []).map((item: any, i: number) => ({
      id: String(item.id || i),
      title: item.title || '-',
      excerpt: item['scroll_content_(markdown/text)']
        ? item['scroll_content_(markdown/text)'].substring(0, 120) + '...'
        : '-',
      content: item['scroll_content_(markdown/text)'] || '-',
      date: item.date ? new Date(item.date).toLocaleDateString() : '-',
      author: item.author || 'Admin',
      image_url: item.header_image || 'https://picsum.photos/seed/article/800/600',
      category: item.category || '-',
      video_url: (item['vision_crystal_(youtube)'] || item['vision_crystal_(youtube_link)'] || '').toString().trim() || undefined,
    }));

    // ── IP Ready (sheet: "IP Ready") ─────────────────────────────────────────
    // GAS normalises headers → "project_title", "project_description", "thumbnail",
    // "teaser", "link_download"
    const ip_ready: IPReadyItem[] = (raw.ip_ready || []).map((item: any, i: number) => ({
      id: String(i + 1),
      title: item.project_title || '-',
      description: item.project_description || '-',
      image_url: item.thumbnail || 'https://picsum.photos/seed/ipready/800/600',
      teaser_url: (item.teaser || '').toString().trim() || undefined,
      download_link: (item.link_download || '').toString().trim() || undefined,
    }));

    // ── IP In Progress (sheet: "IP In Progress") ──────────────────────────────
    // GAS normalises: "project_title", "project_description", "stage_name",
    // "status", "lore_update_(progress_note)", "target_date", "order", "image_url"
    const ip_in_progress: IPInProgressStage[] = (raw.ip_in_progress || []).map((item: any, i: number) => ({
      id: String(item.order || i + 1),
      project_title: item.project_title || '-',
      project_description: item.project_description || '-',
      stage_name: item.stage_name || '-',
      status: item.status || '-',
      progress_note: item['lore_update_(progress_note)'] || '-',
      target_date: item.target_date || 'TBD',
      image_url: item.image_url || `https://picsum.photos/seed/stage${i}/800/600`,
    }));

    return {
      portfolio,
      articles,
      ip_ready,
      ip_in_progress,
      lastUpdated: raw.lastUpdated || new Date().toISOString(),
    };

  } catch (error) {
    console.error('Error fetching CMS data:', error);
    return MOCK_DATA;
  }
}
