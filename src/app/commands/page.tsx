/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2025-01-10 15:59:12].
 *-------------------------------------------------------------------------------------------- */
'use client'

import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CommandCard } from '@/app/components/command-card'
import type { CommandSchema } from '../schema/command.schema'

export default function Page() {
  const [cards, setCards] = useState<CommandSchema[]>([
    {
      id: 1,
      createdAt: '2025-01-10T15:59:12.000Z',
      name: 'Translate Bot',
      description: 'Translate the selected text',
      command: '我希望你能担任英语翻译、拼写校对和修辞改进的角色。我会用任何语言和你交流，你会识别语言，将其翻译并用更为优美和精炼的英语回答我。请将我简单的词汇和句子替换成更为优美和高雅的表达方式，确保意思不变，但使其更具文学性。请仅回答更正和改进的部分，不要写解释。',
      icon: 'bot',
      isDefault: false,
      modelId: 1
    } as CommandSchema,
  ])

  const handleAction = (id: string | number, action: string) => {
    console.log(`Card ${id}: ${action}`)
  }

  const handleCommandChange =  (command: CommandSchema, value: string) => {
    console.log("🚀 ~ handleCommandChange ~ command:", command, value)
  }

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
    </ScrollArea>
  )
}
