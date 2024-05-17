import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import bg3 from '../Assets/main-bg.jpg'
import bg2 from '../Assets/kfc-bg.png'
import bg1 from '../Assets/green background.avif'

import img11 from '../Assets/grilled.png'
import img12 from '../Assets/kfc.png'
import img13 from '../Assets/main pizza.png'
import off50 from '../Assets/50percent-off.png'

const slides = [
    {
        id: 1,
        title: "Welcome to Food Restro",
        description: "Order delicious food from the comfort of your home.",
        imageUrl: bg1,
        img1: img11
    },
    {
        id: 2,
        title: "Discover a Wide Range of Options",
        description: "Explore our menu for a variety of cuisines and dishes.",
        imageUrl: bg2,
        img1: img12
    },
    {
        id: 3,
        title: "Convenient and Fast Delivery",
        description: "Get your food delivered to your doorstep in no time.",
        imageUrl: bg3,
        img1: img13
    }
];

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
        }, 4000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden h-svh animate-fade-in">
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transform transition-transform duration-1000 ease-in-out ${index === currentSlide ? "block" : "hidden"
                            }`}
                    >
                        <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                        <div className="absolute inset-0 flex flex-col md:flex-row justify-center items-center text-white text-center p-8">
                            <div className={`w-full md:w-1/2 md:ml-10`}>
                                <div className="text-4xl sm:text-5xl md:text-6xl text-left font-bold  animate-popup">{slide.title}</div>
                                <div className="text-sm sm:text-md md:text-lg text-left animate-[popup_2s_ease-in-out] ">{slide.description}</div>

                                <div className='flex mt-5 md:mt-10 animate-[popup_2s_ease-in-out]'>
                                    <Link to='/menu' className={`uppercase font-bold w-fit mx-auto md:mx-0 py-3 px-9 text-sm  ${slide.img1 === img11 ? ' bg-[#FFB936] text-black' : 'bg-[#00813D] text-white'} overflow-hidden relative group`} >

                                        <span className="relative z-10 ">View More &nbsp; &rarr;</span>
                                        <span className={`absolute w-full h-full bg-[#D12525] -left-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500`}></span>
                                        <span className={`absolute w-full h-full bg-[#D12525] -right-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500`}></span>

                                    </Link>
                                </div>
                            </div>
                            <div className={`w-full mt-5 md:mt-0 md:w-1/2 relative`}>
                                <img className={`absolute -top-10 w-fit animate-[popup_4s_ease-in-out] z-10`} src={off50} alt="off50" />
                                <img className={`w-fit mx-auto  animate-[popup_2.5s_ease-in-out]`} src={slide.img1} alt="img" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;
