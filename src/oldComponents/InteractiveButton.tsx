import React from "react";

interface InteractiveButtonProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  title: React.ReactNode;
  stat: React.ReactNode;
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  onMouseEnter,
  onMouseLeave,
  onClick,
  title,
  stat,
}) => {
  return (
    <button
      className="mb-2 flex min-w-full cursor-pointer flex-row items-center justify-between border-b-2 px-4 py-2 text-zinc-400 outline-none transition-all last:border-b-0 hover:bg-zinc-200/20 hover:shadow-2xl"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h3 className="w-[10rem] text-left text-lg font-bold text-zinc-300">
        {title}
      </h3>
      <div className="flex justify-end text-right font-mono font-bold text-zinc-400">
        {stat}
      </div>
    </button>
  );
};

export default InteractiveButton;
