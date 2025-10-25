import React, { useRef, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { animate } from 'animejs';
import styles from './AboutSection.module.css';
import about from '../../../constants/about';

const AboutSection: React.FC = () => {
  const contentRef = useRef<HTMLElement>(null);
  const stackWrapperRef = useRef<HTMLDivElement>(null);
  const stackFadeRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const INITIAL_ITEMS = 10;

  useEffect(() => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    const isDesktop = window.matchMedia('(min-width: 800px)').matches;

    if (!isDesktop) return;

    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(120px)';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate(element, {
              opacity: [0, 1],
              translateY: [120, 0],
              duration: 800,
              ease: 'outExpo',
            });
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -25% 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!stackWrapperRef.current) return;

    // Get responsive collapsed height based on screen size
    const getCollapsedHeight = () => {
      const width = window.innerWidth;
      if (width <= 600) return 300;
      if (width <= 768) return 200;
      if (width <= 960) return 180;
      return 120;
    };

    if (showAll) {
      // Expand animation
      animate(stackWrapperRef.current, {
        maxHeight: 2000,
        duration: 1000,
        ease: 'inOutCubic',
      });

      // Fade out the overlay
      if (stackFadeRef.current) {
        animate(stackFadeRef.current, {
          opacity: [1, 0],
          duration: 500,
          ease: 'inOutQuad',
        });
      }
    } else {
      // Collapse animation
      animate(stackWrapperRef.current, {
        maxHeight: getCollapsedHeight(),
        duration: 1000,
        ease: 'inOutCubic',
      });

      // Fade in the overlay
      if (stackFadeRef.current) {
        animate(stackFadeRef.current, {
          opacity: [0, 1],
          duration: 500,
          ease: 'inOutQuad',
        });
      }
    }
  }, [showAll]);

  const { stack } = about;

  return (
    <section id="about" className={styles.container} ref={contentRef}>
      <div className={styles.content}>
        <div className={styles.titles}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>
              <div className="title-line" />
              <span>01. </span>about
            </h2>
          </div>
          <h3>profile, skills & stack</h3>
        </div>

        <div className={styles.text}>
          <p className={styles.profile}>{about.text}</p>
          <div
            ref={stackWrapperRef}
            className={`${styles.stackWrapper} ${showAll ? styles.expanded : ''}`}
          >
            <div className={styles.stackGrid}>
              {stack.map((item) => (
                <p key={uuidv4()} className={styles.stackItem}>
                  {item}
                </p>
              ))}
            </div>
            <div
              ref={stackFadeRef}
              className={styles.stackFade}
              style={{ opacity: showAll ? 0 : 1 }}
            />
          </div>
          {stack.length > INITIAL_ITEMS && (
            <button
              className={styles.viewAllBtn}
              onClick={() => setShowAll(!showAll)}
              type="button"
            >
              {showAll ? 'show less' : 'view more'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
