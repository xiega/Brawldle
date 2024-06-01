import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import "../Styles/style-CommitList.css";

const GitHubCommits = () => {
    const [commits, setCommits] = useState([]); // Stan przechowujący listę commitów
    const [expandedCommit, setExpandedCommit] = useState(null); // Stan przechowujący zaznaczony commit do rozszerzenia

    useEffect(() => {
        // Utwórz nowy obiekt Octokit z autoryzacją


        // Funkcja pobierająca listę commitów z GitHuba
        const fetchCommits = async () => {
            try {
                const response = await octokit.rest.repos.listCommits({
                    owner: "xiega",
                    repo: "Brawldle",
                    per_page: 8 // Pobierz ostatnie 7 commitów
                });

                // Sformatuj dane commitów
                const formattedCommits = response.data.map((commit) => {
                    // Pobierz pierwsze 8 znaków jako tytuł projektu, a resztę jako opis
                    const project = commit.commit.message.substring(0, 8);
                    const version = commit.commit.message.substring(8, 15);
                    const message = commit.commit.message.substring(15);

                    // Pobierz dane autora
                    const authorName = commit.commit.author.name;
                    const authorAvatar = commit.author.avatar_url;
                    const authorUrl = commit.author.html_url;

                    return {
                        ...commit,
                        project,
                        version,
                        message,
                        authorName,
                        authorAvatar,
                        authorUrl
                    };
                });

                setCommits(formattedCommits); // Ustawienie stanu z sformatowanymi commitami
            } catch (error) {
                console.error("Błąd pobierania commitów:", error);
            }
        };
        fetchCommits(); // Wywołanie funkcji pobierającej commitów
    }, []);

    // Funkcja obsługująca kliknięcie na commit
    const handleCommitClick = (commit) => {
        setExpandedCommit(commit === expandedCommit ? null : commit);
    };

    return (
        <div className="container1">
            <h1 className="h1-commits">Lista Commitów</h1>
            <ul className="commit-list">
                {commits.map((commit) => (
                    <li key={commit.sha} className={`commit-item ${expandedCommit === commit ? 'expanded' : ''}`}>
                        {/* Nagłówek commita */}
                        <div className="commit-header" onClick={() => handleCommitClick(commit)}>
                            <div className={'autor'}>
                                {/* Obrazek i nazwa autora */}
                                <img className="commit-avatar" src={commit.authorAvatar} alt="Avatar autora"/>
                                <span className="commit-author">{commit.authorName}</span>
                            </div>
                            {/* Projekt i wersja commita oraz ikona rozwinięcia/zwiększenia */}
                            <span className="commit-version">{commit.project}{commit.version}</span>
                            <FontAwesomeIcon icon={expandedCommit === commit ? faAngleUp : faAngleDown} className="expand-icon"/>
                        </div>
                        {/* Opis commita */}
                        <div className="commit-description">
                            <p><strong>Date:</strong> {commit.commit.author.date}</p>
                            <p><strong>Message:</strong> {commit.message}</p>
                            <p><strong>Author URL:</strong> <a href={commit.authorUrl}>Link do githuba</a></p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GitHubCommits;
