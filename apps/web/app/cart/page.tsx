import { LayoutShell } from '@/components/layout-shell';

import { CartContent } from './_components/cart-content';

export default function CartPage() {
  return (
    <LayoutShell>
      <section className="container-responsive py-16">
        <CartContent />
      </section>
    </LayoutShell>
  );
}
