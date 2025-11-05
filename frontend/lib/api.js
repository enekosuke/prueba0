const envBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
const sanitizedBaseUrl = envBaseUrl && envBaseUrl.length > 0 ? envBaseUrl : 'http://localhost:3000';
const BASE_URL = sanitizedBaseUrl.endsWith('/') ? sanitizedBaseUrl.slice(0, -1) : sanitizedBaseUrl;

function normalizePath(path) {
  if (!path) {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

async function request(path, options = {}) {
  const { method = 'GET', headers = {}, body, ...rest } = options;
  const normalizedPath = normalizePath(path);
  const url = `${BASE_URL}${normalizedPath}`;

  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const fetchOptions = {
    method,
    headers: finalHeaders,
    ...rest,
  };

  if (body !== undefined) {
    fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    let errorText = '';
    try {
      errorText = await response.text();
    } catch (error) {
      errorText = '';
    }

    const error = new Error(
      `Request failed with status ${response.status}: ${errorText || response.statusText}`
    );
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  const contentLength = response.headers.get('content-length');
  if (contentLength === '0') {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch (error) {
      return null;
    }
  }

  return null;
}

const api = {
  request,
  get(path, options) {
    return request(path, { ...options, method: 'GET' });
  },
  post(path, options) {
    return request(path, { ...options, method: 'POST' });
  },
  put(path, options) {
    return request(path, { ...options, method: 'PUT' });
  },
  patch(path, options) {
    return request(path, { ...options, method: 'PATCH' });
  },
  delete(path, options) {
    return request(path, { ...options, method: 'DELETE' });
  },
};

export default api;
