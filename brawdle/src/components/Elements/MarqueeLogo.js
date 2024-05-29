import React from 'react';

const MarqueeLogo = () => (
    <marquee className={"marquee"} behavior="alternate" scrollamount="20">
        <marquee className={"marquee"} behavior="alternate" scrollamount="20" direction="down">
            <img id="logo" src={`${process.env.PUBLIC_URL}/media/logo.png`} alt="Logo" />
        </marquee>
    </marquee>
);

export default MarqueeLogo;
