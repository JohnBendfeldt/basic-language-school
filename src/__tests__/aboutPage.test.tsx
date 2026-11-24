import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import About from '../components/About';
import { LanguageProvider } from '../contexts/LanguageContext';
import App from '../App';

describe('About & Contact Component', () => {
  afterEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('renders the About & Contact page with core philosophy and creator details', () => {
    const handleNavigate = vi.fn();
    render(
      <LanguageProvider>
        <About onNavigate={handleNavigate} />
      </LanguageProvider>
    );

    // Title and philosophy
    expect(screen.getByRole('heading', { level: 2, name: /about & contact/i })).toBeInTheDocument();
    expect(screen.getByText(/no bulk\. no fluff\. no patronizing\. just learning\./i)).toBeInTheDocument();
    expect(screen.getByText(/genuinely free, ad-free bidirectional learning across 15 languages/i)).toBeInTheDocument();

    // Creator and contact
    const creatorLink = screen.getByRole('link', { name: 'John Bendfeldt' });
    expect(creatorLink).toHaveAttribute('href', 'https://johnbendfeldt.com');
    expect(creatorLink).toHaveAttribute('rel', 'noopener noreferrer author');
    const mailtoLinks = screen.getAllByRole('link', { name: /dev@basiclanguage\.school/i });
    expect(mailtoLinks.length).toBeGreaterThan(0);
    expect(mailtoLinks[0]).toHaveAttribute('href', 'mailto:dev@basiclanguage.school');

    // Navigation buttons
    const backBtn = screen.getByRole('button', { name: /back to practice/i });
    fireEvent.click(backBtn);
    expect(handleNavigate).toHaveBeenCalledWith('alphabet');

    const privacyBtn = screen.getByRole('button', { name: /privacy policy/i });
    fireEvent.click(privacyBtn);
    expect(handleNavigate).toHaveBeenCalledWith('privacy');

    const termsBtn = screen.getByRole('button', { name: /terms of service/i });
    fireEvent.click(termsBtn);
    expect(handleNavigate).toHaveBeenCalledWith('terms');
  });

  it('renders the About and author links in the app footer and navigates when clicked', async () => {
    render(<App />);

    const authorFooterLink = screen.getByRole('link', { name: 'John Bendfeldt' });
    expect(authorFooterLink).toHaveAttribute('href', 'https://johnbendfeldt.com');
    expect(authorFooterLink).toHaveAttribute('rel', 'noopener noreferrer author');

    const aboutFooterLink = screen.getByRole('link', { name: /about & contact/i });
    expect(aboutFooterLink).toBeInTheDocument();

    fireEvent.click(aboutFooterLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2, name: /about & contact/i })).toBeInTheDocument();
      expect(window.location.pathname).toBe('/about');
    });
  });

  it('renders directly when visiting /about route', async () => {
    window.history.pushState({}, '', '/about');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2, name: /about & contact/i })).toBeInTheDocument();
    });
  });
});
