'use client';

import { useEffect } from 'react';
import styles from "./LightEffects.module.css";

const LightEffects = () => {
  useEffect(() => {
    const lightEffects = document.querySelectorAll<HTMLDivElement>('.light-effect');

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      if (lightEffects[0]) lightEffects[0].style.transform = `translate(${x * 100}px, ${y * 100}px)`;
      if (lightEffects[1]) lightEffects[1].style.transform = `translate(-${x * 100}px, -${y * 100}px)`;
      if (lightEffects[2]) lightEffects[2].style.transform = `translate(${x * 50}px, -${y * 50}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className={styles.lightEffect}></div>
      <div className={styles.lightEffect}></div>
    </>
  );
};

export default LightEffects;
