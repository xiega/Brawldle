// ZEBY DZIALAL: npm install --save-dev @testing-library/react @testing-library/jest-dom axios-mock-adapter

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import HelpForm from './HelpForm';

const apiMock = new AxiosMockAdapter(axios);

beforeEach(() => {
  apiMock.reset();
});

describe('HelpForm Component', () => {
  it('should render the HelpForm component', () => {
    render(<HelpForm />);

    expect(screen.getByText(/Report an Issue \/ Request Help/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Issue:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I consent to data processing./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should display a warning if email is invalid', async () => {
    render(<HelpForm />);

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'invalidemail' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address./i)).toBeInTheDocument();
    });
  });

  it('should display a warning if consent is not given', async () => {
    render(<HelpForm />);

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText(/Issue:/i), { target: { value: 'Test Issue' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Please consent to data processing./i)).toBeInTheDocument();
    });
  });

  it('should submit the form successfully with valid data', async () => {
    apiMock.onPost('/api/help').reply(200, { message: 'Form submitted successfully' });

    render(<HelpForm />);

    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Issue:/i), { target: { value: 'Test Issue' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByLabelText(/I consent to data processing./i));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Thank you for helping us 🧡/i)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Name:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Email:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Issue:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Description:/i)).toHaveValue('');
    expect(screen.getByLabelText(/I consent to data processing./i)).not.toBeChecked();
  });

  it('should handle server errors gracefully', async () => {
    apiMock.onPost('/api/help').reply(500);

    render(<HelpForm />);

    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Issue:/i), { target: { value: 'Test Issue' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByLabelText(/I consent to data processing./i));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error submitting the form/i)).toBeInTheDocument();
    });
  });
});
