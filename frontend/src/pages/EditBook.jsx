import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UBButton from '../components/Buttons/UBButton';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        genre: "",
        price: "",
        description: "",
        language: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:2004/api/v1/get-book-byid/${id}`, { headers }
                );
                //console.log(response);
                setData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, [id]);

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async () => {
        try {
            if (
                Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.genre === "" ||
                Data.price === "" ||
                Data.description === "" ||
                Data.language === ""
            ) {
                alert("Hello ADMIN, All the fields are Required to Update a Book!");
            } else {
                const response = await axios.put(
                    "http://localhost:2004/api/v1/update-book",
                    Data, { headers }
                );
                setData({
                    url: "",
                    title: "",
                    author: "",
                    genre: "",
                    price: "",
                    description: "",
                    language: "",
                });
                //console.log(response)
                alert(response.data.message);
                navigate(`/view-book-details/${id}`);
            }
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <div className='h-[100%] p-0 bg-black md:p-4'>
        <h1 className='text-3xl text-white font-semibold flex justify-center md:text-5xl md:font-semibold text-white mb-8'>
        Edit Book Details
        </h1>
        <div className='p-4 bg-zinc-800 rounded'>
            <div>
                <label htmlFor='' className='text-zinc-400'>
                    Book Image
                </label>
                <input 
                    type='text'
                    className='w-full mt-2 bg-zinc-900 text-white p-2 outline-none'
                    placeholder='Give the URL of the Image'
                    name='url'
                    required
                    value={Data.url}
                    onChange={change}
                />
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-zinc-400'>
                    Title of the Book
                </label>
                <input 
                    type='text'
                    className='w-full mt-2 bg-zinc-900 text-white p-2 outline-none'
                    placeholder='Title of the Book'
                    name='title'
                    required
                    value={Data.title}
                    onChange={change}
                />
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-zinc-400'>
                    Author of the Book
                </label>
                <input 
                    type='text'
                    className='w-full mt-2 bg-zinc-900 text-white p-2 outline-none'
                    placeholder='Author of the Book'
                    name='author'
                    required
                    value={Data.author}
                    onChange={change}
                />
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-zinc-400'>
                    Genre of the Book
                </label>
                <input 
                    type='text'
                    className='w-full mt-2 bg-zinc-900 text-white p-2 outline-none'
                    placeholder='Genre of the Book'
                    name='genre'
                    required
                    value={Data.genre}
                    onChange={change}
                />
            </div>
            <div className='mt-4 flex gap-4'>
                <div className='w-3/6'>
                    <label htmlFor='' className='text-zinc-400'>
                        Price of the Book
                    </label>
                    <input 
                        type='text'
                        className='w-full mt-2 bg-zinc-900 text-white p-2 outline-none'
                        placeholder='Price of the Book'
                        name='price'
                        required
                        value={Data.price}
                        onChange={change}
                    />
                </div>
                <div className='w-3/6'>
                    <label htmlFor='' className='text-zinc-400'>
                        Book Language
                    </label>
                    <input 
                        type='text'
                        className='w-full mt-2 bg-zinc-900 text-white p-2 outline-none'
                        placeholder='Language of the Book'
                        name='language'
                        required
                        value={Data.language}
                        onChange={change}
                    />
                </div>
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-zinc-400'>
                    Book Description
                </label>
                <textarea 
                    type='text'
                    className='w-full mt-2 bg-zinc-900 text-white p-2 outline-none'
                    rows={5}
                    placeholder='Description of the Book'
                    name='description'
                    required
                    value={Data.description}
                    onChange={change}
                />
            </div>
            <div className='mt-4 flex justify-center'>
                <UBButton onClick={submit} />
            </div>
        </div>
    </div>
  );
};

export default EditBook;