//ZEBY DZIALAL: npm install --save-dev @testing-library/react @testing-library/jest-dom axios-mock-adapter

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { Context } from '../context/Context';
import GuessForm from './GuessForm';

const apiMock = new AxiosMockAdapter(axios);

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <Context.Provider {...providerProps}>{ui}</Context.Provider>,
    renderOptions
  );
};

describe('GuessForm Component', () => {
  const initialGuesses = [];
  const providerProps = {
    value: {
      guesses: initialGuesses,
      setGuesses: jest.fn(),
    },
  };

  beforeEach(() => {
    apiMock.reset();
  });

  it('should render the GuessForm component', async () => {
    apiMock.onGet('/api/start').reply(200);
    apiMock.onGet('/api/brawlers').reply(200, ['Shelly', 'Colt']);

    renderWithContext(<GuessForm />, { providerProps });

    await waitFor(() => expect(screen.getByPlaceholderText('Enter brawler name')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /guess/i })).toBeInTheDocument();
  });

  it('should allow a user to select a brawler and submit a guess', async () => {
    apiMock.onGet('/api/start').reply(200);
    apiMock.onGet('/api/brawlers').reply(200, ['Shelly', 'Colt']);
    apiMock.onPost('/api/guess').reply(200, { isWinner: false });

    renderWithContext(<GuessForm />, { providerProps });

    await waitFor(() => expect(screen.getByPlaceholderText('Enter brawler name')).toBeInTheDocument());

    const select = screen.getByPlaceholderText('Enter brawler name');
    fireEvent.change(select, { target: { value: 'Shelly' } });

    const button = screen.getByRole('button', { name: /guess/i });
    fireEvent.click(button);

    await waitFor(() => expect(providerProps.value.setGuesses).toHaveBeenCalled());
  });

  it('should show an error message if the guessed brawler is not found', async () => {
    apiMock.onGet('/api/start').reply(200);
    apiMock.onGet('/api/brawlers').reply(200, ['Shelly', 'Colt']);
    apiMock.onPost('/api/guess').reply(404);

    renderWithContext(<GuessForm />, { providerProps });

    await waitFor(() => expect(screen.getByPlaceholderText('Enter brawler name')).toBeInTheDocument());

    const select = screen.getByPlaceholderText('Enter brawler name');
    fireEvent.change(select, { target: { value: 'Unknown' } });

    const button = screen.getByRole('button', { name: /guess/i });
    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText('Nie ma takiego Brawlera.')).toBeInTheDocument());
  });

  it('should reload the page if the guessed brawler is correct', async () => {
    apiMock.onGet('/api/start').reply(200);
    apiMock.onGet('/api/brawlers').reply(200, ['Shelly', 'Colt']);
    apiMock.onPost('/api/guess').reply(200, { isWinner: true });

    const reloadMock = jest.spyOn(window.location, 'reload').mockImplementation(() => {});

    renderWithContext(<GuessForm />, { providerProps });

    await waitFor(() => expect(screen.getByPlaceholderText('Enter brawler name')).toBeInTheDocument());

    const select = screen.getByPlaceholderText('Enter brawler name');
    fireEvent.change(select, { target: { value: 'Shelly' } });

    const button = screen.getByRole('button', { name: /guess/i });
    fireEvent.click(button);

    await waitFor(() => expect(reloadMock).toHaveBeenCalled());

    reloadMock.mockRestore();
  });
});
