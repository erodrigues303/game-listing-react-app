import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../Services/GlobalApi';
import { useNavigate } from 'react-router-dom';

export default function GameDetailPage() {
    const { gameId } = useParams();
    const [gameDetail, setGameDetail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGameDetail = async () => {
            try {
                const response = await GlobalApi.getGameById(gameId);
                const englishDescription = getEnglishDescription(response.data.description);
                setGameDetail({ ...response.data, description: englishDescription });
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        };

        fetchGameDetail();
    }, [gameId]);

    const getEnglishDescription = (htmlDescription) => {
        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(htmlDescription, 'text/html');
        const plainText = parsedHtml.body.textContent || '';

        const englishTextMatch = plainText.match(/^[\s\S]+?(?=Español|$)/i);
        return englishTextMatch ? englishTextMatch[0].trim() : plainText;
    };

    if (!gameDetail) return <p>Loading...</p>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6"  >
            {}
            <div className="lg:col-span-1 space-y-4 bg-[#76a8f75e] rounded-lg p-4">
                <img
                    src={gameDetail.background_image}
                    alt={gameDetail.name}
                    className="w-full h-[550px] object-cover rounded-2xl shadow-lg transition-transform "
                />
                <div className="dark:text-gray-200 space-y-2">
                    <p className="text-2xl font-semibold">Released: <span className="font-normal">{gameDetail.released}</span></p>
                    <p className="text-2xl font-semibold">Genres: <span className="font-normal">{gameDetail.genres.map((genre) => genre.name).join(', ')}</span></p>
                    {gameDetail.esrb_rating && (
                        <p className="text-2xl font-semibold">ESRB Rating: <span className="font-normal">{gameDetail.esrb_rating.name}</span></p>
                    )}
                    <p className="text-2xl font-semibold">Platforms: <span className="font-normal">{gameDetail.platforms.map((platform) => platform.platform.name).join(', ')}</span></p>
                </div>
            </div>

            {}
            <div className="lg:col-span-2 space-y-4 p-4 bg-[#121212] rounded-lg">
                <h1 className="text-6xl font-bold text-white mb-2">
                    {gameDetail.name}
                    <span className="p-1 rounded-sm ml-2 text-[30px] bg-green-100 text-green-700 font-medium">
                        {gameDetail.metacritic}
                    </span>
                </h1>
                <p className="text-2xl text-gray-300 mb-6">{gameDetail.description}</p>
                <div className="flex items-center gap-4">
                    <p className="text-2xl text-gray-200 font-semibold">Rating: {gameDetail.rating}</p>
                    <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                    onClick={() => window.open(`https://www.metacritic.com/game/${gameDetail.slug}`, '_blank')}
                    >
                        Leave Review
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                    onClick={() => window.open(`https://www.gamestop.ca/SearchResult/QuickSearch?q=${gameDetail.slug}`, '_blank')}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}