import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BiCart, BiX } from 'react-icons/bi';
import emptyCart from '../Assets/empty-cart (1).png'

const Cart = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(true);
    const [cartTotal, setCartTotal] = useState(0);
    const [deliveryCharges, setDeliveryCharges] = useState(0);
    const [platformFees, setPlatformFees] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const config = {
                    method: 'get',
                    url: `http://localhost:8001/auth/getCart`,
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('auth-token')
                    },
                };

                const response = await axios(config);

                // Check if response data contains cart items
                if (response.data && response.data.cart) {
                    // Extract cart items and total cart items from response data
                    const { cart } = response.data;

                    // Map over cart items to format the data if needed
                    const formattedCartItems = cart.map(item => {
                        return {
                            menuId: item.menuId,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: item.quantity,
                            subtotal: item.subtotal
                        };
                    });

                    // Update state or perform any other action with cart items
                    setData(formattedCartItems);
                    console.log(formattedCartItems)
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        const fetchCartTotal = async () => {
            try {
                const config = {
                    method: 'get',
                    url: 'http://localhost:8001/auth/getCartTotal',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('auth-token')
                    }
                };
        
                const response = await axios(config);
                setCartTotal(response.data.cartTotal);
                setPlatformFees(response.data.platformFees)
                setDeliveryCharges(response.data.deliveryCharges)
                setFinalTotal(response.data.finalTotal)
            } catch (error) {
                console.error('Error fetching cart total:', error);
                return null; // Return null if there's an error
            }
        };

        fetchCartItems();
        fetchCartTotal();
        
    }, [update]);

    const fetchCartTotal = async () => {
        try {
            const config = {
                method: 'get',
                url: 'http://localhost:8001/auth/getCartTotal',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            };
    
            const response = await axios(config);
            setCartTotal(response.data.cartTotal);
            setPlatformFees(response.data.platformFees)
            setDeliveryCharges(response.data.deliveryCharges)
            setFinalTotal(response.data.finalTotal)
        } catch (error) {
            console.error('Error fetching cart total:', error);
            return null; // Return null if there's an error
        }
    };

    const handleIncrement = async (id) =>{
        try {
            let config = {
                method: 'post',
                url: `http://localhost:8001/auth/increaseCartItemQuantity/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
            };

            const response = await axios(config);
             // Check if response data contains cart items
             if (response.data && response.data.cart) {
                // Extract cart items and total cart items from response data
                const { cart } = response.data;

                // Map over cart items to format the data if needed
                const formattedCartItems = cart.map(item => {
                    return {
                        menuId: item.menuId,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: item.quantity,
                        subtotal: item.subtotal
                    };
                });

                // Update state or perform any other action with cart items
                setData(formattedCartItems);
                console.log(formattedCartItems)
                fetchCartTotal();
            }
            navigate('/cart');
            console.log("Item Increment Successfully");

        } catch (error) {
            console.error('Error removing cart items:', error);
        }
    }
    const handleDecrement = async (id) =>{
        try {
            let config = {
                method: 'post',
                url: `http://localhost:8001/auth/decreaseCartItemQuantity/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
            };

            const response = await axios(config);
             // Check if response data contains cart items
             if (response.data && response.data.cart) {
                // Extract cart items and total cart items from response data
                const { cart } = response.data;

                // Map over cart items to format the data if needed
                const formattedCartItems = cart.map(item => {
                    return {
                        menuId: item.menuId,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: item.quantity,
                        subtotal: item.subtotal
                    };
                });

                // Update state or perform any other action with cart items
                setData(formattedCartItems);
                console.log(formattedCartItems)
                fetchCartTotal();
            }
            navigate('/cart');
            console.log("Item Decrement Successfully");

        } catch (error) {
            console.error('Error removing cart items:', error);
        }
    }
    const removeCartItem = async (id) => {
        setUpdate(!update)
        try {
            let config = {
                method: 'post',
                url: `http://localhost:8001/auth/removeCart/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
            };

            const response = await axios(config);
            console.log(response.data);
            console.log("Item Removed Successfully");
            navigate('/cart');
            setUpdate(!update)

        } catch (error) {
            console.error('Error removing cart items:', error);
            setUpdate(!update)
        }

    }


    return (
        <>
            <div className="overflow-x-auto mx-auto animate-fade-in">

                {/* Heading */}
                <p className='uppercase font-bold text-4xl mx-auto my-14 w-3/4'>SHOPPING <span className='inline text-red-600'>CART</span>&nbsp;<BiCart className='inline' /></p>

                {/* Cart items */}
                <div className=" overflow-x-auto ml-4 md:mx-auto my-14 w-full md:w-3/4 p-6 shadow-lg">
                    <table className="mx-auto my-9 w-full">
                        <thead className=''>
                            <tr className="text-lg border-b">
                                <th className="py-2 pr-2 text-left">PRODUCT</th>
                                <th className="py-2 pr-2 text-left">PRICE</th>
                                <th className="py-2 pr-2 text-left">QUANTITY</th>
                                <th className="py-2 pr-2 text-left">SUBTOTAL</th>
                                <th className="py-2 pr-2 text-left">REMOVE</th>
                            </tr>
                        </thead>
                        <tbody className='border-b'>
                            {data.length !== 0 ?
                                (
                                    data.map((item) => (
                                        <tr key={item.menuId} className="text-center sm:text-left">
                                            <td className="px-4 py-2 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center"><img src={item.image} alt="productImg" className="w-20 sm:w-30" /></td>
                                            <td className="px-4 py-2 text-red-600 font-bold text-nowrap">Rs. {item.price}</td>
                                            <td className="px-4 py-2 ">
                                                <div className="flex items-center bg-slate-100 w-fit rounded-md gap-3">
                                                    <button className={`px-2 py-1 font-semibold bg-gray-200 text-gray-600 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300 ${item.quantity === 1 && 'opacity-50 cursor-not-allowed'}`} onClick={()=>{handleDecrement(item.menuId)}}>-</button>
                                                    <div className=' text-gray-700 font-semibold'>
                                                        {item.quantity}
                                                    </div>
                                                    <button className="px-2 py-1 font-semibold bg-gray-200 text-gray-600 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300" onClick={()=>{handleIncrement(item.menuId)}}>+</button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 font-semibold text-gray-600">{item.subtotal}</td>

                                            <td className="px-4 py-2">
                                                <BiX className=' font-bold text-xl cursor-pointer' onClick={() => { removeCartItem(item.menuId) }} />
                                            </td>
                                        </tr>
                                    ))
                                )
                                :
                                (
                                    <tr className="animate-fade-in">
                                        <td>
                                            <p className="text-center text-xl font-bold text-gray-700 mt-10">Your Cart is Empty</p>
                                            <img src={emptyCart} className='w-20 mx-auto mb-10' alt="Empty cart logo" />
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                    <div className='flex'>
                        <button className='uppercase font-bold w-fit py-3 px-9 text-sm bg-green-600 text-white hover:bg-red-600' ><Link to="/menu">View More &nbsp; &rarr; </Link></button>
                    </div>

                </div>

                {/* Cart Total */}
                {data.length !== 0 && <div className="mx-auto my-14 w-11/12 md:w-3/4 p-6 shadow-lg uppercase">
                    <h2 className="text-xl font-semibold mb-12">Cart Total</h2>
                    <div className="flex justify-between mb-9">
                        <span>Cart Subtotal :</span>
                        <span>Rs. {cartTotal}</span>
                    </div>
                    <div className="flex justify-between mb-9">
                        <span>platform fees :</span>
                        <span>Rs. {platformFees}</span>
                    </div>
                    <div className="flex justify-between mb-9">
                        <span>Delivery :</span>
                        <span>Rs. {deliveryCharges}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-3 mb-6 mt-3 text-gray-700">
                        <span className="font-semibold">Total:</span>
                        <span className="font-semibold">Rs. {finalTotal}</span>
                    </div>
                    <div className='flex justify-end mt-10'>
                        <button className='uppercase w-fit py-3 px-9 font-bold text-sm bg-green-600 text-white hover:bg-red-600' >Order Now</button>
                    </div>
                </div>}

            </div>

        </>
    )
}

export default Cart;