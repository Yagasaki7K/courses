// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { providers } from '@/lib/clients'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const chunks: Uint8Array[] = []

  req.on('data', (chunk) => chunks.push(chunk))
  req.on('end', async () => {
    const rawBody = Buffer.concat(chunks)
    const boundary = req.headers['content-type']?.split('boundary=')[1]

    if (!boundary) return res.status(400).json({ error: 'No boundary found in multipart form data' })

    const formData = await parseFormData(rawBody, boundary)

    const model = formData.model as keyof typeof providers
    const messages = JSON.parse(formData.messages)
    const file = formData.file as File | undefined

    const provider = providers[model]
    if (!provider) {
      return res.status(400).json({ error: 'Modelo inválido' })
    }

    const inputText = messages.map((m: any) => `${m.role}: ${m.content}`).join('\n')
    let url = provider.endpoint
    let body: string
    let headers: HeadersInit = {}

    switch (model) {
      case 'openai':
        body = JSON.stringify({
          model: provider.model,
          messages,
          stream: true
        })

        headers = {
          'Authorization': `Bearer ${provider.key}`,
          'Content-Type': 'application/json'
        }

        break

      case 'gemini':
        body = JSON.stringify({
          contents: [{ parts: [{ text: inputText }] }]
        })

        url += `?key=${provider.key}`
        headers = { 'Content-Type': 'application/json' }

        break

      case 'grok':
        body = JSON.stringify({ messages })

        headers = {
          'Authorization': `Bearer ${provider.key}`,
          'Content-Type': 'application/json'
        }

        break

      default:
        return res.status(501).json({ error: 'Modelo não implementado' })
    }

    const aiRes = await fetch(url, {
      method: 'POST',
      headers,
      body
    })

    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Cache-Control', 'no-cache')

    if (!aiRes.body) {
      return res.status(500).send('No response body from AI provider')
    }

    const reader = aiRes.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value)
      res.write(chunk)
    }

    res.end()
  })
}
