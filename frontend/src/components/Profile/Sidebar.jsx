import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LOButton from '../Buttons/LOButton';


const Sidebar = ({ data }) => {

    const role = useSelector((state) => state.auth.role);

  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
        <div className='flex items-center flex-col justify-center'>
            <img src={data.avatar} className='h-[12vh]'/>
            <p className='mt-3 text-xl text-white font-serif'>{data.username}</p>
            <p className='mt-1 text-normal text-zinc-700 hover:text-blue-500'>{data.email}</p>
            <div className='w-full mt-4 h-[1px] bg-zinc-600 hidden lg:block'></div>
        </div>
        {role === "USER" && 
            <div className='w-full flex-col items-center justify-center hidden lg:flex'>
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
            <div className='w-full flex-col items-center justify-center hidden lg:flex'>
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
        <div className='mt-4'>
            <LOButton />
        </div>
    </div>
  )
}

export default Sidebar;