/****************************************************************************
 *  @Copyright 2024 Xtalpi Systems.
 *  @Author [tongfu.e@xtalpi.com].
 *  @Date [2024-12-05 13:43:19].
 ***************************************************************************/
import { invoke } from '@tauri-apps/api/core';

export const getClipboardContent = async (): Promise<string> => {
  const response = await invoke('get_clipboard')
  return response as string
}