/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-04-21 14:16:59].
 *  @Des [The editor for a block].
 *-------------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import ContentEditable from "react-contenteditable";

export type BlockEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  onModeChange?: (mode: boolean) => void;
  className?: string;
  editable?: boolean;
  children?: React.ReactNode;
};

const BlockEditor: React.FC<BlockEditorProps> = ({
  value = "",
  editable = true,
  onChange,
  onModeChange,
  className,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [localEditMode, setLocalEditable] = useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    onModeChange && onModeChange(localEditMode);
  }, [ localEditMode, onModeChange ]);

  const handleContentInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.innerHTML || "";
    setLocalValue(newValue);
    if (onChange) onChange(newValue);
  };

  const main = (
      <ContentEditable
        className={cn(
          "block-render",
          {
            "cursor-pointer": editable,
            "cursor-text outline-none": localEditMode,
          },
          className,
        )}
        innerRef={divRef}
        html={localValue}
        disabled={!localEditMode}
        onChange={handleContentInput}
        onBlur={() => {
          setLocalEditable(false);
        }}
        onKeyUp={(e) => {
          if (e.key === "Escape") setLocalEditable(false);
        }}
        tagName="div"
        onDoubleClick={() => {
          editable && setLocalEditable(true);
        }}
      />
  );

  return main;
};

export default BlockEditor;
