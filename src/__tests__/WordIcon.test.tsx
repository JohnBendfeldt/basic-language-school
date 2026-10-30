import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WordIcon from '../components/WordIcon';

describe('WordIcon - Smart Vector SVG & Emoji Engine', () => {
  it('automatically overrides mismatched chair emoji 🪑 with Table SVG for table words', () => {
    // Russian table (the exact screenshot case)
    const { rerender } = render(<WordIcon icon="🪑" word="стол" meaning="table (masculine)" />);
    expect(screen.getByLabelText('Table')).toBeInTheDocument();
    expect(screen.queryByText('🪑')).not.toBeInTheDocument();

    // German table
    rerender(<WordIcon icon="🪑" word="Tisch" meaning="table" />);
    expect(screen.getByLabelText('Table')).toBeInTheDocument();
    expect(screen.queryByText('🪑')).not.toBeInTheDocument();

    // Spanish table
    rerender(<WordIcon icon="🪑" word="Mesa" meaning="table" />);
    expect(screen.getByLabelText('Table')).toBeInTheDocument();
    expect(screen.queryByText('🪑')).not.toBeInTheDocument();

    // English table
    rerender(<WordIcon icon="🪑" word="Table" meaning="table" />);
    expect(screen.getByLabelText('Table')).toBeInTheDocument();
    expect(screen.queryByText('🪑')).not.toBeInTheDocument();

    // Full grammar flashcard prompt sentence (user screenshot case)
    rerender(<WordIcon icon="🪑" word="стол (table) ➔ какой род?" meaning="table (masculine)" />);
    expect(screen.getByLabelText('Table')).toBeInTheDocument();
    expect(screen.queryByText('🪑')).not.toBeInTheDocument();

    // German grammar flashcard prompt
    rerender(<WordIcon icon="🪑" word="Tisch (table) ➔ der, die, oder das?" meaning="table (masculine)" />);
    expect(screen.getByLabelText('Table')).toBeInTheDocument();
    expect(screen.queryByText('🪑')).not.toBeInTheDocument();
  });

  it('preserves chair emoji 🪑 when the concept actually is a chair', () => {
    // Russian chair
    const { rerender } = render(<WordIcon icon="🪑" word="стул" meaning="chair" />);
    expect(screen.getByText('🪑')).toBeInTheDocument();
    expect(screen.queryByLabelText('Table')).not.toBeInTheDocument();

    // German chair
    rerender(<WordIcon icon="🪑" word="Stuhl" meaning="chair" />);
    expect(screen.getByText('🪑')).toBeInTheDocument();
    expect(screen.queryByLabelText('Table')).not.toBeInTheDocument();
  });

  it('renders custom SVGs by direct key request', () => {
    const { rerender } = render(<WordIcon icon="svg:table" />);
    expect(screen.getByLabelText('Table')).toBeInTheDocument();

    rerender(<WordIcon icon="svg:meeting" />);
    expect(screen.getByLabelText('Meeting Planning Board')).toBeInTheDocument();

    rerender(<WordIcon icon="svg:teacher" />);
    expect(screen.getByLabelText('Teacher')).toBeInTheDocument();
  });

  it('falls back cleanly to standard emojis for regular words', () => {
    render(<WordIcon icon="🍎" word="Apfel" meaning="apple" />);
    expect(screen.getByText('🍎')).toBeInTheDocument();
  });
});

