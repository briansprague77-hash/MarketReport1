'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Mail, MessageSquare, Check } from 'lucide-react';

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  variant?: 'icon' | 'button' | 'compact';
}

export default function ShareButton({
  url,
  title,
  description,
  variant = 'button',
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(
      `${description ? description + '\n\n' : ''}${url}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_self');
    setIsOpen(false);
  };

  const handleSMS = () => {
    const body = encodeURIComponent(`${title}: ${url}`);
    window.open(`sms:?body=${body}`, '_self');
    setIsOpen(false);
  };

  const menuItems = [
    {
      label: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? Check : Copy,
      onClick: handleCopy,
      highlight: copied,
    },
    {
      label: 'Email',
      icon: Mail,
      onClick: handleEmail,
      highlight: false,
    },
    {
      label: 'Text / SMS',
      icon: MessageSquare,
      onClick: handleSMS,
      highlight: false,
    },
  ];

  const triggerClasses =
    variant === 'icon'
      ? 'p-2 rounded-sm text-charcoal-400 hover:text-gold-500 hover:bg-charcoal-800/50 transition-colors'
      : variant === 'compact'
      ? 'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-body font-semibold text-charcoal-500 hover:text-gold-500 border border-ivory-300 hover:border-gold-500/40 rounded-sm transition-all'
      : 'inline-flex items-center gap-2 px-4 py-2 text-sm font-body font-semibold text-ivory-300 hover:text-gold-500 border border-charcoal-700 hover:border-gold-500/40 bg-charcoal-900 rounded-sm transition-all';

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={triggerClasses}
        aria-label="Share"
      >
        <Share2 className={variant === 'icon' ? 'w-4 h-4' : 'w-4 h-4'} />
        {variant !== 'icon' && <span>Share</span>}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-48 bg-charcoal-950 border border-charcoal-800 rounded-sm shadow-xl z-50 overflow-hidden"
          >
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-body transition-colors ${
                  item.highlight
                    ? 'text-green-400 bg-green-500/10'
                    : 'text-ivory-300 hover:text-gold-500 hover:bg-charcoal-900'
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
