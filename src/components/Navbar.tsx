import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Swords, Map as MapIcon, BookOpen, Mail } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NavbarProps {
  onContactClick: () => void;
}

export function Navbar({ onContactClick }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Swords },
    { path: '/portfolio', label: 'Portfolio', icon: MapIcon },
    { path: '/ip', label: 'Our IP', icon: BookOpen },
    { path: '/blog', label: 'Blog', icon: Mail },
  ];

  function isActive(path: string) {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-[0_4px_20px_rgba(255,179,0,0.08)]">
        <Link to="/" className="cursor-pointer">
          <img 
            src="/Asset/logo Jasuke New.png" 
            alt="Jasuke Studio" 
            className="h-10 w-auto object-contain drop-shadow-[0_2px_4px_rgba(255,179,0,0.5)]"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "font-headline tracking-tight transition-all duration-300 relative py-1",
                isActive(item.path)
                  ? "text-primary border-b-2 border-primary" 
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {item.label}
            </Link>
          ))}
          <button 
            onClick={onContactClick}
            className="bg-primary text-primary-foreground font-bold px-6 py-2 rounded-sm hover:shadow-[0_0_15px_rgba(255,179,0,0.4)] active:scale-95 transition-all duration-300"
          >
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
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={cn(
              "text-3xl font-headline tracking-tight",
              isActive(item.path) ? "text-primary" : "text-on-surface-variant"
            )}
          >
            {item.label}
          </Link>
        ))}
        <button 
          onClick={() => {
            onContactClick();
            setIsOpen(false);
          }}
          className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-sm"
        >
          Contact Us
        </button>
      </motion.div>
    </>
  );
}
