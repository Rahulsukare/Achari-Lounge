import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiCart, BiCheckCircle, BiSad } from 'react-icons/bi';
import Stars from './Stars';

const DishesCard = (props) => {
    const navigate = useNavigate();
    const [isAdded, setIsAdded] = useState(false);

    const addToCart = async (id) => {
        try {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_HOST_URL}/auth/addCart`,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                data: { itemId: id, quantity: 1 }
            };

            await axios.request(config)
                .then(response => {
                    console.log("Item Added to cart");
                    setIsAdded(true);
                    setTimeout(() => {
                        setIsAdded(false);
                    }, 5000); // Revert back to original state after 5 seconds
                    navigate(`/menu`);
                })
                .catch(error => {
                    // Handle signup error
                    if (error.response) {
                        console.error('Server responded with an error:', error.response.data);
                    } else if (error.request) {
                        console.error('No response received from the server:', error.request);
                    } else {
                        console.error('Error setting up the request:', error.message);
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className=' group w-80 sm:w-full h-full mx-auto p-6 transition-all duration-300 ease-in-out transform hover:bg-[#FFB936] rounded-lg shadow-xl animate-popup'>
            <Link to={`/item/${props.name}`}>
                <div className="block relative w-fit h-48 rounded overflow-hidden">
                    <img loading='lazy' alt="ecommerce" className="object-cover object-center w-full h-full block" src={props.img}></img>
                </div>
            </Link>
            <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font font-medium mb-1">{props.category}</h3>
                <h2 className="text-gray-900 title-font text-md font-semibold">{props.name}</h2>
                <p className="mt-1 text-red-600 text-sm font-medium">₹ {props.price}</p>

                <div className='flex mt-1'>
                    <div className='hidden group-hover:block'>
                        <Stars rating={5} color={'white'} size={18} />
                    </div>
                    <div className='group-hover:hidden'>
                        <Stars rating={props.rating} size={18} />
                    </div>
                </div>

                <button className={`uppercase w-full mt-2 py-3 text-[0.6rem] font-semibold rounded-xl  text-white  flex justify-center gap-1 transition-all ease-in-out delay-75 ${props.quantity === 0 ? 'bg-red-500 text-white cursor-not-allowed' : 'bg-zinc-800 hover:bg-[#00813D]'}`} onClick={() => { addToCart(props.id) }} disabled={isAdded || props.quantity === 0}>
                    {props.quantity === 0 ? <><span>OUT OF STOCK</span><BiSad size={14} /></>
                        :
                        <>
                            {isAdded ? <><div>Item Added</div><BiCheckCircle size={14} /></> : <><BiCart size={14} />
                                <span>Add to cart</span></>}
                        </>
                    }
                </button>

            </div>
        </div>
    );
};

export default DishesCard;
