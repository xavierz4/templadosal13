import type { ContactPayload } from '@core/domain/contactSchema';

export async function submitColdContact(payload: ContactPayload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error enviando el mensaje corporativo');
  }

  return data;
}
