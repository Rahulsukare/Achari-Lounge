import { BiSolidStar, BiSolidStarHalf } from 'react-icons/bi'
import person from '../Assets/person.jpg'

const ReviewItem = () => {
    return (
        <>
            <div className='flex md:flex-nowrap flex-wrap md:items-center items-start uppercase my-6'>

                <div className=' w-28 h-28 overflow-hidden md:mr-6 md:mb-0 mb-3 flex items-center justify-center'>
                    <img src={person} alt="profileImg" />
                </div>

                <div className='md:w-3/4 w-full px-4 py-6 border border-slate-300'>{/*Box */}
                    <div className='flex justify-between items-center'>
                        <h5 className='font-bold text-lg'>MIKLOS SALSA</h5>
                        <div className=' text-amber-500 flex mb-2 items-center'>
                            <BiSolidStar />
                            <BiSolidStar />
                            <BiSolidStar />
                            <BiSolidStar />
                            <BiSolidStarHalf />
                        </div>
                    </div>
                    <p className=' text-md font-light mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quia, at dolor autem et nostrum voluptas doloribus? Magni ab voluptatem quos alias sunt debitis porro.</p>
                </div>

            </div>
        </>
    )
}

export default ReviewItem
