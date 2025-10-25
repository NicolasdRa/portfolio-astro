import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './CustomImage.module.css';

interface CustomImageProps {
  src: string;
  alt?: string;
  isActive?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt = '',
  isActive = false,
}) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current || !isActive) return;

    const element = imageRef.current;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        duration: 0.3,
        delay: 0.1,
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
      }
    );
  }, [isActive]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={imageRef}
        className={`${styles.imageContainer} ${isActive ? styles.active : ''}`}
      >
        <img src={src} alt={alt} className={styles.image} />
      </div>
    </div>
  );
};

export default CustomImage;