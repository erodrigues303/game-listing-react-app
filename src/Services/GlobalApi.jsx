import axios from "axios";

const key = "6c1fecc3488c451cb6cb9eee1d00807e";
const axiosCreate = axios.create({
    baseURL: 'https://api.rawg.io/api'
});

const getGenreList = axiosCreate.get(`/genres?key=${key}`);
const getAllGames = axiosCreate.get(`/games?key=${key}`);
const getGameListByGenreId = (id) => axiosCreate.get(`/games?key=${key}&genres=${id}`);
const getGamesBySearch = (query) => axiosCreate.get(`/games?key=${key}&search=${encodeURIComponent(query)}`);
        
export default {
    getGenreList,
    getAllGames,
    getGameListByGenreId,
    getGamesBySearch
};