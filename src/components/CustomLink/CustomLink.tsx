import React from 'react';
import { useUiStore } from '@stores/cursor.store';
import styles from './CustomLink.module.css';

interface Props {
  url: string;
  type: 'link' | 'button' | 'internal';
  text: string;
  download?: boolean;
}

const CustomLink: React.FC<Props> = ({ url, type, text, download = false }) => {
  const setCursorType = useUiStore((state) => state.setCursorType);

  const handleMouseEnter = () => setCursorType('hover');
  const handleMouseLeave = () => setCursorType('default');

  const componentMap = {
    link: (
      <a
        href={url}
        download={download}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
    ),
    internal: (
      <a
        href={url}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
    ),
    button: (
      <button
        type="submit"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </button>
    ),
  };

  return (
    <div className={styles.wrapper}>
      {componentMap[type]}
    </div>
  );
};

export default CustomLink;