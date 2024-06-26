import React from 'react';
import VideoBackground from './components/Elements/VideoBackground';
import MarqueeLogo from './components/Elements/MarqueeLogo';
import Navigation from './components/Elements/Navigation';
import { Provider } from "./components/context/Context";

function App() {
    return (
        <div className="App">
            <Provider>
                <VideoBackground />
                <MarqueeLogo />
                <Navigation />
            </Provider>
        </div>
    );
}

export default App;
