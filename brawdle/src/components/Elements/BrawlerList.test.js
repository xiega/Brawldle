// ZEBY DZIALAL : npm install --save-dev @testing-library/react @testing-library/jest-dom axios-mock-adapter

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import BrawlerList from './BrawlerList';

// Create a mock Axios instance
const mock = new AxiosMockAdapter(axios);

// Sample data to be returned by the mock API
const brawlers = [
  {
    name: 'Shelly',
    image_url: 'http://localhost/media/shelly.png',
    rarity: 'Common',
    base_health: 3600,
    release_year: 2017,
  },
  {
    name: 'Colt',
    image_url: 'http://localhost/media/colt.png',
    rarity: 'Common',
    base_health: 2800,
    release_year: 2017,
  },
];

describe('BrawlerList Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should render the list of brawlers from API', async () => {
    // Mock the GET request to return the sample data
    mock.onGet('http://localhost:4000/api/brawlers-list').reply(200, brawlers);

    render(<BrawlerList />);

    // Wait for the elements to be rendered
    await waitFor(() => expect(screen.getByText('Shelly')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Colt')).toBeInTheDocument());

    // Check if the brawler names are rendered
    expect(screen.getByText('Shelly')).toBeInTheDocument();
    expect(screen.getByText('Colt')).toBeInTheDocument();

    // Check if the brawler images are rendered
    expect(screen.getByAltText('Shelly')).toBeInTheDocument();
    expect(screen.getByAltText('Colt')).toBeInTheDocument();
  });

  it('should display an error message if the API call fails', async () => {
    console.error = jest.fn(); // Mock console.error to avoid cluttering the test output

    // Mock the GET request to return an error
    mock.onGet('http://localhost:4000/api/brawlers-list').reply(500);

    render(<BrawlerList />);

    // Wait for the console error to be called
    await waitFor(() => expect(console.error).toHaveBeenCalledWith('Błąd podczas pobierania Brawlerów:', expect.any(Error)));
  });
});
