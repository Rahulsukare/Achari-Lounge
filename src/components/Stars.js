import React from 'react';
import { BiSolidStar ,BiSolidStarHalf  } from 'react-icons/bi';

const Stars = ({ rating }) => {
    // Round the rating value to the nearest 0.5
    const roundedValue = Math.round(rating * 2) / 2;

    // Generate an array of star icons based on the rounded value
    const stars = Array.from({ length: 5 }, (_, index) => {
        if (index + 0.5 === roundedValue) {
            return <BiSolidStarHalf  key={index} />;
        } else if (index + 1 <= roundedValue) {
            return <BiSolidStar className=' text-[#ffb936]'  key={index} />;
        } else {
            return <BiSolidStar className='text-[#d4d4d4]'  key={index} />;
        }
    });

    return (
        <div className="flex items-center gap-1">
            {stars.map((star, index) => (
                <span key={index}>{star}</span>
            ))}
        </div>
    );
};

export default Stars;
