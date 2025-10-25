import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import links from '../../constants/links';
import socialLinks from '../../constants/social_links';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Get initial theme
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
    setTheme(currentTheme || 'light');

    // Listen for theme changes
    const handleThemeChange = (event: CustomEvent) => {
      setTheme(event.detail.theme);
    };

    window.addEventListener('theme-changed' as any, handleThemeChange);
    return () => {
      window.removeEventListener('theme-changed' as any, handleThemeChange);
    };
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme-mode', newTheme);
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: newTheme } }));
  };

  // Close sidebar when clicking a link
  const handleLinkClick = () => {
    toggleSidebar();
  };

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className={styles.wrapper}>
      <aside className={`${styles.sidebar} ${isOpen ? styles.showSidebar : ''}`}>
        <button
          className={styles.closeBtn}
          onClick={toggleSidebar}
          aria-label="Close menu"
        >
          <AiOutlineClose />
        </button>
        <div className={styles.inner}>
          <ul className={styles.sidebarLinks}>
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  onClick={handleLinkClick}
                  className={styles.sidebarLink}
                >
                  <span className={styles.linkNumber}>0{link.id - 1}. </span>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={styles.themeToggleButton}
            onClick={handleThemeToggle}
          >
            {theme === 'light' ? 'dark' : 'light'} mode
          </button>

          <ul className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  className={styles.socialLink}
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;