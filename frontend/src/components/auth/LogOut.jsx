import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

export const LogOut = () => {

    const {logOut} = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogOut = () => {
        logOut().then( () => {
            alert('Sing-out successsfull!');
            navigate(from, {replace: true});
        }).catch((error) => {
            console.log(error)
        })
    }

  return (
    <div className='h-screen bg-teal-100 flex flex-col gap-3 items-center justify-center'>
        <button className='bg-red-700 px-8 py-2 text-white rounded'
         onClick={handleLogOut}
        >
            Log-out
        </button>

        <Link to={'/'} className='flex justify-center items-center gap-1' >
            <IoMdArrowRoundBack /><span>Back to home</span>
        </Link>
    </div>
  )
}
