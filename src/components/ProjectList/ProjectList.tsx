import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { v4 } from 'uuid';
import ProjectItem from '../ProjectItem/ProjectItem';
import styles from './ProjectList.module.css';
import projectsData from '../../constants/projects';

gsap.registerPlugin(ScrollTrigger);

interface ProjectListProps {
  featured: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ featured }) => {
  const projects = projectsData;

  const contentRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);
  elementsRef.current = [];

  const data = featured ? projects.filter((project) => project.featured === true) : projects;

  useEffect(() => {
    if (!contentRef.current) return;
    const element = contentRef.current;

    ScrollTrigger.matchMedia({
      '(min-width: 800px)': function () {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 100,
          },
          {
            duration: 0.8,
            ease: 'expo.out',
            opacity: 1,
            y: 0,
            scrollTrigger: {
              id: `Projects`,
              trigger: element,
              start: 'top 75%',
              end: 'bottom 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        elementsRef.current.forEach((el, index) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 100,
            },
            {
              duration: 0.8,
              ease: 'expo.out',
              opacity: 1,
              y: 0,
              scrollTrigger: {
                id: `project-${index + 1}`,
                trigger: el,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      },
    });
  }, []);

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
