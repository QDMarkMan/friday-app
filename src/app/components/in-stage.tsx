/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-26 17:49:40].
 *  @Des [The Stage Panel when awaked].
 *-------------------------------------------------------------------------------------------- */
import React from "react";
import StageInput from "@/app/components/stage-input";
// import OperatePanel from "./operate-panel";
import { StageOutput } from "./stage-output";

const InStage: React.FC = () => {
  return <>
    <StageInput />
    <StageOutput className="mt-1" />
    {/* <OperatePanel /> */}
  </>
}

export default InStage;