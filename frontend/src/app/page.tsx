'use client';

import { useRef, useState } from 'react';
import LightEffects from '../components/ui/LightEffects/LightEffects';
import Header from '../components/ui/Header/Header';
import TextInputArea from '../components/ui/TextInputArea/TextInputArea';
import OptionsPanel from '../components/ui/OptionsPanel/OptionsPanel';
import Toast from '../components/ui/Toast/Toast';
import { ResultsSection } from '../components/ui/ResultsSection/ResultsSection';


export default function HomePage() {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', visible: false });

  const scrollToOptions = () => {
    optionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePaste = (text: string) => {
    if (!text) {
      showToast('Clipboard is empty or access was denied.', 'error');
    } else {
      showToast('Text pasted from clipboard!', 'success');
    }
  };


  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  return (
    <main className="main-container">
      <LightEffects />
      <div className="overlay"></div>
      <div className="content">
        <Header />
        <TextInputArea onScrollToOptions={scrollToOptions} onPaste={handlePaste} />
        <div ref={optionsRef}>
          <OptionsPanel />
        </div>
        <ResultsSection />
      </div>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </main>
  );
}
