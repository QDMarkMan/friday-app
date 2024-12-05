/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-26 17:46:39].
 *-------------------------------------------------------------------------------------------- */

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SparklesIcon } from "./icons";

export type StageInputProps = React.ComponentProps<typeof Input>; 

const StageInput: React.FC<StageInputProps> = ({ className, ...props }) => {

  return (
    <div className="flex items-center border-b px-3 flex-1">
      <div className="" >
        Logo
      </div>
      <Input
        className={cn(
          "flex h-11 w-full bg-transparent py-3 text-sm !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        placeholder="Type your content here..."
        {...props}
      />
      <div className="shrink-0" >
        <SparklesIcon />
      </div>
    </div>
  );
}

export default StageInput;