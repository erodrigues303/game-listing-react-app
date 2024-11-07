import React, {useEffect, useState} from 'react'
import GlobalApi from "../Services/GlobalApi.jsx";
import {useParams} from "react-router-dom";

export default function ImageAndDetails() {
    const {gameId} = useParams();
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
            <img
                src={gameDetail.background_image}
                alt={gameDetail.name}
                className="w-full h-[400px] object-cover rounded-lg mt-4 p-2"
            />
            <p className="mt-2">Released: {gameDetail.released}</p>
            <p className="mt-2">Genres: {gameDetail.genres.map((genre) => genre.name).join(', ')}</p>
            <p className={`mt-2 ${gameDetail.esrb_rating ? '' : 'hidden'}`}>ESRB Rating: {gameDetail.esrb_rating.name}</p>
            <p className="mt-2">Platforms: {gameDetail.platforms.map((platform) => platform.platform.name).join(', ')}</p>
        </div>
    );
}