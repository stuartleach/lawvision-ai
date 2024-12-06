import React from 'react';

interface StatItemProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  className?: string;
  title: React.ReactNode;
  stat: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({
  onMouseEnter,
  onMouseLeave,
  onClick,
  className = '',
  title,
  stat,
}) => {
  return (
    <button
      className={`${className} stat-item`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h3>{title}</h3>
      <div className="stat-container">{stat}</div>
    </button>
  );
};

export default StatItem;
