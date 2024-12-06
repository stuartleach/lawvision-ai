import React from 'react';
import CourtLogo from '../components/assets/court_logo.svg';
import GavelLogo from '../components/assets/gavel_logo.svg';
import ShareLogo from '../components/assets/share_logo.svg';
import StateLogo from '../components/assets/stat_logo.svg';
import {useData} from '../hooks/useData';

type Logos = 'counties' | 'state' | 'judges' | 'contact';

interface SidebarListItemProps {
    itemType: Logos;
    selectPage: (page: Logos) => void;
}

const SidebarListItem: React.FC<SidebarListItemProps> = ({itemType, selectPage}) => {
    const {currentPage} = useData();

    const logos = {
        counties: {name: 'Counties', logo: <div className="h-10 w-10"><CourtLogo/></div>},
        state: {name: 'State of NY', logo: <div className="h-10 w-10"><StateLogo/></div>},
        judges: {name: 'Judges', logo: <div className="h-10 w-10"><GavelLogo/></div>},
        contact: {name: 'Contact', logo: <div className="h-10 w-10"><ShareLogo/></div>},
    };

    const isActive = itemType === currentPage;

    return (
        <div className="mx-4 my-1">
            <li className="flex flex-row w-full h-18 rounded transition-all">
                <a
                    onClick={() => selectPage(itemType)}
                    href="/"
                    className={`hover:bg-blue-400 transition group flex gap-x-3 rounded-md w-full py-3 px-6 text-sm font-semibold leading-6 ${
                        isActive
                            ? 'bg-gradient-to-tr rounded from-blue-300/10 to-blue-500/20 shadow text-white fill-white'
                            : '*:fill-zinc-300'
                    }`}
                >
                    {logos[itemType].logo}
                    <div className="flex flex-col justify-center">
                        <h2 className="justify-self-end text-right w-full text-5xl sm:text-xl">
                            {logos[itemType].name}
                        </h2>
                    </div>
                </a>
            </li>
        </div>
    );
};

export default SidebarListItem;
