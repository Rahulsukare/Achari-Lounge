import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiCart, BiX } from 'react-icons/bi';
import emptyCart from '../Assets/empty-cart (1).png'

const Cart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `http://localhost:8001/auth/getCart`,
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`
                    },
                };

                const response = await axios.request(config);
                console.log(response.data.cart);
                setData(response.data.cart);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);


    return (
        <>
            <div className="overflow-x-auto mx-auto animate-fade-in">

                {/* Heading */}
                <h1 className=' uppercase font-bold text-6xl mx-auto my-14 w-3/4'>SHOPPING <h1 className='inline text-red-600'>CART</h1>&nbsp;<BiCart className='inline' /></h1>

                {/* Cart items */}
                <div className=" overflow-x-auto ml-4 md:mx-auto my-14 w-full md:w-3/4 p-6 shadow-lg">
                    <table className="mx-auto my-9 w-full">
                        <thead>
                            <tr className="text-lg border-b">
                                <th className="py-2 pr-2 text-left">PRODUCT</th>
                                <th className="py-2 pr-2 text-left">PRICE</th>
                                <th className="py-2 pr-2 text-left">QUANTITY</th>
                                <th className="py-2 pr-2 text-left">SUBTOTAL</th>
                                <th className="py-2 pr-2 text-left">REMOVE</th>
                            </tr>
                        </thead>
                        <tbody className='border-b'>
                            {data ?
                                (
                                    data.map((item) => (
                                        <tr key={item._id} className="text-center sm:text-left">
                                            <td className="px-4 py-2 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center"><img src={item.image} alt="productImg" className="w-20 sm:w-30" /></td>
                                            <td className="px-4 py-2 text-red-600 font-bold">Rs. {item.price}</td>
                                            <td className="px-4 py-2">1</td>
                                            <td className="px-4 py-2">{item.subtotal}</td>
                                            <td className="px-4 py-2">
                                                <BiX className=' font-bold text-xl cursor-pointer' />
                                            </td>
                                        </tr>
                                    ))
                                )
                                :
                                (
                                    <div className="mx-auto my-10 animate-fade-in">
                                        <h1 className="text-center text-xl font-bold text-gray-700 mt-20">Your Cart is Empty</h1>
                                        <img src={emptyCart} className='w-20 mx-auto' alt="Empty cart logo" />
                                    </div>
                                )
                            }
                        </tbody>
                    </table>

                    <div className='flex'>
                        <button className='uppercase font-bold w-fit py-3 px-9 text-sm bg-green-600 text-white hover:bg-red-600' ><Link to="/menu">View More &nbsp; &rarr; </Link></button>
                    </div>

                </div>

                {/* Cart Total */}
                <div className="mx-auto my-14 w-11/12 md:w-3/4 p-6 shadow-lg uppercase">
                    <h2 className="text-xl font-semibold mb-12">Cart Total</h2>
                    <div className="flex justify-between mb-9">
                        <span>Subtotal :</span>
                        <span>$250</span>
                    </div>
                    <div className="flex justify-between mb-9">
                        <span>Shipping :</span>
                        <span>$10</span>
                    </div>
                    <div className="flex justify-between mb-9">
                        <span>Delivery :</span>
                        <span>$50</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-3 mb-6 mt-3 text-gray-700">
                        <span className="font-semibold">Total:</span>
                        <span className="font-semibold">$310</span>
                    </div>
                    <div className='flex justify-end mt-10'>
                        <button className='uppercase w-fit py-3 px-9 font-bold text-sm bg-green-600 text-white hover:bg-red-600' >Order Now</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Cart;