'use client';

import { HumanizerOptions } from '@/config/models/models';
import {
  useHumanizerResultsStore,
  useUserInputStore,
  UserInputField,
} from '@/config/stores/stores';
import { handleHumanize } from '@/lib/actions/actions';
import { Dropdown } from '../../common/DropDown/DropDown';
import { useCallback } from 'react';

const languageOptions = [
  { label: 'Auto',         value: 'auto' },
  { label: 'English', value: 'en' },
  { label: 'Arabic', value: 'ar' },
  { label: 'French',      value: 'fr'     },
  { label: 'German',      value: 'de'     },
  { label: 'Spanish',     value: 'es'     },
  { label: 'Italian',     value: 'it'     },
  { label: 'Portuguese',  value: 'pt'     },
  { label: 'Japanese',    value: 'ja'     },
  { label: 'Chinese',     value: 'zh'     },
];

const toneOptions = [
  { label: 'Auto',         value: 'auto'       },
  { label: 'Casual',       value: 'casual'       },
  { label: 'Formal',       value: 'formal'       },
  { label: 'Professional', value: 'professional' },
  { label: 'Friendly',     value: 'friendly'     },
  { label: 'Academic',     value: 'academic'     },
  { label: 'Creative',     value: 'creative'     },
  { label: 'Persuasive',   value: 'persuasive'   },
];

const resultTypeOptions = [
  { label: 'Auto',       value: 'auto'    },
  { label: 'Rewrite',    value: 'rewrite'    },
  { label: 'Improve',    value: 'improve'    },
  { label: 'Simplify',   value: 'simplify'   },
  { label: 'Elaborate',  value: 'elaborate'  },
  { label: 'Summarize',  value: 'summarize'  },
  { label: 'Paraphrase', value: 'paraphrase' },
];

const OptionsPanel: React.FC = () => {
  const {
    setValue,
    language,
    tone,
    resultType,
  } = useUserInputStore();
  const { updateResult, updateLoading, isLoading } = useHumanizerResultsStore();

  const handleSubmit = useCallback(async () => {
    if(isLoading) return;
    const textInput = document.querySelector<HTMLTextAreaElement>('.text-input');
    const text = textInput?.value.trim() || '';

    if (!text) {
      // Shake animation if empty
      alert('Please fill in a text to humanize');
      return;
    }

    updateLoading(true);
    try {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 1000);

      const humanizerResult = await handleHumanize(
        text,
        { language, tone, resultType } as HumanizerOptions
      );
      updateResult(humanizerResult);
    } catch (e) {
      console.error('Error: ', e);
      updateLoading(false);
    }
  }, [language, tone, resultType]);


  return (
    <div className="options-container" id="options">
      <div className="options-grid">
        <Dropdown
          label="Language"
          value={language}
          onChange={(val: string) => setValue(UserInputField.Language, val)}
          options={languageOptions}
        />

        <Dropdown
          label="Tone"
          value={tone}
          onChange={(val: string) => setValue(UserInputField.Tone, val)}
          options={toneOptions}
        />

        <Dropdown
          label="Result Type"
          value={resultType}
          onChange={(val: string) => setValue(UserInputField.ResultType, val)}
          options={resultTypeOptions}
        />
      </div>

      <button disabled={isLoading} className="submit-button" onClick={handleSubmit}>
        Humanize Text
      </button>
    </div>
  );
};

export default OptionsPanel;
