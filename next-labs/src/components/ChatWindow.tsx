'use client'
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import ModelSelector from './ModelSelector'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

const Container = styled.div`
  background-color: #1e1e1e;
  color: #f0f0f0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 16px;
  font-family: 'Inter', sans-serif;
`

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const MessageBox = styled.div<{ role: 'user' | 'assistant' }>`
  background-color: ${({ role }) => (role === 'user' ? '#2e2e2e' : '#3a3a3a')};
  border-radius: 12px;
  padding: 12px 16px;
  max-width: 80%;
  align-self: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
  white-space: pre-wrap;
  line-height: 1.5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid #444;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: #2a2a2a;
  color: #f0f0f0;
  border: 1px solid #555;
  font-size: 16px;
  resize: none;
  line-height: 1.4;

  &:focus {
    outline: none;
    border-color: #888;
  }
`

const Button = styled.button`
  padding: 10px 16px;
  background-color: #3a3a3a;
  color: #f0f0f0;
  border: 1px solid #555;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4a4a4a;
  }

  &:active {
    background-color: #5a5a5a;
  }
`

const FileInputLabel = styled.label`
  display: inline-block;
  cursor: pointer;
`

const FileInputHidden = styled.input`
  display: none;
`

export default function ChatWindow() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState<string>('')
    const [model, setModel] = useState<string>('openai')
    const [file, setFile] = useState<File | null>(null)
    const ref = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const saved = localStorage.getItem('chat-history')
        if (saved) setMessages(JSON.parse(saved))
    }, [])

    useEffect(() => {
        localStorage.setItem('chat-history', JSON.stringify(messages))
    }, [messages])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const userMessage: Message = { role: 'user', content: input }
        const updated = [...messages, userMessage]
        setMessages(updated)
        setInput('')

        const formData = new FormData()
        formData.append('model', model)
        formData.append('messages', JSON.stringify(updated))
        if (file) formData.append('file', file)

        const res = await fetch('/api/chat', {
            method: 'POST',
            body: formData,
        })

        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        let ai = ''

        if (!reader) return

        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            ai += decoder.decode(value)
            setMessages([...updated, { role: 'assistant', content: ai }])
        }
    }

    function handleExport() {
        const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'chat-history.json'
        a.click()
    }

    function handleImport(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            const data = JSON.parse(reader.result as string)
            setMessages(data)
        }
        reader.readAsText(file)
    }

    return (
        <Container>
            <ModelSelector selected={model} setSelected={setModel} />

            <Messages>
                {messages.map((m, i) => (
                    <MessageBox key={i} role={m.role}>
                        {m.content}
                    </MessageBox>

                ))}
            </Messages>

            <InputContainer onSubmit={handleSubmit}>
                <TextArea value={input} onChange={(e) => setInput(e.target.value)} rows={4} />
                <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button type="submit">Enviar</Button>
                    <Button type="button" onClick={handleExport}>Exportar</Button>
                    <label style={{ cursor: 'pointer' }}>
                        <Button as="span">Importar</Button>
                        <input hidden type="file" accept="application/json" onChange={handleImport} />
                    </label>
                </div>
            </InputContainer>
        </Container>
    )
}
