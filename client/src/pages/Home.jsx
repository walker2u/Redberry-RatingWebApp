import React, { useState } from 'react';

function HomeCard({ user, image }) {
    const [rating, setRating] = useState(0); // Store the rating value
    const [message, setMessage] = useState(''); // For success/error messages
    const [comment, setComment] = useState(''); // Store the comment input

    const handleRating = (rate) => {
        setRating(rate);
    };

    const submitRating = async () => {
        if (rating === 0) {
            setMessage("Please select a rating before submitting.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/rating/rate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageId: image?.id, // Assuming image object has an `id`
                    userId: user?.id, // Assuming user object has an `id`
                    rating: rating,
                    comment: comment, // Include comment in the payload
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage("Rating submitted successfully!");
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            setMessage("An error occurred while submitting the rating.");
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row mt-2">
            {/* Image Section */}
            <div className="w-full sm:w-1/2 cursor-pointer" onClick={openModal}>
                <img
                    src={image?.url} // Use image url
                    alt="Card Image"
                    className="w-full h-48 sm:h-64 object-cover" // Set a fixed height
                />
            </div>

            {/* Rating and Comment Section */}
            <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between">
                <div className="rating-container">

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

                    {/* Submit Rating Button */}
                    <button
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        onClick={submitRating} // Call submit function
                    >
                        Submit Rating
                    </button>
                    {message && <p className="mt-2 text-red-600">{message}</p>} {/* Display error/success message */}
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Leave a Comment</h2>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Write your comment here..."
                        value={comment} // Control the input value
                        onChange={(e) => setComment(e.target.value)} // Handle comment input
                    ></textarea>
                    <button
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        onClick={submitRating} // Submit comment along with rating
                    >
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
                            src={image?.url} // Use image url in modal as well
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
