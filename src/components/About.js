import React from 'react'
import Button from './Button'
const About = () => {
    
    return (

    <div className='min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5 animate-fade-in my-10'>
        <img className = "w-4/12 rounded-xl" src="https://img.veenaworld.com/wp-content/uploads/2022/10/Famous-Foods-of-Mysore-%E2%80%93-Dishes-You-Should-Try-on-Your-Next-Vacation.jpg" alt="" />
        <div className="md:ml-20">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <p className="text-lg mb-6">
                        Welcome to <span className="font-bold">Food Restro</span>, where we bring you the finest dining
                        experience in town. Our passion for food drives us to deliver the most exquisite dishes made from the
                        freshest ingredients.
                    </p>
                    <p className="text-lg mb-6">
                        At <span className="font-bold">Food Restro</span>, we pride ourselves on our commitment to
                        quality, hospitality, and innovation. From our talented chefs to our dedicated staff, every member of our
                        team is devoted to ensuring that your dining experience is nothing short of exceptional.
                    </p>
                    <p className="text-lg mb-6">
                        Whether you're joining us for a casual meal with friends, a romantic dinner for two, or a special occasion
                        celebration, we promise to provide you with unparalleled service and culinary delights that will leave you
                        craving for more.
                    </p>
                    <p className="text-lg">
                        Thank you for choosing <span className="font-bold">Food Restro</span>. We look forward to serving
                        you and making your visit unforgettable.
                    </p>
                </div>
    </div>
);

};
export default About