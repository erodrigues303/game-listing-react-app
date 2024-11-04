import React, {useEffect} from 'react'

export default function Banner({gameBanner}) {
    useEffect(() => {
        console.log("gameBanner",gameBanner)
    }, []);
    return (
        <div className='relative p-2'>
            <div className='absolute bottom-0 p-5 bg-gradient-to-t
            from-slate-900 to-transparent w-full rounded-lg'>
            <h2 className='text-[24px] text-white font-bold'>{gameBanner.name}</h2>
            <button className='bg-blue-700 text-white px-2 '>More Info</button>
            </div>
            <img src={gameBanner.background_image}
                 className='md:max-h-[520px] w-full object-cover rounded-lg'/>
        </div>
    )
}