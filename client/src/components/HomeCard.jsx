import React, { useState } from 'react';

function HomeCard({ user }) {
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
                    src="https://assets.thehansindia.com/h-upload/2024/02/20/1600x960_1424537-anupama-parameswaran-new-images-0213-compressed.webp"
                    alt="Card Image"
                    className="w-full h-[50vh] sm:h-[80vh] object-cover"
                />
            </div>

            {/* Rating and Comment Section */}
            <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Your Rating</h2>
                    <div className="flex items-center">
                        {[...Array(4)].map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 text-yellow-500"
                            >
                                <path d="M12 17.27L18.18 21 16.54 14.12 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 14.12 5.82 21 12 17.27z" />
                            </svg>
                        ))}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 text-gray-300"
                        >
                            <path d="M12 17.27L18.18 21 16.54 14.12 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 14.12 5.82 21 12 17.27z" />
                        </svg>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Leave a Comment</h2>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Write your comment here..."
                    ></textarea>
                    <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
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
                            src="https://assets.thehansindia.com/h-upload/2024/02/20/1600x960_1424537-anupama-parameswaran-new-images-0213-compressed.webp"
                            alt="Full Image"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomeCard;
