import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TooltipContent as TooltipType } from "@/components/side-bar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectActivePanel, setActivePanel } from "@/redux/panel/slice";
import { selectRequest } from "@/redux/request/slice";
import { User } from "lucide-react";

interface ISideBarItemProps {
  tooltip: TooltipType;
  onSelect: React.Dispatch<React.SetStateAction<number>>;
}

export function MobileBar({ tooltip }: ISideBarItemProps) {
  const dispatch = useAppDispatch();
  const activePanel = useAppSelector(selectActivePanel);

  const { receivedRequestCount } = useAppSelector(selectRequest);

  const HandleClick = () => {
    dispatch(setActivePanel(tooltip));
  };

  const isSelected = activePanel === tooltip;

  return (
    <TooltipProvider>
      <Tooltip>
        <div className="flex flex-col w-full h-10">
          <TooltipTrigger
            className={`flex-1 font-bold relative cursor-pointer transition-colors active:bg-red-100/30 flex items-center justify-center ${
              isSelected ? "border-b-2 border-logo text-logo" : ""
            }`}
            onClick={HandleClick}
          >
            {tooltip === "Profile" ? <User /> : <p>{tooltip}</p>}

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
