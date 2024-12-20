/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-26 17:49:40].
 *  @Des [The Stage Panel when awaked].
 *-------------------------------------------------------------------------------------------- */
'use client';
import React, { useEffect, useState } from "react";
import StageInput from "@/app/components/stage-input";
// import OperatePanel from "./operate-panel";
import { StageOutput } from "./stage-output";
import { getClipboardContent, getCurrentText } from "@/lib/commands";
import { Event, listen } from '@tauri-apps/api/event';
import { QuickerCommands } from "./quicker-commands";

const InStage: React.FC = () => {

  const [content, setContent] = useState<string>('')

  const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value)
    if (e.key === "Enter") {
      const response = await getCurrentText()
      const clipboard = await getClipboardContent()
      console.log("🚀 ~ handleKeyUp ~ response:", response, clipboard)
    }
  }

  useEffect(() => {
    listen('current-select', (event: Event<string>) => {
      setContent(event.payload)
    })
  })


  return <>
    <div className="rounded-md bg-background overflow-hidden">
      <StageInput className="bg-background" value={content} />
      <QuickerCommands /> 
    </div>
    <StageOutput className="mt-1" />
    {/* <OperatePanel /> */}
  </>
}

export default InStage;