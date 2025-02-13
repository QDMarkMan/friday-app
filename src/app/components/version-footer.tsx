/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-31 10:58:35].
 *-------------------------------------------------------------------------------------------- */
'use client'

import * as pkg from '#/package.json'
import clsx from 'clsx';

export const VersionFooter: React.FC<{ className?: string }> = ({ className }) => {
  
  return (
    <footer className={clsx('rounded-md', className)}>
        <p className="text-xs text-muted-foreground ml-2">
          <span className="mr-1">V{pkg?.version}</span>
          <span className="border-l pl-1 border-border">© Hits {new Date().getFullYear()}</span>
        </p> 
    </footer>
  )
}