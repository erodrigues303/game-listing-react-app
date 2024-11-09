import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Banner({ gameBanner }) {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("gameBanner", gameBanner);
    }, [gameBanner]);

    const handleMoreInfoClick = () => {
        navigate(`/game/${gameBanner.id}`);
    };

    return (
        <div className='relative p-1'>
            <div className='absolute bottom-0 p-5 bg-gradient-to-t from-slate-900 to-transparent w-full rounded-lg'>
                <h2 className='text-[24px] text-white font-bold'>{gameBanner.name}</h2>
                <button
                    className='bg-blue-700 text-white px-2'
                    onClick={handleMoreInfoClick}
                >
                    More Info
                </button>
            </div>
            <img
                src={gameBanner.background_image}
                className='md:max-h-[520px] w-full object-cover rounded-lg'
                alt={gameBanner.name}
            />
        </div>
    );
}