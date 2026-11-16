import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  afterEach(() => {
    window.history.pushState({}, '', '/');
  });

  test('renders Basic Russian heading', async () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', { name: /basic russian/i, level: 1 });
    expect(headingElement).toBeInTheDocument();
    await waitFor(() => expect(document.querySelector('.loading-section')).toBeNull());
  });

  test('navigates to Privacy Policy when clicking footer link', async () => {
    render(<App />);
    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
    fireEvent.click(privacyLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Privacy Policy', level: 2 })).toBeInTheDocument();
      expect(window.location.pathname).toBe('/privacy');
    });
  });

  test('navigates to Terms of Service when clicking footer link', async () => {
    render(<App />);
    const termsLink = screen.getByRole('link', { name: /terms of service/i });
    fireEvent.click(termsLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Terms of Service', level: 2 })).toBeInTheDocument();
      expect(window.location.pathname).toBe('/terms');
    });
  });

  test('renders Privacy Policy when loaded directly at /privacy', async () => {
    window.history.pushState({}, '', '/privacy');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Privacy Policy', level: 2 })).toBeInTheDocument();
    });
  });

  test('renders Terms of Service when loaded directly at /terms', async () => {
    window.history.pushState({}, '', '/terms');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Terms of Service', level: 2 })).toBeInTheDocument();
    });
  });

  test('navigates back to practice from Privacy Policy', async () => {
    window.history.pushState({}, '', '/privacy');
    render(<App />);

    const backBtn = await screen.findByRole('button', { name: /back to practice lessons/i });
    fireEvent.click(backBtn);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/alphabet');
      expect(screen.getByRole('heading', { name: /russian alphabet/i, level: 2 })).toBeInTheDocument();
    });
  });

  test('renders Numbers & Time and switches tabs between numbers and time', async () => {
    window.history.pushState({}, '', '/numbers');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /russian numbers/i, level: 2 })).toBeInTheDocument();
    });

    const timeTabBtn = screen.getByRole('tab', { name: /telling time/i });
    fireEvent.click(timeTabBtn);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/time');
      expect(screen.getByRole('heading', { name: /russian time grammar rules/i, level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /telling time & time phrases/i, level: 2 })).toBeInTheDocument();
    });
  });

  test('renders Telling Time section directly when loaded at /time', async () => {
    window.history.pushState({}, '', '/time');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /russian time grammar rules/i, level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /telling time & time phrases/i, level: 2 })).toBeInTheDocument();
    });
  });

  test('renders GitHub links in footer, Terms of Service, and About page (including sister repos)', async () => {
    render(<App />);
    const footerGithubLink = screen.getByRole('link', { name: /^GitHub$/i });
    expect(footerGithubLink).toHaveAttribute('href', 'https://github.com/JohnBendfeldt/basic-language-school');
    expect(footerGithubLink).toHaveAttribute('rel', 'noopener noreferrer');

    fireEvent.click(screen.getByRole('link', { name: /terms of service/i }));
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Terms of Service', level: 2 })).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /MIT License/i })).toHaveAttribute(
      'href',
      'https://github.com/JohnBendfeldt/basic-language-school/blob/main/LICENSE'
    );

    fireEvent.click(screen.getByRole('link', { name: /about & contact/i }));
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'About & Contact', level: 2 })).toBeInTheDocument();
    });

    for (const repoUrl of [
      'https://github.com/JohnBendfeldt/basic-language-school',
      'https://github.com/JohnBendfeldt/basic-english',
      'https://github.com/JohnBendfeldt/basic-french',
      'https://github.com/JohnBendfeldt/basic-russian',
    ]) {
      const matchingLinks = screen
        .getAllByRole('link')
        .filter((el) => el.getAttribute('href') === repoUrl);
      expect(matchingLinks.length).toBeGreaterThanOrEqual(1);
    }
  });
});
