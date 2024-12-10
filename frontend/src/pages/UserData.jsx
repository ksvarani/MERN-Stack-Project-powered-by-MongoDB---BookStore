import React from 'react';
import CloseButton from '../components/Buttons/CloseButton';

const UserData = ({ userDivData, userDiv, setuserDiv}) => {
    const closeButtonClick = () => {
        setuserDiv(userDiv === 'hidden' ? '' : 'hidden');
    };
  return (
    <>
        <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}></div>
        <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
            <div className='bg-zinc-800 rounded p-4 w-[80%] md:w-[50%] lg:w-[40%]'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold'> Customer Information</h1>
                    <div><CloseButton onClick={closeButtonClick} /></div>
                </div>
                <div className='flex flex-col space-y-4'>
                    <label htmlFor='' className='flex'>
                        <span className='w-1/3 font-semibold'>Username</span>
                        <span className='w-1/5 font-semibold justify-center'>:</span>
                        <span className='w-2/3 font-semibold'>{userDivData.username}</span>
                    </label>
                </div>
                <div className='mt-4'>
                    <label htmlFor='' className='flex'>
                        <span className='w-1/3 font-semibold'>Email ID</span>
                        <span className='w-1/5 font-semibold justify-center'>:</span>
                        <span className='w-2/3 font-semibold'>{userDivData.email}</span>
                    </label>
                </div>
                <div className='mt-4'>
                    <label htmlFor='' className='flex'>
                        <span className='w-1/3 font-semibold'>Address</span>
                        <span className='w-1/5 font-semibold justify-center'>:</span>
                        <span className='w-2/3 font-semibold'>{userDivData.address}</span>
                    </label>
                </div>
            </div>
        </div>
    </>
  );
};

export default UserData;