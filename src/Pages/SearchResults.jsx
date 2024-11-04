import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GlobalApi from "../Services/GlobalApi";
import GamesDisplay from "../Componenets/GamesDisplay";

export default function SearchResults() {
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null); 
    const query = new URLSearchParams(location.search).get("q");

    useEffect(() => {
        if (query) {
            fetchSearchResults(query);
        }
    }, [query]);

    const fetchSearchResults = async (query) => {
        try {
            const resp = await GlobalApi.getGamesBySearch(query);
            setSearchResults(resp.data.results);
        } catch (err) {
            console.error("Error fetching search results:", err);
            setError("Failed to fetch search results. Please try again later.");
        }
    };

    return (
        <div className="px-5">
            <h2 className="font-bold text-[30px] dark:text-white mt-5">
                Search Results for "{query}"
            </h2>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <GamesDisplay gameList={searchResults} />
            )}
        </div>
    );
}