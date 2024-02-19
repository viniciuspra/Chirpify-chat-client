import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { RequestCard } from "@/components/request-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useAppSelector } from "@/redux/hooks";
import { selectRequest } from "@/redux/request/slice";

import { RequestPanelProp } from "../request-panel";

export function RequestMPanel({
  receivedRequests,
  sentRequests,
}: RequestPanelProp) {
  const { receivedRequestCount } = useAppSelector(selectRequest);

  return (
    <div className="bg-secondary/70 rounded-md flex flex-col border">
      <div className="p-2">
        <Accordion type="multiple">
          <AccordionItem value="received">
            <AccordionTrigger className="text-lg p-3 hover:bg-secondary rounded-md group">
              <div className="flex gap-3 items-center">
                Received Requests
                {receivedRequestCount > 0 && (
                  <span className="bg-secondary flex items-center justify-center p-1 w-6 h-6 text-sm text-white rounded-full px-2 group-hover:bg-background/20 group-hover:no-underline">
                    {receivedRequestCount}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {receivedRequests.length > 0 ? (
                receivedRequests.map((user) => (
                  <RequestCard
                    key={user.id}
                    senderId={user.id}
                    requestType="received"
                    username={user?.username}
                    imageUrl={user?.avatar}
                  />
                ))
              ) : (
                <div className="p-3">
                  <p>No pending friend requests to accept.</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="sent">
            <AccordionTrigger className="text-lg p-3 hover:bg-secondary rounded-md">
              Sent Requests
            </AccordionTrigger>
            <AccordionContent className="flex flex-col overflow-hidden max-h-[60vh]">
              <ScrollArea className="flex flex-col flex-1">
                {sentRequests.length > 0 ? (
                  sentRequests.map((user) => (
                    <RequestCard
                      key={user.id}
                      imageUrl={user.avatar}
                      username={user.username}
                      requestType="sent"
                    />
                  ))
                ) : (
                  <div className="p-3">
                    <p>No friend requests sent yet.</p>
                  </div>
                )}
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
