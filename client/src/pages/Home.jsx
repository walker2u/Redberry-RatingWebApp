import React from 'react'
import { useSelector } from 'react-redux'
import HomeCard from '../components/HomeCard.jsx';

function Home() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className='shadow-2xl min-w-screen flex justify-center bg-rose-100'>
            <HomeCard user={currentUser} />
        </div>
    )
}

export default Home