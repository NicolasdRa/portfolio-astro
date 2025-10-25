import React, { useRef, useEffect, useState } from 'react';
import { animate } from 'animejs';
import CustomLink from '../../CustomLink/CustomLink';
import styles from './ContactSection.module.css';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactSection: React.FC = () => {
  const contentRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'please enter a message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // If validation passes, submit the form
      e.currentTarget.submit();
    }
  };

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
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="contact-portfolio" />
          <div className={styles.formGroup}>
            <div className={styles.fieldWrapper}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="name"
                autoComplete="name"
                className={`${styles.formControl} ${errors.name ? styles.error : ''}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
            </div>

            <div className={styles.fieldWrapper}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                autoComplete="email"
                className={`${styles.formControl} ${errors.email ? styles.error : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>

            <div className={styles.fieldWrapper}>
              <textarea
                rows={5}
                id="message"
                name="message"
                placeholder="message"
                className={`${styles.formControl} ${errors.message ? styles.error : ''}`}
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
            </div>
          </div>
          <CustomLink type="button" url="" text="submit" />
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
