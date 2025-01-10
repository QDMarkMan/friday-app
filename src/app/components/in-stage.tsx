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
import { getAgentResponse } from '@/lib/commands'
import { type Event, listen } from '@tauri-apps/api/event'
import { QuickerCommands } from './quicker-commands'

const InStage: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleKeyUp = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && e.metaKey) setOutputFromAgent(e.currentTarget.textContent ?? '')
  }

  const handleContentChange = async (value: string = input) => {
    setOutput('')
    setInput(value)
    if (!value.trim()) return
    setOutputFromAgent(value)
  }

  const setOutputFromAgent = async (value: string) => {
    setLoading(true)
    const _input = `
      把我提供的全部内容翻译成得体的英文:
      '${value}',
      并且把翻译结果发送给我，返回数据的格式需要和内容一致.
    `
    const response = await getAgentResponse(_input)
    setOutput(response)
    setLoading(false)
  }

  useEffect(() => {
    listen('current-select', (event: Event<string>) => {
      handleContentChange(event.payload)
    })
  })

  return (
    <>
      <div className="w-full rounded bg-background overflow-hidden border border-accent">
        <StageInput className="bg-background" value={input} onKeyUp={handleKeyUp} onChange={value => {
          setInput(value)
        }} />
        <QuickerCommands />
      </div>
      {
        (output || loading) && <StageOutput className="mt-1 rounded bg-background overflow-hidden border border-accent" 
          loading= {loading}
          value={output}
        />
      }
    </>
  )
}

export default InStage
