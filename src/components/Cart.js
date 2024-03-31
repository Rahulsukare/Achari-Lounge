import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BiCart, BiX,BiShoppingBag  } from 'react-icons/bi';
import emptyCart from '../Assets/empty-cart (1).png'

const Cart = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(true);
    const [checkout, setCheckOut] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);
    const [deliveryCharges, setDeliveryCharges] = useState(0);
    const [platformFees, setPlatformFees] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);

    const [paymentMethod, setpaymentMethod] = useState('card');
    const [name, setname] = useState(props.userName || ''); // Initialize with props or empty string
    const [phoneNumber, setphoneNumber] = useState(props.phoneNumber || ''); // Initialize with props or empty string
    const [address, setaddress] = useState(props.address || ''); // Initialize with props or empty string

    // Validation states
    const [nameError, setNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [addressError, setAddressError] = useState('');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const config = {
                    method: 'get',
                    url: `${process.env.REACT_APP_HOST_URL}/auth/getCart`,
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
                    url: `${process.env.REACT_APP_HOST_URL}/auth/getCartTotal`,
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
                url: `${process.env.REACT_APP_HOST_URL}/auth/getCartTotal`,
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

    const handleIncrement = async (id) => {
        try {
            let config = {
                method: 'post',
                url: `${process.env.REACT_APP_HOST_URL}/auth/increaseCartItemQuantity/${id}`,
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
    const handleDecrement = async (id) => {
        try {
            let config = {
                method: 'post',
                url: `${process.env.REACT_APP_HOST_URL}/auth/decreaseCartItemQuantity/${id}`,
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
                url: `${process.env.REACT_APP_HOST_URL}/auth/removeCart/${id}`,
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


    const handleCheckout = async () => {
        setCheckOut(true)
        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // You can change this to 'auto' for instant scrolling
        });
    }

    // Function to handle form submission
    const handleFormSubmit = () => {
        // Clear previous errors
        setNameError('');
        setPhoneNumberError('');
        setAddressError('');

        // Validate name
        const nameParts = name.trim().split(' ');
        if (nameParts.length !== 2) {
            setNameError('Please enter your first name and last name');
            return;
        }

        // Validate phone number
        const phoneRegex = /^[7-9]\d{9}$/;
        if (!phoneNumber.match(phoneRegex)) {
            setPhoneNumberError('Please enter a valid phone number');
            return;
        }

        // Validate address
        const lowerCaseAddress = address.toLowerCase();
        if (!lowerCaseAddress.includes('wardha') || !lowerCaseAddress.includes('442001')) {
            setAddressError('Please enter a valid address including "Wardha" and "442001"');
            return;
        }

        // Proceed with placing the order if all validations pass
        placeOrder();
    };

    const placeOrder = async () => {

        const orderItems = data.map(item => ({
            menuId: item.menuId,
            quantity: item.quantity,
            subtotal: item.subtotal
        }))
        const orderData = {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            totalPayable: finalTotal,
            paymentMethod: paymentMethod,
            items: orderItems
        }

        if (paymentMethod === 'cash') {
            console.log("CASH ON DELIVERY PROCESSING....")
            try {
                let config = {
                    method: 'post',
                    url: `${process.env.REACT_APP_HOST_URL}/order/addOrder`,
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`
                    },
                    data: orderData
                };

                const response = await axios(config);
                if (response) {
                    navigate('/orders')
                    alert('Order Placed Successfully')
                    setCheckOut(false)
                }
                else {
                    console.log("Request failed")
                    alert('Order Failed')
                }
            } catch (error) {
                console.log('Add order request failed')
            }

        }
        else {
            console.log("Card order processing....")
            return;
        }
    }

    return (
        <>
            <div className={`overflow-x-auto mx-auto bg-[#f4f1ea] animate-fade-in ${checkout ? "hidden" : ""}`}>

                {/* Heading */}
                <p className='uppercase font-bold text-2xl md:text-4xl mx-auto my-14 w-3/4'>SHOPPING <span className='inline text-red-600'>CART</span>&nbsp;<BiCart className='inline' /></p>

                {/* Cart items */}
                <div className="bg-white  overflow-x-auto ml-4 md:mx-auto my-14 w-full md:w-3/4 p-6 shadow-lg">
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
                                            <td className="px-4 py-2 text-red-600 font-bold text-nowrap">₹ {item.price}</td>
                                            <td className="px-4 py-2 ">
                                                <div className="flex items-center bg-slate-100 w-fit rounded-md gap-3">
                                                    <button className={`px-2 py-1 font-semibold bg-gray-200 text-gray-600 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300 ${item.quantity === 1 && 'opacity-50 cursor-not-allowed'}`} onClick={() => { handleDecrement(item.menuId) }}>-</button>
                                                    <div className=' text-gray-700 font-semibold'>
                                                        {item.quantity}
                                                    </div>
                                                    <button className="px-2 py-1 font-semibold bg-gray-200 text-gray-600 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300" onClick={() => { handleIncrement(item.menuId) }}>+</button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 font-semibold text-gray-600">{item.subtotal}</td>

                                            <td className="px-4 py-2">
                                                <BiX size={23} className=' font-bold text-xl cursor-pointer' onClick={() => { removeCartItem(item.menuId) }} />
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
                {data.length !== 0 && <div className="bg-white mx-auto my-14 w-11/12 md:w-3/4 p-6 shadow-lg uppercase">
                    <h2 className="text-xl font-semibold mb-12">Cart Total</h2>
                    <div className="flex justify-between mb-9">
                        <span>Cart Subtotal :</span>
                        <span>₹ {cartTotal}</span>
                    </div>
                    <div className="flex justify-between mb-9">
                        <span>platform fees :</span>
                        <span>₹ {platformFees}</span>
                    </div>
                    <div className="flex justify-between mb-9">
                        <span>Delivery :</span>
                        <span>₹ {deliveryCharges}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-3 mb-6 mt-3 text-gray-700">
                        <span className="font-semibold">Total:</span>
                        <span className="font-semibold">₹ {finalTotal}</span>
                    </div>
                    <div className='flex justify-end mt-10'>
                        <button className='uppercase w-fit py-3 px-9 font-bold text-sm bg-green-600 text-white hover:bg-red-600' onClick={handleCheckout} >Checkout</button>
                    </div>
                </div>}

            </div>

            {
                (checkout && data.length !== 0)
                &&
                <div className='overflow-x-auto p-9 bg-[#f4f1ea] animate-fade-in'>
                    {/* Heading */}
                    <p className='uppercase font-bold text-2xl md:text-4xl my-14 w-full md:w-3/4 mx-auto flex gap-1'>Checkout<BiShoppingBag className='inline' /></p>

                    <div className='flex flex-col md:flex-row gap-10 p-6 py-10 md:py-16 w-full md:w-3/4 mx-auto border rounded-md bg-zinc-50'>
                        <div className='flex flex-col gap-5 w-full md:w-1/2 p-2 rounded-md'>

                            <div className='font-medium text-sm md:text-md text-zinc-700'>CONTACT INFORMATION</div>
                            <input type="tel" name="number" id="number" placeholder='PHONE NUMBER' className='w-full p-2 md:p-3 text-sm md:text-md text-gray-700 bg-white border border-gray-300 rounded' pattern="[7-9]{1}[0-9]{9}" minlength="10" maxlength="10" onChange={(e) => setphoneNumber(e.target.value)} value={phoneNumber} required />
                            {phoneNumberError && <div className="text-red-500 text-xs mt-1">{phoneNumberError}</div>}

                            <hr className='border-t border-gray-300 my-5' />

                            <div className='font-medium text-sm md:text-md text-zinc-700'>SHIPPING INFORMATION</div>
                            <input type="text" name="name" id="name" placeholder='FULL NAME' className='w-full p-2 md:p-3 text-sm md:text-md text-gray-700 bg-white border border-gray-300 rounded' onChange={(e) => { setname(e.target.value) }} value={name} required />
                            {nameError && <div className="text-red-500 text-xs mt-1">{nameError}</div>}

                            <input type="text" name="address" id="address" placeholder='DELIVERY ADDRESS' className='w-full p-2 md:p-3 text-sm md:text-md text-gray-700 bg-white border border-gray-300 rounded' onChange={(e) => { setaddress(e.target.value) }} value={address} required />
                            {addressError && <div className="text-red-500 text-xs mt-1">{addressError}</div>}

                            <hr className='border-t border-gray-300 my-5' />

                            <div className='font-medium text-sm md:text-md text-zinc-700'>Payment Method</div>

                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    defaultChecked
                                    name="paymentMethod"
                                    value="card"
                                    onChange={(e) => { setpaymentMethod(e.target.value) }}
                                    className="form-radio h-4 w-4 accent-green-700"
                                />
                                <span className="ml-2 text-sm font-base text-zinc-500">Pay with Card</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash"
                                    onChange={(e) => { setpaymentMethod(e.target.value) }}
                                    className="form-radio h-4 w-4 accent-green-700"
                                />
                                <span className="ml-2 text-sm font-base text-zinc-500">Cash on Delivery</span>
                            </label>

                        </div>

                        <div className='flex flex-col gap-2 w-full md:w-1/2 p-4 md:p-8 rounded-md bg-white shadow-md'>
                            <div className='font-medium text-zinc-900 mb-4'>Order Summary</div>
                            {data.map((item) => (
                                <div key={item._id} className='border-b pb-2 md:pb-3 my-1'>
                                    <div className='flex flex-row relative'>
                                        <BiX className='font-bold text-xl cursor-pointer absolute right-0 top-0' onClick={() => { removeCartItem(item.menuId) }} />
                                        <div className='w-24 h-24 sm:w-24 md:h-24'>
                                            <img className='object-cover w-full h-full' src={item.image} alt="" />
                                        </div>
                                        <div className='w-fit mx-3 sm:mx-10 p-1 flex flex-col justify-between'>
                                            <div>
                                                <div className='font-semibold text-md text-zinc-800'>{item.name}</div>
                                                <div className='font-medium text-sm text-zinc-800'>₹ {item.price}</div>
                                            </div>
                                            <div className="flex items-center text-sm bg-slate-100 w-fit rounded-md gap-2">
                                                <button className={`px-2 py-1 font-semibold bg-gray-200 text-gray-600 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300 ${item.quantity === 1 && 'opacity-50 cursor-not-allowed'}`} onClick={() => { handleDecrement(item.menuId) }}>-</button>
                                                <div className=' text-gray-700 font-semibold'>
                                                    {item.quantity}
                                                </div>
                                                <button className="px-2 py-1 font-semibold bg-gray-200 text-gray-600 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300" onClick={() => { handleIncrement(item.menuId) }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {data.length !== 0 && (
                                <>
                                    <div className="flex justify-between mb-2 mt-5 text-zinc-700 text-sm md:text-md">
                                        <span>Cart Subtotal :</span>
                                        <span className='font-medium'>₹ {cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between mb-2 text-zinc-700 text-sm md:text-md">
                                        <span>platform fees :</span>
                                        <span className='font-medium'>₹ {platformFees}</span>
                                    </div>
                                    <div className="flex justify-between mb-2 text-zinc-700 text-sm md:text-md">
                                        <span>Delivery :</span>
                                        <span className='font-medium'>₹ {deliveryCharges}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-b border-gray-300 py-3 mb-6 mt-3 text-gray-700 text-md">
                                        <span className="font-semibold">Total:</span>
                                        <span className="font-semibold">₹ {finalTotal}</span>
                                    </div>
                                    <button className='uppercase w-full py-3 px-9 font-bold text-sm bg-green-600 text-white hover:bg-red-600' onClick={() => { handleFormSubmit() }} >Order Now</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            }

        </>
    )
}

export default Cart;