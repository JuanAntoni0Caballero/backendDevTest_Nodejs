export function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = 2000
): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout excedido')), timeout)
    ),
  ])
}
