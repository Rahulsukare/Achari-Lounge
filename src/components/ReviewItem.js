import person from '../Assets/person.jpg'
import Stars from './Stars'

const ReviewItem = () => {
    return (
        <>
            <div className='flex md:flex-nowrap flex-wrap md:items-center items-start uppercase my-6'>

                <div className=' w-28 h-28 overflow-hidden md:mr-6 md:mb-0 mb-3 flex items-center justify-center'>
                    <img src={person} alt="profileImg" />
                </div>

                <div className='md:w-3/4 w-full px-8 py-6 border-l-8 border-l-green-600'>{/*Box */}
                    <div className='flex justify-between items-center'>
                        <h5 className='font-bold text-lg'>MIKLOS SALSA</h5>
                        <Stars/>
                    </div>
                    <p className=' text-md font-medium text-slate-600 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quia, at dolor autem et nostrum voluptas doloribus? Magni ab voluptatem quos alias sunt debitis porro.</p>
                </div>

            </div>
        </>
    )
}

export default ReviewItem
