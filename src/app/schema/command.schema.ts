/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-01-20 11:39:25].
 ***************************************************************************/

import type { BasicSchema } from './basic.schema'

export type CommandDataSchema = {
  name: string
  title: string
  description: string
  command: string
  sort?: number
  icon?: string
  isDefault: boolean
  modelId: number,
  [key: string]: unknown
}

export type CommandSchema = CommandDataSchema & BasicSchema
