import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { PortfolioView } from './components/PortfolioView';
import { IPView } from './components/IPView';
import { BlogView } from './components/BlogView';
import { fetchCMSData } from './services/cmsService';
import { CMSData } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [data, setData] = useState<CMSData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const cmsData = await fetchCMSData();
      setData(cmsData);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary font-headline text-2xl animate-pulse">
          Forging the Hearth...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && data && (
              <HomeView 
                portfolio={data.portfolio} 
                articles={data.articles} 
                original_ip={data.original_ip} 
              />
            )}
            {activeTab === 'portfolio' && data && (
              <PortfolioView items={data.portfolio} />
            )}
            {activeTab === 'ip' && data && (
              <IPView ips={data.original_ip} />
            )}
            {activeTab === 'blog' && data && (
              <BlogView articles={data.articles} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 bg-black border-t border-secondary/20 flex flex-col items-center justify-center gap-6">
        <div className="flex gap-8 text-on-surface-variant font-sans text-xs uppercase tracking-widest">
          <a className="text-stone-600 hover:text-primary underline underline-offset-4 transition-colors" href="#">The Ledger</a>
          <a className="text-stone-600 hover:text-primary underline underline-offset-4 transition-colors" href="#">Privacy Scroll</a>
          <a className="text-stone-600 hover:text-primary underline underline-offset-4 transition-colors" href="#">Terms of Service</a>
        </div>
        <div className="text-stone-600 text-xs uppercase tracking-widest text-center">
          © 1224 Jasuke Studio. All rights reserved by the High Council.
        </div>
      </footer>
    </div>
  );
}
