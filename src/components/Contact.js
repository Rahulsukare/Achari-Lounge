import React from 'react';

import { BiMap ,BiPhoneCall ,BiMailSend  } from 'react-icons/bi';

const Contact = () => {
    return (
        <div className="mx-auto py-20 md:py-32 bg-[#f4f1ea] animate-popup">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-10 md:px-28">
                {/* Address */}
                <div className="bg-white rounded-lg shadow-md p-8 md:p-12 flex flex-col justify-center items-center cursor-pointer hover:bg-green-700 hover:text-white group transition-all duration-300 ease-in-out">
                    <BiMap className=" group-hover:scale-125 w-16 h-16 mb-4 text-green-700 group-hover:text-white transition-all duration-300 ease-in-out" />
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-all duration-300 ease-in-out">ADDRESS LINE</h3>
                    <p className="text-gray-600 text-md font-semibold text-center group-hover:text-white transition-all duration-300 ease-in-out">RAMNAGAR, SHRIVAS COLONY,</p>
                    <p className="text-gray-600 text-md font-semibold text-center group-hover:text-white transition-all duration-300 ease-in-out">MAIN NAKA, WARDHA, MAHARASHTRA - 442001</p>
                </div>

                {/* Phone Number */}
                <div className="bg-white rounded-lg shadow-md p-8 md:p-12 flex flex-col justify-center items-center cursor-pointer hover:bg-green-700 hover:text-white group transition-all duration-300 ease-in-out">
                <BiPhoneCall className=" group-hover:scale-125 w-16 h-16 mb-4 text-green-700 group-hover:text-white transition-all duration-300 ease-in-out" />
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-all duration-300 ease-in-out">PHONE NUMBER</h3>
                    <p className="text-gray-600 text-md font-semibold text-center group-hover:text-white transition-all duration-300 ease-in-out">+1255 - 568 - 6523 4374-221</p>
                    <p className="text-gray-600 text-md font-semibold text-center group-hover:text-white transition-all duration-300 ease-in-out">+1255 - 568 - 6523</p>
                </div>

                {/* Email Address */}
                <div className="bg-white rounded-lg shadow-md p-8 md:p-12 flex flex-col justify-center items-center cursor-pointer hover:bg-green-700 hover:text-white group transition-all duration-300 ease-in-out">
                <BiMailSend className=" group-hover:scale-125 w-16 h-16 mb-4 text-green-700 group-hover:text-white transition-all duration-300 ease-in-out" />
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-all duration-300 ease-in-out">MAIL ADDRESS</h3>
                    <p className="text-gray-600 text-md font-semibold text-center group-hover:text-white transition-all duration-300 ease-in-out">email@example.com</p>
                    <p className="text-gray-600 text-md font-semibold text-center group-hover:text-white transition-all duration-300 ease-in-out">info@yourdomain.com</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
