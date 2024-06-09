import React, { createContext } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from '../context/Context';
import { Context } from '../context/Context';

describe('Provider Component', () => {
    it('should render the Provider component', () => {
        const TestComponent = () => {
            const context = React.useContext(Context);
            return <div data-testid="context">{JSON.stringify(context)}</div>;
        };

        render(
            <Provider>
                <TestComponent />
            </Provider>
        );

        const contextElement = screen.getByTestId('context');

        expect(contextElement).toBeInTheDocument();
        expect(contextElement.textContent).toBe('{"guesses":[]}'); // Assuming initial state is an empty array
    });
});
