import React, {useEffect, useState} from 'react'
import GlobalApi from "../Services/GlobalApi.jsx";
import {useParams} from "react-router-dom";

export default function DescriptionAndReviews() {
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