/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-26 17:46:39].
 *-------------------------------------------------------------------------------------------- */

import React from "react";
import { SparklesIcon } from "./icons";
import BlockEditor, { BlockEditorProps } from "./block-editor";

const StageInput: React.FC<BlockEditorProps> = ({ className, ...props }) => {

  return (
    <div className="flex items-center flex-1">
      {/* <Input
        className={cn(
          "flex h-11 w-full bg-transparent py-3 text-sm !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        placeholder="Type your content here..."
        {...props}
      /> */}
      <div className="flex-1 bg-background">
        <BlockEditor
          {...props}
        />
      </div>
      <div className="shrink-0" >
        <SparklesIcon />
      </div>
    </div>
  );
}

export default StageInput;