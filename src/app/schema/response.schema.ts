/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-02-06 14:41:54].
 ***************************************************************************/


export type ResponseSchema<T> = {
  code: 0 | 1
  message: string
  data: T
}