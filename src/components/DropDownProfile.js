import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { BiChevronDown, BiUser ,BiLogInCircle  } from "react-icons/bi"
// import { hover } from '@testing-library/user-event/dist/hover'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DropDownProfile(props) {
    const location = useLocation();
    const isActive = location.pathname === '/orders' || location.pathname === '/profile';
    const isOrders = location.pathname === '/orders';
    const isProfile = location.pathname === '/profile';
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className={`inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 border-b-2 ${isActive && 'bg-gray-50'}`}>
                    <BiUser size={17} />{props.username}
                    <BiChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to='/orders'
                                    className={classNames(
                                        isOrders ? 'bg-gray-100 text-red-600' : 'text-gray-700',
                                        'block px-4 py-2 text-sm hover:bg-gray-50'
                                    )}
                                >
                                    Your Orders
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to='/profile'
                                    className={classNames(
                                        isProfile ? 'bg-gray-100 text-red-600' : 'text-gray-700',
                                        'block px-4 py-2 text-sm hover:bg-gray-50'
                                    )}
                                >
                                    Profile
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to='/login'
                                    className={classNames(
                                        ' text-red-600 hover:text-red-400 hover:bg-gray-50',
                                        'px-4 py-2 text-sm text-nowrap flex items-center gap-1'
                                    )}
                                >
                                    Login with Another Account <BiLogInCircle size={18}/>
                                </Link>
                            )}
                        </Menu.Item>
                        
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
