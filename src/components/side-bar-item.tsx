import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TooltipContent as TooltipType } from "./side-bar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearActivePanel,
  selectActivePanel,
  setActivePanel,
} from "@/redux/panel/slice";
import { selectRequest } from "@/redux/request/slice";

interface ISideBarItemProps {
  icon: React.ElementType;
  tooltip: TooltipType;
  onSelect: React.Dispatch<React.SetStateAction<number>>;
  isLastItem: boolean;
}

export function SideBarItem({
  icon: Icon,
  tooltip,
  isLastItem = false,
}: ISideBarItemProps) {
  const dispatch = useAppDispatch();
  const activePanel = useAppSelector(selectActivePanel);

  const { receivedRequestCount } = useAppSelector(selectRequest);

  const HandleClick = () => {
    if (activePanel === tooltip) {
      dispatch(clearActivePanel());
    } else {
      dispatch(setActivePanel(tooltip));
    }
  };

  const isSelected = activePanel === tooltip;

  return (
    <TooltipProvider>
      <Tooltip>
        <div
          data-last={isLastItem}
          className="flex flex-col data-[last=true]:flex-1 justify-end"
        >
          <TooltipTrigger
            data-selected={isSelected}
            className="font-bold relative cursor-pointer w-12 h-12 transition-colors rounded-2xl mt-2 flex items-center justify-center data-[selected=true]:bg-slate-500/40 hover:bg-slate-500/20"
            onClick={HandleClick}
          >
            <Icon className="w-7 h-7" />
            {tooltip === "Requests" && receivedRequestCount > 0 && (
              <span className="absolute text-sm w-5 h-5 flex items-center justify-center bottom-0 right-0 bg-red-500 rounded-full p-1">
                {receivedRequestCount > 8 ? "9+" : receivedRequestCount}
              </span>
            )}
          </TooltipTrigger>
        </div>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
