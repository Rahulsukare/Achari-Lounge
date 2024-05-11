import { BiSolidCheckCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div>
            <div className="bg-green-700 h-screen flex flex-col justify-center items-center p-6 shadow-md">
                <div className=" md:w-3/5 animate-popup">
                    <BiSolidCheckCircle size={100} className="text-white mx-auto mb-5 animate-order" />
                    <h2 className="text-zinc-50 text-sm md:text-md font-bold mb-1 text-center">Order Placed Successfully!</h2>
                    <h2 className="text-zinc-50 text-xl md:text-3xl font-bold mb-1 text-center">Thank you for ordering </h2>
                    <p className="text-zinc-50 text-center text-[0.6rem] md:text-[0.8rem]">We have received your order and it is being processed</p>
                </div>
                <div className=" md:w-3/5 mt-10 animate-popup flex justify-center gap-3">
                    <Link to={'/menu'}>
                        <button className='uppercase font-bold w-fit py-3 px-9 text-[0.7rem] md:text-sm text-zinc-50 border'>Continue Shopping &nbsp; &rarr; </button>
                    </Link>
                    <Link to={'/orders'}>
                        <button className='uppercase font-bold w-fit py-3 px-9 text-[0.7rem] md:text-sm bg-amber-400 text-white hover:bg-red-600' >Orders</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess
