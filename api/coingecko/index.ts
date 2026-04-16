import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'

const COINGECKO_BASE = 'https://pro-api.coingecko.com/api/v3'

export async function coingeckoProxy(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const apiKey = process.env.COINGECKO_API_KEY
  if (!apiKey) {
    return { status: 500, body: 'Missing COINGECKO_API_KEY configuration' }
  }

  // The sub-path after /api/coingecko/
  const subPath = request.params.restOfPath ?? ''
  const queryString = request.url.includes('?') ? '?' + request.url.split('?')[1] : ''
  const targetUrl = `${COINGECKO_BASE}/${subPath}${queryString}`

  context.log(`Proxying to: ${targetUrl}`)

  const response = await fetch(targetUrl, {
    headers: {
      'x-cg-pro-api-key': apiKey,
      Accept: 'application/json',
    },
  })

  const body = await response.text()

  return {
    status: response.status,
    headers: { 'Content-Type': 'application/json' },
    body,
  }
}

app.http('coingecko', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'coingecko/{*restOfPath}',
  handler: coingeckoProxy,
})