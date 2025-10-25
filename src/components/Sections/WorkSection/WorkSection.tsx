import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { animate } from 'animejs';
import CustomLink from '../../CustomLink/CustomLink';
import styles from './WorkSection.module.css';
import jobs from '../../../constants/jobs';

const WorkSection: React.FC = () => {
  const contentRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    const isDesktop = window.matchMedia('(min-width: 800px)').matches;

    if (!isDesktop) return;

    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(100px)';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate(element, {
              opacity: [0, 1],
              translateY: [100, 0],
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

  return (
    <section id="work" className={styles.container} ref={contentRef}>
      <div className={styles.content}>
        <div className={styles.titles}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>
              <div className="title-line" />
              <span>02. </span>work
            </h2>
          </div>
          <h3>where I've worked</h3>
        </div>
        <div className={styles.text}>
          {jobs.map((job) => {
            const { id, company, position, startDate, endDate, tasks } = job;

            return (
              <div key={id} className={styles.experienceBlock}>
                <h4>{company}</h4>
                <h5>
                  <span className={styles.date}>
                    {startDate} - {endDate}
                    <span className={styles.position}> - {position}</span>
                  </span>
                </h5>

                {tasks.map((task) => (
                  <p key={uuidv4()}>{task}</p>
                ))}
              </div>
            );
          })}

          <div className={styles.btnContainer}>
            <CustomLink
              type="link"
              url="/cv-nicolasdirago.pdf"
              text="download cv"
              download
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
