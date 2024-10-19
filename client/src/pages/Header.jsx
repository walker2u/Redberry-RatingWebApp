import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <header className="bg-red-200 p-1 sm:p-1 md:p-2 w-full flex">
            <Link to={"/"} className="container mx-auto flex items-center p-1 sm:p-3 md:p-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="text-rose-800">Red</span>
                <span className="text-rose-400">Berry...</span>
            </Link>
            <div className='overflow-visible'>
                {currentUser.avatar ? (
                    <img
                        referrerPolicy="no-referrer"
                        className="rounded-full container mx-auto flex items-center p-1 sm:p-3 md:p-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                        src="https://lh3.googleusercontent.com/a/ACg8ocKz1jb85YHpX5bKfWp67OTqF8P_Zd1Sy8DGR3EOsVy2VUxRTyc_=s96-c"
                        alt="profile"
                    />
                ) :
                    (
                        <button className='bg-rose-500 text-white p-1 sm:p-3 md:p-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>Sign in</button>
                    )}
            </div>
        </header>



    )
}

export default Header