/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-01-20 11:44:47].
 ***************************************************************************/

import type { BasicSchema } from './basic.schema'

export type AgentModelSchema = {
  name: string
  key: string
  url: string
} & BasicSchema
