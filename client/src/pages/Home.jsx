import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HomeCard from '../components/HomeCard.jsx';

function Home() {
    const { currentUser } = useSelector((state) => state.user);
    const [randomImage, setRandomImage] = useState(null);
    useEffect(() => {
        const fetchRandomImage = async () => {
            try {
                const randomImage = await fetch('/api/todaysImage');
                const data = await randomImage.json();
                setRandomImage(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchRandomImage();
    }, [])
    return (
        <div className='shadow-2xl h-full min-w-screen flex justify-center bg-rose-100'>
            <HomeCard user={currentUser} image={randomImage} />
        </div>
    )
}

export default Home