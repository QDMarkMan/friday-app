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
