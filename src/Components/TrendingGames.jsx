import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrendingGames({ gameList }) {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(gameList);
    }, [gameList]);

    const handleClick = (gameId) => {
        navigate(`/game/${gameId}`);
    };

    return (
        <div className='mt-5 p-2 hidden md:block'>
            <h2 className='font-bold text-[30px] dark:text-white'>Trending Games</h2>
            <div className='hidden md:grid md:grid-cols-3 gap-3 lg:grid-cols-4'>
                {gameList.map((item, index) => index < 4 && (
                    <div
                        key={item.id}
                        className='bg-[#76a8f75e] rounded-lg group hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'
                        onClick={() => handleClick(item.id)}
                    >
                        <img
                            src={item.background_image}
                            alt={item.name}
                            className='h-[200px] rounded-lg object-cover'
                        />
                        <h2 className='dark:text-white p-2 text-[20px] font-bold'>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}