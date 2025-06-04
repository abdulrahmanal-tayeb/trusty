'use client';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  options: Option[];
}

export const Dropdown: React.FC<DropdownProps> = ({ label, value, onChange, options }) => {
  return (
    <div className="dropdown-container">
      <label className="dropdown-label">{label}</label>
      <div className="dropdown">
        <select
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          className="dropdown-select bg-black text-white"
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-black text-white"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
