import React, { useEffect, useState } from 'react';
import GlobalApi from "../Services/GlobalApi";
import GamesDisplay from "./GamesDisplay";

export default function GamesBySearchResults({ searchQuery }) {
    const [searchResults, setSearchResults] = useState([]);
    const [sortOption, setSortOption] = useState('relevance');

    useEffect(() => {
        if (searchQuery) {
            fetchSearchResults(searchQuery);
            console.log("Search Query:", searchQuery);
        }
    }, [searchQuery]);

    const fetchSearchResults = async (query) => {
        try {
            const resp = await GlobalApi.getGamesBySearch(query);
            setSearchResults(handleSort(resp.data.results, sortOption));
        } catch (err) {
            console.error("Error fetching search results:", err);
        }
    };

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
            <h2 className="font-bold text-[30px] dark:text-white mt-5">Search Results for "{searchQuery}"</h2>
            <div className="">
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
            <GamesDisplay gameList={searchResults} /> {}
        </div>
    );
}