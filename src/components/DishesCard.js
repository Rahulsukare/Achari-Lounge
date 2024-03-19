import React from 'react'
import { Link } from 'react-router-dom'
// import burgerImg from '../Assets/burger.png'

const DishesCard = (props) => {
    return (
        <Link to={`/item/${props.name}`} className="lg:w-1/4 md:w-1/2 p-4 w-full transition-all duration-300 ease-in-out transform hover:bg-amber-400 hover:scale-105 rounded-lg">
            <div className="block relative h-48 rounded overflow-hidden">
                <img loading='lazy' alt="ecommerce" className="object-cover object-center w-full h-full block" src={props.img}></img>
            </div>
            <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{props.category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{props.name}</h2>
                <p className="mt-1 text-red-600">Rs. {props.price}</p>
            </div>
        </Link>
    )
}

export default DishesCard