import React, { useState, useEffect } from 'react';

export default function GamesDisplay({ gameList }) {
    const [sortedGames, setSortedGames] = useState([]);
    const [sortOption, setSortOption] = useState('relevance');

    useEffect(() => {
        setSortedGames(handleSort(gameList, sortOption));
    }, [gameList, sortOption]);

    const handleSort = (games, option) => {
        switch (option) {
            case 'date':
                return [...games].sort((a, b) => new Date(b.released) - new Date(a.released));
            case 'date-old':
                return [...games].sort((a, b) => new Date(a.released) - new Date(b.released));
            case 'metacritic-asc':
                return [...games].sort((a, b) => a.metacritic - b.metacritic);
            case 'metacritic-desc':
                return [...games].sort((a, b) => b.metacritic - a.metacritic);
            default:
                return games;
        }
    };

    return (
        <div>
            <div className="my-4">
                <label htmlFor="sort-options" className="mr-2 dark:text-white">Sort by:</label>
                <select
                    id="sort-options"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border p-2 cursor-pointer dark:bg-[#121212] dark:text-white rounded-lg"
                >
                    <option value="relevance">Relevance</option>
                    <option value="date">Newest</option>
                    <option value="date-old">Oldest</option>
                    <option value="metacritic-asc">Metacritic Score (Low to High)</option>
                    <option value="metacritic-desc">Metacritic Score (High to Low)</option>
                </select>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5'>
                {sortedGames.map((item) => (
                    <div key={item.id} className='bg-[#76a8f75e] p-2 rounded-lg pb-12 h-full hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer'>
                        <img src={item.background_image} className='w-full h-[80%] rounded-lg object-cover' alt={item.name} />
                        <h2 className='text-[20px] dark:text-white font-bold'>
                            {item.name}
                            <span className='p-1 rounded-sm ml-2 text-[10px] bg-green-100 text-green-700 font-medium'>{item.metacritic}</span>
                        </h2>
                        <h2 className='text-gray-500 dark:text-gray-300'>⭐{item.rating}💬{item.reviews_count}🔥{item.suggestions_count}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}