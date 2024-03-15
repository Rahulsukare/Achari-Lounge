import React from 'react'
import { Link } from 'react-router-dom'
import burgerImg from '../Assets/burger.png'

const DishesCard = (props) => {
    return (
        <Link to='/item' className="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-amber-400 rounded-lg">
            <div className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={burgerImg}></img>
            </div>
            <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{props.title}</h2>
                <p className="mt-1 text-red-600">{props.price}</p>
            </div>
        </Link>
    )
}

export default DishesCard