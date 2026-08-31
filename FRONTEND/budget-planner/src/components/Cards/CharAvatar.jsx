import React from 'react';
import { getInitials } from '../../helpers/help';

const CharAvatar = ({ fullName, width, height, style }) => {
    return (
    <div
     className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center text-gray-700 font-medium bg-orange-200 rounded-full`}>

{getInitials(fullName || "")}
    </div>
    )
};

export default CharAvatar;