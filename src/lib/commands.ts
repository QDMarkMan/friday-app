/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-11 11:46:23].
 ****************************************************************************/

import { invoke } from '@tauri-apps/api/core'

export const getClipboardContent = async (): Promise<string> => {
  const response = await invoke('get_clipboard')
  return response as string
}

export const getCurrentText = async (): Promise<string> => {
  const response = await invoke('get_selection_text')
  return response as string
}

export const getAgentResponse = async (value: string): Promise<string> => {
  const response = await invoke('get_agent_response', { value })
  return response as string
}
// ------------------------------ Data Commands ------------------------------ //

export const CommandsData = {
  getLocalCommandsData: async () => {
    const response = await invoke('get_local_commands_data')
    return response
  },
  createCommand: async (data: unknown) => {
    const response = await invoke('create_local_command', { json: JSON.stringify(data) })
    return response
  }
}