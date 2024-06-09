import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AboutUs from '../Elements/AboutUs.js'; // poprawna ścieżka do komponentu AboutUs


describe('AboutUs Component', () => {
  it('should render the AboutUs component', () => {
    render(<AboutUs />);

    // Check if each section with className 'about-us' is in the document
    const aboutSections = screen.getAllByTestId('about-section');
    expect(aboutSections).toHaveLength(3); // Assuming there are 3 sections

    // Check if each section contains an image with className 'pic' and alt text
    aboutSections.forEach((section) => {
      const image = section.querySelector('.pic');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt');

      // Check if each section contains text
      const text = section.querySelector('.text');
      expect(text).toBeInTheDocument();

      // Check if each section contains a 'hire me' link
      const hireLink = text.querySelector('.hire');
      expect(hireLink).toBeInTheDocument();
      expect(hireLink).toHaveAttribute('href');
      expect(hireLink).toHaveAttribute('target', '_blank');
    });
  });
});
