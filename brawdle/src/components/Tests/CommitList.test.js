import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import GitHubCommits from "../Elements/CommitList"; // Upewnij się, że ścieżka jest poprawna
import { Octokit } from "@octokit/rest";

// Mockowanie Octokit
jest.mock("@octokit/rest", () => {
    return {
        Octokit: jest.fn().mockImplementation(() => {
            return {
                rest: {
                    repos: {
                        listCommits: jest.fn().mockResolvedValue({
                            data: [
                                {
                                    sha: "123",
                                    commit: {
                                        message: "Initial commit",
                                        author: {
                                            name: "Author1",
                                            date: "2023-06-01T00:00:00Z"
                                        }
                                    },
                                    author: {
                                        avatar_url: "https://example.com/avatar1.png",
                                        html_url: "https://github.com/author1"
                                    }
                                },
                                {
                                    sha: "456",
                                    commit: {
                                        message: "Update README",
                                        author: {
                                            name: "Author2",
                                            date: "2023-06-02T00:00:00Z"
                                        }
                                    },
                                    author: {
                                        avatar_url: "https://example.com/avatar2.png",
                                        html_url: "https://github.com/author2"
                                    }
                                }
                            ]
                        })
                    }
                }
            };
        })
    };
});

describe("GitHubCommits component", () => {
    it("renders commits correctly", async () => {
        // Renderowanie komponentu
        render(<GitHubCommits />);

        // Sprawdzanie, czy nagłówek jest wyświetlany
        expect(screen.getByText("Commit List")).toBeInTheDocument();

        // Sprawdzanie, czy commity są wyświetlane
        await waitFor(() => {
            expect(screen.getByText("Author1")).toBeInTheDocument();
            expect(screen.getByText("Initial commit")).toBeInTheDocument();
            expect(screen.getByText("Author2")).toBeInTheDocument();
            expect(screen.getByText("Update README")).toBeInTheDocument();
        });
    });
});
