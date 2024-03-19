import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import burgerImg from '../Assets/burger.png';
import ReviewItem from './ReviewItem';
import Stars from './Stars';

import { BiCart } from 'react-icons/bi';

const Item = () => {
  const { name } = useParams();
  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {

    const fetchMenuItem = async () => {
      try {
        const data = await fetch(`http://localhost:8001/menu/getMenuItem/${name}`);
        if (!data.ok) {
          throw new Error('Failed to fetch menu item');
        }
        const item = await data.json();
        setMenuItem(item); // Update state with fetched menu item
        console.log(item)
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenuItem();
  }, [name]); // Fetch menu item whenever the name parameter changes


  const addToCart = (id) => {

    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:8001/auth/addCart/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`
        },
      };

      axios.request(config)
        .then(response => {
          console.log("Item Added to cart")
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
            <div className="mt-20 md:ml-20 md:mt-0">
              <Stars />
              <h3 className="uppercase font-bold pb-3 text-3xl">{item.name}</h3>
              <p className="mb-4 text-md font-semibold text-slate-600">{item.description}</p>
              <span className="font-bold text-2xl text-red-600">Rs. {item.price}</span>

              <button className='uppercase w-full mt-3 py-3 text-lg bg-green-600 text-white hover:bg-red-600 rounded-md flex justify-center gap-2' onClick={() => { addToCart(item._id) }} >
                <BiCart size={25} />
                <span>Add to cart</span>
              </button>

              <h6 className='text-sm mt-9'>
                GROUND DELIVERY SURCHARGE :
                <span className=' font-semibold'> Rs. 50</span>
              </h6>
              <h6 className=' uppercase text-sm font-semibold'>
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
