// components/ui/social-card.tsx
'use client'

import { cn } from '@/lib/utils'
import { Bot, Bookmark, MoreHorizontal, Link as LinkIcon, Trash2, Heart } from 'lucide-react'
import { useState } from 'react'
import type { CommandSchema } from '../schema/command.schema'
import BlockEditor from './block-editor'

type CommandCardProps = {
  onDefault?: () => void
  onCommand?: (value: CommandSchema) => void
  onDelete?: () => void
  className?: string,
  data: CommandSchema,
  children?: React.ReactNode
  bottomChildren?: React.ReactNode
  topChildren?: React.ReactNode
}

export function CommandCard(props: CommandCardProps) {
  const { onCommand, onDefault, onDelete, className, data, bottomChildren, children, topChildren } = props

  const [isDefault, setIsDefault] = useState(data.isDefault ?? false)
  const [localName, setLocalName] = useState(data.name)
  const [localCommand, setLocalCommand] = useState(data.command)
  const [localDescription, setLocalDescription] = useState(data.description)

  const handleSetDefault = () => {
    setIsDefault(!isDefault)
    onDefault?.()
  }

  const handleCommandChange = (value: string) => {
    setLocalCommand(value)
    updateCommand('command', value)
  }

  const handleNameChange = (value: string) => {
    setLocalName(value)
    updateCommand('name', value)
  }

  const updateCommand = (key: keyof CommandSchema, value: unknown) => {
    const _data: CommandSchema = {
      ...data,
      name: localName,
      description: localDescription,
      command: localCommand,
      [key]: value
    }
    onCommand?.(_data)
  }

  return (
    <div
      className={cn(
        'w-full max-w-2xl mx-auto',
        'bg-white dark:bg-zinc-900',
        'border border-zinc-200 dark:border-zinc-800',
        'rounded-2xl shadow-sm',
        'hover:shadow-lg transition-shadow ease-linear',
        className
      )}
    >
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        <div className="p-3">
          {/* Author section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 flex-1">
              {/* <img src={props?.icon} alt={props?.name} className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-zinc-800" /> */}
              <span className="w-10 h-10 flex justify-center items-center rounded-full ring-2 ring-white dark:ring-zinc-800 border border-solid border-zinc-200 dark:border-zinc-800">
                <Bot />
              </span>
              <div className='flex-1'>
                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  <BlockEditor placeholder='Input command name' value={localName} onChange={handleNameChange} />
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {data?.createdAt}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              { topChildren }
            </div>
          </div>
          {/* Description section */}
          {/* <div className="text-zinc-600 dark:text-zinc-300 mb-4">
            <BlockEditor placeholder='Please input your command' value={localDescription} onChange={setLocalDescription} />
          </div> */}
          {/* Command section */}
          <div className="text-zinc-600 dark:text-zinc-300">
            <BlockEditor placeholder='Please input your command' value={localCommand} onChange={handleCommandChange} />
          </div>
          {/* Link preview */}
          {/* {content?.link && (
            <div className="mb-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white dark:bg-zinc-700 rounded-xl">{content.link.icon}</div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{content.link.title}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{content.link.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {/* Engagement section */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-6">
              {onDelete && (
                <button 
                  type="button" 
                  onClick={onDelete}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 rounded-full transition-colors mr-1"
                  aria-label="Delete command"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              { bottomChildren }
            </div>
            <button
              type="button"
              onClick={handleSetDefault}
              className={cn(
                'p-1 rounded-full transition-all',
                isDefault ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              <Bookmark className={cn('w-5 h-5 transition-transform', isDefault && 'fill-current scale-110')} />
            </button>
          </div>
        </div>
      </div>
      { children }
    </div>
  )
}
