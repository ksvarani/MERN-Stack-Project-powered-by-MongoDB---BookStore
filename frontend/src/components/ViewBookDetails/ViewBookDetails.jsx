import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { GrLanguage } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../Loader/Loader';
import LikeButton from '../Buttons/LikeButton';
import CartButton from '../Buttons/CartButton';
import EditButton from '../Buttons/EditButton';
import DELButton from '../Buttons/DELButton';
import "./Banner.css"

const ViewBookDetails = () => {
    const { id } = useParams();
    const [Data, setData] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [cartResponseMessage, setCartResponseMessage] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:2004/api/v1/get-book-byid/${id}`
                );
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching book details", error);
            }
        };
        fetch();
    }, [id]);

    const handleFavourite = async () => {
        try {
            const response = await axios.put(
                "http://localhost:2004/api/v1/add-book-favourite",
                {},
                { headers }
            );
            setResponseMessage(response.data.message);
            setTimeout(() => setResponseMessage(''), 2004);
        } catch (error) {
            console.error("Error adding book to favourites", error);
            setResponseMessage("Failed to add book to favourites.");
            setTimeout(() => setResponseMessage(''), 2004);
        }
    };

    const handleCart = async () => {
        try {
            const response = await axios.put(
                "http://localhost:2004/api/v1//add-book-cart",
                {},
                { headers }
            );
            setCartResponseMessage(response.data.message);
            setTimeout(() => setCartResponseMessage(''), 2004);
        } catch (error) {
            console.error("Error adding book to cart", error);
            setCartResponseMessage("Failed to add book to cart.");
            setTimeout(() => setCartResponseMessage(''), 2004);
        }
    };

    const deletebook = async () => {
        const response = await axios.delete(
            "http://localhost:2004/api/v1/delete-book", { headers }
        );
        alert(response.data.message);
        navigate("/all-books");
    };

    return (
        <>
            {Data ? (
                <div className='px-4 md:px-12 py-8 bg-zinc-900 text-white flex flex-col lg:flex-row gap-8'>
                    <div className='bg-zinc-700 rounded p-4 h-[60vh] lg:h-[80vh] w-full lg:w-2/6 flex items-center justify-center'>
                        <img src={Data.url} alt="/" className='h-[55vh] lg:h-[75vh] rounded object-cover' />
                    </div>
                    <div className='p-4 w-full lg:w-2/3'>
                        <h1 className='text-4xl text-zinc-300 font-serif'>{Data.title}</h1>
                        <p className='text-zinc-400 mt-1'>by {Data.author}</p>
                        <p className='text-zinc-400 mt-1'>Genre: {Data.genre}</p>
                        <p className='text-zinc-500 mt-4 text-xl'>{Data.description}</p>
                        <p className='flex mt-4 items-center justify-start text-zinc-400'>
                            <GrLanguage className='me-3' />{Data.language}
                        </p>
                        <p className='mt-4 text-zinc-100 text-3xl font-mono'>
                            Price : ₹ {Data.price}
                        </p>
                        {isLoggedIn === true && role === "USER" && (
                            <>
                                <div className='relative inline-block mt-10 lg:absolute bottom-8'>
                                    {/* Favorite Button */}
                                    <div onClick={handleFavourite}>
                                        <LikeButton />
                                    </div>
                                    {/* Popup Banner for Favourites */}
                                    {responseMessage && (
                                        <div className="font-serif absolute left-full top-3 ml-6 bg-stone-800 text-white px-4 py-2 rounded-lg shadow-lg border border-white">
                                            {responseMessage}
                                        </div>
                                    )}
                                </div>
                                <div className='relative md:flex flex-row mt-10 lg:absolute bottom-8 right-7'>
                                    {/* Flex container to align items */}
                                    <div className="flex items-center">
                                        {/* Popup Banner for Cart */}
                                        {cartResponseMessage && (
                                            <div className="font-serif mr-4 flex items-center justify-center bg-stone-800 text-white px-4 py-2 rounded-lg shadow-lg border border-white">
                                                {cartResponseMessage}
                                            </div>
                                        )}
                                        {/* Cart Button */}
                                        <div onClick={handleCart}>
                                            <CartButton />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {isLoggedIn === true && role === "ADMIN" && (
                            <>
                                <div className="flex flex-row mt-10 lg:absolute bottom-0">
                                    <EditButton id={id} />
                                </div>
                                <div className='flex flex-col mt-10 lg:absolute bottom-8 right-7'>
                                    <DELButton onClick={deletebook}/>
                                </div>   
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className=' loader h-screen bg-zinc-900 flex items-center justify-center'>
                    <Loader />
                </div>
            )}
        </>
    );
};

export default ViewBookDetails;
