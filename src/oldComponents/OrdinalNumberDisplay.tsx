import React from "react";

interface OrdinalNumberDisplayProps {
  value: number;
}

const getOrdinalSuffix = (n: number): string => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

const OrdinalNumberDisplay: React.FC<OrdinalNumberDisplayProps> = ({
  value,
}) => {
  const valueInt = Math.floor(value);
  const valueSuffix = getOrdinalSuffix(valueInt);

  return (
    <div>
      <span>{valueInt}</span>
      <span className="-ml-[0.25em] align-top text-xs font-light">
        {valueSuffix}
      </span>
    </div>
  );
};

export default OrdinalNumberDisplay;
