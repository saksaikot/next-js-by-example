export class ApiError extends Error {
  constructor(url, status) {
    super(`${url} has a status code of ${status} `);
    this.name = "ApiError";
    this.url = url;
    this.status = status;
    // set proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (response.status !== 200) {
    throw new ApiError(url, response.status);
  }
  const data = await response.json();
  return data;
}
