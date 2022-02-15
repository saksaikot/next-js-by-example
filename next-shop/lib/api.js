export async function fetchJson(url) {
  const response = await fetch(url);
  if (response.status === 404) {
    throw new Error(`Product not found ${response.status}`);
  } else if (response.status !== 200) {
    throw new Error(`Internal server error ${response.status}`);
  }
  const data = await response.json();
  return data;
}
