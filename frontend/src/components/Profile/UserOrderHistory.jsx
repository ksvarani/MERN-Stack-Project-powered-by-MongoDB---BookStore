import React, { useEffect, useState } from 'react';
import axios from "axios";
import TLoader from '../Loader/TLoader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/history-order", { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetch();
  }, [OrderHistory]);
  
  return (
    <>
      {!OrderHistory && 
      <div className='w-full h-[100vh] flex items-center justify-center'>
        <div className="scale-[1.5]"><TLoader /></div></div>}

      {OrderHistory && OrderHistory.length === 0 && (
        <div className='h-screen bg-stone-950 p-4 text-white'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-serif text-red-600 mb-8'>
              No History of Orders!
            </h1>
            <h2 className='text-xl text-white'>
              Start Yours, Start Shopping Today!
            </h2>
            <h2 className='text-1/2-xl text-white mt-1'>
            Every Book Tells a Story. . .
            </h2>
            <img src='/DG.png' alt='' className='h-[45vh] mt-4' />
          </div>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-serif flex justify-center mb-8'>
            Your Order History, Thank You For Purchasing!!
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className=''>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className=''>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className=''>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className=''>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className=''>mode</h1>
            </div>
          </div>

          {OrderHistory && OrderHistory.map((items, i) => (
            <div key={items._id} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[22%]'>
               <Link
                to={`/view-book-details/${items.book._id}`}
                className='hover:text-blue-300'
               >
                {items.book.title}
               </Link>
              </div>
              <div className='w-[45%]'>
                <h1 className=''>{items.book.description.slice(0, 50)}...</h1>
              </div>
              <div className='w-[9%]'>
                <h1 className=''>₹ {items.book.price}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='font-semibold text-green-500'>
                  {items.status === "Order Placed" ? (
                    <div className='text-amber-300'>{items.status}</div>
                  ) : items.status === "Order Cancelled" ? (
                    <div className='text-red-600'>{items.status}</div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className='text-sm text-zinc-400'>Cash on Delivery</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory