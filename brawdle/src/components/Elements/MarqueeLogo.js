import React from 'react';
import '../Styles/style-MarqueeLogo.css';
import '../Styles/style-Global.css';

const MarqueeLogo = () => (
    // eslint-disable-next-line
    <marquee className={"marquee"} behavior="alternate" scrollamount="20">
        {/* eslint-disable-next-line*/}
        <marquee className={"marquee"} behavior="alternate" scrollamount="20" direction="down">
            <img id="logo" src={`${process.env.PUBLIC_URL}/media/logo.png`} alt="Logo" />
        </marquee>
    </marquee>
);

export default MarqueeLogo;
