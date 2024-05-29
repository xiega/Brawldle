import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Brawlers from "./Brawlers-list";
import '../../style.css';
import VideoBackground from './VideoBackground';
import MarqueeLogo from './MarqueeLogo';
import GuessForm from './GuessForm';
import ResultsTable from './ResultsTable';
import { Provider } from "../../Context";

const Navigation = () => {
    const [selected, setSelected] = useState('home');
    const navigate = useNavigate();

    const handleRadioChange = (id) => {
        setSelected(id);
        if (id === 'home') navigate('/');
        if (id === 'blog') navigate('/blog');
        if (id === 'code') navigate('/code');
        if (id === 'help') navigate('/help');
        if (id === 'about') navigate('/about');
    };

    return (
        <div className="container">
            <input type="radio" name="s" id="home" checked={selected === 'home'} onChange={() => handleRadioChange('home')} />
            <input type="radio" name="s" id="blog" checked={selected === 'blog'} onChange={() => handleRadioChange('blog')} />
            <input type="radio" name="s" id="code" checked={selected === 'code'} onChange={() => handleRadioChange('code')} />
            <input type="radio" name="s" id="help" checked={selected === 'help'} onChange={() => handleRadioChange('help')} />
            <input type="radio" name="s" id="about" checked={selected === 'about'} onChange={() => handleRadioChange('about')} />

            <nav>
                <div className={`slider ${selected}`} />

                <label style={{zIndex: '100'}} className={`home ${selected === 'home' ? 'active' : ''}`} htmlFor="home">
                    <i className="fas fa-home"></i>Home
                </label>
                <label style={{zIndex: '100'}} className={`blog ${selected === 'blog' ? 'active' : ''}`} htmlFor="blog">
                    <i className="fas fa-blog"></i>Blog
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

const NavigationWrapper = () => (
    <Router>
        <Navigation />
        <Routes>
            <Route path="/" element={<div className="article">
                <div className="input-container">
                    <h1>Guess the Brawler</h1>
                    <GuessForm/>
                </div>
                <div className="table-container">
                    <ResultsTable/>
                </div>
            </div>}/>
            <Route path="/blog" element={<Brawlers />}/>
            <Route path="/code" element={<div>Code Page</div>}/>
            <Route path="/help" element={<div>Help Page</div>}/>
            <Route path="/about" element={<div>About Page</div>}/>
        </Routes>
    </Router>
);

export default NavigationWrapper;
