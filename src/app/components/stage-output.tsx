/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-27 10:12:38].
 *-------------------------------------------------------------------------------------------- */

import { cn } from "@/lib/utils";
import React from "react";

export type StageOutputProps = {
  className?: string;
}

export const StageOutput: React.FC<StageOutputProps> = ({ className }) => {
  return (
    <div className={cn('w-full rounded-sm border border-indigo-50', className)}>
      <div className="text-4xl font-bold text-center text-accent">
        <span>Output</span>
      </div>
    </div>
  );
}