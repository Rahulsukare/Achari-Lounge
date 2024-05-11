import Stars from './Stars'
import { BiSolidUserCircle } from "react-icons/bi";

const ReviewItem = (props) => {
    return (
        <>
            <div className='flex md:flex-nowrap flex-wrap md:items-center items-start uppercase my-6'>

                <div className=' w-28 h-28 overflow-hidden md:mr-2 md:mb-0 mb-3 flex items-center justify-center'>
                    <BiSolidUserCircle size={70} className={`text-zinc-400`} />
                </div>

                <div className='md:w-3/4 w-full px-8 py-6 border-2'>{/*Box */}
                    <div className='flex justify-between items-center'>
                        <div>
                            <h5 className='font-bold'>{props.userName}</h5>
                            {/* <h5 className='font-bold'>{props.date}</h5> */}
                        </div>
                        <Stars rating={props.rating} />
                    </div>
                    <p className='text-sm font-medium text-slate-600 mt-3'>{props.review}</p>
                </div>

            </div>
        </>
    )
}

export default ReviewItem
