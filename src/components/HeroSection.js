import React, { useState, useEffect } from 'react';

import bg3 from '../Assets/main-bg.jpg'
import bg2 from '../Assets/kfc-bg.png'
import bg1 from '../Assets/green background.avif'

const slides = [
    {
        id: 1,
        title: "Welcome to Food Restro",
        description: "Order delicious food from the comfort of your home.",
        imageUrl: bg1
    },
    {
        id: 2,
        title: "Discover a Wide Range of Options",
        description: "Explore our menu for a variety of cuisines and dishes.",
        imageUrl: bg2
    },
    {
        id: 3,
        title: "Convenient and Fast Delivery",
        description: "Get your food delivered to your doorstep in no time.",
        imageUrl: bg3
    }
];

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden h-svh border-3">
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transform transition-transform duration-1000 ease-in-out ${index === currentSlide ? "translate-x-0" : "translate-x-full"
                            }`}
                    >
                        <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8">
                            <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                            <p className="text-lg">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;


// import React from 'react';

// const HeroSection = () => {
//     return (
//         <>
//             <div className="relative overflow-hidden bg-gray-900">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="relative z-10 py-24 bg-gray-900 sm:bg-transparent">
//                         <div className="text-center">
//                             <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">Welcome to our Food Ordering Website</h1>
//                             <p className="mt-3 max-w-md mx-auto text-lg text-gray-300 sm:text-xl sm:max-w-3xl">Order delicious food from the comfort of your home.</p>
//                             <div className="mt-10 sm:mt-12">
//                                 <a href="#" className="inline-block bg-white py-3 px-8 border border-transparent rounded-lg font-medium text-gray-900 hover:bg-gray-50">Order Now</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Animation */}
//                 <div className="absolute inset-0">
//                     <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-yellow-400 to-pink-500 animate-gradient-x"></div>
//                 </div>
//             </div>
//             {/* <div className="min-h-screen flex flex-row justify-between item-center lg:px-32 px-5 animate-fade-in" style={{
//                 backgroundImage: `url(${backgroundImage})`, // Use the imported image dynamically
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//             }}>
//                 <div className='w-full lg: space-y-5 lg:ml-[500px] md:ml-[440px] mt-20'>
//                     <h1 className='text-backgroundColor font-semibold text-6xl'>"Sip, Savor, and Spice Up Your Life at Achari Lounge!"</h1>
//                     <p className='text-backgroundColor'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, vitae! Facilis suscipit fuga qui sed exercitationem repellendus sapiente aliquam nostrum modi! Nulla, inventore est.</p>
//                     <div className='lg: pl-2 mb-3'>
//                         <Button title="Order Now" />
//                     </div>
//                 </div>
//             </div> */}
//         </>
//     );
// };

// export default HeroSection;
