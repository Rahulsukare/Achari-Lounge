import React from 'react'
import DishesCard from './DishesCard'
const Dishes = (props) => {
  const data = props.Menu
  return (
      <>
        <section className="text-gray-600 body-font animate-fade-in">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap -m-4">

              {data.length === 0 ? (<h3 className='mx-auto'><img className='w-48 h-48' src="https://static.vecteezy.com/system/resources/previews/014/814/221/original/parcel-alert-is-a-flat-conceptual-icon-with-download-facility-vector.jpg" alt="NoItems" /> </h3>) : (data.map(item => (
                        <DishesCard key={item._id} id={item._id}  name={item.name} price={item.price} img={item.image} category={item.category}/>
                ))) }

            </div>
          </div>
        </section>
      </>
  )
}

export default Dishes
