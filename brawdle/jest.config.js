module.exports = {
    setupFilesAfterEnv: ['./src/setupTests.js'], // Tutaj dodaj ścieżkę do pliku setupTests.js
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest', // Użyj transformacji Babel dla plików JS lub JSX
        '^.+\\.tsx?$': 'ts-jest', // Użyj transformacji TypeScript dla plików TS lub TSX
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Użyj identity-obj-proxy dla plików CSS
    },
};
