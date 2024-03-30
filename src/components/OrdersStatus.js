import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { BiBasket } from "react-icons/bi";

const OrderItem = lazy(() => import('./OrderItem')); // Import the component lazily

const OrdersStatus = () => {
  const [ordersStatus, setOrdersStatus] = useState("pending");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let URL = ""
        if (ordersStatus === 'pending') {
          URL = `${process.env.REACT_APP_HOST_URL}/auth/getPendingOrders`
        }
        if (ordersStatus === 'delivered') {
          URL =  `${process.env.REACT_APP_HOST_URL}/auth/getDeliveredOrders`
        }
        if (ordersStatus === 'out for delivery') {
          setOrders([])
          return
        }
        const config = {
          method: 'get',
          url: URL,
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
          }
        };

        const response = await axios(config);
        setOrders(response.data)
        console.log('orders:-')
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrders();

  }, [ordersStatus])

  // const formatDate = (dateString) => {
  //   // Split the date and time parts
  //   const parts = dateString.split(', ');
  //   const datePart = parts[0]; // Extract the date part

  //   // Parse the date part into a Date object
  //   const [day, month, year] = datePart.split('/').map(Number);
  //   const formattedDate = new Date(year, month - 1, day); // month is 0-based index

  //   // Format the date as 'DD/MM/YYYY'
  //   return formattedDate.toLocaleDateString('en-IN'); // 'en-IN' is the locale for English (India)
  // };


  return (
    <>

      <div className='min-h-screen md:w-9/12 mx-9 mt-10 md:mx-auto md:mt-16 animate-fade-in'>


        {/* Heading */}
        <div className='uppercase flex gap-2 items-center mb-10 font-bold text-2xl md:text-4xl'>Your <span className='inline text-red-600'>ORDERS</span><BiBasket className='inline' /></div>

        {/* Subheading + Selection btn */}
        <div className='border p-4 bg-zinc-50 mb-10'>

          <div className='flex justify-between items-center'>
            <div className='font-semibold text-xl flex items-center gap-2'>
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${ordersStatus === 'pending' ? 'bg-red-400' : ordersStatus === 'delivered' ? 'bg-green-400' : 'bg-yellow-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${ordersStatus === 'pending' ? 'bg-red-500' : ordersStatus === 'delivered' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              </span>
              {ordersStatus}
            </div>
            <select className='text-zinc-500 font-medium border-2 p-2 cursor-pointer' name="ordersStatus" id="ordersStatus" onChange={(e) => { setOrdersStatus(e.target.value) }}>
              <option className=' cursor-pointer font-medium' value="pending">Pending</option>
              <option className=' cursor-pointer font-medium' value="delivered">Delivered</option>
              <option className=' cursor-pointer font-medium' value="out for delivery">Out for Delivery</option>
            </select>
          </div>

        </div>
        {/* Subheading + Selection btn ends here */}

        {/* Main orders */}
        {((orders === null) || (orders === undefined) || (orders.length === 0)) ? (<>No orders found</>) : (
          orders.map((order) => (
            <Suspense fallback={<Loading />} key={order._id}> {/* Wrap the lazy-loaded component with Suspense */}
              <OrderItem order={order} /> {/* Pass necessary props to the lazy-loaded component */}
            </Suspense>
          ))
        )}
        {/* Main orders end here */}

      </div>

    </>
  )
}

export default OrdersStatus
