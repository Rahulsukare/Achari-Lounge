import React from 'react'
import DishesCard from './DishesCard'
const Dishes = (props) => {
  const data = props.Menu
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 animate-fade-in">

        {(!data) ? (<><div><img className='w-48 h-48 mx-auto' src="https://static.vecteezy.com/system/resources/previews/014/814/221/original/parcel-alert-is-a-flat-conceptual-icon-with-download-facility-vector.jpg" alt="NoItems" /> </div></>) : (data.map(item => (
          <DishesCard key={item._id} id={item._id} name={item.name} price={item.price} img={item.image} category={item.category} quantity={item.quantity} rating={item.rating} />
        )))}

      </div>
    </>
  )
}

export default Dishes
