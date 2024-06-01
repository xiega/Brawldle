import React, { useEffect, useContext, useState } from 'react';
import { Context } from "../context/Context";
import '../Styles/style-ResultsTable.css';
import '../Styles/style-Global.css';

const ResultsTable = () => {
    // Pobranie stanu z globalnego kontekstu
    const { guesses } = useContext(Context);
    // Lokalny stan do śledzenia zmian w danych
    const [localGuesses, setLocalGuesses] = useState([]);

    // Efekt aktualizujący stan lokalny po zmianach w globalnym kontekście
    useEffect(() => {
        console.log('Updating local guesses with context.guesses:', guesses);
        setLocalGuesses(guesses);
    }, [guesses]);

    return (
        // Tabela wyników
        <table className="table">
            <thead>
            <tr>
                <th>Brawler</th>
                <th>Rarity</th>
                <th>Wallbreaker</th>
                <th>Base Health</th>
                <th>Release Year</th>
            </tr>
            </thead>
            <tbody>
            {localGuesses.map((guess, index) => (
                <tr key={index}>
                    {/* Obrazek postaci */}
                    <td>
                        <img
                            className="pin"
                            src={guess.guessedBrawler.image_url}
                            alt={guess.guessedBrawler.name}
                        />
                    </td>
                    {/* Zgodność lub niezgodność z przewidywaniami */}
                    <td className={guess.result.rarity ? 'correct' : 'incorrect'}>
                        {guess.guessedBrawler.rarity}
                    </td>
                    <td className={guess.result.wallbreaker ? 'correct' : 'incorrect'}>
                        {guess.guessedBrawler.wallbreaker ? "Yes" : "No"}
                    </td>
                    <td className={guess.result.base_health ? 'correct' : 'incorrect'}>
                        {/* Zdrowie bazowe z dodatkową ikoną wskazującą na zmianę */}
                        {guess.guessedBrawler.base_health}
                        <span className={
                            guess.comparisons.base_health === '↑'
                                ? 'up'
                                : guess.comparisons.base_health === '↓'
                                    ? 'down'
                                    : ''
                        }>
                          {guess.comparisons.base_health}
                        </span>
                    </td>
                    <td className={guess.result.release_year ? 'correct' : 'incorrect'}>
                        {/* Rok wydania z dodatkową ikoną wskazującą na zmianę */}
                        {guess.guessedBrawler.release_year}
                        <span className={
                            guess.comparisons.release_year === '↑'
                                ? 'up'
                                : guess.comparisons.release_year === '↓'
                                    ? 'down'
                                    : ''
                        }>
                          {guess.comparisons.release_year}
                        </span>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ResultsTable;
