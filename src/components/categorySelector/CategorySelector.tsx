import React from 'react';

interface CustomButtonProps {
  option: string;
  optionHeader: number;
  selectedOption: number;
  onClick: (option: string, optionHeader: number) => void;
  buttonText: string;
}

export const CategoryLead: React.FC<CustomButtonProps> = ({ option, optionHeader, selectedOption, onClick, buttonText }) => {
  return (
    <button
      className={`py-2 px-2 text-xs md:text-base w-[10%] ${selectedOption === optionHeader
        ? "bg-amber-200/90 text-green-700 rounded-md shadow-3xl mb-2 md:!rounded-t-md md:!rounded-b-none md:m-0"
        : "md:shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
        }`}
      onClick={() => onClick(option, optionHeader)}
    >
      {buttonText}
    </button>
  );
};



interface ButtonProps {
    option: number;
    optionHeader: number;
    selectedOption: number;
    buttonText: string;
    onClick: (option: number) => void;
}

export const CategoryAll: React.FC<ButtonProps> = ({
    option,
    optionHeader,
    selectedOption,
    buttonText,
    onClick
}) => {
    const isSelected = selectedOption === optionHeader;

    return (
        <button
            className={`py-2 px-2 text-xs md:text-base ${isSelected
              ? "bg-amber-200/90 text-green-700 rounded-md shadow-3xl mb-2 md:!rounded-t-md md:!rounded-b-none md:m-0"
              : "md:shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
              }`}
            onClick={() => onClick(option)}
        >
            {buttonText}
        </button>
    );
};


