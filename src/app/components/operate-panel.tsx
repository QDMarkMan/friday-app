/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-15 11:37:00].
 *-------------------------------------------------------------------------------------------- */
import React from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import { WorkflowIcon, UserIcon, CalendarCogIcon, SettingsGearIcon } from "./icons";

const OperatePanel: React.FC = () => {
  return (
    <Command>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarCogIcon />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <WorkflowIcon />
            <span>Workflow</span>   
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserIcon />
            <span>Profile</span>
          </CommandItem>
          <CommandItem>
            <SettingsGearIcon />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default OperatePanel;

