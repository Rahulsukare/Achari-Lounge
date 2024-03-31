import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import burgerImg from '../Assets/burger.png';
import ReviewItem from './ReviewItem';
import Stars from './Stars';

import { BiCart } from 'react-icons/bi';

const Item = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  // const [leftItem, setLeftItem] = useState(0);

  const [numberOfCartItem, setNumberOfCartItem] = useState(1);

  useEffect(() => {

    const fetchMenuItem = async () => {
      try {
        const data = await fetch(`${process.env.REACT_APP_HOST_URL}/menu/getMenuItem/${name}`);
        if (!data.ok) {
          throw new Error('Failed to fetch menu item');
        }
        const item = await data.json();
        setMenuItem(item); // Update state with fetched menu item
        // setLeftItem(item.quantity)
        // console.log(item)
        // console.log(item.quantity)
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


  return (
    <>
      {/* Item starts here*/}

      {menuItem &&
        menuItem.map(item => (
          <div key={item._id} className=" bg-white flex flex-wrap pt-14 pb-10 px-12 md:px-20 lg:px-40 md:flex-nowrap animate-fade-in">
            {/* Image div starts */}
            <div className="w-full h-fit md:w-5/12 md:h-80 overflow-hidden bg-slate-50">
              <img alt="ecommerce" className="mx-auto max-w-full max-h-full" src={item.image}></img>
            </div>
            {/* Image div Ends here */}

            {/* Main div starts */}
            <div className="w-full md:w-1/2 mt-20 md:ml-20 md:mt-0">
              <Stars rating={item.rating} /> {/* Use the Stars component with the rating */}
              <h3 className="uppercase font-bold pb-3 text-3xl tracking-wider">{item.name}</h3>
              <p className="mb-4 text-sm font-semibold text-slate-600">{item.description} </p>
              <div className="mt-20 font-bold text-lg text-red-600">₹ {item.price}</div>

              <div className='flex items-center gap-6'>
                <div className=' font-semibold text-gray-900 text-sm'>Quantity : </div>
                <div className="flex items-center w-fit rounded-md gap-8 border-black border">
                  <button className={`px-5 py-3 font-semibold focus:outline-none rounded-md hover:bg-slate-100 ${numberOfCartItem === 0 && 'opacity-50 cursor-not-allowed'}`} onClick={() => setNumberOfCartItem(Math.max(numberOfCartItem - 1, 0))} disabled={numberOfCartItem === 0}> - </button>
                  <div className=' text-gray-700 font-semibold'>
                    {numberOfCartItem}
                  </div>
                  <button className="px-5 py-3 font-semibold focus:outline-none rounded-md hover:bg-slate-100" onClick={() => { setNumberOfCartItem(numberOfCartItem + 1) }}> + </button>
                </div>
              </div>



              <button
                className={`uppercase w-full md:w-96 mt-3 py-3 text-lg rounded-sm bg-green-600 text-white hover:bg-red-600 flex justify-center gap-2 ${numberOfCartItem === 0 && 'opacity-50 cursor-not-allowed'}`}
                onClick={() => { addToCart(item._id) }}
                disabled={numberOfCartItem === 0}
              >
                <BiCart size={25} />
                <span>Add to cart</span>
              </button>
              <div className='font-medium text-sm text-gray-700 my-2'>Only <strong>"{item.quantity}"</strong> item left Hurry!</div>

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
      <div className=" bg-white mt-9 p-9">
        {/* Tabs */}
        <ul id='tabs' className='flex gap-5 mb-16 overflow-x-auto'>
          <li className='uppercase bg-amber-500 py-3 px-7 font-bold min-w-fit rounded-md cursor-pointer'>reviews (5)</li>
          <li className='uppercase bg-slate-200 py-3 px-7 font-bold min-w-fit rounded-md cursor-pointer'>Description</li>
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
            <input type="text" name="fname" id="fname" placeholder='FULL NAME' className='my-2 w-full md:w-1/2 p-3 text-gray-700 bg-gray-100' />
            <input type="email" name="email" id="email" placeholder='EMAIL ADDRESS' className='my-2 w-full md:w-1/2 p-3 text-gray-700 bg-gray-100' />
          </div>
          <textarea name="message" id="message" placeholder='MESSAGE' className='w-full p-3 h-48 my-2 text-gray-700 bg-gray-100'></textarea>
          <button className='uppercase w-fit mt-1 py-3 px-9 text-sm bg-green-600 text-white hover:bg-red-600 rounded-lg flex justify-center gap-2' >submit</button>
        </div>
        {/* form end */}
      </div>
      {/* Review Form End */}
    </>
  );
};

export default Item;
