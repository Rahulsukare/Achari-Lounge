import React from "react";

const ReviewCard = (props) => {
    return (

        <div className=" w-full md:w-1/3 bg-white border-2 border-lightText md:border-none p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            
        <div className=" flex flex-row justify-center items-center mt-4 gap-4">
            <div class="w-12 h-12 sm:mr-2 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
            <h3 className=" font-semibold ">{props.name}</h3>
        </div>
        <div>
            <p className=" text-lightText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            consectetur error, dolores quae ipsa quos enim corporis magni
            obcaecati tempore natus eos, libero ducimus nulla neque eaque maxime
            nam molestias?
            </p>
        </div>

        </div>
    );
};

export default ReviewCard;