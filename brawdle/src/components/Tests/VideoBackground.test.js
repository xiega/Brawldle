import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoBackground from '../Elements/VideoBackground';
import '@testing-library/jest-dom';

describe('VideoBackground Component', () => {
    it('should render the VideoBackground component', () => {
        render(<VideoBackground />);
        const videoElement = screen.getByTestId('background-video');
        expect(videoElement).toBeInTheDocument();
    });

    it('should have the correct source for the background video', () => {
        render(<VideoBackground />);
        const videoElement = screen.getByTestId('background-video');
        const sourceElement = videoElement.querySelector('source');
        expect(sourceElement).toHaveAttribute('src', `${process.env.PUBLIC_URL}/media/background.mp4`);
        expect(sourceElement).toHaveAttribute('type', 'video/mp4');
    });

    it('should have autoplay, muted, and loop attributes set', () => {
        render(<VideoBackground />);
        const videoElement = screen.getByTestId('background-video');
        expect(videoElement).toHaveAttribute('autoPlay');
        expect(videoElement).toHaveAttribute('loop');
    });
});
