import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Componenets/Header"; 
import SearchResults from "./Pages/SearchResults"; 
import { ThemeContext } from "./Context/ThemeContext.jsx"; 
import { useState, useEffect } from "react";

function App() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        setTheme(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <Router>
                <div className={`${theme} ${theme === 'dark' ? 'bg-[#121212]' : ''} min-h-[100vh]`}>
                    <Header />
                    <Routes> {}
                        <Route path="/" element={<Home />} /> {}
                        <Route path="/search" element={<SearchResults />} /> {}
                        <Route path="/" element={<Home />} />
                        <Route path="/game/:gameId" element={<GamePage />} />
                    </Routes>
                </div>
            </Router>
        </ThemeContext.Provider>
    );
}

export default App;