export async function createCheckoutSession() {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to create checkout session');
  const { sessionId } = await res.json();
  return sessionId;
}
