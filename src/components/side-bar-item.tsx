import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/user/slice";

interface ISideBarItemProps {
  icon: React.ElementType;
  tooltip: TooltipContent;
  index: number;
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  isSelected: boolean;
  isLastItem: boolean;
}
type TooltipContent = "Messages" | "Friends" | "Profile" | "Settings";

export function SideBarItem({
  icon: Icon,
  tooltip,
  index,
  setSelectedItem,
  isSelected = false,
  isLastItem = false,
}: ISideBarItemProps) {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleSelected = () => {
    if (index === 3) {
      return;
    }
    setSelectedItem(index);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <div
          data-last={isLastItem}
          className="flex flex-col data-[last=true]:flex-1 justify-end"
        >
          <TooltipTrigger
            data-selected={isSelected}
            className="font-bold cursor-pointer w-12 h-12 transition-colors rounded-2xl mt-2 flex items-center justify-center data-[selected=true]:bg-accent hover:bg-accent"
            onClick={handleSelected}
          >
            {isLastItem ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Icon className="w-7 h-7" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" sideOffset={10}>
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500 cursor-pointer"
                    onClick={handleLogOut}
                  >
                    logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Icon className="w-7 h-7" />
            )}
          </TooltipTrigger>
        </div>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
