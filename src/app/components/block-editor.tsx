/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-04-21 14:16:59].
 *  @Des [The editor for a block].
 *-------------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import ContentEditable from 'react-contenteditable'

export type BlockEditorProps = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  onModeChange?: (mode: boolean) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  className?: string
  editable?: boolean
  autoToggle?: boolean
  children?: React.ReactNode
}

const BlockEditor: React.FC<BlockEditorProps> = ({ value = '', placeholder, editable = true, autoToggle = false, className, onChange, onModeChange, onKeyUp }) => {
  const [localValue, setLocalValue] = useState(value)
  const [localEditMode, setLocalEditable] = useState(editable)
  const divRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    onModeChange?.(localEditMode)
  }, [localEditMode, onModeChange])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleContentInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.innerHTML || ''
    setLocalValue(newValue)
    if (onChange) onChange(newValue)
  }

  const main = (
    <ContentEditable
      className={cn(
        'block-render relative outline-none caret-blue-500',
        {
          'cursor-pointer':!editable,
          'cursor-text': localEditMode,
          'before:content-[attr(data-placeholder)] before:absolute before:text-muted-foreground before:pointer-events-none': !localValue && placeholder
        },
        className
      )}
      data-placeholder={placeholder}
      innerRef={divRef}
      html={localValue}
      onChange={handleContentInput}
      onBlur={() => {
        setLocalEditable(false)
      }}
      onKeyUp={e => {
        onKeyUp?.(e)
        if (autoToggle && e.key === 'Escape') setLocalEditable(false)
      }}
      tagName="div"
      onDoubleClick={() => {
        autoToggle && editable && setLocalEditable(true)
      }}
    />
  )

  return main
}

export default BlockEditor
