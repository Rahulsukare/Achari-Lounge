import React from 'react'
import DishesCard from './DishesCard'

import notFound from '../Assets/not-found.png'

const Dishes = (props) => {
  const data = props.Menu
  const length = data.length
  return (
    <>

      {(length === 0) ?
        (
        <div className={`${props.loading && 'hidden'} mt-20`}>
          <img src={notFound} alt="Items Not Found" className='w-20 mx-auto' />
          <div className='font-bold  text-sm md:text-md text-zinc-600 w-fit my-2 mx-auto'> Sorry! Dishes Not Found</div>
        </div>
        )
        :
        (
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 animate-fade-in'>
            {data.map(item => (
              <DishesCard key={item._id} id={item._id} name={item.name} price={item.price} img={item.image} category={item.category} quantity={item.quantity} rating={item.rating} loading={props.loading} />
            ))}
          </div>
        )
      }

    </>
  )
}

export default Dishes
