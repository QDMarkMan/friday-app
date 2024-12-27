/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-27 10:35:49].
 *-------------------------------------------------------------------------------------------- */

import { Badge } from "@/components/ui/badge"
import { Copy } from "lucide-react"

export const ToolCommands: React.FC = () => {
  return (
    <>
      <Badge variant="outline" className="mr-1 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-200 active:scale-95">
        Copy <Copy className='w-3 h-3 ml-1' />
      </Badge>
    </>
  )
}