/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-27 10:12:38].
 *-------------------------------------------------------------------------------------------- */

import { cn } from '@/lib/utils'
import type React from 'react'
import '@/app/styles/glow.scss'

export type StageOutputProps = {
  className?: string
  value: string
}

export const StageOutput: React.FC<StageOutputProps> = ({ className, value }) => {
  return (
    <div className={cn('w-full rounded-md relative', className)}>
      <div className="min-h-12 font-sans text-sm max-h-96 overflow-auto p-1" dangerouslySetInnerHTML={{ __html: value }}>
      </div>
    </div>
  )
}
