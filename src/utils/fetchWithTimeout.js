export function fetchWithTimeout(url, options = {}, timeout = 2000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout excedido')), timeout)),
  ])
}
