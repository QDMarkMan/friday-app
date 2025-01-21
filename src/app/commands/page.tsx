/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2025-01-10 15:59:12].
 *-------------------------------------------------------------------------------------------- */
'use client'

import { Link as LinkIcon } from 'lucide-react'
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
      command: 'translate',
      icon: 'https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-04-uuYHWIRvVPi01gEt6NwnGyjqLeeZhz.png',
      isDefault: false,
      modelId: 1
    } as CommandSchema,

      // author: {
      //   name: 'Dorian Baffier',
      //   username: 'dorian_baffier',
      //   avatar: 'https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-04-uuYHWIRvVPi01gEt6NwnGyjqLeeZhz.png',
      //   timeAgo: '2h ago'
      // },
      // content: {
      //   text: 'Just launched Kokonut UI! Check out the documentation and let me know what you think 🎨',
      //   link: {
      //     title: 'Kokonut UI Documentation',
      //     description: 'A comprehensive guide to Kokonut UI',
      //     icon: <LinkIcon className="w-5 h-5 text-blue-500" />
      //   }
      // },
  ])

  const handleAction = (id: string | number, action: string) => {
    console.log(`Card ${id}: ${action}`)
  }

  return (
    <ScrollArea className="w-ful h-full">
      {Array.from({ length: 5 }, () => cards[0]).map((card, index: number) => (
        <CommandCard
          key={`card-${index + card.id.toString()}`}
          className="mb-3"
          {...card}
          onDefault={() => handleAction(card.id, 'bookmarked')}
        />
      ))}
    </ScrollArea>
  )
}
