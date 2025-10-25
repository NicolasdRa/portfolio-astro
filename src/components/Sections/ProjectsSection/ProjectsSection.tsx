import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectList from '../../ProjectList/ProjectList';
import CustomLink from '../../CustomLink/CustomLink';
import styles from './ProjectsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            <span>03.</span>projects
          </h2>
          <h3 className={styles.subtitle}>things i've built, things I'm working on</h3>
        </div>
        <ProjectList featured />
        <div className={styles.btnContainer}>
          <CustomLink url="/projects" type="internal" text="more projects" />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
