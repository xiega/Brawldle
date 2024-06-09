// ResultsTable.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Context } from '../context/Context';
import ResultsTable from '../Elements/ResultsTable';

const mockGuesses = [
    {
        guessedBrawler: {
            name: 'Shelly',
            rarity: 'Common',
            wallbreaker: true,
            base_health: 3600,
            release_year: 2018,
            image_url: 'https://cdn-fankit.brawlify.com/shelly_pin.png'
        },
        result: {
            name: true,
            rarity: true,
            wallbreaker: true,
            base_health: true,
            release_year: true
        },
        comparisons: {
            base_health: '',
            release_year: ''
        }
    }
];

test('renders table with correct data', () => {
    render(
        <Context.Provider value={{ guesses: mockGuesses }}>
            <ResultsTable />
        </Context.Provider>
    );

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockGuesses.length + 1); // Dodajemy 1, ponieważ pierwszy wiersz to nagłówek tabeli

    // Sprawdzanie, czy wiersze zawierają oczekiwane dane
    mockGuesses.forEach((guess) => {
        expect(screen.getByAltText(guess.guessedBrawler.name)).toBeInTheDocument();
        expect(screen.getByText(guess.guessedBrawler.rarity)).toBeInTheDocument();
        expect(screen.getByText(guess.guessedBrawler.wallbreaker ? 'Yes' : 'No')).toBeInTheDocument();
        expect(screen.getByText(guess.guessedBrawler.base_health.toString())).toBeInTheDocument();
        expect(screen.getByText(guess.guessedBrawler.release_year.toString())).toBeInTheDocument();
    });
});
