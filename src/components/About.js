import React from 'react'
import Button from './Button'
const About = () => {
    return (
        <div className='min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5 animate-fade-in'>
            <img className = "w-4/12 rounded-xl" src="https://img.veenaworld.com/wp-content/uploads/2022/10/Famous-Foods-of-Mysore-%E2%80%93-Dishes-You-Should-Try-on-Your-Next-Vacation.jpg" alt="" />
            <div className='space-y-4 lg-pt-14 px-10'>
                <h1 className='font-semibold text-4xl text-center md:mt-5'>Why Choose Us?</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe quibusdam ut labore, perferendis eveniet eos nulla fugiat quas! Provident, debitis similique ipsa iure veniam beatae cum quas doloribus voluptates laudantium?</p>
                <div>
                    <Button title = "Learn More..."/>
                </div>
            </div>
        </div>
    )
}

export default About