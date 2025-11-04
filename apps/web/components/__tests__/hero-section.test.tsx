import { render, screen } from '@testing-library/react';

import { HeroSection } from '../hero-section';

describe('HeroSection', () => {
  it('renders call to action', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Experiencias de compra/)).toBeInTheDocument();
  });
});
