import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewItem from './ReviewItem';
import Stars from './Stars';

import { BiBasket, BiCheckCircle, BiSad } from 'react-icons/bi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [menuItem, setMenuItem] = useState([]);
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

          // Calculate numberOfreviews for reviews with non-empty strings
          const numberOfReviews = flattenedReviews.filter(review => review.review && review.review.trim() !== "").length;
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

        // Calculate numberOfreviews for reviews with non-empty strings
        const numberOfReviews = flattenedReviews.filter(review => review.review && review.review.trim() !== "").length;
        setNumberOfreviews(numberOfReviews);
        console.log(numberOfReviews);

      } else {
        console.error('Reviews data is not in the expected format:', responseData.reviews);
      }
      window.scrollTo(0, 0)
    } catch (error) {
      window.scrollTo(0, 0)
      console.error(error);
    }
  };

  const addToCart = async (id) => {

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

      await axios.request(config)
        .then(response => {
          console.log("Item Added to cart")
          navigate(`/item/${name}`)
          toast.success(`Added to Cart`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            icon: () => <BiCheckCircle size={18} className='text-green-700 font-semibold' />
          });

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
          toast.error(`Failed to add`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            icon: () => <BiCheckCircle size={18} className='text-red-700 font-semibold' />
          });
        });
    } catch (error) {

    }

  }

  const handleAddReview = async (e) => {
    try {
      e.preventDefault();
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
      const response = await axios.request(config)
      setMenuItem(response.data.newMenu)
      setReview('')
      toast.success(`Review Added`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: () => <BiCheckCircle size={18} className='text-green-700 font-semibold' />
      });
      fetchMenuItem();
    } catch (error) {
      toast.error(`Failed to Add Review`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: () => <BiCheckCircle size={18} className='text-red-700 font-semibold' />
      });

    }

  }

  const handleRating = async (rating) => {
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_HOST_URL}/menu/rate-menu-item`,
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`
        },
        data: { menuItemName: name, rating: rating }
      };
      const response = await axios.request(config)
      setMenuItem(response.data.newMenu)
      toast.success(`Thanks For Rating`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: () => <BiCheckCircle size={18} className='text-green-700 font-semibold' />
      });
      fetchMenuItem();
    } catch (error) {
      toast.error(`Failed to Rate Item`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: () => <BiCheckCircle size={18} className='text-red-700 font-semibold' />
      });
    }
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  document.title = `${capitalizeFirstLetter(name)} - FoodRestro`;

  return (
    <>
      {/* Item starts here*/}

      <ToastContainer position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" className='text-[0.7rem] md:text-[0.78rem] lg:text-[0.85rem] text-green-700 font-semibold' />

      {menuItem &&
        Array.isArray(menuItem) &&
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
                className={`uppercase w-fit px-16 md:w-96 mt-3 py-3 text-lg rounded-sm flex justify-center gap-2 ${item.quantity === 0 ? 'cursor-not-allowed bg-red-400' : 'bg-[#00813D]'} ${numberOfCartItem === 0 && 'cursor-not-allowed bg-red-400'} overflow-hidden relative group`}
                onClick={() => { addToCart(item._id) }}
                disabled={numberOfCartItem === 0 || item.quantity === 0}
              >
                {item.quantity === 0 ? <><span className='text-white'>OUT OF STOCK</span><BiSad className='text-white' size={25} /></> :
                  <>
                    <span className="relative z-10 text-white duration-500 flex items-center justify-center gap-2 ">Add to Cart <BiBasket size={20} className='inline' /> </span>
                    <span className={`absolute w-full h-full bg-[#D12525] -left-80 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500 ${numberOfCartItem === 0 && 'hidden'}`}></span>
                    <span className={`absolute w-full h-full bg-[#D12525] -right-80 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500 ${numberOfCartItem === 0 && 'hidden'}`}></span>
                  </> 
                }
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

      {menuItem &&
        <>
          {/* Bottom Reviews container starts */}
          <div className="  mt-9 px-12 md:px-20 lg:px-40">
            {/* Tabs */}
            <ul id='tabs' className='flex gap-5 mb-16 overflow-x-auto'>
              <li className='uppercase bg-amber-500 py-3 px-7 font-bold min-w-fit rounded-md cursor-pointer'>reviews ({numberOfreviews})</li>
              <li className='uppercase bg-slate-200 py-3 px-7 font-bold min-w-fit rounded-md cursor-pointer'>Description</li>
            </ul>

            {/* Review item start*/}
            {numberOfreviews === 0 ? <div className='pl-10 text-sm font-semibold text-zinc-500 flex items-center gap-1'>NO REVIEWS YET <BiSad className='inline' size={15} /></div> :
              (
                reviews
                  .filter(review => review.review && review.review.trim() !== "") // Add check for undefined review
                  .map(review => (
                    <ReviewItem
                      key={review._id}
                      userName={review.user.name}
                      date={review.createdAt}
                      rating={review.rating}
                      review={review.review}
                    />
                  ))
              )
            }
            {/* Review item ends here*/}
          </div>
          {/* Bottom Reviews container ends */}

          {/* Rating starts */}
          <div className='font-semibold mt-20 px-12 md:px-20 lg:px-40'>RATE THIS PRODUCT</div>
          <div className="rating px-12 md:px-20 lg:px-40">
            <input value="5" name="rating" id="star5" type="radio" onClick={(e) => { handleRating(e.target.value) }} />
            <label htmlFor="star5"></label>
            <input value="4" name="rating" id="star4" type="radio" onClick={(e) => { handleRating(e.target.value) }} />
            <label htmlFor="star4"></label>
            <input value="3" name="rating" id="star3" type="radio" onClick={(e) => { handleRating(e.target.value) }} />
            <label htmlFor="star3"></label>
            <input value="2" name="rating" id="star2" type="radio" onClick={(e) => { handleRating(e.target.value) }} />
            <label htmlFor="star2"></label>
            <input value="1" name="rating" id="star1" type="radio" onClick={(e) => { handleRating(e.target.value) }} />
            <label htmlFor="star1"></label>
          </div>
          {/* Rating ends */}

          {/* Review Form starts */}
          <div className='my-10 px-12 md:px-20 lg:px-40'>
            <h4 className='font-semibold'>ADD A REVIEW</h4>
            {/* form */}
            <div className='mt-3'>
              <form onSubmit={handleAddReview}>
                <textarea value={review} name="message" id="message" placeholder='WRITE REVIEW HERE...' className='w-full p-3 h-48 my-2 text-gray-700 bg-gray-100' onChange={(e) => { setReview(e.target.value) }} ></textarea>
                <button type="submit" className='uppercase w-fit mt-1 py-3 px-9 text-sm bg-green-600 text-white hover:bg-red-600 rounded-md flex justify-center gap-2' >submit</button>
              </form>
            </div>
            {/* form end */}
          </div>
          {/* Review Form End */}
        </>}
    </>
  );
};

export default Item;
