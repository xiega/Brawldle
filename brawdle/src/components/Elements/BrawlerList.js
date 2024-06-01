import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../Styles/style-Global.css';
import '../Styles/style-BrawlerList.css';

// Konfiguracja klienta Axios z podstawowym URL i nagłówkami
const apiClient = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const BrawlerList = () => {
    const [brawlers, setBrawlers] = useState([]);

    // useEffect do pobrania danych z API po załadowaniu komponentu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get("/brawlers-list");
                setBrawlers(response.data); // Ustawienie stanu z pobranymi danymi Brawlerów
            } catch (error) {
                console.error("Błąd podczas pobierania Brawlerów:", error);
            }
        };

        fetchData(); // Wywołanie funkcji pobierającej dane
    }, []);

    return (
        <div className="aside">
            <div className="brawler-list">
                {brawlers.map((brawler, index) => (
                    <div key={index} className="brawler-item">
                        <div className="flip-card-inner">
                            {/* Przednia strona karty */}
                            <div className="flip-card-front">
                                <img src={brawler.image_url} alt={brawler.name} className="brawler-image" />
                                <div className="brawler-name">{brawler.name}</div>
                            </div>
                            {/* Tylna strona karty */}
                            <div className="flip-card-back">
                                <div className="brawler-name-f">{brawler.name}</div>
                                <div>Rzadkość: {brawler.rarity}</div>
                                <div>Zdrowie: {brawler.base_health}</div>
                                <div>Rok wydania: {brawler.release_year}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrawlerList;
