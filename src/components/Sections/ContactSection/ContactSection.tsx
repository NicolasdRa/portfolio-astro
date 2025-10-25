import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomLink from '../../CustomLink/CustomLink';
import styles from './ContactSection.module.css';

const ContactSection: React.FC = () => {
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
    <section id="contact" className={styles.container} ref={contentRef}>
      <div className={styles.content}>
        <div className={styles.titles}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>
              <div className="title-line" />
              <span>04. </span>contact
            </h2>
          </div>
          <h3>drop a line</h3>
        </div>

        <form
          className={styles.form}
          name="contact-portfolio"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
          action="/success"
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="contact-portfolio" />
          <div className={styles.formGroup}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              autoComplete="name"
              className={styles.formControl}
            />

            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              autoComplete="email"
              className={styles.formControl}
            />

            <textarea
              rows={5}
              id="message"
              name="message"
              placeholder="message"
              className={styles.formControl}
            />
          </div>
          <CustomLink type="button" url="" text="submit" />
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
