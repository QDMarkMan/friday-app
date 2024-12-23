/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-26 17:46:39].
 *-------------------------------------------------------------------------------------------- */

import type React from 'react'
import { SparklesIcon } from './animated-icons'
import BlockEditor, { type BlockEditorProps } from './block-editor'

const StageInput: React.FC<BlockEditorProps> = ({ className, ...props }) => {
  return (
    <div className="flex flex-row items-center flex-1 bg-background overflow-hidden max-h-[30vh]">
      <div className="flex-1 flex flex-col h-full bg-background">
        <BlockEditor className="h-full min-h-4 text-sm p-1" placeholder="Type your content here..." {...props} />
      </div>
      <div className="shrink-0 p-1">
        <span className="w-4 h-4">
          <SparklesIcon />
        </span>
      </div>
    </div>
  )
}

export default StageInput
