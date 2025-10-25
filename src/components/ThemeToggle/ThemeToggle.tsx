import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useUiStore } from '@stores/cursor.store';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const setCursorType = useUiStore((state) => state.setCursorType);

  useEffect(() => {
    // Get initial theme from DOM
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
    setTheme(currentTheme || 'light');
    setMounted(true);

    // Listen for theme changes from other sources
    const handleThemeChange = (event: CustomEvent) => {
      setTheme(event.detail.theme);
    };

    window.addEventListener('theme-changed' as any, handleThemeChange);

    return () => {
      window.removeEventListener('theme-changed' as any, handleThemeChange);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mounted) return;

    // GSAP fade-in animation matching Gatsby
    gsap.to(containerRef.current, {
      duration: 0.3,
      opacity: 1,
      ease: 'power2.out'
    });
  }, [mounted]);

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Update DOM and localStorage
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme-mode', newTheme);

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: newTheme } }));
  };

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={styles.container}
    >
      <button
        className={styles.button}
        onClick={handleToggle}
        onMouseEnter={() => setCursorType('hover')}
        onMouseLeave={() => setCursorType('default')}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? 'dark' : 'light'}
      </button>
    </div>
  );
};

export default ThemeToggle;