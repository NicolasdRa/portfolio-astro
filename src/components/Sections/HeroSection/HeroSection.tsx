import React, { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import AnimatedText from "../../AnimatedText/AnimatedText";
import CustomImage from "../../CustomImage/CustomImage";
import CustomLink from "../../CustomLink/CustomLink";
import styles from "./HeroSection.module.css";

// Import hero images - Astro automatically optimizes these
import bici from "../../../assets/images/hero/bici.jpg";
import door from "../../../assets/images/hero/door.jpg";
import lucia from "../../../assets/images/hero/lucia.jpg";

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const headingRef = useRef<HTMLDivElement>(null);

  const images = [bici, door, lucia];
  const name = ["nicolás", "di", "rago"];

  useEffect(() => {
    if (!headingRef.current) return;
    const element = headingRef.current;

    animate(element, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: 200,
      ease: "outQuad",
    });
  }, []);

  return (
    <section id="hero" className={styles.container}>
      <div className={styles.content}>
        {/* Image Gallery */}
        <div className={styles.media}>
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className={`${styles.imageWrapper} ${isActive ? styles.active : styles.inactive}`}
              >
                <CustomImage
                  isActive={isActive}
                  src={image.src}
                  alt={name[index]}
                />
              </div>
            );
          })}
        </div>

        {/* Title and Details */}
        <div className={styles.title} ref={headingRef}>
          {name.map((item, index) => (
            <div key={index} className={styles[`title${index + 1}`]}>
              <AnimatedText
                text={item}
                index={index}
                setActiveIndex={setActiveIndex}
              />
            </div>
          ))}

          <div className={styles.details}>
            <div className={styles.description}>
              senior <span>frontend engineer</span> with backend capabilities.
              building web apps at{" "}
              <a
                href="https://nuuk.de"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>nuuk gmbh</span>
              </a>
              . <br />
              based in berlin.
            </div>
            <CustomLink url="#contact" type="link" text="get in touch" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
