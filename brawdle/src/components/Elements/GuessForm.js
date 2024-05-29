import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../Context";
import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const GuessForm = () => {
    const [guess, setGuess] = useState('');
    const [brawlers, setBrawlers] = useState([]);
    const { guesses, setGuesses } = useContext(Context);

    const handleInputChange = (event) => {
        setGuess(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { data } = await apiClient.post('/guess', { name: guess });
        setGuesses([...guesses, data]);
        setGuess(''); // Reset input
    };

    const handleOnStart = async () => {
        await apiClient.get('/start');
        const { data } = await apiClient.get("/brawlers");
        setBrawlers(data);
    };

    useEffect(() => {
        handleOnStart();
    }, []);

    return (
        <form id="guessForm" onSubmit={handleSubmit}>
            <div className="row-g-2">
                <div className="col-sm-i">
                    <input
                        type="text"
                        list="brawlerNames"
                        id="brawlerName"
                        placeholder="Enter brawler name"
                        value={guess}
                        onChange={handleInputChange}
                        required
                    />
                    <datalist id="brawlerNames">
                        {brawlers.map((brawler, index) => (
                            <option key={index} value={brawler}>{brawler}</option>
                        ))}
                    </datalist>
                </div>
                <div className="col-sm-ii">
                    <button type="submit" className="btn">Guess</button>
                </div>
            </div>
        </form>
    );
};

export default GuessForm;
