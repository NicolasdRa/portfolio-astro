import React from 'react';
import { useUiStore } from '@stores/cursor.store';
import styles from './AnimatedText.module.css';

interface AnimatedTextProps {
  text: string;
  setActiveIndex: (index: number) => void;
  index: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, setActiveIndex, index }) => {
  const setCursorType = useUiStore((state) => state.setCursorType);

  return (
    <div className={styles.text}>
      <span
        className={styles.animatedItem}
        onMouseEnter={() => {
          setActiveIndex(index);
          setCursorType('hover-name');
        }}
        onMouseLeave={() => {
          setActiveIndex(-1);
          setCursorType('default');
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default AnimatedText;