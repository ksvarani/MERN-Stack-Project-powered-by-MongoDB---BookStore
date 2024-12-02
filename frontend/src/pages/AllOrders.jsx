import React, { useEffect, useState } from 'react';
import { FaCheck, FaEye, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import TLoader from '../components/Loader/TLoader';
import UserData from './UserData';

const AllOrders = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [ AllOrders, setAllOrders ] = useState();
  const [ Options, setOptions ] = useState(-1);
  const [ Values, setValues ] = useState({ status: "" });
  const [ userDiv, setuserDiv ] = useState("hidden");
  const [ userDivData, setuserDivData ] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-all-order",
        { headers }
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, [AllOrders]);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value});
  };

  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    const response = await axios.put(
      `http://localhost:3000/api/v1/update-status/${id}`,
      Values, { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {!AllOrders && <div className='w-full h-[100vh] flex items-center justify-center'>
        <div className="scale-[1.5]"><TLoader /></div></div>}

      {AllOrders && AllOrders.length === 0 && (
        <div className='h-screen bg-stone-950 p-4 text-white'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-serif text-red-600 mb-4'>
              No Orders of Books!
            </h1>
            <h2 className='text-xl text-white'>
            Every bestseller starts with a spark, Ignite your sales strategy now!
            </h2> 
            <h2 className='text-1/2-xl text-white mt-6'>
              Launch a Limited-Time Discount: 'Buy 2, Get 1 Free!'
            </h2>
            <h2 className='text-1/2-xl text-white mt-2'>
              Email Your Users a Reminder to Explore New Arrivals!
            </h2>
            <img src='/Not-Found.png' alt='' className='h-[45vh] mt-4' />
          </div>
        </div>
      )}

      {AllOrders && AllOrders.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-serif flex justify-center mb-8'>
            Customer Book Orders
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[40%] md:w-[22%]'>
              <h1>Books</h1>
            </div>
            <div className='hidden md:block md:w-[45%]'>
              <h1>Description</h1>
            </div>
            <div className='w-[17%] md:w-[9%]'>
              <h1>Price</h1>
            </div>
            <div className='w-[30%] md:w-[16%]'>
              <h1>Status</h1>
            </div>
            <div className='w-[10%] md:w-[5%]'>
              <h1><FaUsers /></h1>
            </div>
          </div>


          {AllOrders && AllOrders.map((items, i) => (
            <div key={items._id} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-stone-950 cursor-pointer transition-all duration-300'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[40%] md:w-[22%]'>
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className='hover:text-blue-400'>
                  {items.book.title}
                </Link>
              </div>
              <div className='w-0 md:w-[45%] hidden md:block'>
                <h1>{items.book.description.slice(0, 50)} ...</h1>
              </div>
              <div className='w-[17%] md:w-[9%]'>
                <h1>₹ {items.book.price}</h1>
              </div>
              <div className='w-[30%] md:w-[16%]'>
                <h1 className='font-semibold'>
                  <button className='hover:scale-105 transition-all duration-300'
                    onClick={() => setOptions(i)}>
                    {items.status === "Order Placed" ? (
                      <div className='text-amber-300'>{items.status}</div>
                    ) : items.status === "Order Cancelled" ? (
                      <div className='text-red-600'>{items.status}</div>
                    ) : (
                      <div className='text-green-500'>{items.status}</div>
                    )}
                  </button>
                  <div className={`${Options === i ? "flex" : "hidden"}`}>
                    <select 
                      name='status'
                      id=''
                      className='bg-gray-800' 
                      onChange={change}
                      value={Values.status}
                    >
                      {[
                        "Order Placed",
                        "Out for Delivery",
                        "Order Delivered",
                        "Order Cancelled"
                      ].map((items, i) => (
                        <option value={items} key={i}>
                          {items}
                        </option>
                      ))}
                    </select>
                    <button className='text-green-500 hover:text-pink-600 mx-2'
                      onClick={() => {
                      setOptions(-1);
                      submitChanges(i);
                    }}>
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>
              <div className='w-[10%] md:w-[5%]'>
                <button
                  className='text-xl hover:text-blue-600'
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(items.user);
                  }}
                >
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <UserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;