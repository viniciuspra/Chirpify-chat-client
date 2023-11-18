import { SideBarItem } from "./side-bar-item";

import { Home, AtSign, Settings, UserCircle2 } from "lucide-react";
import { useState } from "react";

type TooltipContent = "Messages" | "Friends" | "Profile" | "Settings";

const iconMapping: Record<TooltipContent, React.ElementType> = {
  Messages: Home,
  Friends: AtSign,
  Profile: UserCircle2,
  Settings: Settings,
};

export function SideBar({ ...props }) {
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const items: TooltipContent[] = [
    "Messages",
    "Friends",
    "Profile",
    "Settings",
  ];

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
          index={index}
          setSelectedItem={setSelectedItem}
          isSelected={selectedItem === index}
          isLastItem={index === items.length - 1}
        />
      ))}
    </div>
  );
}
