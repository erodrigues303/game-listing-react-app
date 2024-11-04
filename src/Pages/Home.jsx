import React, {useEffect, useState} from 'react'
import GenreList from "../Componenets/GenreList.jsx";
import GlobalApi from "../Services/GlobalApi.jsx";
import Banner from "../Componenets/Banner.jsx";
import TrendingGames from "../Componenets/TrendingGames.jsx";
import GamesByGenresId from "../Componenets/GamesByGenresId.jsx";

export default function Home() {
    const [allGamesList, setAllGamesList] = useState()
    const [gameListByGenres, setGameListByGenres] = useState([])
    const [selectedGenreName, setSelectedGenreName] = useState('Action')
    useEffect(() => {
        getAllGamesList();
        getGameListByGenreId(4);
    }, []);

    const getAllGamesList = () => {
        GlobalApi.getAllGames.then((resp) => {
            console.log(resp.data.results)
            setAllGamesList(resp.data.results)
            setGameListByGenres(resp.data.results)
        })
    }

    const getGameListByGenreId=(id)=> {
        console.log("GENREID", id)
        GlobalApi.getGameListByGenreId(id).then((resp) => {
            setGameListByGenres(resp.data.results)
        })
    }

    return (
        <div className='grid grid-cols-4 px-5'>
            <div className='hidden md:block'>
                <GenreList genreId={(genreId)=>getGameListByGenreId(genreId)}
                    seletedGenreName={(name)=>setSelectedGenreName(name)}/>
            </div>
            <div className='col-span-4 md:col-span-3'>
                {allGamesList?.length > 0 ?
                    <div>
                        <Banner gameBanner={allGamesList[0]}/>
                        <TrendingGames gameList={allGamesList}/>
                        <GamesByGenresId gameList={gameListByGenres}
                        selectedGenreName={selectedGenreName}/>
                    </div>
                    : null}
            </div>
        </div>
    )
}