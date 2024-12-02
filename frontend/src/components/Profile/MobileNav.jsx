import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);
  return (
    <>
        {role === "USER" && 
            <div className='w-full flex items-center justify-between mt-4 lg:hidden'>
            <Link
                to="/profile"
                className='text-white font-mono w-full px-4 py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                Profile Details
            </Link>
            <Link
                to="/profile/favourites"
                className='text-white font-mono w-full px-4 py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                Favourites
            </Link>
            <Link
                to="/profile/orderHistory"
                className='text-white font-mono w-full px-4 py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                Order History
            </Link>
            <Link
                to="/profile/settings"
                className='text-white font-mono w-full px-4 py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                Settings
            </Link>
        </div>
        }
        {role === "ADMIN" && 
            <div className='w-full flex items-center justify-between mt-4'>
            <Link
                to="/profile"
                className='text-white font-mono w-full px-4 py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                ADMIN Details
            </Link>
            <Link
                to="/profile/allOrders"
                className='text-white font-mono w-full px-4 py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                All Orders
            </Link>
            <Link
                to="/profile/addBook"
                className='text-white font-mono w-full px-4 py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                Add Book
            </Link>
            <Link
                to="/profile/settings"
                className='text-white font-mono w-full px-4 py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                Settings
            </Link>
        </div>
        }
    </>
  )
}

export default MobileNav