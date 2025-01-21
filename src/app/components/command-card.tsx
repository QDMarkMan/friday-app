// components/ui/social-card.tsx
'use client'

import { cn } from '@/lib/utils'
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'
import type { CommandSchema } from '../schema/command.schema'

type CommandCardProps = {
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
  onDefault?: () => void
  onMore?: () => void
  className?: string
} & CommandSchema

export function CommandCard(props: CommandCardProps) {
  const { onLike, onComment, onShare, onDefault, onMore, className } = props

  const [isDefault, setIsDefault] = useState(props.isDefault ?? false)

  const handleSetDefault = () => {
    setIsDefault(!isDefault)
    onDefault?.()
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
            <div className="flex items-center gap-2">
              <img src={props?.icon} alt={props?.name} className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-zinc-800" />
              <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{props?.name}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{props?.createdAt}</p>
              </div>
            </div>
            <button type="button" onClick={onMore} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          {/* Content section */}
          <p className="text-zinc-600 dark:text-zinc-300 mb-4">{props?.description}</p>
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
              {/* <button
                type="button"
                onClick={handleLike}
                className={cn(
                  'flex items-center gap-2 text-sm transition-colors',
                  isLiked ? 'text-rose-600' : 'text-zinc-500 dark:text-zinc-400 hover:text-rose-600'
                )}
              >
                <Heart className={cn('w-5 h-5 transition-all', isLiked && 'fill-current scale-110')} />
                <span>{likes}</span>
              </button>
              <button
                type="button"
                onClick={onComment}
                className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{engagement?.comments}</span>
              </button>
              <button
                type="button"
                onClick={onShare}
                className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-green-500 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>{engagement?.shares}</span>
              </button> */}
            </div>
            <button
              type="button"
              onClick={handleSetDefault}
              className={cn(
                'p-2 rounded-full transition-all',
                isDefault ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              <Bookmark className={cn('w-5 h-5 transition-transform', isDefault && 'fill-current scale-110')} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
