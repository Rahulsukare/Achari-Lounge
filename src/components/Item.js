import { BiCart, BiSolidStar, BiSolidStarHalf } from 'react-icons/bi'
import burgerImg from '../Assets/burger.png'

import ReviewItem from './ReviewItem'

const Item = () => {
  return (
    <>
      {/* Item starts here*/}
      <div className="flex flex-wrap mt-9 p-9 md:flex-nowrap">

        {/* Image div starts */}
        <div className=" md:w-5/12 md:min-h-96 w-full overflow-hidden">
          <img alt="ecommerce" className="mx-auto max-w-full max-h-full" src={burgerImg}></img>
        </div>
        {/* Image div Ends here */}

        {/* Main div starts */}
        <div className="mt-20 md:ml-20 md:mt-0">
          <div className=' text-amber-500 flex mb-2'>
            <BiSolidStar />
            <BiSolidStar />
            <BiSolidStar />
            <BiSolidStar />
            <BiSolidStarHalf />
          </div>
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
      <div className="mt-9 p-9">
        {/* Tabs */}
        <ul id='tabs' className='flex flex-wrap gap-5 mb-16'>
          <li className='uppercase bg-amber-500 py-3 px-7 font-bold min-w-fit rounded-full'>reviews (5)</li>
          <li className='uppercase bg-amber-500 py-3 px-7 font-bold min-w-fit rounded-full'>Description</li>
        </ul>

        {/* Review item start*/}
        <ReviewItem/>
        <ReviewItem/>
        <ReviewItem/>
        <ReviewItem/>
        <ReviewItem/>
        <ReviewItem/>
        {/* Review item ends here*/}
        
      </div>
      {/* Bottom Reviews container ends */}

      {/* Review Form starts */}
      <div>
        <h4>ADD A REVIEW</h4>
        <p>RATE THIS PRODUCT?</p>
      </div>
      {/* Review Form End */}

    </>
  )
}

export default Item
