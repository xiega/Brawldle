import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Context } from '../context/Context';
import ResultsTable from './ResultsTable';

describe('ResultsTable Component', () => {
    const mockGuesses = [
        {
            guessedBrawler: {
                image_url: 'image1_url',
                name: 'Brawler1',
                rarity: 'Rare',
                wallbreaker: true,
                base_health: 3000,
                release_year: 2020,
            },
            result: {
                rarity: true,
                wallbreaker: false,
                base_health: true,
                release_year: false,
            },
            comparisons: {
                base_health: '↑',
                release_year: '↓',
            },
        },
        {
            guessedBrawler: {
                image_url: 'image2_url',
                name: 'Brawler2',
                rarity: 'Legendary',
                wallbreaker: false,
                base_health: 2500,
                release_year: 2019,
            },
            result: {
                rarity: false,
                wallbreaker: true,
                base_health: false,
                release_year: true,
            },
            comparisons: {
                base_health: '↓',
                release_year: '↑',
            },
        },
    ];

    const renderWithContext = (guesses) => {
        return render(
            <Context.Provider value={{ guesses }}>
                <ResultsTable />
            </Context.Provider>
        );
    };

    it('renders the table headers correctly', () => {
        renderWithContext(mockGuesses);
        const headers = ['Brawler', 'Rarity', 'Wallbreaker', 'Base Health', 'Release Year'];
        headers.forEach(header => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });
    });

    it('renders the guessed brawlers correctly', () => {
        renderWithContext(mockGuesses);

        mockGuesses.forEach((guess, index) => {
            const { guessedBrawler } = guess;
            expect(screen.getByAltText(guessedBrawler.name)).toHaveAttribute('src', guessedBrawler.image_url);
            expect(screen.getAllByText(guessedBrawler.rarity)[index]).toHaveClass(guess.result.rarity ? 'correct' : 'incorrect');
            expect(screen.getAllByText(guessedBrawler.wallbreaker ? 'Yes' : 'No')[index]).toHaveClass(guess.result.wallbreaker ? 'correct' : 'incorrect');
            expect(screen.getAllByText(guessedBrawler.base_health.toString())[index]).toHaveClass(guess.result.base_health ? 'correct' : 'incorrect');
            expect(screen.getAllByText(guessedBrawler.release_year.toString())[index]).toHaveClass(guess.result.release_year ? 'correct' : 'incorrect');
        });
    });

    it('renders comparison icons correctly', () => {
        renderWithContext(mockGuesses);

        mockGuesses.forEach((guess, index) => {
            const { base_health, release_year } = guess.comparisons;

            if (base_health === '↑') {
                expect(screen.getAllByText(guess.guessedBrawler.base_health.toString())[index].nextSibling).toHaveClass('up');
            } else if (base_health === '↓') {
                expect(screen.getAllByText(guess.guessedBrawler.base_health.toString())[index].nextSibling).toHaveClass('down');
            }

            if (release_year === '↑') {
                expect(screen.getAllByText(guess.guessedBrawler.release_year.toString())[index].nextSibling).toHaveClass('up');
            } else if (release_year === '↓') {
                expect(screen.getAllByText(guess.guessedBrawler.release_year.toString())[index].nextSibling).toHaveClass('down');
            }
        });
    });

    it('updates when context changes', () => {
        const { rerender } = renderWithContext(mockGuesses);

        const newGuesses = [
            {
                guessedBrawler: {
                    image_url: 'new_image_url',
                    name: 'NewBrawler',
                    rarity: 'Epic',
                    wallbreaker: true,
                    base_health: 3200,
                    release_year: 2021,
                },
                result: {
                    rarity: true,
                    wallbreaker: true,
                    base_health: false,
                    release_year: true,
                },
                comparisons: {
                    base_health: '↓',
                    release_year: '',
                },
            },
        ];

        rerender(
            <Context.Provider value={{ guesses: newGuesses }}>
                <ResultsTable />
            </Context.Provider>
        );

        const { guessedBrawler } = newGuesses[0];
        expect(screen.getByAltText(guessedBrawler.name)).toHaveAttribute('src', guessedBrawler.image_url);
        expect(screen.getByText(guessedBrawler.rarity)).toHaveClass('correct');
        expect(screen.getByText('Yes')).toHaveClass('correct');
        expect(screen.getByText(guessedBrawler.base_health.toString())).toHaveClass('incorrect');
        expect(screen.getByText(guessedBrawler.release_year.toString())).toHaveClass('correct');
    });
});
