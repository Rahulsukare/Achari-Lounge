import React from 'react'
import { Link } from 'react-router-dom';

const OrderItem = (props) => {

  const formatDate = (dateString) => {
    // Split the date and time parts
    const parts = dateString.split(', ');
    const datePart = parts[0]; // Extract the date part

    // Parse the date part into a Date object
    const [day, month, year] = datePart.split('/').map(Number);
    const formattedDate = new Date(year, month - 1, day); // month is 0-based index

    // Format the date as 'DD/MM/YYYY'
    return formattedDate.toLocaleDateString('en-IN'); // 'en-IN' is the locale for English (India)
  };

  return (
    <div key={props.order._id} className='my-5 shadow-lg'>

      <div className='flex flex-col sm:flex-row items-center justify-between p-5 border-b mb-5'>
        <div className='text-sm mb-2 sm:mb-0'>
          <span className='font-semibold text-zinc-800'>#ORDERID :</span> {props.order._id}
        </div>
        <div className='flex flex-col sm:flex-row mt-2 sm:mt-0'>
          <div className='text-sm mb-2 sm:mr-5 sm:mb-0'>
            <span className='font-semibold text-zinc-800'>DATE : </span> {formatDate(props.order.orderDate)}
          </div>
          <div className='text-sm'>
            <span className='font-semibold text-zinc-800'>TOTAL AMOUNT : </span> RS. {props.order.totalPayable}
          </div>
        </div>
        <div className='text-sm mt-2 sm:mt-0'>
          <span className='font-semibold text-zinc-800'>Payment Method : </span>{props.order.paymentMethod}
        </div>
      </div>


      {props.order.items.map((item) => (
        <div key={item._id}>

          <div className='p-4 border-b'>
            <div className='flex flex-row items-center'>

              <div className='w-26 h-26 sm:w-40 md:h-40'>
                <img className='object-cover w-full h-full' src={item.menuItem.image} alt="" />
              </div>

              <div className='w-full sm:w-4/5 mx-3 mt-4 sm:mx-10 sm:mt-0'>
                <div className='font-semibold text-md'>{item.menuItem.name}</div>
                <div className='font-medium text-sm mt-1'>₹ {item.menuItem.price}</div>
                <Link to={`/item/${item.menuItem.name}`}>
                  <button className='uppercase mt-4 sm:mt-7 font-semibold py-2 px-6 text-sm bg-green-600 text-white hover:bg-red-600 text-nowrap'>View Item &nbsp; &rarr;</button>
                </Link>
              </div>

            </div>

            <div className='font-medium text-sm mt-5 flex justify-between bg-zinc-50 p-2 border'>
              <div>
                {props.order.isPaid ? (<div className='inline mr-5 text-green-600'>PAID</div>) : (<div className='inline mr-5 text-red-600'>UNPAID</div>)} <div className='inline text-zinc-400'>QT: {item.quantity}</div>
              </div>
              <div className='mr-5 text-zinc-800 font-medium'>
                SUBTOTAL : ₹{item.subtotal}
              </div>
            </div>

          </div>

        </div>


      ))}

    </div>
  )
}

export default OrderItem
