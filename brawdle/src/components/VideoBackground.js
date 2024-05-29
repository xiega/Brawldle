import React from 'react';

const VideoBackground = () => (
    <video autoPlay muted loop id="background-video">
        <source src={`${process.env.PUBLIC_URL}/media/background.mp4`} type="video/mp4" />
    </video>
);

export default VideoBackground;
