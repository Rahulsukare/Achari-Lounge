import React from 'react'
import DishesCard from './DishesCard'
const Dishes = () => {
  return (
      <>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap -m-4">

              <DishesCard  title="Tasty Dish" price="Rs. 239" />
              <DishesCard  title="Tasty Dish" price="Rs. 139" />
              <DishesCard  title="Tasty Dish" price="Rs. 59" />
              <DishesCard  title="Tasty Dish" price="Rs. 99" />
              <DishesCard  title="Tasty Dish" price="Rs. 129" />
              <DishesCard  title="Tasty Dish" price="Rs. 111" />
              <DishesCard  title="Tasty Dish" price="Rs. 129" />
              <DishesCard  title="Tasty Dish" price="Rs. 239" />

            </div>
          </div>
        </section>
      </>
  )
}

export default Dishes
