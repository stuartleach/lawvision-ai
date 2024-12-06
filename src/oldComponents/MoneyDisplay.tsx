import React from 'react';
import { formatMoneyValue } from '../utils/format';

interface MoneyDisplayProps {
  value: number;
}

const MoneyDisplay: React.FC<MoneyDisplayProps> = ({ value }) => {
  const formattedValue = formatMoneyValue(value);

  return (
    <span>
      ${formattedValue[0]}
    </span>
  );
};

export default MoneyDisplay;
