import React from 'react';
import { formatPercent } from '../utils/format';

interface PercentDisplayProps {
  value: number;
}

const PercentDisplay: React.FC<PercentDisplayProps> = ({ value }) => {
  const formattedPercent = formatPercent(value).split('.')[0];

  return (
    <span className="left-of-decimal">
      {formattedPercent}%
    </span>
  );
};

export default PercentDisplay;
