import { UserType } from "./chats-panel";
import { RequestCard } from "./request-card";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { useAppSelector } from "@/redux/hooks";

import { selectRequest } from "@/redux/request/slice";

interface RequestPanelProp {
  receivedRequests: UserType[];
  sentRequests: UserType[];
}

export function RequestPanel({
  receivedRequests,
  sentRequests,
}: RequestPanelProp) {
  const { receivedRequestCount } = useAppSelector(selectRequest);

  return (
    <div className="bg-secondary/70 min-w-[192px] sm:w-[349px] ml-2 rounded-md shadow-lg flex flex-col border">
      <header className="flex items-center justify-between h-24 border-b border-muted px-4 bg-slate-500/10">
        <h1 className="flex items-start gap-2 font-semibold text-3xl">
          Requests
        </h1>
      </header>
      <div className="p-2">
        <Accordion type="single" collapsible defaultValue="received">
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
