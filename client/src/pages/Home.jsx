import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HomeCard from '../components/HomeCard.jsx';

function Home() {
    const { currentUser } = useSelector((state) => state.user);
    const [randomImage, setRandomImage] = useState(null);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const fetchRandomImage = async () => {
            try {
                const randomImage = await fetch('/api/todaysImage');
                const data = await randomImage.json();
                setRandomImage(data);
                const res = await fetch('/api/image/getComments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        imageRef: data.imageRef,
                    })
                });
                const data2 = await res.json();
                setComments(data2.map(item => item.comment));
            } catch (error) {
                console.log(error);
            }
        };
        fetchRandomImage();
    }, [])
    return (
        <div className='shadow-2xl h-full min-w-screen flex justify-center bg-rose-100'>
            <HomeCard user={currentUser} image={randomImage} com={comments} />
        </div>
    )
}

export default Home