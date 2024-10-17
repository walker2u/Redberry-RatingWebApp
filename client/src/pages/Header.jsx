import React from 'react'

function Header() {
    return (
        <header className="bg-red-200 p-2 sm:p-3 md:p-4 w-full flex">
            <div className="container mx-auto flex items-center p-2 sm:p-4 md:p-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-rose-800">Red</span>
                <span className="text-rose-400">Berry...</span>
            </div>
        </header>


    )
}

export default Header