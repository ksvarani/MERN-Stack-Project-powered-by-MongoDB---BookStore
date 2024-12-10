import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import RALoader from '../Loader/RALoader';

const RecentlyAdded = () => {
    const [Data, setData] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:2004/api/v1/get-recent-book"
                );
                console.log(response.data);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching recently added books", error);
            }
        };
        fetch();
    }, []);

    return (
        <div className='mt-8 px-4'>
            <h4 className='text-3xl font-serif text-amber-300'>Recently Added Books :</h4>
            {!Data && (
                <p className='text-yellow-100'>No books available</p>
            )}
            <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
                {Data.length > 0 ? (
                    Data.map((item) => (
                        <div key={item._id}>
                            <BookCard data={item} />
                        </div>
                    ))
                ) : (
                    <div className='flex items-between justify-between my-8'>
                        <RALoader />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentlyAdded;
