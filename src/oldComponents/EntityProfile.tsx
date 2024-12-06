import React from 'react';
import ChargesGrid from './ChargesGrid';
import ProfileHeader from './EntityInfoHeader';
import ProfileVisualizations from './ProfileVisualizations';
import { County, Judge } from '../types/frontendTypes';

interface EntityProfileProps {
  entity: Judge | County;
}

const EntityProfile: React.FC<EntityProfileProps> = ({ entity }) => {
  return (
    <div className="flex flex-col *:h-1/3">
      <ProfileHeader entity={entity} />
      <ProfileVisualizations entity={entity} />
      <ChargesGrid entity={entity} />
    </div>
  );
};

export default EntityProfile;
