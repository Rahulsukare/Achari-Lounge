import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

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

    return (
        <div className=" w-full ">
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

                        <Link to='/profile' className="hover:text-red-600 pb-1 transition-all cursor-pointer flex gap-1 border-b-2">
                            <BiUser size={17} />
                            <span className=" text-nowrap overflow-hidden">{props.userName}</span>
                        </Link>

                        <Link to='/cart' className='relative'>
                            <span className="absolute top-0 right-0 w-3 h-3 p-2 bg-red-600 text-slate-100 text-sm rounded-full flex items-center justify-center z-50">
                                {props.cartItemCount || 0}
                            </span>
                            <BiShoppingBag className="" size={30} />
                        </Link>

                        {/* <Link to='/login' className=''> */}
                            <button onClick={()=>{handleLogoutClick()}} className='uppercase my-3 px-6 py-3 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 flex gap-1 items-center' >
                                <h1>Logout</h1> <BiPowerOff size={21} />
                            </button>
                        {/* </Link> */}
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
                            <AiOutlineClose size={30} onClick={handleChange} />
                        ) : (
                            <AiOutlineMenuUnfold size={30} onClick={handleChange} />
                        )}
                    </div>
                </div>
                <div
                    className={` ${menu ? "translate-x-0" : "-translate-x-full"
                        } lg:hidden flex flex-col absolute bg-white text-black left-0 top-20 font-normal text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300 z-50`}
                >
                    <Link to='/' className="hover:text-red-600 transition-all cursor-pointer" onClick={closeMenu} >
                        Home
                    </Link>
                    <Link to='/menu' className="hover:text-red-600 transition-all cursor-pointer" onClick={closeMenu}>
                        Menu
                    </Link>
                    <Link to='/about' className="hover:text-red-600 transition-all cursor-pointer" onClick={closeMenu}>
                        About
                    </Link>
                    <Link to='/reviews' className=" hover:text-red-600 transition-all cursor-pointer" onClick={closeMenu}>
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