import { BiCart } from 'react-icons/bi'
import burgerImg from '../Assets/burger.png'

import ReviewItem from './ReviewItem'
import Stars from './Stars'

const Item = () => {
  return (
    <>
      {/* Item starts here*/}
      <div className=" bg-white flex flex-wrap pt-14 pb-10 px-9 md:flex-nowrap">

        {/* Image div starts */}
        <div className=" md:w-5/12 md:min-h-96 w-full overflow-hidden">
          <img alt="ecommerce" className="mx-auto max-w-full max-h-full" src={burgerImg}></img>
        </div>
        {/* Image div Ends here */}

        {/* Main div starts */}
        <div className="mt-20 md:ml-20 md:mt-0">
          <Stars />
          <h3 className="uppercase font-bold pb-3 text-2xl">Whopper burger king</h3>
          <p className="mb-4 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sunt a dolorum?</p>
          <span className="font-bold text-2xl text-red-600">Rs. 239</span>

          <button className='uppercase md:w-3/4 w-full mt-3 py-3 text-lg bg-green-600 text-white hover:bg-red-600 rounded-full flex justify-center gap-2' > <BiCart size={25} /><a href="/cart">Add to cart</a></button>

          <h6 className='text-sm mt-9'>
            GROUND DELIVERY SURCHARGE :
            <span className=' font-semibold'> Rs. 50</span>
          </h6>
          <h6 className=' uppercase text-sm font-semibold'>
            Categories : Burger
          </h6>
        </div>
        {/* Main div ends */}

      </div>
      {/* Item ends here */}

      {/* Bottom Reviews container starts */}
      <div className=" bg-white mt-9 p-9">
        {/* Tabs */}
        <ul id='tabs' className='flex flex-wrap gap-5 mb-16'>
          <li className='uppercase bg-amber-500 py-3 px-7 font-bold min-w-fit rounded-md'>reviews (5)</li>
          <li className='uppercase bg-amber-500 py-3 px-7 font-bold min-w-fit rounded-md'>Description</li>
        </ul>

        {/* Review item start*/}
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        {/* Review item ends here*/}

      </div>
      {/* Bottom Reviews container ends */}

      {/* Review Form starts */}
      <div className='bg-white p-9'>
        <h4 className='text-xl font-semibold'>ADD A REVIEW</h4>
        <div className='flex items-center gap-6 w-fit'>
          <p className=' text-base'>RATE THIS PRODUCT?*</p>
          <Stars />
        </div>

        {/* form */}
        <div className='mt-9'>
          <div className='flex gap-5'>
            <input type="text" name="fname" id="fname" placeholder='FULL NAME' className='my-2 w-full md:w-1/2 p-3 text-gray-700 bg-gray-100'/>
            <input type="email" name="email" id="email" placeholder='EMAIL ADDRESS' className='my-2 w-full md:w-1/2 p-3 text-gray-700 bg-gray-100'/>
          </div>
          <textarea name="message" id="message" placeholder='MESSAGE' className='w-full p-3 h-48 my-2 text-gray-700 bg-gray-100'></textarea>
          <button className='uppercase w-fit mt-1 py-3 px-9 text-sm bg-green-600 text-white hover:bg-red-600 rounded-lg flex justify-center gap-2' >submit</button>
        </div>
        {/* form end */}

      </div>
      {/* Review Form End */}
    </>
  )
}

export default Item
