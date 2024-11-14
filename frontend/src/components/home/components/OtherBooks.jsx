import React, { useEffect, useState } from 'react'
import { BookCards } from '../../common/BookCards';

const BASE_URL = "http://localhost:4000" 

export const OtherBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect( () => {
      fetch(BASE_URL+"/all-books").then(res => res.json()).then(data => setBooks(data.slice(3,10)))
    }, [])

  return (
    <div>
        <BookCards books={books} headline="Other Books"/>
    </div>
  )
}
