import React from 'react';
import { motion } from 'motion/react';
import { Menu, X, Swords, Map as MapIcon, BookOpen, Mail } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Swords },
    { id: 'portfolio', label: 'Portfolio', icon: MapIcon },
    { id: 'ip', label: 'Our IP', icon: BookOpen },
    { id: 'blog', label: 'Blog', icon: Mail },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-[0_4px_20px_rgba(255,179,0,0.08)]">
        <div 
          className="cursor-pointer"
          onClick={() => setActiveTab('home')}
        >
          <img 
            src="/Asset/logo Jasuke New.png" 
            alt="Jasuke Studio" 
            className="h-10 w-auto object-contain drop-shadow-[0_2px_4px_rgba(255,179,0,0.5)]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "font-headline tracking-tight transition-all duration-300 relative py-1",
                activeTab === item.id 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {item.label}
            </button>
          ))}
          <button className="bg-primary text-primary-foreground font-bold px-6 py-2 rounded-sm hover:shadow-[0_0_15px_rgba(255,179,0,0.4)] active:scale-95 transition-all duration-300">
            Contact Us
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { x: 0 } : { x: '100%' }}
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsOpen(false);
            }}
            className={cn(
              "text-3xl font-headline tracking-tight",
              activeTab === item.id ? "text-primary" : "text-on-surface-variant"
            )}
          >
            {item.label}
          </button>
        ))}
        <button className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-sm">
          Contact Us
        </button>
      </motion.div>
    </>
  );
}
