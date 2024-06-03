import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../context/Context";
import axios from "axios";
import Select from 'react-select';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../Styles/style-GuessForm.css';
import '../Styles/style-Global.css';
import JSConfetti from 'js-confetti';

// Utworzenie klienta Axios z podstawowym URL i nagłówkami
const apiClient = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Inicjalizacja SweetAlert z React
const MySwal = withReactContent(Swal);

const GuessForm = () => {
    const [guess, setGuess] = useState(''); // Stan przechowujący wprowadzoną wartość
    const [brawlers, setBrawlers] = useState([]); // Stan przechowujący listę Brawlerów
    const [error, setError] = useState(''); // Stan przechowujący komunikat błędu
    const { guesses, setGuesses } = useContext(Context); // Wykorzystanie kontekstu aplikacji

    // Obsługa zmiany wartości inputa
    const handleInputChange = (newValue) => {
        setGuess(newValue);
    };

    // Obsługa przesłania formularza
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await apiClient.post('/guess', { name: guess });
            setGuesses([...guesses, data]); // Aktualizacja listy zgadywań
            setGuess(''); // Zresetowanie inputa
            setError(''); // Wyczyszczenie komunikatu błędu
            if (data.isWinner) {
                const jsConfetti = new JSConfetti();
                jsConfetti.addConfetti(); // Dodanie konfetti po wygranej
                setTimeout(function() {
                    window.location.reload(); // Odświeżenie strony po 4 sekundach
                }, 4000);
            }
        } catch (error) {
            // Wyświetlenie komunikatu błędu przy braku pasującego Brawlera
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There is no such brawler.',
                customClass: {
                    confirmButton: 'custom-confirm-button'
                },
                confirmButtonText: 'OK',
            });
        }
    };

    // Pobranie listy Brawlerów i uruchomienie gry przy starcie komponentu
    const handleOnStart = async () => {
        await apiClient.get('/start');
        const { data } = await apiClient.get("/brawlers");
        setBrawlers(data);
    };

    useEffect(() => {
        handleOnStart();
    }, []);

    // Przygotowanie opcji dla selecta na podstawie listy Brawlerów
    const options = brawlers.map(brawler => ({ value: brawler, label: brawler }));

    return (
        <form id="guessForm" onSubmit={handleSubmit}>
            <div className="row-g-2">
                <div className="col-sm-i">
                    {/* Select do wybierania Brawlera */}
                    <Select
                        options={options}
                        value={options.find(option => option.value === guess)}
                        onChange={({ value }) => handleInputChange(value)}
                        placeholder="Enter brawler name"
                        isSearchable
                        required
                    />
                </div>
                <div className="col-sm-ii">
                    {/* Przycisk do zgadywania */}
                    <button type="submit" className="btn">Guess</button>
                </div>
            </div>
            {error && <div className="error-message">{error}</div>} {/* Wyświetlenie komunikatu błędu */}
        </form>
    );
};

export default GuessForm;
