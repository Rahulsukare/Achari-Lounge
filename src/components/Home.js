import React from 'react'
import Button from './Button';
const Home = () => {
    return (
        <div className= "min-h-screen flex flex-row justify-between item-center lg:px-32 px-5 bg-[url('R:\Internship\achari-lounge\public\vintage-old-rustic-cutlery-dark.jpg')] bg-cover bg-no-repeat">
            <div className='w-full lg: w-2/3 space-y-5 lg:ml-[500px] mt-20 md:ml-[440px] mt-20'>
                <h1 className='text-backgroundColor font-semibold text-6xl'>"Sip, Savor, and Spice Up Your Life at Achari Lounge!"</h1>
                <p className='text-backgroundColor'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, vitae! Facilis suscipit fuga qui sed exercitationem repellendus sapiente aliquam nostrum modi! Nulla, inventore est.</p>
                <div className='lg: pl-2 mb-3'>
                    <Button title = "Order Now"/>
                </div>
            </div>
        </div>
    )
}

export default Home;