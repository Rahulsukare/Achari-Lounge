import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { BiCart, BiX } from 'react-icons/bi';
import emptyCart from '../Assets/empty-cart (1).png'

const Cart = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(true);

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


        fetchCartItems();
    }, [update]);

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
        }

    }


    return (
        <>
            <div className="overflow-x-auto mx-auto animate-fade-in">

                {/* Heading */}
                <p className='uppercase font-bold text-6xl mx-auto my-14 w-3/4'>SHOPPING <span className='inline text-red-600'>CART</span>&nbsp;<BiCart className='inline' /></p>

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
                            {data.length !== 0 ?
                                (
                                    data.map((item) => (
                                        <tr key={item.menuId} className="text-center sm:text-left">
                                            <td className="px-4 py-2 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center"><img src={item.image} alt="productImg" className="w-20 sm:w-30" /></td>
                                            <td className="px-4 py-2 text-red-600 font-bold">Rs. {item.price}</td>
                                            <td className="px-4 py-2">{item.quantity}</td>
                                            <td className="px-4 py-2">{item.subtotal}</td>
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
                </div>}

            </div>

        </>
    )
}

export default Cart;