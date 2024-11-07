import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../Services/GlobalApi';

export default function GameDetailPage() {
    const { gameId } = useParams();
    const [gameDetail, setGameDetail] = useState(null);

    useEffect(() => {
        const fetchGameDetail = async () => {
            try {
                const response = await GlobalApi.getGameById(gameId);
                setGameDetail(response.data);
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        };

        fetchGameDetail();
    }, [gameId]);

    if (!gameDetail) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold">{gameDetail.name}</h1>
            <img
                src={gameDetail.background_image}
                alt={gameDetail.name}
                className="w-full h-[400px] object-cover rounded-lg mt-4"
            />
            <p className="mt-2">Metacritic: {gameDetail.metacritic}</p>
            <p className="mt-2">Rating: {gameDetail.rating}</p>
            <p className="mt-2">{gameDetail.description}</p>
            <p className="mt-2">Released: {gameDetail.released}</p>
            <p className="mt-2">Genres: {gameDetail.genres.map((genre) => genre.name).join(', ')}</p>
            <p className={`mt-2 ${gameDetail.esrb_rating ? '' : 'hidden'}`}>ESRB Rating: {gameDetail.esrb_rating.name}</p>
            <p className="mt-2">Platforms: {gameDetail.platforms.map((platform) => platform.platform.name).join(', ')}</p>
        </div>
    );
}