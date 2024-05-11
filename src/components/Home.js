import React, { useEffect, useRef, useState } from 'react';
import ChatBot from 'react-simple-chatbot';

import { useNavigate } from 'react-router-dom';
// import Button from './Button'
// import backgroundImage from './vintage-old-rustic-cutlery-dark.jpg'
// import Dishes from './Dishes'
// import About from './About'
// import Reviews from './Reviews'
import HeroSection from './HeroSection'

import deliveryBoy from '../Assets/delivery-man.png'
import pizzaIconMarquee from '../Assets/pizza.png'
import burgerIconMarquee from '../Assets/burger icon.png'

const Home = () => {
    const navigate = useNavigate();
    const deliveryBoyRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the element is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Stop observing once it's intersecting
                }
            });
        }, options);

        if (deliveryBoyRef.current) {
            observer.observe(deliveryBoyRef.current);
        }

        return () => {
            if (deliveryBoyRef.current) {
                observer.unobserve(deliveryBoyRef.current);
            }
        };
    }, []);

    const handleClick = () => {
        // Navigate to the '/menu' route
        navigate('/menu');

        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // You can change this to 'auto' for instant scrolling
        });
    };
    return (
        <>
            {/* Hero section */}
            <HeroSection />
            {/* Hero section ends here */}

            <div className="overflow-x-hidden py-28">
                <div className="py-12 animate-marquee whitespace-nowrap flex gap-5">
                    <span className="mx-4 text-stroke-1 text-6xl sm:text-7xl md:text-8xl font-extrabold italic">POPULAR DISHES</span>
                    <img src={pizzaIconMarquee} alt="pizzaIconMarquee" className=' -skew-x-12'/>
                    <span className="mx-4 text-stroke-2 text-6xl sm:text-7xl md:text-8xl font-extrabold italic">TASTY FOOD</span>
                    <img src={burgerIconMarquee} alt="burgerIconMarquee" className=' -skew-x-12'/>
                    <span className="mx-4 text-stroke-3 text-6xl sm:text-7xl md:text-8xl font-extrabold italic">VARIETY OF DISHES</span>
                    <img src={pizzaIconMarquee} alt="pizzaIconMarquee" className=' -skew-x-12'/>
                </div>
            </div>

            {/* dishes */}
            {/* <h1 className="text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10 animate-fade-in">
                Our Dishes
            </h1> */}
            {/* <Dishes /> */}
            {/* <About /> */}
            {/* <Reviews /> */}
            <div className={`bg-gradient-to-r from-green-700 to-green-600 w-full md:w-3/4 mx-auto my-10 rounded-xl p-12 z-50 relative `}
            >
                <img ref={deliveryBoyRef} src={deliveryBoy} alt="deliveryBoy" className={`hidden md:block md:w-fit absolute bottom-0 right-0 ${isVisible ? 'animate-right-in' : 'opacity-0'}`} />
                <div className='text-sm font-bold text-yellow-400'>EVERY BITE HAS ITS OWN TASTE</div>
                <div className='mb-2 mt-1 text-5xl font-extrabold text-white'>30 MINUTES FAST</div>
                <div className='my-2 text-5xl font-extrabold text-yellow-400'>DELIVERY<div className='text-5xl font-extrabold my-2 text-black'> CHALLENGE</div></div>
                <button className='uppercase mt-5 rounded-xl font-bold w-fit py-3 px-9 text-sm bg-white text-zinc-800 hover:bg-yellow-400 hover:text-white' onClick={handleClick} >View More &nbsp; &rarr;</button>
            </div>

            <ChatBot
                steps={[
                    {
                        id: '1',
                        message: 'Hi, nice to meet you!',
                        trigger: '2',
                    },
                    {
                        id: '2',
                        message: "How can I assist you today?",
                        trigger: '3'
                    },
                    {
                        id: '3',
                        options: [
                            { value: 'menu', label: 'View Menu', trigger: '4' },
                            { value: 'reservation', label: 'Make a Reservation', trigger: '5' },
                            { value: 'contact', label: 'Contact Us', trigger: '6' },
                        ],
                    },
                    {
                        id: '4',
                        message: 'Sure! Here is our menu:',
                        trigger: '7',
                    },
                    {
                        id: '5',
                        message: 'Great! When would you like to make the reservation?',
                        trigger: '8',
                    },
                    {
                        id: '6',
                        message: 'Thank you for reaching out to us! We will get back to you shortly.',
                        end: true,
                    },
                    {
                        id: '7',
                        component: (
                            <div>
                                {/* Display your menu items here */}
                                <p>Menu Item 1: $10</p>
                                <p>Menu Item 2: $12</p>
                                <p>Menu Item 3: $15</p>
                            </div>
                        ),
                        end: true,
                    },
                    {
                        id: '8',
                        user: true,
                        trigger: '6',
                    },
                ]}
                floating={true}
            />
        </>
    )
}
export default Home;