import { CMSData } from '../types';

// Mock data for initial development if GAS is not set up yet
const MOCK_DATA: CMSData = {
  portfolio: [
    {
      id: '1',
      title: 'The Sunken Citadel',
      description: 'A high-fidelity environment for a dark fantasy RPG.',
      category: 'Environment Art',
      image_url: 'https://picsum.photos/seed/citadel/800/600',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: '2',
      title: 'Iron Bound Oath',
      description: 'Character design and rigging for a tactical combat game.',
      category: 'Character Design',
      image_url: 'https://picsum.photos/seed/knight/800/600'
    }
  ],
  articles: [
    {
      id: '1',
      title: 'The Art of the Contract',
      excerpt: 'Why every guild needs a scribe to survive the digital era.',
      content: 'Full content here...',
      date: '12. Oct. 1224',
      author: 'Master Scribe',
      image_url: 'https://picsum.photos/seed/scroll/800/600',
      category: 'Lore'
    }
  ],
  original_ip: [
    {
      id: '1',
      title: 'Sanguine Embers',
      description: 'A dark-fantasy odyssey tracing the lineage of the fire-born.',
      status: 'Ongoing Saga',
      image_url: 'https://picsum.photos/seed/embers/800/600',
      lore_index: '84%'
    }
  ],
  lastUpdated: new Date().toISOString()
};

export async function fetchCMSData(): Promise<CMSData> {
  const gasUrl = import.meta.env.VITE_GAS_API_URL;
  
  if (!gasUrl) {
    console.warn("GAS API URL not found, using mock data.");
    return MOCK_DATA;
  }

  try {
    const response = await fetch(gasUrl);
    if (!response.ok) throw new Error("Failed to fetch CMS data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching CMS data:", error);
    return MOCK_DATA;
  }
}
