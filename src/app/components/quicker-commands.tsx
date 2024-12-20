/****************************************************************************
 *  @Copyright 2024 XtalPi Systems.
 *  @Author [tongfu.e@xtalpi.com].
 *  @Date [2024-12-20 11:20:43].
 ***************************************************************************/

import { Badge } from "@/components/ui/badge"

export const QuickerCommands: React.FC = () => {
  return <div className="p-1">
    {/* Quick operate tags */}
      <Badge variant="outline" className="mr-1 cursor-pointer">Translate to EN</Badge>
  </div>
}