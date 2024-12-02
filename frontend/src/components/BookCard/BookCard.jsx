import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import axios, { AxiosError } from "axios";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:3000/api/v1/remove-book-favourite",
      {}, { headers }
    );
  };

  return (
    <div className='h-[100%] bg-zinc-800 rounded p-2 mb-6 flex flex-col'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className='bg-zinc-800 rounded p-3 flex flex-col'>
          <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img src={data.url} alt="/" className='h-[25vh]' />
          </div>
          <h2 className='mt-4 text-xl text-white font-serif'>{data.title}</h2>
          <p className='mt-2 text-zinc-400 font-mono'>by {data.author}</p>
          <p className='mt-2 text-zinc-200 text-xl font-mono'>₹ {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-100 px-4 py-2 flex items-center justify-center gap-2 rounded-full border border-yellow-500 text-yellow-600 font-medium mt-6 mb-0 mx-3 my-3 w-[90%] hover:text-red-500 hover:bg-white transition duration-300 ease-in-out"
          onClick={handleRemoveBook}
        >
          <FaTrash />
          Remove
        </button>
      )}
    </div>
  );
};

export default BookCard;