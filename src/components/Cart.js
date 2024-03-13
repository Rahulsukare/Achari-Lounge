import React from 'react';
import { BiCart,  BiX,  BiXCircle } from 'react-icons/bi';

const Cart = () => {
    const data = [{
        img: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/s1.png',
        price: 20,
        subtotal: 200
    },
    {
        img: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/s1.png',
        price: 45,
        subtotal: 500
    }
    ]
    return (
        <>
            <div className="overflow-x-auto mx-auto">

                <h1 className=' uppercase font-bold text-6xl mx-auto my-14 w-3/4'>SHOPPING CART <BiCart className='inline'/></h1>

                <div className=" overflow-x-auto mx-auto my-14 w-3/4 p-6 shadow-lg">
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
                            {data.map((item, index) => (
                                <tr key={index} className="text-center sm:text-left">
                                    <td className="px-4 py-2 flex items-center justify-center"><img src={item.img} alt="productImg" className="w-20 sm:w-30" /></td>
                                    <td className="px-4 py-2">{item.price}</td>
                                    <td className="px-4 py-2">2</td>
                                    <td className="px-4 py-2">{item.subtotal}</td>
                                    <td className="px-4 py-2">
                                        <BiX className=' font-bold text-xl cursor-pointer'/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='flex'>
                        <button className='uppercase font-bold w-fit py-3 px-9 text-sm bg-green-600 text-white hover:bg-red-600' >View More &nbsp; &rarr; </button>
                    </div>

                </div>
                
                {/* Cart Total */}
                <div className="mx-auto my-14 w-3/4 p-6 shadow-lg uppercase">
                    <h2 className="text-xl font-semibold mb-12">Cart Total</h2>
                    <div className="flex justify-between mb-9">
                        <span>Subtotal :</span>
                        <span>$250</span>
                    </div>
                    <div className="flex justify-between mb-9">
                        <span>Shipping :</span>
                        <span>$10</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-2 mb-6 mt-3 text-gray-700">
                        <span className="font-semibold">Total:</span>
                        <span className="font-semibold">$260</span>
                    </div>
                    <button className='uppercase w-fit py-3 px-9 font-bold text-sm bg-green-600 text-white hover:bg-red-600' >Order Now</button>
                </div>

            </div>
        </>
    )
}

export default Cart;