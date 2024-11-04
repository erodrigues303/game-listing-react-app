import React, {useEffect, useState} from 'react'
import GlobalApi from "../Services/GlobalApi.jsx";

export default function GenreList({genreId, seletedGenreName}) {

    const [genreList, setGenreList] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        getGenreList()
    }, []);
    const getGenreList=()=>{
        GlobalApi.getGenreList.then((resp)=>{
            console.log(resp.data.results);
            setGenreList(resp.data.results);
        })
    }

    return (
        <div>
            <h2 className='text-[30px] font-bold dark:text-white'>Genres</h2>
            {genreList.map((item, index) => (
                <div
                    key={index}
                    onClick={() => {setActiveIndex(index); genreId(item.id);
                        seletedGenreName(item.name)
                    }}
                    className={`flex gap-2 items-center mb-2 cursor-pointer
                hover:bg-gray-300 p-2 group
                rounded-lg hover:dark:bg-gray-600
                ${activeIndex === index ? 'bg-gray-300 dark:bg-gray-600' : ''}`}>
                    <img
                        src={item.image_background}
                        className='w-[40px] h-[40px] object-cover rounded-lg group-hover:scale-105 transition-all ease-out duration-300'
                        alt={`${item.name} background`} // Adding alt text for accessibility
                    />
                    <h3 className='dark:text-white text-[18px] group-hover:font-bold'>{item.name}</h3>
                </div>
            ))}
        </div>
    )
}