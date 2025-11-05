const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
const BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

if (!BASE_URL) {
  console.warn('NEXT_PUBLIC_API_URL is not defined. Remember to configure it in Render.');
}

export async function apiFetch(path, options = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${BASE_URL}${normalizedPath}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API request failed with ${response.status}: ${errorBody}`);
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}
