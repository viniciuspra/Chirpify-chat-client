import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const handleClick = () => {
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
            onClick={handleClick}
          >
            <Icon className="w-7 h-7" />
          </TooltipTrigger>
        </div>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
