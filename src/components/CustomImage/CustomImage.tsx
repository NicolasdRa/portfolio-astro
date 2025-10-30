import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import styles from './CustomImage.module.css';

interface CustomImageProps {
  src: string;
  alt?: string;
  isActive?: boolean;
  width?: number;
  height?: number;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt = '',
  isActive = false,
  width,
  height,
}) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current || !isActive) return;

    const element = imageRef.current;

    animate(element, {
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 300,
      delay: 100,
      ease: 'outQuad',
    });
  }, [isActive]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={imageRef}
        className={`${styles.imageContainer} ${isActive ? styles.active : ''}`}
      >
        <img
          src={src}
          alt={alt}
          className={styles.image}
          width={width}
          height={height}
          loading="eager"
        />
      </div>
    </div>
  );
};

export default CustomImage;