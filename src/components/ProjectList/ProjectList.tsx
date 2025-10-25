import React, { useRef, useEffect, useState } from 'react';
import { animate } from 'animejs';
import { v4 } from 'uuid';
import ProjectItem from '../ProjectItem/ProjectItem';
import styles from './ProjectList.module.css';
import projectsData from '../../constants/projects';

interface ProjectListProps {
  featured: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ featured }) => {
  const projects = projectsData;

  const contentRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [projectsAnimated, setProjectsAnimated] = useState<Set<number>>(new Set());
  elementsRef.current = [];

  const data = featured ? projects.filter((project) => project.featured === true) : projects;

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

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 800px)').matches;
    if (!isDesktop || elementsRef.current.length === 0) return;

    const observers: IntersectionObserver[] = [];

    elementsRef.current.forEach((el, index) => {
      if (!el) return;

      // Set initial state for each project item
      el.style.opacity = '0';
      el.style.transform = 'translateY(100px)';

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !projectsAnimated.has(index)) {
              animate(el, {
                opacity: [0, 1],
                translateY: [100, 0],
                duration: 800,
                ease: 'outExpo',
                delay: 0,
              });
              setProjectsAnimated(prev => new Set(prev).add(index));
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -25% 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [elementsRef.current.length, projectsAnimated]);

  const addToRef = (el: HTMLDivElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <div className={styles.container}>
      <div ref={contentRef} className={styles.list}>
        {data.map((project) => (
          <div ref={addToRef} key={v4()}>
            <ProjectItem project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
