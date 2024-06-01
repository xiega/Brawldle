import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import '../Styles/style-Navigation.css';
import GuessForm from './GuessForm';
import ResultsTable from './ResultsTable';
import BrawlerList from "./BrawlerList";
import About from './AboutUs';
import HelpForm from './HelpForm';
import GitHubCommits from './CommitList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull } from '@fortawesome/free-solid-svg-icons';
import '../Styles/style-Global.css';

const Navigation = () => {
    // Stan do śledzenia aktualnie wybranej zakładki
    const [selected, setSelected] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Ustawienie wybranej zakładki na podstawie bieżącej ścieżki
        const path = location.pathname;
        if (path === '/') setSelected('home');
        else if (path === '/brawlers') setSelected('brawlers');
        else if (path === '/code') setSelected('code');
        else if (path === '/help') setSelected('help');
        else if (path === '/about') setSelected('about');
    }, [location.pathname]);

    // Obsługa zmiany zakładki
    const handleRadioChange = (id) => {
        setSelected(id);
        if (id === 'home') navigate('/');
        if (id === 'brawlers') navigate('/brawlers');
        if (id === 'code') navigate('/code');
        if (id === 'help') navigate('/help');
        if (id === 'about') navigate('/about');
    };

    return (
        // Kontener nawigacji
        <div className="container">
            {/* Inputy radio dla każdej zakładki */}
            <input type="radio" name="s" id="home" checked={selected === 'home'} onChange={() => handleRadioChange('home')} />
            <input type="radio" name="s" id="brawlers" checked={selected === 'brawlers'} onChange={() => handleRadioChange('brawlers')} />
            <input type="radio" name="s" id="code" checked={selected === 'code'} onChange={() => handleRadioChange('code')} />
            <input type="radio" name="s" id="help" checked={selected === 'help'} onChange={() => handleRadioChange('help')} />
            <input type="radio" name="s" id="about" checked={selected === 'about'} onChange={() => handleRadioChange('about')} />

            {/* Nawigacja */}
            <nav>
                {/* Pasek przesuwający się, który wskazuje aktualnie wybraną zakładkę */}
                <div className={`slider ${selected}`} />

                {/* Zakładki nawigacji */}
                <label style={{zIndex: '100'}} className={`home ${selected === 'home' ? 'active' : ''}`} htmlFor="home">
                    <i className="fas fa-home"></i>Home
                </label>
                <label style={{zIndex: '100'}} className={`brawlers ${selected === 'brawlers' ? 'active' : ''}`} htmlFor="brawlers">
                    <i><FontAwesomeIcon icon={faSkull}/></i>Brawlers
                </label>
                <label style={{zIndex: '100'}} className={`code ${selected === 'code' ? 'active' : ''}`} htmlFor="code">
                    <i className="fas fa-code"></i>Code
                </label>
                <label style={{zIndex: '100'}} className={`help ${selected === 'help' ? 'active' : ''}`} htmlFor="help">
                    <i className="fas fa-envelope"></i>Help
                </label>
                <label style={{zIndex: '100'}} className={`about ${selected === 'about' ? 'active' : ''}`} htmlFor="about">
                    <i className="fas fa-user"></i>About
                </label>
            </nav>
        </div>
    );
};

// Komponent zawierający nawigację i trasy
const NavigationWrapper = () => (
    <Router>
        <Navigation />
        <Routes>
            {/* Trasy dla poszczególnych ścieżek */}
            <Route path="/" element={<div className="article">
                <div className="input-container">
                    <h1>Guess the Brawler</h1>
                    <GuessForm/>
                </div>
                <div className="table-container">
                    <ResultsTable/>
                </div>
            </div>}/>
            <Route path="/brawlers" element={<BrawlerList />}/>
            <Route path="/code" element={<GitHubCommits />}/>
            <Route path="/help" element={<HelpForm />}/>
            <Route path="/about" element={<About />}/>
        </Routes>
    </Router>
);

export default NavigationWrapper;
