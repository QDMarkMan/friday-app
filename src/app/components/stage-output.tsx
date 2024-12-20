/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-27 10:12:38].
 *-------------------------------------------------------------------------------------------- */

import { cn } from "@/lib/utils";
import React from "react";
import '@/app/styles/glow.scss';

export type StageOutputProps = {
  className?: string;
}

export const StageOutput: React.FC<StageOutputProps> = ({ className }) => {
  return (
    <div className={cn('w-full rounded-md relative', className)}>
      <div className="min-h-12">
        <span>Output</span>
      </div>
    </div>
  );
}