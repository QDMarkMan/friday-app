/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2025-01-10 15:59:12].
 *-------------------------------------------------------------------------------------------- */
'use client'

import { Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { CommandCard } from "@/app/components/command-card";


export default function Page() {
  const [cards, setCards] = useState([
    {
      id: 1,
      author: {
        name: "Dorian Baffier",
        username: "dorian_baffier",
        avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-04-uuYHWIRvVPi01gEt6NwnGyjqLeeZhz.png",
        timeAgo: "2h ago",
      },
      content: {
        text: "Just launched Kokonut UI! Check out the documentation and let me know what you think 🎨",
        link: {
          title: "Kokonut UI Documentation",
          description: "A comprehensive guide to Kokonut UI",
          icon: <LinkIcon className="w-5 h-5 text-blue-500" />,
        },
      },
      engagement: {
        likes: 128,
        comments: 32,
        shares: 24,
        isLiked: false,
        isBookmarked: false,
      },
    },
  ]);

  const handleAction = (id: number, action: string) => {
    console.log(`Card ${id}: ${action}`);
  };

  return (
    <ScrollArea className="w-ful h-full">
      {Array.from({length: 5}, () => cards[0]).map((card, index:number) => (
        <CommandCard
          key={`card-${index+card.id}`}
          className="mb-3"
          {...card}
          onLike={() => handleAction(card.id, 'liked')}
          onComment={() => handleAction(card.id, 'commented')}
          onShare={() => handleAction(card.id, 'shared')}
          onBookmark={() => handleAction(card.id, 'bookmarked')}
          onMore={() => handleAction(card.id, 'more')}
        />
      ))}
    </ScrollArea>
  );
}