import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarqueeLogo from '../Elements/MarqueeLogo';

describe('MarqueeLogo Component', () => {
  it('should render the MarqueeLogo component', () => {
    render(<MarqueeLogo />);

    // Check if the marquee elements are in the document
    const outerMarquee = screen.getByTestId('outer-marquee');
    const innerMarquee = screen.getByTestId('inner-marquee');

    expect(outerMarquee).toBeInTheDocument();
    expect(innerMarquee).toBeInTheDocument();

    // Check if the logo image is displayed
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', `${process.env.PUBLIC_URL}/media/logo.png`);
  });
});
