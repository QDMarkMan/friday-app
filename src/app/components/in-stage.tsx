/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-26 17:49:40].
 *  @Des [The Stage Panel when awaked].
 *-------------------------------------------------------------------------------------------- */
'use client';

import React, { useState } from "react";
import StageInput from "@/app/components/stage-input";
// import OperatePanel from "./operate-panel";
import { StageOutput } from "./stage-output";
import { getCurrentText } from "@/lib/commands";

const InStage: React.FC = () => {

  const [content, setContent] = useState<string>('')

  const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value)
    if (e.key === "Enter") {
      const response = await getCurrentText()
      console.log("🚀 ~ handleKeyUp ~ response:", response)
    }
  }

  return <>
    <StageInput onKeyUp={handleKeyUp} />
    <StageOutput className="mt-1" />
    {/* <OperatePanel /> */}
  </>
}

export default InStage;