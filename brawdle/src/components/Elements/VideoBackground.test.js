import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VideoBackground from './VideoBackground';

describe('VideoBackground Component', () => {
    beforeAll(() => {
        process.env.PUBLIC_URL = ''; 
    });

    it('renders the video element with correct attributes', () => {
        render(<VideoBackground />);

        const videoElement = screen.getByRole('video');
        expect(videoElement).toBeInTheDocument();
        expect(videoElement).toHaveAttribute('autoPlay');
        expect(videoElement).toHaveAttribute('muted');
        expect(videoElement).toHaveAttribute('loop');
        expect(videoElement).toHaveAttribute('id', 'background-video');
    });

    it('renders the source element with the correct src and type', () => {
        render(<VideoBackground />);

        const sourceElement = screen.getByRole('video').querySelector('source');
        expect(sourceElement).toBeInTheDocument();
        expect(sourceElement).toHaveAttribute('src', '/media/background.mp4');
        expect(sourceElement).toHaveAttribute('type', 'video/mp4');
    });
});
