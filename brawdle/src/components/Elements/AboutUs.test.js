// ZEBY DZIALALO: npm install --save-dev @testing-library/react @testing-library/jest-dom


import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AboutUs from './AboutUs';

describe('AboutUs Component', () => {
  it('should render the AboutUs component with Xiega section', () => {
    render(<AboutUs />);

    // Check if Xiega section is rendered
    const xiegaHeading = screen.getByText('Xiega');
    const xiegaRole = screen.getByText(/Front-end Developer &/i);
    const xiegaDescription = screen.getByText(/Hey there! I'm passionate about crafting/i);
    const xiegaImage = screen.getByAltText('GigaChad');
    const xiegaLink = screen.getByText('Hire Me').closest('a');

    expect(xiegaHeading).toBeInTheDocument();
    expect(xiegaRole).toBeInTheDocument();
    expect(xiegaDescription).toBeInTheDocument();
    expect(xiegaImage).toBeInTheDocument();
    expect(xiegaLink).toHaveAttribute('href', 'https://github.com/xiega');
  });

  it('should render the AboutUs component with DajWaj section', () => {
    render(<AboutUs />);

    // Check if DajWaj section is rendered
    const dajWajHeading = screen.getByText('DajWaj');
    const dajWajRole = screen.getByText(/Back-end Developer &/i);
    const dajWajDescription = screen.getByText(/Hi, I'm your go-to person for all things/i);
    const dajWajImage = screen.getByAltText('Goose');
    const dajWajLink = screen.getByText('Hire Me').closest('a');

    expect(dajWajHeading).toBeInTheDocument();
    expect(dajWajRole).toBeInTheDocument();
    expect(dajWajDescription).toBeInTheDocument();
    expect(dajWajImage).toBeInTheDocument();
    expect(dajWajLink).toHaveAttribute('href', 'https://github.com/DajWaj');
  });

  it('should render the AboutUs component with Dzilnoreq section', () => {
    render(<AboutUs />);

    // Check if Dzilnoreq section is rendered
    const dzilnoreqHeading = screen.getByText('Dzilnoreq');
    const dzilnoreqRole = screen.getByText(/Tester Master &/i);
    const dzilnoreqDescription = screen.getByText(/Greetings! I'm on a mission to ensure/i);
    const dzilnoreqImage = screen.getByAltText('Elon');
    const dzilnoreqLink = screen.getByText('Hire Me').closest('a');

    expect(dzilnoreqHeading).toBeInTheDocument();
    expect(dzilnoreqRole).toBeInTheDocument();
    expect(dzilnoreqDescription).toBeInTheDocument();
    expect(dzilnoreqImage).toBeInTheDocument();
    expect(dzilnoreqLink).toHaveAttribute('href', 'https://github.com/Dzilne');
  });
});
