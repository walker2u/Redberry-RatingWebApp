import React from 'react'
import { useLocation } from 'react-router-dom'

function Home() {
    const { state } = useLocation();
    return (
        <p className='text-5xl text-red-400 m-4'>aa gye <span className='text-rose-800'>{state.user}</span> sahab.</p>
    )
}

export default Home