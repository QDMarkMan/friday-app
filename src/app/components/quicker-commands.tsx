/****************************************************************************
 *  @Copyright 2024 XtalPi Systems.
 *  @Author [tongfu.e@xtalpi.com].
 *  @Date [2024-12-20 11:20:43].
 ***************************************************************************/

import { Badge } from '@/components/ui/badge'
import { Copy } from 'lucide-react'

export const QuickerCommands: React.FC = () => {
  return (
    <div className="p-1">
      {/* Quick operate tags */}
      <Badge variant="outline" className="mr-1 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-200 active:scale-95">
        Translate to EN
      </Badge>

      <Badge variant="outline" className="mr-1 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-200 active:scale-95">
        Copy <Copy className='w-3 h-3 ml-1' />
      </Badge>
    </div>
  )
}
