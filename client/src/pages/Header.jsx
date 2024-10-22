import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <header className="bg-red-200 py-4 sm:px-6 md:px-8 w-full flex justify-between items-center">
            {/* Logo Section */}
            <Link to={"/"} className="flex items-center">
                <img src='../public/images/logo.png' className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14' alt="" />
                <div className="flex items-stretch mb-1">
                    <span className="text-rose-800 text-2xl sm:text-3xl md:text-4xl">Red</span>
                    <span className="text-rose-400 text-2xl sm:text-3xl md:text-4xl">Berry...</span>
                </div>
            </Link>

            {/* User Profile or Login Button */}
            <div className='flex items-center'>
                {currentUser?.avatar ? (
                    <img
                        referrerPolicy="no-referrer"
                        className="rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover"
                        src={currentUser.avatar}
                        alt="profile"
                    />
                ) : (
                    <button
                        onClick={() => window.location.href = '/signin'}
                        className='text-sm sm:text-base md:text-lg px-3 py-2 bg-rose-200 text-rose-600 rounded-lg hover:bg-rose-300 transition-colors'
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
