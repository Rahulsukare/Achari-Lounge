import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiCart, BiCheckCircle, BiSad } from 'react-icons/bi';

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
        <div className='lg:w-1/4 md:w-1/2 p-4 w-full transition-all duration-300 ease-in-out transform hover:bg-amber-400 hover:scale-105 rounded-lg'>
            <Link to={`/item/${props.name}`} className="">
                <div className="block relative h-48 rounded overflow-hidden">
                    <img loading='lazy' alt="ecommerce" className="object-cover object-center w-full h-full block" src={props.img}></img>
                </div>
            </Link>
            <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{props.category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{props.name}</h2>
                <p className="mt-1 text-red-600 font-medium">₹ {props.price}</p>
                <button className={`uppercase w-full mt-5 py-3 text-[0.6rem] font-semibold rounded-xl  text-white  flex justify-center gap-1 transition-all ease-in-out delay-75 ${props.quantity === 0 ? 'bg-red-500 text-white cursor-not-allowed' : 'bg-zinc-800 hover:bg-red-600'}`} onClick={() => { addToCart(props.id) }} disabled={isAdded || props.quantity === 0}>
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
