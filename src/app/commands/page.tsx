/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2025-01-10 15:59:12].
 *-------------------------------------------------------------------------------------------- */
'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CommandCard } from '@/app/components/command-card'
import type { CommandSchema } from '../schema/command.schema'
import { CommandsData } from '@/lib/commands'
import type { ResponseSchema } from '@/app/schema/response.schema'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import type { CommandDataSchema } from '../schema/command.schema'

export default function Page() {
  const [cards, setCards] = useState<CommandSchema[]>([])

  const handleAction = (id: string | number, action: string) => {
    console.log(`Card ${id}: ${action}`)
  }

  const handleCommandChange = (command: CommandSchema, value: string) => {
    console.log('🚀 ~ handleCommandChange ~ command:', command, value)
  }

  const loadCommands = async () => {
    const response = (await CommandsData.getLocalCommandsData()) as ResponseSchema<CommandSchema[]>
    if (response.code === 1) {
      const list = response.data
      for (const item of list) {
        item.createdAt = format(item.createdAt, 'yyyy-mm-dd hh:mm:ss')
      }
      setCards(list)
    }
  }

  const handleCreateCommand = () => { 
    const data: CommandDataSchema = {
      id: -1,
      name: '',
      title: '',
      description: '',
      command: '',
      isDefault: false,
      modelId: 0
    }
    cards.push(data as CommandSchema)
    setCards([...cards])
  }

  useEffect(() => {
    loadCommands()
  }, [])

  return (
    <ScrollArea className="w-ful h-full">
      {cards.map((card, index: number) => (
        <CommandCard
          key={`card-${index + card.id.toString()}`}
          className="mb-3"
          {...card}
          onDefault={() => handleAction(card.id, 'bookmarked')}
          onCommand={(command: string) => handleCommandChange(card, command)}
        />
      ))}

      {/* Add a new command button */}
      <Button variant="ghost" className="w-full my-2" onClick={handleCreateCommand}>
        Create
      </Button>
    </ScrollArea>
  )
}
