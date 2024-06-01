// ŻEBY DZIAŁAŁ: npm install --save-dev @testing-library/react @testing-library/jest-dom

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Context, Provider } from './Context';
import '@testing-library/jest-dom/extend-expect';

// A helper component to use the context
const TestComponent = () => {
  const { guesses, setGuesses } = React.useContext(Context);

  return (
    <div>
      <div data-testid="guesses">{JSON.stringify(guesses)}</div>
      <button onClick={() => setGuesses([...guesses, 'Test Guess'])}>Add Guess</button>
    </div>
  );
};

describe('Context Provider', () => {
  it('should provide initial context value', () => {
    render(
      <Provider>
        <TestComponent />
      </Provider>
    );

    const guessesElement = screen.getByTestId('guesses');
    expect(guessesElement).toHaveTextContent('[]');
  });

  it('should update context value when setGuesses is called', () => {
    render(
      <Provider>
        <TestComponent />
      </Provider>
    );

    const guessesElement = screen.getByTestId('guesses');
    const button = screen.getByText('Add Guess');

    expect(guessesElement).toHaveTextContent('[]');

    button.click();

    expect(guessesElement).toHaveTextContent('["Test Guess"]');
  });
});
