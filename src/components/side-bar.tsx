import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SideBarItem } from "@/components/side-bar-item";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActivePanel } from "@/redux/panel/slice";
import { selectWindow } from "@/redux/window/slice";

import { Inbox, AtSign, UserCircle2, Heart, MoreVertical } from "lucide-react";

export type TooltipContent = "Chats" | "Contacts" | "Requests" | "Profile";

const iconMapping: Record<TooltipContent, React.ElementType> = {
  Chats: Inbox,
  Contacts: AtSign,
  Requests: Heart,
  Profile: UserCircle2,
};

export function SideBar({ ...props }) {
  const dispatch = useAppDispatch();
  const { isMobile } = useAppSelector(selectWindow);

  const items: TooltipContent[] = ["Chats", "Contacts", "Requests", "Profile"];

  return (
    <div
      className="flex sm:flex-col flex-1 w-full items-center sm:p-4 sm:space-y-6"
      {...props}
    >
      {isMobile ? (
        <div className="flex flex-1 items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="cursor-pointer active:bg-accent transition-colors w-10 h-10 rounded-full p-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left" className="mt-10">
              <DropdownMenuItem>...soon</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        items.map((item, index) => (
          <SideBarItem
            key={index}
            icon={iconMapping[item]}
            tooltip={item}
            onSelect={() => dispatch(setActivePanel(item))}
            isLastItem={index === items.length - 1}
          />
        ))
      )}
    </div>
  );
}
