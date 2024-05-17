import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import Loading from './Loading';
import pendingNotFound from '../Assets/orders.png'
import orderConfirmNotFound from '../Assets/confirm-order.png'
import ofdNotFound from '../Assets/out-for-delivery.png'
import deliveredNotFound from '../Assets/delivered-box.png'
import truckIcon from '../Assets/delivery.png'

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
        else if (ordersStatus === 'confirmed') {
          URL = `${process.env.REACT_APP_HOST_URL}/auth/getConfirmedOrders`
        }
        else if (ordersStatus === 'out for delivery') {
          URL = `${process.env.REACT_APP_HOST_URL}/auth/getOutForDeliveryOrders`
        }
        else if (ordersStatus === 'delivered') {
          URL = `${process.env.REACT_APP_HOST_URL}/auth/getDeliveredOrders`
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
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrders();

  }, [ordersStatus])

  return (
    <>

      <div className='min-h-screen md:w-9/12 mx-9 mt-10 md:mx-auto md:mt-16 animate-fade-in'>


        {/* Heading */}
        <div className='uppercase flex gap-2 items-center mb-10 font-bold text-2xl sm:text-3xl md:text-4xl'>Your <span className='inline text-red-600'>ORDERS</span><img src={truckIcon} alt="" className='w-7 sm:w-8 md:w-10' /></div>

        {/* Subheading + Selection btn */}
        <div className='border p-4 bg-zinc-50 mb-10'>

          <div className='flex justify-between items-center flex-wrap'>
            <div className='font-semibold text-md md:text-md lg:text-lg flex items-center gap-2 mr-7'>
              <span className="relative flex h-3 w-3">

                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${ordersStatus === 'pending' ? 'bg-red-400' : ordersStatus === 'delivered' ? 'bg-green-400' : 'bg-yellow-400'} ${ordersStatus === 'confirmed' && 'bg-orange-400'} opacity-75`}></span>

                <span className={`relative inline-flex rounded-full h-3 w-3 ${ordersStatus === 'pending' ? 'bg-red-500' : ordersStatus === 'delivered' ? 'bg-green-500' : 'bg-yellow-500'} ${ordersStatus === 'confirmed' && 'bg-orange-500'}`}></span>

              </span>
              {ordersStatus}
            </div>

            <select className='w-28 md:w-32 lg:w-fit text-zinc-500 font-medium border p-2 cursor-pointer text-sm md:text-md lg:text-lg' name="ordersStatus" id="ordersStatus" onChange={(e) => { setOrdersStatus(e.target.value) }}>
              <option className=' cursor-pointer font-medium' value="pending">Pending</option>
              <option className=' cursor-pointer font-medium' value="confirmed">Confirmed</option>
              <option className=' cursor-pointer font-medium' value="out for delivery">Out for Delivery</option>
              <option className=' cursor-pointer font-medium' value="delivered">Delivered</option>
            </select>

          </div>

        </div>
        {/* Subheading + Selection btn ends here */}

        {/* Main orders */}
        {((orders === null) || (orders === undefined) || (orders.length === 0)) ? (<div className={`mt-20`}>
          {ordersStatus === 'pending' && <img src={pendingNotFound} alt="Items Not Found" className='w-20 mx-auto' />}
          {ordersStatus === 'confirmed' && <img src={orderConfirmNotFound} alt="Items Not Found" className='w-20 mx-auto' />}
          {ordersStatus === 'out for delivery' && <img src={ofdNotFound} alt="Items Not Found" className='w-20 mx-auto' />}
          {ordersStatus === 'delivered' && <img src={deliveredNotFound} alt="Items Not Found" className='w-20 mx-auto' />}
          <div className='font-bold  text-md md:text-lg text-zinc-600 w-fit my-2 mx-auto'>No {ordersStatus} Orders</div>
        </div>) : (
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
