import React from "react";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
    return (
        <div className=" min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
            <h1 className="text-4xl font-semibold text-center lg:pt-2 pt-4 pb-10">
                Customer's Review
            </h1>
            
            <div className=" flex flex-col md:flex-row gap-5 mt-5">
                <ReviewCard  name="Rahul Sukare" />
                <ReviewCard  name="Karan Dhongade" />
                <ReviewCard  name="Atharva Kohapare" />
            </div>
        </div>
    );
};

export default Reviews;