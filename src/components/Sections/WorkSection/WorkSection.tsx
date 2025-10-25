import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomLink from '../../CustomLink/CustomLink';
import styles from './WorkSection.module.css';
import jobs from '../../../constants/jobs';

const WorkSection: React.FC = () => {
  gsap.registerPlugin(ScrollTrigger);
  const contentRef = useRef(null);

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
              trigger: element,
              start: 'top 75%',
              end: 'bottom 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      },
    });
  }, []);

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
