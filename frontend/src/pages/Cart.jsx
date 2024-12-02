import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import TLoader from '../components/Loader/TLoader';

const Cart = () => {

  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-book-cart", { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, [Cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `http://localhost:3000/api/v1/remove-book-cart/${bookid}`, {}, { headers }
    );
    alert(response.data.message);
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [Cart]);

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/place-order", {order: Cart}, { headers }
      );
      //alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-stone-950 px-12 h-screen py-8'>
      {!Cart && 
      <div className='w-full h-[100vh] flex items-center justify-center'>
        <div className="scale-[1.5]"><TLoader /></div></div>}
      {Cart && Cart.length === 0 && (
          <div className='h-screen'>
            <div className='h-[100%] flex items-center justify-center flex-col'>
              <h1 className='text-5xl lg:font-serif text-6xl text-orange-400'>
                Your Cart is Empty!
              </h1>
              <h2 className='text-xl text-white mt-4'>
                Your Next Great Read is Just a Click Away!
              </h2>
              <h2 className='text-xl text-white mt-1'>
                Shop Now!
              </h2>
              <img src="/cart1.png" alt="cart" className='lg:h-[50vh]' />
            </div>
          </div>
      )}
      {Cart && Cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart List</h1>
          {Cart.map((items, i) => (
            <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
              <img src={items.url} alt='/' className='h-[20vh] md:h-[10vh] object-cover' />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-white font-semibold text-start mt-2 md:Mt-0'>
                  {items.title}
                </h1>
                <h2 className='text-xs text-white font-semibold text-start mt-2'>{items.genre}</h2>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-white text-3xl font-semibold flex'>
                  ₹ {items.price}
                </h2>
                <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
                onClick={() => deleteItem(items._id)}>
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {Cart && Cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 bg-zinc-700 rounded'>
            <h1 className='text-3xl text-white font-serif flex justify-center'>Total Amount</h1>
            <div className='mt-3 flex items-center justify-between text-xl text-white'>
              <h2 className='font-lightbold'>Quantity: {Cart.length}</h2>
              <h2 className='font-lightbold'>₹ {Total}</h2>
            </div>
            <div className='w-[100%] mt-3'>
              <button className='bg-zinc-300 text-black rounded px-12 py-3 my-4 flex justify-center w-full font-mono hover:text-white hover:bg-zinc-900'
              onClick={PlaceOrder} >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;