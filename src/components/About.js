import React from 'react';
import chef1 from '../Assets/Chef/chef-1.jpg';
import chef2 from '../Assets/Chef/chef-2.jpg';
import chef3 from '../Assets/Chef/chef-3.jpg';

import quickdelivery from '../Assets/QUICKLY DELIVERY.png';
import cookWithCare from '../Assets/COOKING WITH CARE.png';
import chooseFood from '../Assets/chooseFood.png';

import quality from '../Assets/quality-control.png';
import reputation from '../Assets/reputation.png';

import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoYoutube } from "react-icons/bi";

const About = () => {
    
    return (
        <div className='bg-[#f4f1ea] py-20 animate-popup'>

            <div className='pb-12 mb-10 animate-popup text-pretty'>
                <div className='mx-10 font-bold text-sm tracking-tight text-[#D12525]'>About Our Food</div>
                <div className='mx-10 mt-1 mb-3 lg:mb-10 font-bold lg:font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-zinc-800 tracking-tight '>WHERE QUALITY MEET EXCELLENT <span className='text-[#D12525]'>SERVICE.</span> </div>

                <p className='mx-10 mt-5 text-zinc-700 text-xs md:text-sm font-medium text-pretty '>It's the perfect dining experience where every dish is crafted with fresh, high-quality Experience quick and efficient service that ensures your food is servead fresh It's the dining experience where every dish is crafted with fresh, high-quality ingredients</p>

                <div className='mx-10 my-5 md:flex gap-5'>
                    <div className='px-5 sm:px-7 md:px-10 py-8 my-2 border flex items-center gap-4 bg-[#ffb936] rounded-lg animate-[popup_2s_ease-in-out]'>
                        <img src={quality} alt="quality" className='w-10 h-10' />
                        <div>
                            <div className='text-sm md:text-md font-bold'>Super Quality</div>
                            <div className=' text-xs md:text-sm font-medium'>A team of dreamers and doers build unique interactive music and art</div>
                        </div>
                    </div>
                    <div className='px-5 sm:px-7 md:px-10 py-8 my-2 border flex items-center gap-4 bg-[#ffb936] rounded-lg animate-[popup_2s_ease-in-out]'>
                        <img src={reputation} alt="reputation" className='w-10 h-10' />
                        <div>
                            <div className='text-sm md:text-md font-bold'>WELL REPUTATION</div>
                            <div className=' text-xs md:text-sm font-medium'>A team of dreamers and doers build unique interactive music and art</div>
                        </div>
                    </div>
                </div>

                <div className='mx-10 text-sm md:text-md font-bold text-zinc-700'>CUSTOMER’S EXPERIENCE IS OUR HIGHEST PRIORITY.</div>

            </div>

            <div className=' animate-popup min-h-screen'>
                <div className=' mx-auto w-fit font-bold text-sm tracking-tight text-[#D12525]'>About Our Chefs</div>
                <div className=' mx-auto w-fit mt-1 mb-3 lg:mb-10 font-bold lg:font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-zinc-800 tracking-tight '>MEET OUR EXPERT CHEFS</div>

                <div className=' my-9 px-0 sm:px-10 md:px-20 lg:px-32'>
                    <div className='grid grid-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5'>
                        <div className='my-2 sm:my-5 mx-4 flex flex-col justify-center items-center group'>
                            <div className=' max-w-[215px] h-[305px] md:max-w-[215px] md:min-w-[215px] md:h-[300px]  lg:max-w-[265px] lg:h-[355px] rounded-xl relative'>
                                <div className='w-6 h-6 bg-[#00813D] absolute -left-[0.7rem] top-[4rem] sm:-left-[0.7rem] lg:-left-[0.72rem] lg:top-[4.8rem] rotate-45 z-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out'></div>
                                <div className='w-fit absolute top-1/4 -left-4  transition-all duration-300 ease-in-out z-20 opacity-0 group-hover:opacity-100'>
                                    <div className='w-4 h-4 bg-[#00813D] absolute -right-2 top-1/3 rotate-45'></div>
                                    <BiLogoFacebook className=' text-white text-4xl p-2 cursor-pointer bg-[#00813D] transition-all duration-300 ease-in-out transform' />
                                    <BiLogoTwitter className=' text-white text-4xl p-2 cursor-pointer bg-[#00813D] transition-all duration-300 ease-in-out transform' />
                                    <BiLogoInstagram className=' text-white text-4xl p-2 cursor-pointer bg-[#00813D] transition-all duration-300 ease-in-out transform' />
                                    <BiLogoYoutube className=' text-white text-4xl p-2 cursor-pointer bg-[#00813D] transition-all duration-300 ease-in-out transform' />
                                </div>
                                <div className=' absolute -top-3 left-3 w-full h-full border-dashed border-[#00813D] border rounded-xl z-0 group-hover:-rotate-3 transition-all duration-300 ease-in-out'></div>
                                <img src={chef1} alt="chef1" className=' w-full h-full rounded-xl relative z-10' />
                            </div>
                            <div className='mt-4 font-semibold text-xs text-[#00813D] '>Head Chef</div>
                            <div className=' my-2 font-bold text-md md:text-lg text-zinc-800'>LESLIE ALEXANDER</div>
                        </div>

                        <div className='my-2 sm:my-5 mx-2 flex flex-col justify-center items-center group'>
                            <div className='  max-w-[215px] h-[305px] md:max-w-[215px] md:min-w-[215px] md:h-[300px]  lg:max-w-[265px] lg:h-[355px] rounded-xl relative '>
                                <div className='w-6 h-6 bg-[#00813D] absolute -left-[0.7rem] top-[4rem] sm:-left-[0.7rem] lg:-left-[0.72rem] lg:top-[4.8rem] rotate-45 z-0'></div>
                                <div className='w-fit absolute top-1/4 -left-4  transition-all duration-300 ease-in-out z-20'>
                                    <div className='w-4 h-4 bg-[#00813D] absolute -right-2 top-1/3 rotate-45'></div>
                                    <BiLogoFacebook className=' text-white text-4xl p-2 cursor-pointer bg-[#00813D] transition-all duration-300 ease-in-out transform' />
                                    <BiLogoTwitter className=' text-white text-4xl p-2 cursor-pointer bg-[#00813D] transition-all duration-300 ease-in-out transform' />
                                    <BiLogoInstagram className=' text-white text-4xl p-2 cursor-pointer bg-[#00813D] transition-all duration-300 ease-in-out transform' />
                                    <BiLogoYoutube className=' text-white text-4xl p-2 cursor-pointer bg-[#00813D] transition-all duration-300 ease-in-out transform' />
                                </div>
                                <div className=' absolute -top-3 left-3 w-full h-full border-dashed border-[#00813D] border rounded-xl group-hover:-rotate-3 transition-all duration-300 ease-in-out z-0'></div>
                                <img src={chef2} alt="chef1" className=' w-full h-full rounded-xl relative z-10' />
                            </div>
                            <div className='mt-4 font-semibold text-xs text-[#00813D] '>Sr Table Manager</div>
                            <div className=' my-2 font-bold text-md md:text-lg text-zinc-800'>HENRY LUCAS</div>
                        </div>

                        <div className='my-2 sm:my-5 mx-2 flex flex-col justify-center items-center group'>
                            <div className=' max-w-[215px] h-[305px] md:max-w-[215px] md:min-w-[215px] md:h-[300px]  lg:max-w-[265px] lg:h-[355px] rounded-xl relative'>
                                <div className='w-6 h-6 bg-[#00813D] absolute -left-[0.7rem] top-[4rem] sm:-left-[0.7rem] lg:-left-[0.70rem] lg:top-[4.8rem] rotate-45 z-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out'></div>
                                <div className='w-fit absolute top-1/4 -left-4  transition-all duration-300 ease-in-out z-20 opacity-0 group-hover:opacity-100'>
                                    <div className='w-4 h-4 bg-[#00813D] absolute -right-2 top-1/3 rotate-45'></div>
                                    <BiLogoFacebook className=' text-white text-4xl p-2 cursor-pointer bg-[#00813D] transition-all duration-300 ease-in-out transform' />
                                    <BiLogoTwitter className=' text-white text-4xl p-2 cursor-pointer bg-[#00813D] transition-all duration-300 ease-in-out transform' />
                                    <BiLogoInstagram className=' text-white text-4xl p-2 cursor-pointer bg-[#00813D] transition-all duration-300 ease-in-out transform' />
                                    <BiLogoYoutube className=' text-white text-4xl p-2 cursor-pointer bg-[#00813D] transition-all duration-300 ease-in-out transform' />
                                </div>
                                <div className=' absolute -top-3 left-3 w-full h-full border-dashed border-[#00813D] border rounded-xl z-0 group-hover:-rotate-3 transition-all duration-300 ease-in-out'></div>
                                <img src={chef3} alt="chef1" className=' w-full h-full rounded-xl relative z-10' />
                            </div>
                            <div className='mt-4 font-semibold text-xs text-[#00813D] '>Senior Cooker</div>
                            <div className=' my-2 font-bold text-md md:text-lg text-zinc-800'>MATEO LEVI</div>
                        </div>

                    </div>

                    <div className='flex justify-center my-5 animate-popup'>
                        <button type='button' className=" px-8 py-3 cursor-pointer font-semibold overflow-hidden relative z-10 bg-[#00813D] group rounded-lg" >
                            <span className="relative z-10 text-white  text-[0.7rem] duration-500">MEET OUR TEAM</span>
                            <span className="absolute w-full h-full bg-[#D12525] -left-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                            <span className="absolute w-full h-full bg-[#D12525] -right-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                        </button>
                    </div>

                </div>

            </div>


            <div className=' bg-zinc-50 py-10 animate-popup min-h-screen'>

                <div className=' mx-auto mt-10 w-fit font-bold text-sm tracking-tight text-[#D12525]'>FOOD PROCESSING</div>
                <div className=' mx-auto w-fit mt-1 mb-3 lg:mb-10 font-bold lg:font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-zinc-800 tracking-tight '>HOW WE SERVE YOU?</div>

                <div className='w-fit mx-auto my-12'>
                    <div className='grid grid-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 lg:gap-14 relative z-0 '>

                        <div className='hiddem lg:block w-full h-10 border-t border-[#262626] border-dashed absolute top-1/2 z-10'></div>

                        <div className='flex flex-col items-center gap-6 p-10 lg:p-12 bg-white hover:bg-[#ffb936] rounded-3xl transition-all ease-in-out duration-300 z-20 group'>
                            <div className='w-7 h-7 p-1 bg-[#00813D] text-white font-bold text-center rounded-full opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300'>1</div>
                            <img src={cookWithCare} alt="cookWithCare" className=' w-52 h-52' />
                            <div className=' text-lg font-bold text-zinc-900'>COOKING WITH CARE</div>
                        </div>
                        <div className='flex flex-col items-center gap-6 p-10 lg:p-12 bg-[#ffb936] rounded-3xl transition-all ease-in-out duration-300 z-20 group'>
                            <div className='w-7 h-7 p-1 bg-[#00813D] text-white font-bold text-center rounded-full '>2</div>
                            <img src={quickdelivery} alt="quickdelivery" className=' w-52 h-52' />
                            <div className=' text-lg font-bold text-zinc-900'>QUICKLY DELIVERY</div>
                        </div>
                        <div className='flex flex-col items-center gap-6 p-10 lg:p-12 bg-white hover:bg-[#ffb936] rounded-3xl transition-all ease-in-out duration-300 z-20 group'>
                            <div className='w-7 h-7 p-1 bg-[#00813D] text-white font-bold text-center rounded-full opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300'>3</div>
                            <img src={chooseFood} alt="chooseFood" className=' w-52 h-52' />
                            <div className=' text-lg font-bold text-zinc-900'>CHOOSE FOOD</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default About;
