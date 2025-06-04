'use client';
import Button from '@/components/common/Button/Button';
import { useRef } from 'react';

interface Props {
    onScrollToOptions: () => void;
    onPaste: (text: string) => void;
}

const TextInputArea = ({ onScrollToOptions, onPaste }: Props) => {
    const textRef = useRef<HTMLTextAreaElement>(null);

    const handlePasteClick = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (textRef.current) {
                textRef.current.value = text;
                textRef.current.style.transition = 'all 0.3s ease';
                textRef.current.style.boxShadow = '0 0 0 2px rgba(255, 255, 255, 0.2)';
                setTimeout(() => {
                    if (textRef.current) textRef.current.style.boxShadow = 'none';
                }, 600);
            }
            onPaste(text);
        } catch (err) {
            console.error('Clipboard error:', err);
            onPaste('');
        }
    };

    return (
        <div className="input-container">
            <textarea ref={textRef} className="text-input" placeholder="Paste your text here to humanize it..." />
            <div className="input-actions">
                <Button
                    props={{
                        title: "Paste from clipboard"
                    }}
                    onClick={handlePasteClick}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                </Button>

                <Button
                    props={{
                        title: "Scroll to options"
                    }}
                    onClick={onScrollToOptions}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                    </svg>
                </Button>

            </div>
        </div>
    );
};

export default TextInputArea;