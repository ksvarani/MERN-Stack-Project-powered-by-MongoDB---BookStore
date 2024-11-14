import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

const BASE_URL = "http://localhost:4000" 

export const ManageBooks = () => {

  const [allBooks, setAllBooks] = useState([]);

  useEffect( () => {
    fetch(BASE_URL+"/all-books").then(res => res.json()).then(data => setAllBooks(data));
  } ,[])

  // delete a book 
  const handleDelete = (id) => {
    fetch(`${BASE_URL}/book/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()).then(data => alert("Book is deleted successfully!"))
  }


  return (
    <div className='px-4 my-12'>

      <h2 className='mb-8 text-3xl font-bold'>
        Manage Your Books
      </h2>

      <Table className='lg:w-[1060px]'>
        <Table.Head>
          <Table.HeadCell>Book name</Table.HeadCell>
          <Table.HeadCell>Author name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            Edit or Manage
          </Table.HeadCell>
        </Table.Head>
        {
          allBooks.map((book, index) => (
            <Table.Body key={index} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.bookTitle}
                </Table.Cell>
                <Table.Cell>{book.authorName}</Table.Cell>
                <Table.Cell>{book.category}</Table.Cell>
                <Table.Cell>$2999</Table.Cell>
                <Table.Cell>
                  <Link to={`/admin/dashboard/edit-books/${book._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5">
                    Edit
                  </Link>

                  <button
                   onClick={() => handleDelete(book._id)}
                   className='font-semibold text-red-600 hover:underline'
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))
        }
      </Table>
    </div>
  )
}
 