import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DropDownProfile from "./DropDownProfile";

import avatar from '../Assets/avatar.avif'

import { BiHomeAlt2, BiDish, BiPhone, BiPackage, BiInfoCircle, BiBasket, BiUser, BiPowerOff, BiLogInCircle, BiMenu, BiX } from "react-icons/bi";

const Header = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);

    const handleChange = () => {
        setMenu(!menu);
    };

    const closeMenu = () => {
        setMenu(false);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("auth-token");
        navigate('/login')
    }

    const isHomeActive = location.pathname === '/';
    const isMenuActive = location.pathname === '/menu';
    const isAboutActive = location.pathname === '/about';
    const isContactActive = location.pathname === '/contact';
    const isCartActive = location.pathname === '/cart';
    const isOrdersActive = location.pathname === '/orders';
    const isProfileActive = location.pathname === '/profile';

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let title = ""
    if (isHomeActive) { title = 'Home' }
    if (isMenuActive) { title = 'Menu' }
    if (isAboutActive) { title = 'About' }
    if (isContactActive) { title = 'Contact' }
    if (isCartActive) { title = 'Cart' }
    if (isOrdersActive) { title = 'Orders' }
    if (isProfileActive) { title = 'Profile' }

    document.title = `${capitalizeFirstLetter(title)} - FoodRestro`;

    return (
        <div className=" w-full animate-fade-in">
            <div className="min-w-fit flex flex-row justify-between py-5 px-10 md:py-0 md:px-10 md:px-356 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">

                <div className=" flex flex-row items-center cursor-pointer">
                    {/* <img className="w-24 rounded-full" src="../Assets/RestLogo.png" alt="" /> */}
                    <h1 className="text-lg tracking-widest lg:text-xl font-semibold text-nowrap overflow-hidden mr-10 md:mr-5">FoodRestro</h1>
                </div>

                <nav className="hidden md:flex flex-row items-center text-sm text-slate-900 font-semibold gap-8">
                    <Link to='/' className={`hover:text-[#D12525] ${isHomeActive && 'text-[#D12525]'} cursor-pointer`}>
                        Home
                    </Link>

                    <Link to='/menu' className={`hover:text-[#D12525] ${isMenuActive && 'text-[#D12525]'} cursor-pointer`} >
                        Menu
                    </Link>

                    <Link to='/about' className={`hover:text-[#D12525] ${isAboutActive && 'text-[#D12525]'} cursor-pointer`}>
                        About
                    </Link>

                    <Link to='/contact' className={`hover:text-[#D12525] ${isContactActive && 'text-[#D12525]'} cursor-pointer`}>
                        Contact
                    </Link>
                    <div className="flex  justify-center items-center gap-3">
                        <Link to='/cart' className='relative'>
                            <span className="absolute -top-1 -right-2 w-1 h-1 p-2 bg-zinc-800 text-slate-100 text-[0.6rem] rounded-full flex items-center justify-center z-30">
                                {props.cartItemCount || 0}
                            </span>
                            <BiBasket className="text-[#D12525]" size={27} />
                        </Link>

                        <DropDownProfile username={props.userName} />

                        <button onClick={() => { handleLogoutClick() }} className='uppercase my-3 px-6 py-3 text-sm rounded-md bg-[#D12525] text-white overflow-hidden relative group cursor-pointer' >
                            <span className="relative z-10 flex item-center gap-2">Logout <BiPowerOff size={20} className="inline" /></span>
                            <span className="absolute w-full h-full bg-[#00813D] -left-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                            <span className="absolute w-full h-full bg-[#00813D] -right-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>

                        </button>
                    </div>
                </nav>

                <div className="md:hidden flex gap-3 items-center">
                    <Link to='/cart' className='relative'>
                        <span className="absolute -top-1 -right-2 w-1 h-1 p-2 bg-zinc-800 text-slate-100 text-[0.6rem] rounded-full flex items-center justify-center z-30">
                            {props.cartItemCount || 0}
                        </span>
                        <BiBasket className="text-[#D12525]" size={27} />
                    </Link>

                    {menu ? (
                        <BiX size={30} onClick={handleChange} className=" cursor-pointer" />
                    ) : (
                        <BiMenu size={30} onClick={handleChange} className=" cursor-pointer" />
                    )}
                </div>
            </div>

            <div className={` lg:hidden ${menu ? 'inset-0 opacity-75' : '-inset-full opacity-0'} absolute top-0 bg-black w-full h-full z-40 transition-opacity ease-in-out duration-700`} onClick={() => setMenu(false)}>
            </div>

            <div
                className={` ${menu ? "right-0" : "-right-full"
                    } min-w-fit h-screen py-10 px-2 md:hidden flex flex-col fixed top-0 bg-white text-sm text-slate-900 font-semibold z-50 border-slate-300 border border-r-2 lg:border-none transition-all ease-in-out duration-700 `}
            >

                {/* <BiX size={25} onClick={handleChange} className={` lg:hidden absolute top-3 left-3 cursor-pointer transition-all ease-in-out hover:scale-125 hover:border-zinc-600 hover:border rounded-full bg-[#D12525] text-white`} /> */}

                {/* <div className=" font-bold text-2xl text-[#00813D]">Welcome</div> */}
                {/* <div className=" font-semibold ">{props.userName}</div> */}

                <div className="flex items-center justify-between mt-2 ml-4 mr-6 pl-3 py-3">
                    <div className=" font-bold text-2xl mr-10 tracking-widest text-nowrap text-zinc-900">FOODRESTRO</div>
                    <BiX size={25} onClick={handleChange} className={` lg:hidden cursor-pointer transition-all ease-in-out hover:scale-125 rounded-full `} />
                </div>

                <Link to='/' className={`hover:text-[#D12525] ${isHomeActive && 'text-[#00813D]'} mt-9 pl-3 pr-10 py-3 rounded-lg ml-4 mr-6 hover:bg-zinc-100 flex item-center gap-2`} onClick={closeMenu} >
                    <BiHomeAlt2 size={18} />
                    <h1>Home</h1>
                </Link>
                <Link to='/menu' className={`hover:text-[#D12525] ${isMenuActive && 'text-[#00813D]'} pl-3 pr-10 py-3 rounded-lg ml-4 mr-6 hover:bg-zinc-100 flex item-center gap-2`} onClick={closeMenu}>
                    <BiDish size={18} />
                    <h1>Menu</h1>
                </Link>

                <Link to='/profile' className={`hover:text-[#D12525] ${isProfileActive && 'text-[#00813D]'} pl-3 pr-10 py-3 rounded-lg ml-4 mr-6 hover:bg-zinc-100 flex item-center gap-2`} onClick={closeMenu}>
                    <BiUser size={18} />
                    <h1>Profile</h1>
                </Link>

                <Link to='/orders' className={`hover:text-[#D12525] ${isOrdersActive && 'text-[#00813D]'} pl-3 pr-10 py-3 rounded-lg ml-4 mr-6 hover:bg-zinc-100 flex item-center gap-2`} onClick={closeMenu}>
                    <BiPackage size={18} />
                    <h1>Orders</h1>
                </Link>


                <Link to='/contact' className={`hover:text-[#D12525] ${isContactActive && 'text-[#00813D]'} pl-3 pr-10 py-3 rounded-lg ml-4 mr-6 hover:bg-zinc-100 flex item-center gap-2`} onClick={closeMenu}>
                    <BiPhone size={18} />
                    <h1>Contact</h1>
                </Link>

                <Link to='/about' className={`hover:text-[#D12525] ${isAboutActive && 'text-[#00813D]'} pl-3 pr-10 py-3 rounded-lg ml-4 mr-6 hover:bg-zinc-100 flex item-center gap-2`} onClick={closeMenu}>
                    <BiInfoCircle size={18} />
                    <h1>About</h1>
                </Link>

                <div className={`bg-[#D12525] text-white pl-3 pr-10 py-3 rounded-lg mt-3 mx-4 overflow-hidden relative group cursor-pointer`} onClick={handleLogoutClick}>
                    <span className="relative z-10 flex item-center gap-2"> <BiLogInCircle size={18} className="inline" />Sign Out</span>
                    <span className="absolute w-full h-full bg-[#00813D] -left-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                    <span className="absolute w-full h-full bg-[#00813D] -right-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                </div>

                <div className="pl-3 pr-28 py-1 mr-2 absolute bottom-5 flex bg-zinc-100 border rounded-lg">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img src={avatar} alt="avatar" className="object-center" />
                    </div>
                    <div className="flex items-center ml-3 text-nowrap">{props.fullName}</div>
                </div>

            </div>
        </div>
    );
};


export default Header;