const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

type NextAwareRequestInit = RequestInit & { next?: { revalidate?: number } };

export async function fetchJson<T>(endpoint: string, init: NextAwareRequestInit = {}): Promise<T> {
  const method = init.method?.toUpperCase() ?? 'GET';
  const headers = {
    'Content-Type': 'application/json',
    ...(init.headers ?? {})
  } as HeadersInit;

  const options: NextAwareRequestInit = {
    ...init,
    method,
    headers
  };

  if (method === 'GET') {
    options.next = options.next ?? { revalidate: 60 };
  } else {
    options.cache = options.cache ?? 'no-store';
  }

  const res = await fetch(`${API_URL}${endpoint}`, options);

  if (!res.ok) {
    throw new Error(`Error al consultar ${endpoint}`);
  }

  return res.json() as Promise<T>;
}
