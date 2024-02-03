import { useEffect, useRef, useState } from "react";

import { logout, selectAuth } from "@/redux/auth/slice";
import { selectActivePanel } from "@/redux/panel/slice";
import { updateReceivedRequests } from "@/redux/request/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";
import { SideBar } from "@/components/side-bar";
import { ChatsPanel, UserType } from "@/components/chats-panel";
import { ModeToggle } from "@/components/mode-toggle";
import { ContactPanel } from "@/components/contact-panel";
import { RequestPanel } from "@/components/request-panel";
import { ProfilePanel } from "@/components/profile-panel";
import { MessagePanel } from "@/components/message-panel";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Sheet,
} from "@/components/ui/sheet";

import Logo from "@/assets/logo.svg";

import { socket } from "@/services/socket";

export function Chat() {
  const [receivedRequests, setReceivedRequests] = useState<UserType[]>([]);
  const [sentRequests, setSentRequests] = useState<UserType[]>([]);
  const activePanel = useAppSelector(selectActivePanel);

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  const user = useAppSelector(selectAuth);

  const receivedRequestsCount = useRef(receivedRequests.length);

  useEffect(() => {
    const handleReceivedRequests = (sender: UserType[]) => {
      setReceivedRequests(sender);

      if (sender.length !== receivedRequestsCount.current) {
        dispatch(updateReceivedRequests(sender.length));

        receivedRequestsCount.current = sender.length;
      }
    };

    const handleSentRequests = (sender: UserType[]) => {
      setSentRequests(sender);
    };

    socket.emit("getReceivedFriendRequest", user?.id);

    socket.emit("getSentFriendRequest", user?.id);

    socket.on("getReceivedFriendRequest", handleReceivedRequests);

    socket.on("getSentFriendRequest", handleSentRequests);

    return () => {
      socket.off("getReceivedFriendRequest", handleReceivedRequests);
      socket.off("getSentFriendRequest", handleSentRequests);
    };
  }, [user, receivedRequests, dispatch]);

  return (
    <div className="h-screen flex p-4 overflow-hidden">
      <div className="flex flex-col bg-secondary/70 w-24 rounded-md items-center p-4 shadow-lg border">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-16 h-16 cursor-pointer p-2 rounded-md flex items-center justify-center hover:brightness-110 transition-all bg-slate-500/20 hover:bg-slate-500/20">
              <img src={Logo} alt="logo chirpify" className="w-10" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <ModeToggle />
              <SheetTitle className="flex items-center gap-4 font-bold text-3xl m-auto my-4">
                <img src={Logo} alt="logo chirpify" className="w-12" /> Chirpify
              </SheetTitle>
              <SheetDescription className="text-center">
                Converse with your friends in a simple and fun way with Chirpify
              </SheetDescription>
            </SheetHeader>

            <SheetFooter className="mx-3 my-10">
              <Button
                variant={"outline"}
                className="text-red-500 hover:text-red-500"
                onClick={handleLogOut}
              >
                Log Out
              </Button>
            </SheetFooter>
            <p className="text-primary/60 text-center w-fit px-5 py-2 bg-accent/70 rounded-full m-auto mt-10 cursor-not-allowed">
              ...soon
            </p>
          </SheetContent>
        </Sheet>
        <SideBar />
      </div>
      <main className="flex flex-1 space-x-2 overflow-hidden">
        {activePanel === "Chats" && <ChatsPanel />}
        {activePanel === "Contacts" && <ContactPanel />}
        {activePanel === "Requests" && (
          <RequestPanel
            receivedRequests={receivedRequests}
            sentRequests={sentRequests}
          />
        )}
        {activePanel === "Profile" && <ProfilePanel />}
        <MessagePanel />
      </main>
    </div>
  );
}
