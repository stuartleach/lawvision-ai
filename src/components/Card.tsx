import React from 'react';


const Card = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-3 rounded-2xl p-4">
            {children}
        </div>
    );
};

export default Card;
