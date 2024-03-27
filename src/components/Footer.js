import React from 'react'
import burgerBGIcon from '../Assets/burger-shape-3.png'
import friesBGIcon from '../Assets/fry-shape-2.png'
import { BiLogoFacebook, BiLogoInstagram, BiLogoLinkedin, BiLogoPinterestAlt } from "react-icons/bi";

export default function Footer() {
    return (
        <>
            <footer className='bg-zinc-50'>

                <div className='w-fit mx-auto relative'>
                    <img src={burgerBGIcon} alt="burgerBGIcon" className='absolute opacity-30 w-20 z-0 top-20'/>
                    <img src={friesBGIcon} alt="friesBGIcon" className='absolute opacity-30 w-20 z-0 bottom-0 right-0 top-56'/>

                    <div className='flex flex-wrap gap-10 md:gap-20 p-16 sm:p-20 md:p-28 '>
                        <div className='flex flex-col gap-2 w-60'>
                            <div className='font-bold text-2xl cursor-pointer'>FOODRESTRO</div>
                            <p className='text-sm font-light'>We believe it has the power to do
                                amazing things. </p>
                            <p className='text-sm font-normal'>
                                Interested in working with us?
                            </p>
                            <div className='font-bold text-sm text-green-700 cursor-pointer'>
                                info@example.com
                            </div>
                            <div className='flex items-center gap-3 text-xl mt-4'>
                                <BiLogoFacebook className='text-zinc-600 bg-zinc-100 rounded-full text-4xl p-2 cursor-pointer hover:text-white hover:bg-green-600 transition-all duration-300 ease-in-out transform' />
                                <BiLogoLinkedin className='text-zinc-600 bg-zinc-100 rounded-full text-4xl p-2 cursor-pointer hover:text-white hover:bg-green-600 transition-all duration-300 ease-in-out transform' />
                                <BiLogoPinterestAlt className='text-zinc-600 bg-zinc-100 rounded-full text-4xl p-2 cursor-pointer hover:text-white hover:bg-green-600 transition-all duration-300 ease-in-out transform' />
                                <BiLogoInstagram className='text-zinc-600 bg-zinc-100 rounded-full text-4xl p-2 cursor-pointer hover:text-white hover:bg-green-600 transition-all duration-300 ease-in-out transform' />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h3 className='text-sm font-semibold text-zinc-800 mb-4'>QUICK LINKS</h3>
                            <div className='flex flex-col gap-2 text-sm text-zinc-500'>
                                <div className=' cursor-pointer'>Services</div>
                                <div className=' cursor-pointer'>About Company</div>
                                <div className=' cursor-pointer'>Latest News</div>
                                <div className=' cursor-pointer'>Team Member</div>
                                <div className=' cursor-pointer'>Testimonials</div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-sm font-semibold text-zinc-800 mb-4'>MY ACCOUNTS</h3>
                            <div className='flex flex-col gap-2 text-sm text-zinc-500'>
                                <div className=' cursor-pointer'>MY PROFILE</div>
                                <div className=' cursor-pointer'>MY ORDER HISTORY</div>
                                <div className=' cursor-pointer'>MY WISHLIST</div>
                                <div className=' cursor-pointer'>ORDER TRACKING</div>
                                <div className=' cursor-pointer'>SHOPPING CART</div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-sm font-semibold text-zinc-800 mb-4'>ADDRESS : </h3>
                            <div className='flex flex-col gap-2 text-sm text-zinc-500'>
                                <div>Ramnagar, Shrivas Colony,</div>
                                <div>Main Naka, Wardha, Maharashtra - 442001</div>
                            </div>
                            <h3 className='text-sm font-semibold text-zinc-800 my-4'>HOURS : </h3>
                            <div className='flex flex-col gap-2 text-sm text-zinc-500'>
                                <div className='text-red-700'>9.30am – 6.30pm</div>
                                <div>Monday To Friday</div>
                            </div>
                        </div>

                    </div>
                </div>
                <p className='text-center p-6 mt-5 w-full bg-green-700 text-white'>© Copyright <span className='text-yellow-300'>2024</span> FOODRESTRO. All rights reserved.</p>
            </footer>

        </>
    )
}
