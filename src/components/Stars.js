import React from 'react';
import { BiSolidStar ,BiSolidStarHalf  } from 'react-icons/bi';

const Stars = ({ rating,size,color }) => {
    // Round the rating value to the nearest 0.5
    const roundedValue = Math.round(rating * 2) / 2;

    // Generate an array of star icons based on the rounded value
    const stars = Array.from({ length: 5 }, (_, index) => {
        if (index + 0.5 === roundedValue) {
            return <BiSolidStarHalf className={`text-${color || '[#ffb936]' }`} size={size || 15}  key={index} />;
        } else if (index + 1 <= roundedValue) {
            return <BiSolidStar className={`text-${color || '[#ffb936]' }`} size={size || 15}  key={index} />;
        } else {
            return <BiSolidStar className={`text-${color || '[#d4d4d4]' }`} size={size || 15}  key={index} />;
        }
    });

    return (
        <div className="flex py-2 gap-1">
            {stars.map((star, index) => (
                <span key={index}>{star}</span>
            ))}
        </div>
    );
};

export default Stars;
