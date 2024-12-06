import React from 'react';
import { County, Judge } from '../types/frontendTypes';

interface EntityInfoHeaderProps {
  entity: Judge | County | null;
}

const EntityInfoHeader: React.FC<EntityInfoHeaderProps> = ({ entity }) => {
  return (
    <div className="flex sm:flex-row flex-col justify-between py-2">
      <div className="text-left sm:pl-5">
        {entity?.primaryCounty && (
          <h4 className="mb-1 text-base hidden sm:block sm:text-xl font-bold tracking-tight text-gray-500">
            {entity ? 'The Honorable' : ''}
          </h4>
        )}
        <h2 className="mb-1 sm:text-2xl block sm:block text-xl font-semibold tracking-tight text-gray-50">
          {entity?.name || ''}
        </h2>
      </div>
      {entity?.primaryCounty && (
        <h2 className="font-semibold py-4 sm:mt-0 font-sans hidden sm:block text-4xl text-center sm:text-left sm:text-4xl tracking-tight text-gray-200 pr-5">
          {entity ? ' Trial Judge in ' : ''} <span className="bg-gradient-to-tr from-blue-500 to-blue-300 bg-clip-text font-bold text-transparent">
            {entity ? entity?.primaryCounty + ' County' : ''}
          </span>
        </h2>
      )}
    </div>
  );
};

export default EntityInfoHeader;
