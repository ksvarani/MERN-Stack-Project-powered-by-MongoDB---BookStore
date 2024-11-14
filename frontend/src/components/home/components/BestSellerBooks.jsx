import React, { useEffect, useState } from 'react'
import { BookCards } from '../../common/BookCards';

const BASE_URL = "http://localhost:4000" 

export const BestSellerBooks = () => {

    const [books, setBooks] = useState([]);

    useEffect( () => {
      fetch(BASE_URL+"/all-books").then(res => res.json()).then(data => setBooks(data.slice(0,8)))
    }, [])

  return (
    <div>
        <BookCards books={books} headline="Best Seller Books"/>
    </div>
  )
}
