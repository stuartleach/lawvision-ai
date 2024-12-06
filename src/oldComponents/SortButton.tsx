import React from 'react';

interface SortButtonProps {
  text: string;
  selectedMetric: string;
  onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ text, selectedMetric, onClick }) => {
  return (
    <div className="sort text-right">
      {text} <br />
      <button className={`${selectedMetric}-color cursor-pointer`} onClick={onClick}>
        {selectedMetric}
        {selectedMetric === 'averageBailSet' ? 'amount' : 'rate'}
      </button>
    </div>
  );
};

export default SortButton;
