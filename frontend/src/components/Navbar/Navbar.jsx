import React, { useState } from 'react';
import '../Buttons/Button.css';
import { Link } from 'react-router-dom';
import { FaGripLines } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links = [
        { title: 'Home', link: '/' },
        { title: 'About Us', link: '/about-us' },
        { title: 'All Books', link: '/all-books' },
        { title: 'Cart', link: '/cart' },
        { title: 'Profile', link: '/profile' },
        { title: 'Admin Profile', link: '/profile' },
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    if (isLoggedIn === false) {
        links.splice(3, 3);
    }

    if (isLoggedIn === true && role === "USER") {
        links.splice(5, 1);
    }

    if (isLoggedIn === true && role === "ADMIN") {
        links.splice(3, 2);
    }

    const [MobileNav, setMobileNav] = useState('hidden');

    const handleSignUpClick = () => {
        console.log('Sign-Up button clicked');
    };

    const handleSignInClick = () => {
        console.log('Sign-In button clicked');
    };

    return (
        <>
            <nav className="z-50 relative flex bg-cyan-50 text-zinc-400 text-xl px-4 py-4 items-center justify-between">
                <Link to={'/'} className="flex items-center">
                    <img
                        className="size-22 h-16 me-4 md:size-22 h-16 me-4"
                        src="\ATLAS-crop.png"
                        alt="logo"
                    />
                    <h1 className="text-2xl text-stone-950 font-semibold">
                        ATLAS BOOKVERSE
                    </h1>
                </Link>
                <div className="nav-links-atlas-bookverse font-semibold gap-6 block md:flex items-center">
                    <div className="hidden md:flex gap-8">
                        {links.map((items) => (
                            <div className="flex items-center" key={items.link}>
                                {items.title === 'Profile' || items.title === 'Admin Profile' ? (
                                    <Link
                                        to={items.link}
                                        className="px-4 py-1 border border-white rounded hover:bg-stone-700 hover:text-stone-50 transition-all duration-300"
                                    >
                                        {items.title}
                                    </Link>
                                ) : (
                                    <Link
                                        to={items.link}
                                        className="hover:text-stone-950 transition duration-300"
                                    >
                                        {items.title}{' '}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Sign Up and Sign In for Desktop */}
                    {isLoggedIn === false && (
                        <div className="hidden md:flex gap-3">
                            <Link
                                to={'/SignUp'}
                                onClick={handleSignUpClick}
                                className="signup-div"
                            >
                                SignUp
                            </Link>
                            <Link
                                to={'/LogIn'}
                                onClick={handleSignInClick}
                                className="signin-div"
                            >
                                LogIn
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="block md:hidden text-stone-950 text-2xl hover:text-yellow-500"
                        onClick={() =>
                            MobileNav === 'hidden'
                                ? setMobileNav('block')
                                : setMobileNav('hidden')
                        }
                    >
                        <FaGripLines />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div
                className={`${MobileNav} bg-stone-950 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
            >
                {links.map((items) => (
                    <Link
                        to={items.link}
                        className="text-white text-2xl mb-7 font-serif hover:text-yellow-500 transition duration-300"
                        key={items.link}
                        onClick={() => setMobileNav('hidden')}
                    >
                        {items.title}{' '}
                    </Link>
                ))}
                {isLoggedIn === false && (
                    <div className="flex flex-col gap-6 items-center">
                        <Link
                            to={'/SignUp'}
                            onClick={handleSignUpClick}
                            className="signup-div"
                        >
                            SignUp
                        </Link>
                        <Link
                            to={'/LogIn'}
                            onClick={handleSignInClick}
                            className="signin-div"
                        >
                            LogIn
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;
