import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewItem from './ReviewItem';
import Stars from './Stars';

import { BiCart, BiSad } from 'react-icons/bi';

const Item = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [reviews, setReviews] = useState([])
  const [numberOfreviews, setNumberOfreviews] = useState(0)
  const [review, setReview] = useState('')

  const [numberOfCartItem, setNumberOfCartItem] = useState(1);

  useEffect(() => {

    const fetchMenuItem = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_HOST_URL}/menu/getMenuItem/${name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch menu item');
        }

        const responseData = await response.json();

        // Update state with fetched menu items and reviews
        setMenuItem(responseData.menus);
        console.log(responseData.menus);

         // Check if responseData.reviews is an array and if it contains arrays
    if (Array.isArray(responseData.reviews) && responseData.reviews.length > 0 && Array.isArray(responseData.reviews[0])) {
      // Flatten the nested array
      const flattenedReviews = responseData.reviews.flat();
      setReviews(flattenedReviews);
      console.log("REVIEWS ARRAY")
      console.log(flattenedReviews);

      const numberOfReviews = flattenedReviews.length;
      setNumberOfreviews(numberOfReviews);
      console.log(numberOfReviews);
    } else {
      console.error('Reviews data is not in the expected format:', responseData.reviews);
    }

      } catch (error) {
        console.error(error);
      }
    };
    fetchMenuItem();

    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, [name]); // Fetch menu item whenever the name parameter changes


  const addToCart = (id) => {

    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_HOST_URL}/auth/addCart`,
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`
        },
        data: { itemId: id, quantity: numberOfCartItem }
      };

      axios.request(config)
        .then(response => {
          console.log("Item Added to cart")
          navigate(`/item/${name}`)
        })
        .catch(error => {
          // Handle signup error
          if (error.response) {
            console.error('Server responded with an error:', error.response.data);
          } else if (error.request) {
            console.error('No response received from the server:', error.request);
          } else {
            console.error('Error setting up the request:', error.message);
          }
        });
    } catch (error) {

    }

  }

  const handleAddReview = async (e) => {
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_HOST_URL}/menu/review-menu-item`,
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`
        },
        data: { menuItemName: name, review: review }
      };

      const response = axios.request(config)
      if (!response) {
        alert("failed")
        return
      }
      const menuitem = response.json();
      setMenuItem(menuitem)
    } catch (error) {

    }

  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  document.title = `${capitalizeFirstLetter(name)} - FoodRestro`;

  return (
    <>
      {/* Item starts here*/}

      {menuItem &&
        menuItem.map(item => (
          <div key={item._id} className={`flex flex-wrap md:mt-10 pt-14 pb-10 px-12 md:px-20 lg:px-40 md:flex-nowrap animate-fade-in`}>
            {/* Image div starts */}
            <div className="w-full h-fit md:w-5/12 md:h-80 overflow-hidden bg-slate-50">
              <img alt="ecommerce" className="mx-auto max-w-full max-h-full" src={item.image}></img>
            </div>
            {/* Image div Ends here */}

            {/* Main div starts */}
            <div className="w-full md:w-1/2 mt-20 md:ml-20 md:mt-0">
              <div className='flex items-center gap-2'>

              <Stars rating={item.rating} /><div className='mt-1 inline text-[0.7rem] text-zinc-800 font-semibold'>({numberOfreviews} REVIEWS)</div> {/* Use the Stars component with the rating */}
              </div>
              <h3 className="uppercase font-bold pb-3 text-3xl tracking-wider">{item.name}</h3>
              <p className="mb-4 text-sm font-semibold text-slate-600">{item.description} </p>
              <div className="mt-20 font-bold text-lg text-red-600">₹ {item.price}</div>

              {item.quantity === 0 ?
                <></>
                :
                <div className='flex items-center gap-6'>
                  <div className=' font-semibold text-gray-900 text-sm'>Quantity : </div>
                  <div className="flex items-center w-fit rounded-md gap-8 border-black border">
                    <button className={`px-5 py-3 font-semibold focus:outline-none rounded-md hover:bg-slate-100 ${numberOfCartItem === 0 && 'opacity-50 cursor-not-allowed'}`} onClick={() => setNumberOfCartItem(Math.max(numberOfCartItem - 1, 0))} disabled={numberOfCartItem === 0}> - </button>
                    <div className=' text-gray-700 font-semibold'>
                      {numberOfCartItem}
                    </div>
                    <button className={`px-5 py-3 font-semibold focus:outline-none rounded-md hover:bg-slate-100 ${numberOfCartItem >= item.quantity && 'opacity-50 cursor-not-allowed'}`} onClick={() => { setNumberOfCartItem(numberOfCartItem + 1) }} disabled={numberOfCartItem >= item.quantity}> + </button>
                  </div>
                </div>
              }



              <button
                className={`uppercase w-full md:w-96 mt-3 py-3 text-lg rounded-sm text-white  flex justify-center gap-2 ${item.quantity === 0 ? 'cursor-not-allowed bg-red-400' : 'bg-green-600 hover:bg-red-600'} ${numberOfCartItem === 0 && 'cursor-not-allowed bg-red-400'}`}
                onClick={() => { addToCart(item._id) }}
                disabled={numberOfCartItem === 0 || item.quantity === 0}
              >
                {item.quantity === 0 ? <><span>OUT OF STOCK</span><BiSad size={25} /></> : <><BiCart size={25} />
                  <span>Add to cart</span></>}
              </button>

              {item.quantity === 0 ?
                <div className='font-medium text-sm text-red-600 my-2' >"Sorry No Item Left"</div> :
                <div className='font-medium text-sm text-gray-700 my-2'>Only <strong>"{item.quantity}"</strong> item left Hurry!</div>}

              <h6 className='text-sm mt-9 text-zinc-900'>
                GROUND DELIVERY SURCHARGE :
                <span className=' font-semibold'> Rs. 50</span>
              </h6>
              <h6 className='text-sm text-zinc-900'>
                <span className=' font-semibold'>FREE DELIVERY </span>
                ON ORDER OVER Rs. 500
              </h6>
              <h6 className=' uppercase text-sm font-semibold text-zinc-900'>
                Categories : {item.category}
              </h6>
            </div>
            {/* Main div ends */}
          </div >

        ))
      }

      {/* Item ends here */}

      {/* Bottom Reviews container starts */}
      <div className="  mt-9 px-12 md:px-20 lg:px-40">
        {/* Tabs */}
        <ul id='tabs' className='flex gap-5 mb-16 overflow-x-auto'>
          <li className='uppercase bg-amber-500 py-3 px-7 font-bold min-w-fit rounded-md cursor-pointer'>reviews ({numberOfreviews})</li>
          <li className='uppercase bg-slate-200 py-3 px-7 font-bold min-w-fit rounded-md cursor-pointer'>Description</li>
        </ul>

        {/* Review item start*/}
        {numberOfreviews === 0 ? <div className='pl-10 text-sm font-semibold text-zinc-500 flex items-center gap-1'>NO REVIEWS YET <BiSad className='inline' size={15} /></div> :
          reviews.map((review) => (
            <ReviewItem key={review._id} userName={review.user.name} rating={review.rating} review={review.review} />
          ))}
        {/* Review item ends here*/}
      </div>
      {/* Bottom Reviews container ends */}


      {/* Rating starts */}
      <div className='font-semibold mt-20 px-12 md:px-20 lg:px-40'>RATE THIS PRODUCT</div>
      <div className="rating px-12 md:px-20 lg:px-40">
        <input value="5" name="rating" id="star5" type="radio" />
        <label htmlFor="star5"></label>
        <input value="4" name="rating" id="star4" type="radio" />
        <label htmlFor="star4"></label>
        <input value="3" name="rating" id="star3" type="radio" />
        <label htmlFor="star3"></label>
        <input value="2" name="rating" id="star2" type="radio" />
        <label htmlFor="star2"></label>
        <input value="1" name="rating" id="star1" type="radio" />
        <label htmlFor="star1"></label>
      </div>
      {/* Rating ends */}


      {/* Review Form starts */}
      <div className='my-10 px-12 md:px-20 lg:px-40'>
        <h4 className='font-semibold'>ADD A REVIEW</h4>
        {/* form */}
        <div className='mt-3'>
          <form onSubmit={handleAddReview}>
            <textarea name="message" id="message" placeholder='WRITE REVIEW HERE...' className='w-full p-3 h-48 my-2 text-gray-700 bg-gray-100' onChange={(e) => { setReview(e.target.value) }} ></textarea>
            <button type="submit" className='uppercase w-fit mt-1 py-3 px-9 text-sm bg-green-600 text-white hover:bg-red-600 rounded-md flex justify-center gap-2' >submit</button>
          </form>
        </div>
        {/* form end */}
      </div>
      {/* Review Form End */}
    </>
  );
};

export default Item;
