import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../context/Context";
import axios from "axios";
import Select from 'react-select';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../Styles/style-GuessForm.css';
import '../Styles/style-Global.css';
import JSConfetti from 'js-confetti';

const apiClient = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const MySwal = withReactContent(Swal);

const GuessForm = () => {
    const [guess, setGuess] = useState('');
    const [brawlers, setBrawlers] = useState([]);
    const [error, setError] = useState(''); // State to track error message
    const { guesses, setGuesses } = useContext(Context);

    const handleInputChange = (newValue) => {
        setGuess(newValue);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await apiClient.post('/guess', { name: guess });
            if (data.error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error,
                    customClass: {
                        confirmButton: 'swal2-confirm'
                    },
                    buttonsStyling: false,
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'custom-confirm-button'
                    }
                });
            } else {
                setGuesses([...guesses, data]);
                setGuess(''); // Reset input
                setError(''); // Reset error message
                if (data.isWinner) {
                    const jsConfetti = new JSConfetti();
                    jsConfetti.addConfetti();
                    setTimeout(function() {
                        window.location.reload();
                    }, 4000);
                }
            }
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There\'s no such brawler.',
                customClass: {
                    confirmButton: 'custom-confirm-button'
                },
                buttonsStyling: false,
                confirmButtonText: 'OK'
            });
        }
    };

    const handleOnStart = async () => {
        await apiClient.get('/start');
        const { data } = await apiClient.get("/brawlers");
        setBrawlers(data);
    };

    useEffect(() => {
        handleOnStart();
    }, []);

    const options = brawlers.map(brawler => ({ value: brawler, label: brawler }));

    return (
        <form id="guessForm" onSubmit={handleSubmit}>
            <div className="row-g-2">
                <div className="col-sm-i">
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
                    <button type="submit" className="btn">Guess</button>
                </div>
            </div>
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
        </form>
    );
};

export default GuessForm;
