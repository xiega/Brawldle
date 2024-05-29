import React, { useEffect, useContext, useState } from 'react';
import { Context } from "../Context";

const ResultsTable = () => {
    const { guesses } = useContext(Context);
    const [localGuesses, setLocalGuesses] = useState([]);

    useEffect(() => {
        console.log('Updating local guesses with context.guesses:', guesses);
        setLocalGuesses(guesses);
    }, [guesses]);

    return (
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
                    <td>
                        <img
                            className="pin"
                            src={guess.guessedBrawler.image_url}
                            alt={guess.guessedBrawler.name}
                        />
                    </td>
                    <td className={guess.result.rarity ? 'correct' : 'incorrect'}>
                        {guess.guessedBrawler.rarity}
                    </td>
                    <td className={guess.result.wallbreaker ? 'correct' : 'incorrect'}>
                        {guess.guessedBrawler.wallbreaker ? "Yes" : "No"}
                    </td>
                    <td className={guess.result.base_health ? 'correct' : 'incorrect'}>
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
