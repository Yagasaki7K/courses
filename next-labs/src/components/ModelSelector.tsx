'use client'
import styled from 'styled-components'
import { Dispatch, SetStateAction } from 'react'

const Select = styled.select`
  background: #111;
  color: #eee;
  border: 1px solid #444;
  padding: 8px;
  margin-bottom: 16px;
`

interface Props {
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
}

export default function ModelSelector({ selected, setSelected }: Props) {
  return (
    <Select value={selected} onChange={(e) => setSelected(e.target.value)}>
      <option value="openai">ChatGPT</option>
      <option value="gemini">Gemini</option>
      <option value="grok">Grok</option>
    </Select>
  )
}
