import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';

import { buttonVariants } from '../../utils';

describe('buttonVariants', () => {
  it('merges variants and sizes', () => {
    const className = buttonVariants({ variant: 'outline', size: 'lg' });
    expect(className).toContain('border-input');
    expect(className).toContain('h-11');
  });

  it('supports custom class names', () => {
    const className = buttonVariants({ className: 'custom-class' });
    expect(className).toContain('custom-class');
  });
});

describe('Button snapshot', () => {
  it('renders a basic button without crashing', () => {
    const markup = renderToString(<button className={buttonVariants()}>Comprar</button>);
    expect(markup).toContain('Comprar');
  });
});
