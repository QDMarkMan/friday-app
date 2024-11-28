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
    <div className={cn('w-full rounded-sm', className)}>
      <div className="glow min-h-36 text-4xl font-bold text-center">
        <span>Output</span>
      </div>
    </div>
  );
}