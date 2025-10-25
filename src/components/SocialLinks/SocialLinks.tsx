import { useRef, useEffect } from "react";
import { animate } from "animejs";

import socialLinks from "../../constants/social_links";
import cv from "/cv-nicolasdirago.pdf";

import styles from "./SocialLinks.module.css";
import { useUiStore } from "@stores/cursor.store";

const SocialLinks: React.FC = () => {
  const linksRef = useRef<HTMLDivElement>(null);

  const setCursorType = useUiStore((state) => state.setCursorType);

  useEffect(() => {
    if (!linksRef.current) throw Error("divRef is not assigned");

    animate(linksRef.current, {
      opacity: [0, 1],
      scale: [0.5, 1],
      translateY: [-100, 14],
      duration: 1000,
      delay: 500,
      ease: 'outElastic(1, .3)',
    });
  }, []);

  return (
    <div ref={linksRef} className={styles.socialLinksWrapper}>
      <div className={styles.socialLinks}>
        <a
          href={cv}
          download
          className={styles.cvLink}
          onMouseEnter={() => setCursorType("hover-social")}
          onMouseLeave={() => setCursorType("default")}
        >
          CV
        </a>
        <div className={styles.verticalLine} />
        {socialLinks.map((link) => (
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            key={link.id}
            aria-label={link.name}
            className={styles.socialLink}
            onMouseEnter={() => setCursorType("hover-social")}
            onMouseLeave={() => setCursorType("default")}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
