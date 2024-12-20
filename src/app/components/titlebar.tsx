/****************************************************************************
 *  @Copyright 2024 XtalPi Systems.
 *  @Author [tongfu.e@xtalpi.com].
 *  @Date [2024-12-19 10:45:01].
 *  @Description .A custom title bar for the Tauri.
 *  @Others 
 ***************************************************************************/
'use client';

import { Button } from '@/components/ui/button';
import { CircleX } from 'lucide-react';
import React from 'react';

export const Titlebar: React.FC = () => {
  return (
    <div data-tauri-drag-region  className="flex items-center justify-between w-full p-1 
    bg-white backdrop-filter backdrop-blur-md rounded-md overflow-hidden z-50 cursor-pointer">
      <div className="flex items-center">
        Logo 
      </div>
      <div className="flex items-center">
        <div className="rounded-full ml-2">
          <Button variant="ghost" className='h-7 w-7 rounded-md p-2'>
            <CircleX />
          </Button>
        </div>
      </div>
    </div>
  )
}