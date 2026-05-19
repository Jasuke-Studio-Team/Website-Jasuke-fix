import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { PortfolioView } from './components/PortfolioView';
import { IPView } from './components/IPView';
import { BlogView } from './components/BlogView';
import { ArticleView } from './components/ArticleView';
import { fetchCMSData } from './services/cmsService';
import { CMSData } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [data, setData] = useState<CMSData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function loadData() {
      const cmsData = await fetchCMSData();
      setData(cmsData);
      setLoading(false);
    }
    loadData();
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  function scrollToContact() {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

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
      <Navbar onContactClick={scrollToContact} />

      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route
                path="/"
                element={
                  data ? (
                    <HomeView
                      portfolio={data.portfolio}
                      articles={data.articles}
                      team={data.team}
                      onContactClick={scrollToContact}
                    />
                  ) : null
                }
              />
              <Route
                path="/portfolio"
                element={data ? <PortfolioView items={data.portfolio} /> : null}
              />
              <Route
                path="/ip"
                element={
                  data ? (
                    <IPView
                      ipReady={data.ip_ready}
                      ipInProgress={data.ip_in_progress}
                    />
                  ) : null
                }
              />
              <Route
                path="/blog"
                element={data ? <BlogView articles={data.articles} /> : null}
              />
              <Route
                path="/article/:articleId"
                element={
                  data ? (
                    <ArticleView allArticles={data.articles} />
                  ) : null
                }
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

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
