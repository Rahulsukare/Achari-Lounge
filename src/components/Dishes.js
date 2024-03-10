import React from 'react'
import DishesCard from './DishesCard'
const Dishes = () => {
  return (
      <>
        <h1 className="text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10">
            Our Dishes        
        </h1>

        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">

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
