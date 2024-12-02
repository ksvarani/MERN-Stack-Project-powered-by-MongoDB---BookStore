import React from 'react'
import Button1 from '../Buttons/Button1';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className='h-[85vh] flex flex-col md:flex-row items-center justify-center'>
            {/* Left Section */}
            <div className='w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
                <h1 className='text-4xl lg:text-7xl font-serif text-white text-center lg:text-left'>
                    Discover Books, Explore Your Atlas!
                </h1>
                <h2 className='mt-2 text-xl lg:text-2xl font-sans text-cyan-300 lg:font-lightbold text-left'>
                    Your Journey Starts with a Book...
                </h2>
                <p className='mt-14 text-1/2xl font-mono text-yellow-100 text-center lg:font-mono text-start mr-12'>
                    Every page is a gateway to new Adventures, Knowledge, and Inspiration. Dive into a curated collection of books spanning genres, authors, and stories from around the world. Let your curiosity guide you - there’s a book waiting for you here.
                </p>
                {/* Button */}
                <div className='mt-8 buttons'>
                    <Link to="/all-books">
                        <Button1 />
                    </Link>
                </div>
            </div>
            <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
                <img src='\Hero.jpg' alt='hero' style={{ borderRadius: '10px' }} />
            </div>
        </div>
    );
};

export default Hero;