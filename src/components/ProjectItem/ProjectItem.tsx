import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { MdWeb } from 'react-icons/md';
import styles from './ProjectItem.module.css';
import { useUiStore } from '../../stores/cursor.store';

interface ProjectItemProps {
  project: {
    id: number | string;
    title: string;
    summary?: string;
    featured?: boolean;
    description: string;
    stack: Array<{ name: string }>;
    web?: string;
    url?: string;
    github?: string;
    image: {
      src: string;
      width: number;
      height: number;
      format: string;
    } | string;
    slug?: string;
    tag?: string;
  };
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const { title, featured, summary, web, url, github, description, stack, image } = project;

  const setCursorType = useUiStore((state) => state.setCursorType);

  // Use 'url' if 'web' is not defined
  const websiteUrl = web || url;

  // Get image source from the Astro image object or string
  const imageSrc = typeof image === 'string' ? image : image.src;
  const imageWidth = typeof image === 'string' ? undefined : image.width;
  const imageHeight = typeof image === 'string' ? undefined : image.height;

  return (
    <div className={styles.container}>
      <div className={styles.projectBlock}>
        <img
          src={imageSrc}
          alt={title}
          className={styles.image}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
        />
        <div className={styles.info}>
          {featured && <span className={styles.featured}>featured</span>}
          <h4>{title}</h4>
          {summary && (
            <h5>
              <span className={styles.summary}>{summary}</span>
            </h5>
          )}
          <p className={styles.description}>{description}</p>

          <div className={styles.stack}>
            {stack.map((item) => (
              <span key={`${project.id}-stack-${item.name}`} className={styles.stackItem}>
                {item.name}
              </span>
            ))}
          </div>

          <div className={styles.links}>
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${title} on Github`}
                className={styles.projectLink}
                onMouseEnter={() => {
                  setCursorType('hover-social');
                }}
                onMouseLeave={() => {
                  setCursorType('default');
                }}
              >
                <FaGithub />
              </a>
            )}
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${title} website`}
                className={styles.projectLink}
                onMouseEnter={() => {
                  setCursorType('hover-social');
                }}
                onMouseLeave={() => {
                  setCursorType('default');
                }}
              >
                <MdWeb />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
