/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2025-01-10 15:59:12].
 *-------------------------------------------------------------------------------------------- */
'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CommandCard } from '@/app/components/command-card'
import type { CommandSchema, CommandDataSchema } from '@/app/schema/command.schema'
import { CommandsData } from '@/lib/commands'
import type { ResponseSchema } from '@/app/schema/response.schema'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { debounce } from 'radash'
import { CheckCheck, Edit, Loader, XCircle } from 'lucide-react'

enum StatusEnum {
  ERROR = 'Error',
  UPDATING = 'Updating',
  SAVING = 'Saving',
  SAVED = 'Saved',
  EDITING = 'Editing'
}

type StateModel = {
  state: StatusEnum,
  message?: string
}

const StateBar = ({ state, message }: StateModel) => {
  const StateIcon = {
    [StatusEnum.ERROR]: XCircle,
    [StatusEnum.UPDATING]: Loader,
    [StatusEnum.SAVING]: Loader,
    [StatusEnum.SAVED]: CheckCheck,
    [StatusEnum.EDITING]: Edit
  }[state]

  const stateColors = {
    [StatusEnum.ERROR]: 'text-red-600',
    [StatusEnum.UPDATING]: 'text-blue-600',
    [StatusEnum.SAVING]: 'text-yellow-600',
    [StatusEnum.SAVED]: 'text-green-600',
    [StatusEnum.EDITING]: 'text-gray-600'
  }

  return (
    <div className={`flex items-center py-1 ${stateColors[state]}`}>
      <StateIcon className="w-4 h-4" />
      <span className="ml-2 text-xs font-medium">
        {state}
        {message && `: ${message}`}
      </span>
    </div>
  )
}

export default function Page() {
  const [cards, setCards] = useState<CommandSchema[]>([])
  const [cardStates, setCardStates] = useState<Record<number | string, StatusEnum>>({})

  const handleAction = (id: string | number, action: string) => {
    console.log(`Card ${id}: ${action}`)
  }

  const handleCommandChange = debounce({
    delay: 2000,
  }, (command: CommandSchema, newCommand: CommandSchema) => {
    if (!command.name || !command.command) return
    if (command.id === -1) {
      doUpdateCommandState(command.id, StatusEnum.SAVING)
      doCreateCommand(newCommand)
    } else {
      doUpdateCommandState(command.id, StatusEnum.UPDATING)
      doUpdateCommand(newCommand)
    }
  })

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

  const doCreateCommand = async (command: CommandDataSchema) => {
    const response = await CommandsData.createCommand(command)
    if (response.code === 1) {
      const index = cards.findIndex(item => item.id === -1)
      cards[index] = response.data
      setCards([...cards])
      doUpdateCommandState(response.data.id, StatusEnum.SAVED)
    } else {
      doUpdateCommandState(response.data.id, StatusEnum.ERROR)
    }
  }

  const doUpdateCommand = async (command: CommandSchema) => {
    setCardStates(prev => ({ ...prev, [command.id]: StatusEnum.UPDATING }))
    try {
      const response = await CommandsData.updateCommand(command)
      const state = response.code === 1 ? StatusEnum.SAVED : StatusEnum.ERROR
      doUpdateCommandState(command.id, state)
    } catch (error) {
      doUpdateCommandState(command.id, StatusEnum.ERROR)
    }
  }

  const doUpdateCommandState = (id: number | string, state: StatusEnum) => {
    setCardStates(prev => ({ ...prev, [id]: state }))
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
          data={card}
          onDefault={() => handleAction(card.id, 'bookmarked')}
          onCommand={(command: CommandSchema) => {
            setCardStates(prev => ({ ...prev, [card.id]: StatusEnum.EDITING }))
            handleCommandChange(card, command)
          }}
          bottomChildren={cardStates[card.id] && <StateBar state={cardStates[card.id]} />}
        >
        </CommandCard>
      ))}

      {/* Add a new command button */}
      <Button variant="ghost" className="w-full my-2" onClick={handleCreateCommand}>
        Create
      </Button>
    </ScrollArea>
  )
}
