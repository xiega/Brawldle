// ZEBY DZIALAL: npm install --save-dev @testing-library/react @testing-library/jest-dom msw

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import GitHubCommits from './CommitList';

const server = setupServer(
  rest.get('https://api.github.com/repos/xiega/Brawldle/commits', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          sha: '1',
          commit: {
            message: 'Proj1 v1.0.0 Commit message 1',
            author: { name: 'Author 1', date: '2023-05-01T00:00:00Z' },
          },
          author: {
            avatar_url: 'http://example.com/avatar1.png',
            html_url: 'http://example.com/author1',
          },
        },
        {
          sha: '2',
          commit: {
            message: 'Proj2 v1.0.1 Commit message 2',
            author: { name: 'Author 2', date: '2023-06-01T00:00:00Z' },
          },
          author: {
            avatar_url: 'http://example.com/avatar2.png',
            html_url: 'http://example.com/author2',
          },
        },
      ])
    );
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('GitHubCommits Component', () => {
  it('should render the list of commits from API', async () => {
    render(<GitHubCommits />);

    await waitFor(() => expect(screen.getByText('Lista Commitów')).toBeInTheDocument());

    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Author 2')).toBeInTheDocument();

    expect(screen.getByText('Proj1 v1.0.0')).toBeInTheDocument();
    expect(screen.getByText('Proj2 v1.0.1')).toBeInTheDocument();
  });

  it('should expand and collapse commit details on click', async () => {
    render(<GitHubCommits />);

    await waitFor(() => expect(screen.getByText('Author 1')).toBeInTheDocument());

    expect(screen.queryByText('Date: 2023-05-01T00:00:00Z')).not.toBeVisible();
    expect(screen.queryByText('Message: Commit message 1')).not.toBeVisible();

    fireEvent.click(screen.getByText('Author 1'));

    expect(screen.getByText('Date: 2023-05-01T00:00:00Z')).toBeVisible();
    expect(screen.getByText('Message: Commit message 1')).toBeVisible();

    fireEvent.click(screen.getByText('Author 1'));

    expect(screen.queryByText('Date: 2023-05-01T00:00:00Z')).not.toBeVisible();
    expect(screen.queryByText('Message: Commit message 1')).not.toBeVisible();
  });
});
