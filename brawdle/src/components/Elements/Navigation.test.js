import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import NavigationWrapper from './Navigation';

describe('Navigation Component', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  it('should render navigation with home selected by default', () => {
    renderWithRouter(<NavigationWrapper />);
    expect(screen.getByLabelText('Home')).toBeChecked();
  });

  it('should navigate to Brawlers page on Brawlers tab click', () => {
    renderWithRouter(<NavigationWrapper />);
    fireEvent.click(screen.getByLabelText('Brawlers'));
    expect(screen.getByLabelText('Brawlers')).toBeChecked();
    expect(screen.getByText('BrawlerList')).toBeInTheDocument();
  });

  it('should navigate to Code page on Code tab click', () => {
    renderWithRouter(<NavigationWrapper />);
    fireEvent.click(screen.getByLabelText('Code'));
    expect(screen.getByLabelText('Code')).toBeChecked();
    expect(screen.getByText('GitHubCommits')).toBeInTheDocument();
  });

  it('should navigate to Help page on Help tab click', () => {
    renderWithRouter(<NavigationWrapper />);
    fireEvent.click(screen.getByLabelText('Help'));
    expect(screen.getByLabelText('Help')).toBeChecked();
    expect(screen.getByText('HelpForm')).toBeInTheDocument();
  });

  it('should navigate to About page on About tab click', () => {
    renderWithRouter(<NavigationWrapper />);
    fireEvent.click(screen.getByLabelText('About'));
    expect(screen.getByLabelText('About')).toBeChecked();
    expect(screen.getByText('AboutUs')).toBeInTheDocument();
  });

  it('should display Guess the Brawler on the Home page', () => {
    renderWithRouter(<NavigationWrapper />);
    expect(screen.getByText('Guess the Brawler')).toBeInTheDocument();
  });
});
