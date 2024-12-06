import React from 'react';
import ChargesGrid from './ChargesGrid';
import JudgeInfoHeader from './JudgeInfoHeader';
import { useData } from '../hooks/useData.tsx';

const ContainerJudge: React.FC = () => {
  const { selectedJudge, setSelectedJudge } = useData();

  const handleClose = () => {
    setSelectedJudge(null);
  };

  return (
    <div className="border-white/30 border-t-2 border-b-2 shadow w-full">
      <button className="w-full" onClick={handleClose}>
        <div className="py-10">
          <JudgeInfoHeader entity={selectedJudge} />
        </div>
      </button>
      <div>
        <ChargesGrid entity={selectedJudge} />
      </div>
    </div>
  );
};

export default ContainerJudge;
