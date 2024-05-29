import React, { useState } from 'react';
import '../style.css';

const Navigation = () => {
    const [selected, setSelected] = useState('home'); // Użyjemy stanu, aby śledzić zaznaczony radiobutton

    const handleRadioChange = (id) => {
        setSelected(id); // Po zmianie radiobuttona aktualizujemy stan
    };

    return (
        <div className="container">
            {/* Dodajemy zdarzenie onChange do każdego radiobuttona */}
            <input type="radio" name="s" id="home" checked={selected === 'home'} onChange={() => handleRadioChange('home')} />
            <input type="radio" name="s" id="blog" checked={selected === 'blog'} onChange={() => handleRadioChange('blog')} />
            <input type="radio" name="s" id="code" checked={selected === 'code'} onChange={() => handleRadioChange('code')} />
            <input type="radio" name="s" id="help" checked={selected === 'help'} onChange={() => handleRadioChange('help')} />
            <input type="radio" name="s" id="about" checked={selected === 'about'} onChange={() => handleRadioChange('about')} />

            <nav>
                {/* Dodajemy klasę 'active' do .slider, jeśli odpowiedni radiobutton jest zaznaczony */}
                <div className={`slider ${selected}`} />

                <label style={{zIndex: '100'}} className="home" htmlFor="home">
                    <i className="fas fa-home"></i>Home
                </label>
                <label style={{zIndex: '100'}} className="blog" htmlFor="blog">
                    <i className="fas fa-blog"></i>Blog
                </label>
                <label style={{zIndex: '100'}} className="code" htmlFor="code">
                    <i className="fas fa-code"></i>Code
                </label>
                <label style={{zIndex: '100'}} className="help" htmlFor="help">
                    <i className="fas fa-envelope"></i>Help
                </label>
                <label style={{zIndex: '100'}} className="about" htmlFor="about">
                    <i className="fas fa-user"></i>About
                </label>
            </nav>
        </div>
    );
};

export default Navigation;
