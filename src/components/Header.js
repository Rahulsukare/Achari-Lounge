import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DropDownProfile from "./DropDownProfile";

import { BiShoppingBag, BiUser, BiPowerOff } from "react-icons/bi";
// import { BiChevronDown } from "react-icons/bi";
import { AiOutlineClose, AiOutlineMenuUnfold } from "react-icons/ai";

const Header = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    // const [cartItemCount, setCartItemCount] = useState(0);

    const handleChange = () => {
        setMenu(!menu);
    };

    const closeMenu = () => {
        setMenu(false);
    };

    const handleLogoutClick = () => {
        console.log("LOGOUT START")
        localStorage.removeItem("auth-token");
        navigate('/login')
        console.log("LOGOUT END")

    }

    const isHomeActive = location.pathname === '/';
    const isMenuActive = location.pathname === '/menu';
    const isAboutActive = location.pathname === '/about';
    const isContactActive = location.pathname === '/contact';
    const isCartActive = location.pathname === '/cart';
    const isOrdersActive = location.pathname === '/orders';
    const isProfileActive = location.pathname === '/profile';
    // useEffect(() => {
    //     const fetchCartItemsCount = async () => {
    //         try {
    //             let config = {
    //                 method: 'get',
    //                 maxBodyLength: Infinity,
    //                 url: `http://localhost:8001/auth/getCart`,
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'auth-token': `${localStorage.getItem('auth-token')}`
    //                 },
    //             };

    //             const response = await axios.request(config);
    //             setCartItemCount(response.data.totalCartItems)

    //         } catch (error) {
    //             console.error('Error fetching cart items:', error);
    //         }
    //     };

    //     fetchCartItemsCount();
    // },[]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let title = ""
    if (isHomeActive) {title = 'Home'}
    if (isMenuActive){title = 'Menu'}
    if (isAboutActive){ title = 'About'}
    if (isContactActive){ title = 'Contact'}
    if (isCartActive){ title = 'Cart'}
    if (isOrdersActive){ title = 'Orders'}
    if (isProfileActive){ title = 'Profile'}

    document.title = `${capitalizeFirstLetter(title)} - FoodRestro`;

    return (
        <div className=" w-full animate-fade-in ">
            <div>
                <div className=" flex flex-row justify-between py-5 px-10 md:py-0 md:px-10 md:px-356 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">

                    <div className=" flex flex-row items-center cursor-pointer">
                        {/* <img className="w-24 rounded-full" src="../Assets/RestLogo.png" alt="" /> */}
                        <h1 className="text-lg tracking-widest lg:text-xl font-semibold text-nowrap overflow-hidden">FoodRestro</h1>
                    </div>

                    <nav className="hidden md:flex flex-row items-center text-sm text-slate-900 font-semibold gap-8">
                        <Link to='/' className={`hover:text-red-600 ${isHomeActive && 'text-red-600'} cursor-pointer`}>
                            Home
                        </Link>

                        <Link to='/menu' className={`hover:text-red-600 ${isMenuActive && 'text-red-600'} cursor-pointer`} >
                            Menu
                        </Link>

                        <Link to='/about' className={`hover:text-red-600 ${isAboutActive && 'text-red-600'} cursor-pointer`}>
                            About
                        </Link>

                        <Link to='/contact' className={`hover:text-red-600 ${isContactActive && 'text-red-600'} cursor-pointer`}>
                            Contact
                        </Link>
                        <div className="flex  justify-center items-center gap-3">
                            <Link to='/cart' className='relative'>
                                <span className="absolute top-0 right-0 w-3 h-3 p-2 bg-red-600 text-slate-100 text-sm rounded-full flex items-center justify-center z-50">
                                    {props.cartItemCount || 0}
                                </span>
                                <BiShoppingBag className="" size={30} />
                            </Link>
                            {/* <div className="relative inline-block text-left">
                            <div>
                                <button type="button" class="inline-flex w-full justify-center gap-x-1 rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    <BiUser size={17} />
                                    {props.userName}
                                    <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
                                    <form method="POST" action="#" role="none">
                                        <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                                    </form>
                                </div>
                            </div>
                        </div> */}
                            <DropDownProfile username={props.userName} />

                            {/* <Link to='/login' className=''> */}
                            <button onClick={() => { handleLogoutClick() }} className='uppercase my-3 px-6 py-3 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 flex gap-1 items-center' >
                                <h1>Logout</h1> <BiPowerOff size={21} />
                            </button>
                            {/* </Link> */}
                        </div>
                    </nav>

                    <div className="md:hidden flex gap-3 items-center">
                        <Link to='/cart' className='relative'>
                            <span className="absolute top-0 right-0 w-3 h-3 p-2 bg-red-600 text-slate-100 text-sm rounded-full flex items-center justify-center z-50">
                                {props.cartItemCount || 0}
                            </span>
                            <BiShoppingBag className="" size={30} />
                        </Link>
                        {/* <Link to='/login' className=''>
                            <button className='uppercase my-3 px-6 py-3 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 flex gap-1 items-center' >
                                <h1>Logout</h1> <BiPowerOff size={21} />
                            </button>
                        </Link> */}
                        {menu ? (
                            <AiOutlineClose size={30} onClick={handleChange} className=" cursor-pointer" />
                        ) : (
                            <AiOutlineMenuUnfold size={30} onClick={handleChange} className=" cursor-pointer" />
                        )}
                    </div>
                </div>
                <div
                    className={` ${menu ? "translate-x-0" : "-translate-x-full"
                        } lg:hidden flex flex-col absolute bg-white text-black left-0 top-20 font-normal text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300 z-50`}
                >
                    <Link to='/' className={`hover:text-red-600 ${isHomeActive && 'text-red-600'}`} onClick={closeMenu} >
                        Home
                    </Link>
                    <Link to='/menu' className={`hover:text-red-600 ${isMenuActive && 'text-red-600'}`} onClick={closeMenu}>
                        Menu
                    </Link>
                    <Link to='/about' className={`hover:text-red-600 ${isAboutActive && 'text-red-600'}`} onClick={closeMenu}>
                        About
                    </Link>
                    <Link to='/reviews' className={`hover:text-red-600 ${isContactActive && 'text-red-600'}`} onClick={closeMenu}>
                        Contact
                    </Link>
                    <Link to='/profile' className="hover:text-red-600 transition-all cursor-pointer flex justify-center items-center gap-2">
                        <BiUser size={20} />
                        {props.userName}
                    </Link>
                    {/* <Link to='/login' className='mx-auto'> */}
                    <button onClick={handleLogoutClick} className='uppercase w-fit mx-auto my-3 px-6 py-3 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 flex gap-1 items-center' >
                        <h1>Logout</h1> <BiPowerOff size={21} />
                    </button>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    );
};


export default Header;