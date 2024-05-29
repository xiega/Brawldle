import React from 'react';
import VideoBackground from './components/VideoBackground';
import MarqueeLogo from './components/MarqueeLogo';
import Navigation from './components/Navigation';
import GuessForm from './components/GuessForm';
import ResultsTable from './components/ResultsTable';
import { Provider } from "./Context";

function App() {
    return (
        <div className="App">
            <Provider>
                <VideoBackground />
                <MarqueeLogo />
                <Navigation />
                <div className="article">
                    <div className="input-container">
                        <h1>Guess the Brawler</h1>
                        <GuessForm />
                    </div>
                    <div className="table-container">
                        <ResultsTable />
                    </div>
                </div>
            </Provider>
        </div>
    );
}

export default App;
