import {ChangeEvent} from "react";

interface LabelInputProps {
  label: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string
}

const LabelInput = ({ label, placeholder, onChange, type }: LabelInputProps) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="default-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={label}
        onChange={onChange}
        placeholder={placeholder}
        type = {type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default LabelInput;
