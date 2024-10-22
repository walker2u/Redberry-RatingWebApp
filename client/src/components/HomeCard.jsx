import React, { useEffect, useState } from 'react';

function HomeCard({ user, image }) {

    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [comments, setComments] = useState([]);
    const [commentForm, setCommentForm] = useState('');

    const handleRating = (rate) => {
        setRating(rate);
    };

    const submitRating = async () => {
        setMessage('');
        if (rating === 0) {
            setMessage("Please select a rating before submitting.");
            return;
        }
        try {
            const response = await fetch('/api/image/rating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageRef: image.imageRef,
                    rating,
                    userId: user._id,
                }),
            });
            const data = await response.json();
            console.log(data);
            if (data.success === false) {
                setMessage(data.message);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (commentForm === '') {
            setMessage('Please enter a comment before submitting.');
            return;
        }
        try {
            const response = await fetch('/api/image/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageRef: image.imageRef,
                    comment: commentForm,
                    userId: user._id,
                }),
            });
            const data = await response.json();
            console.log(data);
            if (data.success === false) {
                setMessage(data.message);
                return;
            }
            setComments([...comments, commentForm]);
            setCommentForm('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row mt-2">
            {/* Image Section */}
            <div className="w-full sm:w-1/2 cursor-pointer" onClick={openModal}>
                <img
                    src={image?.imageUrl}
                    alt="Card Image"
                    className="w-full h-auto sm:h-auto object-cover"
                />
            </div>

            {/* Rating and Comment Section */}
            <div className="w-full sm:w-1/2 p-6 flex flex-col">
                <div className="rating-container flex flex-col">
                    <div className="rating-stars">
                        {/* Render 5 stars for rating */}
                        {[1, 2, 3, 4, 5].map((rate) => (
                            <span
                                key={rate}
                                onClick={() => handleRating(rate)}
                                className={`cursor-pointer text-3xl ${rating >= rate ? "text-rose-600" : "text-gray-400"} hover:text-rose-600 transition`}
                            >
                                ★
                            </span>

                        ))}
                    </div>
                    {message && <p className="text-red-500">{message}</p>}
                    <button onClick={submitRating} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                        Submit Rating
                    </button>
                </div>
                <div className='mt-4'>
                    <h1 className='text-lg font-bold mb-2'>Comments</h1>
                    <div className="h-96 overflow-y-scroll border border-red-300 rounded-lg p-2 mb-2">
                        {comments.map((comment, index) => (
                            <div key={index} className="mb-2">
                                <strong>Anonymous : </strong>
                                <span>{comment}</span>
                            </div>
                        ))}
                    </div>
                    <textarea
                        value={commentForm}
                        onChange={(e) => setCommentForm(e.target.value)}
                        className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows="4"
                        placeholder="Write your comment here..."
                    ></textarea>
                    <button onClick={handleCommentSubmit} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                        Submit
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative bg-white p-1 rounded-lg max-w-5xl">
                        <button
                            className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                            onClick={closeModal}
                        >
                            &#x2715;
                        </button>
                        <img
                            src={image?.imageUrl}
                            alt="Full Image"
                            className="w-full h-1/2 object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomeCard;
