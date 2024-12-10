import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2004/api/v1/get-book-favourite",
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };
    fetch();
  }, [FavouriteBooks]);

  return (
    <>
      {FavouriteBooks.length === 0 && (
        <div className='text-4xl font-serif h-[100%] text-white flex items-center justify-center w-full'>
          No Favourite Books Available
          <img src="/favourite.png" alt='star' className='h-[12vh] my-8' />
        </div>
      )}
      <div className='lg:grid grid-cols-4 gap-4'>
        {FavouriteBooks &&
          FavouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
