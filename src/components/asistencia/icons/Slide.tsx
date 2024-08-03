import React from 'react';
import styles from './Slide.module.css';

interface SlideProps {
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
}

export const Slide: React.FC<SlideProps> = ({ isChecked, onToggle }) => {
  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        id="cb5"
        className={`${styles.tgl} ${styles.tglFlip}`}
        checked={isChecked}
        onChange={() => onToggle(!isChecked)}
      />
      <label
        htmlFor="cb5"
        data-tg-on="Yeah!"
        data-tg-off="Nope"
        className={styles.tglBtn}
      ></label>
    </div>
  );
};

