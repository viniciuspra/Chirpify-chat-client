import { SideBarItem } from "./side-bar-item";

import { Inbox, AtSign, UserCircle2, Heart } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { setActivePanel } from "@/redux/panel/slice";

export type TooltipContent = "Chats" | "Contacts" | "Requests" | "Profile";

const iconMapping: Record<TooltipContent, React.ElementType> = {
  Chats: Inbox,
  Contacts: AtSign,
  Requests: Heart,
  Profile: UserCircle2,
};

export function SideBar({ ...props }) {
  const dispatch = useAppDispatch();

  const items: TooltipContent[] = ["Chats", "Contacts", "Requests", "Profile"];

  return (
    <div
      className="flex flex-col flex-1 w-full items-center p-4 space-y-6"
      {...props}
    >
      {items.map((item, index) => (
        <SideBarItem
          key={index}
          icon={iconMapping[item]}
          tooltip={item}
          onSelect={() => dispatch(setActivePanel(item))}
          isLastItem={index === items.length - 1}
        />
      ))}
    </div>
  );
}
