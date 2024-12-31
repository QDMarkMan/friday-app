/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-27 10:12:38].
 *-------------------------------------------------------------------------------------------- */
import { cn } from '@/lib/utils'
import type React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import '@/app/styles/glow.scss'
import { ToolCommands } from './tool-commands'
import { MotionLoading } from './common/motion-loading'
import { TypingAnimation } from '@/components/ui/typing-animation'


export type StageOutputProps = {
  className?: string
  value: string
  loading?: boolean
}

export const StageOutput: React.FC<StageOutputProps> = ({ className, value, loading }) => {

  const getOutputDuration = () => {
    const result = value.length / 100
    const range = [2, 5]
    return result > range[1] ? range[1] : result < range[0] ? range[0] : result
  }

  return <div className={cn('w-full rounded-md relative', className)}>
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className='w-full flex flex-row justify-center items-center min-h-12'
        >
          <MotionLoading /> <span className='ml-4 text-sm'> Generating...</span>
        </motion.div>
      ) : (
        <>
          {/* <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="min-h-12 font-sans text-sm max-h-96 overflow-auto p-1"
          dangerouslySetInnerHTML={{ __html: value }}
        >
          
        </motion.div> */}
        <TypingAnimation className='min-h-12 font-sans text-sm max-h-40 overflow-auto p-1 font-normal' duration={getOutputDuration()}>
          {value}
        </TypingAnimation>

        {value && (
          <div className='p-1'>
            <ToolCommands />
          </div>
        )}
        </>
      )}
    </AnimatePresence>
  </div>
}
