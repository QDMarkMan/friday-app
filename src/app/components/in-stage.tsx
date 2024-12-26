/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-26 17:49:40].
 *  @Des [The Stage Panel when awaked].
 *-------------------------------------------------------------------------------------------- */
'use client'
import type React from 'react'
import { useEffect, useState } from 'react'
import StageInput from '@/app/components/stage-input'
import { StageOutput } from './stage-output'
import { getAgentResponse, getClipboardContent, getCurrentText } from '@/lib/commands'
import { type Event, listen } from '@tauri-apps/api/event'
import { QuickerCommands } from './quicker-commands'

const InStage: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')

  const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
    if (e.key === 'Enter') {
      const response = await getCurrentText()
      const clipboard = await getClipboardContent()
      console.log('🚀 ~ handleKeyUp ~ response:', response, clipboard)
    }
  }

  const handleContentChange = async (value: string) => {
    setInput(value)
    const _input = `
      把下面的句子翻译成得体的英文:
      ${value}
    `
    const response = await getAgentResponse(_input)
    setOutput(response)
  }

  useEffect(() => {
    listen('current-select', (event: Event<string>) => {
      handleContentChange(event.payload)
    })
  })

  return (
    <>
      <div className="rounded bg-background overflow-hidden border border-accent">
        <StageInput className="bg-background" value={input} />
        <QuickerCommands />
      </div>
      <StageOutput className="mt-1 rounded bg-background overflow-hidden border border-accent" 
        value={output}
      />
    </>
  )
}

export default InStage
