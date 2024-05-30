import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../Styles/style-Global.css';
import '../Styles/style-BrawlerList.css';

const apiClient = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const BrawlerList = () => {
    const [brawlers, setBrawlers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get("/brawlers-list");
                setBrawlers(response.data);
            } catch (error) {
                console.error("Error fetching brawlers:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="aside">
            <div className="brawler-list">
                {brawlers.map((brawler, index) => (
                    <div key={index} className="brawler-item">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src={brawler.image_url} alt={brawler.name} className="brawler-image" />
                                <div className="brawler-name">{brawler.name}</div>
                            </div>
                            <div className="flip-card-back">
                                <div className="brawler-name-f">{brawler.name}</div>
                                <div>Rarity: {brawler.rarity}</div>
                                <div>Health: {brawler.base_health}</div>
                                <div>Release: {brawler.release_year}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrawlerList;
