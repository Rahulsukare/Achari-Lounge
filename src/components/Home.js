import HeroSection from './HeroSection'

import pizzaIconMarquee from '../Assets/pizza.png'
import burgerIconMarquee from '../Assets/burger icon.png'

const Home = () => {

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
            
        </>
    )
}


export default Home;