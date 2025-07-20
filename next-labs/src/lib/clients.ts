export const providers = {
  openai: {
    name: 'ChatGPT',
    key: process.env.OPENAI_API_KEY!,
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4'
  },
  gemini: {
    name: 'Gemini',
    key: process.env.GEMINI_API_KEY!,
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    model: 'gemini-pro'
  },
  grok: {
    name: 'Grok',
    key: process.env.GROK_API_KEY!,
    endpoint: 'https://grok.api.x.ai/chat',
    model: 'grok-1'
  }
};
