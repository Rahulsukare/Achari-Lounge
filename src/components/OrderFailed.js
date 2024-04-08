import { BiSolidXCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';

const OrderFailed = () => {
    return (
        <div>

            <div className="bg-red-700 h-screen flex flex-col justify-center items-center p-6 shadow-md">
                <div className=" md:w-3/5 animate-popup">
                    <BiSolidXCircle size={100} className="text-white mx-auto mb-5 animate-order" />
                    <h2 className="text-zinc-50 text-sm md:text-md font-bold mb-1 text-center">Order Failed</h2>
                    <p className="text-zinc-50 text-center text-[0.6rem] md:text-[0.8rem]">We apologize, but there was an issue processing your order</p>
                    <p className="text-zinc-50 text-center text-[0.6rem] md:text-[0.8rem]">Please try again later or contact support for assistance.</p>
                </div>
                <Link to={'/menu'}>
                    <button className='uppercase font-bold w-fit mt-10 py-3 px-9 text-[0.7rem] md:text-sm text-zinc-50 border' >Continue Shopping &nbsp; &rarr; </button>
                </Link>
            </div >

        </div >
    )
}

export default OrderFailed
