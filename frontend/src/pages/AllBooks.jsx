import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard/BookCard';
import ABLoader from '../components/Loader/ABLoader';

const AllBooks = () => {
  const [Data, setData] = useState(null); // Initialize as null
  const [error, setError] = useState(false); // Error state

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:2004/api/v1/get-book");
        setData(response.data.data); // Set fetched data
      } catch (error) {
        console.error("Error fetching recently added books", error);
        setError(true); // Set error state
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      <h4 className="py-5 text-3xl font-serif text-yellow-300">All Books</h4>

      {/* Loader */}
      {!Data && !error && (
        <div className="w-full h-screen flex items-center justify-center">
          <ABLoader />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="h-screen w-full text-red-600 text-center">
          Failed to load books. Please try again later.
        </p>
      )}

      {/* No Books Available */}
      {Data && Data.length === 0 && (
        <p className="text-yellow-100 text-center">No books available</p>
      )}

      {/* Books Grid */}
      {Data && Data.length > 0 && (
        <div className="my-8 grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {Data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
