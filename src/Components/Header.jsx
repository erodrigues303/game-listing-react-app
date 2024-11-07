import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';  
import logo from "./../assets/Images/logo 1.webp";
import { GiMagnifyingGlass, GiBarbedSun, GiMoonBats } from "react-icons/gi";
import { ThemeContext } from "../Context/ThemeContext.jsx";

export default function Header() {
    const [toggle, setToggle] = useState(true);
    const { theme, setTheme } = useContext(ThemeContext);
    const navigate = useNavigate();  

    useEffect(() => {
        console.log("Theme", theme);
    }, []);

    return (
        <div className="flex items-center p-3">
            <div onClick={() => navigate("/")} className="cursor-pointer">
                <img src={logo} width={60} height={60}/>
            </div>
                <div className="flex bg-slate-200 w-full p-2  mx-5 rounded-full item-center">
                    <GiMagnifyingGlass/>
                    <input
                        type="text"
                        placeholder="Search"
                        className="px-2 bg-transparent outline-none"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                navigate(`/search/${e.target.value}`);
                            }
                        }}
                    />
                </div>
                <div>
                    {theme === 'light' ? (
                        <GiMoonBats
                            className="text-[35px] bg-slate-200 text-black p-1 rounded-full cursor-pointer"
                            onClick={() => {
                                setTheme('dark');
                                localStorage.setItem('theme', 'dark')
                            }}
                        />
                    ) : (
                        <GiBarbedSun
                            className="text-[35px] bg-slate-200 text-black p-1 rounded-full cursor-pointer"
                            onClick={() => {
                                setTheme('light');
                                localStorage.setItem('theme', 'light')
                            }}
                        />
                    )}
                </div>
            </div>
            );
            }