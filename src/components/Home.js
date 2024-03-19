import React from 'react'
// import Button from './Button'
// import backgroundImage from './vintage-old-rustic-cutlery-dark.jpg'
import Dishes from './Dishes'
import About from './About'
import Reviews from './Reviews'
import HeroSection from './HeroSection'

const Home = () => {
    return (
        <>
            {/* Hero section */}
            <HeroSection />
            {/* Hero section ends here */}

            {/* dishes */}
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