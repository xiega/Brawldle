// Context.js
import React, { createContext, useState } from 'react';

export const Context = createContext(null);

export const Provider = ({ children }) => {
    const [guesses, setGuesses] = useState([]);

    return (
        <Context.Provider value={{ guesses, setGuesses }}>
            {children}
        </Context.Provider>
    );
};
