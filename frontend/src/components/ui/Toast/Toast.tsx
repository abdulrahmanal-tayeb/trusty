'use client';
import { useEffect, useState } from 'react';

interface Props {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

const Toast = ({ message, type, visible }: Props) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div className={`toast ${show ? 'show' : ''}`} style={{ backgroundColor: type === 'error' ? 'rgba(220, 53, 69, 0.9)' : 'rgba(30, 30, 30, 0.9)' }}>
      <div className="toast-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d={type === 'error'
            ? "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
            : "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"} />
        </svg>
      </div>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
