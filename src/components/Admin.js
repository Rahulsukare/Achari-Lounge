import { Link } from 'react-router-dom'
// import React, {Routes, Route} from 'react'
const Admin = () => {
    return (
        <div className='flex gap-2 justify-between mx-auto'>
            <button className='my-3 px-6 py-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all rounded-full'>
                <Link to='/profile'>
                    Profile
                </Link>
            </button>
            <button className='my-3 px-6 py-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all rounded-full'>
                <Link to='/categories'>
                    Categories
                </Link>
            </button>
            <button className='my-3 px-6 py-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all rounded-full'>
                <Link to='/manage-menu'>
                    Menu Items
                </Link>
            </button>
            <button className='my-3 px-6 py-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all rounded-full'>
                <Link to='/users'>
                    Users
                </Link>
            </button>
        </div>
    )
}

export default Admin