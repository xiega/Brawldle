import React from 'react';
import '../Styles/style-VideoBackground.css';
import '../Styles/style-Global.css';

const VideoBackground = () => (
    <video autoPlay muted loop id="background-video" data-testid="background-video">
        <source src={`${process.env.PUBLIC_URL}/media/background.mp4`} type="video/mp4" />
    </video>
);

export default VideoBackground;
