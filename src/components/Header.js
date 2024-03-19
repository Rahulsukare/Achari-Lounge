import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { BiRestaurant } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineMenuUnfold } from "react-icons/ai";
// import { BiChevronDown } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import Button from './Button';

const Header = (props) => {

    const [menu, setMenu] = useState(false);

    const handleChange = () => {
        setMenu(!menu);
    };

    const closeMenu = () => {
        setMenu(false);
    };

    const handleLoginClick = () => {

    }

    return (
        <div className=" w-full bg-backBody text-white">
            <div>
                <div className=" flex flex-row justify-between p-1 md:px-356 px-5 bg-backBody shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    <div className=" flex flex-row items-center cursor-pointer">
                        <img className="w-24 rounded-full" src="../Assets/RestLogo.png" alt="" />
                        <h1 className=" ml-4 text-xl font-semibold">Food Restro</h1>
                    </div>

                    <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
                        <Link to='/' className="hover:text-brightColor transition-all cursor-pointer">
                            Home
                        </Link>

                        <Link to='/menu' className="hover:text-brightColor transition-all cursor-pointer" >
                            Menu
                        </Link>

                        <Link to='/about' className="hover:text-brightColor transition-all cursor-pointer">
                            About
                        </Link>

                        <Link to='/contact' className="hover:text-brightColor transition-all cursor-pointer">
                            Contact
                        </Link>

                        <Link to='/profile' className="hover:text-brightColor transition-all cursor-pointer flex gap-2">
                            <VscAccount size={25} />
                            {props.userName}
                        </Link>

                        <Link to='/login' className=''>
                            <Button title="Login" />
                        </Link>
                    </nav>

                    <div className="md:hidden flex items-center">
                        {menu ? (
                            <AiOutlineClose size={25} onClick={handleChange} />
                        ) : (
                            <AiOutlineMenuUnfold size={25} onClick={handleChange} />
                        )}
                    </div>
                </div>
                <div
                    className={` ${menu ? "translate-x-0" : "-translate-x-full"
                        } lg:hidden flex flex-col absolute bg-black text-white left-0 top-20 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
                >
                    <Link to='/' className="hover:text-brightColor transition-all cursor-pointer" onClick={closeMenu} >
                        Home
                    </Link>
                    <Link to='/menu' className="hover:text-brightColor transition-all cursor-pointer" onClick={closeMenu}>
                        Menu
                    </Link>
                    <Link to='/about' className="hover:text-brightColor transition-all cursor-pointer" onClick={closeMenu}>
                        About
                    </Link>
                    <Link to='/reviews' className=" hover:text-brightColor transition-all cursor-pointer" onClick={closeMenu}>
                        Contact
                    </Link>
                    <Link to='/profile' className="hover:text-brightColor transition-all cursor-pointer flex justify-center gap-2">
                        <VscAccount size={25} />
                        {props.userName}
                    </Link>
                    <Link to='/login'>
                        <Button title="login" onClick={handleLoginClick()} />
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default Header;