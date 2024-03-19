import React from 'react'
import Button from './Button'
import backgroundImage from './vintage-old-rustic-cutlery-dark.jpg'
import Dishes from './Dishes'
import About from './About'
import Reviews from './Reviews'

const Home = () => {
    return (
        <>
            <div className="min-h-screen flex flex-row justify-between item-center lg:px-32 px-5 animate-fade-in" style={{
                backgroundImage: `url(${backgroundImage})`, // Use the imported image dynamically
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className='w-full lg: space-y-5 lg:ml-[500px] md:ml-[440px] mt-20'>
                    <h1 className='text-backgroundColor font-semibold text-6xl'>"Sip, Savor, and Spice Up Your Life at Achari Lounge!"</h1>
                    <p className='text-backgroundColor'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, vitae! Facilis suscipit fuga qui sed exercitationem repellendus sapiente aliquam nostrum modi! Nulla, inventore est.</p>
                    <div className='lg: pl-2 mb-3'>
                        <Button title="Order Now" />
                    </div>
                </div>
            </div>
            <h1 className="text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10 animate-fade-in">
                Our Dishes
            </h1>
            <Dishes />
            <About />
            <Reviews />
        </>
    )
}

export default Home;