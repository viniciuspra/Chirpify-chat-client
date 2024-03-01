import { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectActivePanel, setActivePanel } from "@/redux/panel/slice";
import { selectWindow, setWindowSize } from "@/redux/window/slice";
import { updateReceivedRequests } from "@/redux/request/slice";
import { selectActiveChatUser } from "@/redux/chat/slice";
import { logout, selectAuth } from "@/redux/auth/slice";

import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Sheet,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ContactPanel } from "@/components/contact-panel";
import { RequestPanel } from "@/components/request-panel";
import { ProfilePanel } from "@/components/profile-panel";
import { MessagePanel } from "@/components/message-panel";
import { ChatsPanel, UserType } from "@/components/chats-panel";
import { SideBar, TooltipContent } from "@/components/side-bar";
import SetTheme from "@/components/set-theme";
import { Theme } from "@/components/theme-provider";
import { Logo } from "@/components/logo";

import { MobileBar } from "@/components/mobile/mobile-bar";
import { ChatsMPanel } from "@/components/mobile/chats-panel";
import { ProfileMPanel } from "@/components/mobile/profile-panel";
import { ContactMPanel } from "@/components/mobile/contact-panel";
import { RequestMPanel } from "@/components/mobile/request-panel";
import { MessageMPanel } from "@/components/mobile/message-panel";

import { socket } from "@/services/socket";

import { LogOut } from "lucide-react";

export function Chat() {
  const [receivedRequests, setReceivedRequests] = useState<UserType[]>([]);
  const [sentRequests, setSentRequests] = useState<UserType[]>([]);

  const activePanel = useAppSelector(selectActivePanel);
  const { isMobile } = useAppSelector(selectWindow);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  const user = useAppSelector(selectAuth);
  const { activeChatUser } = useAppSelector(selectActiveChatUser);

  const receivedRequestsCount = useRef(receivedRequests.length);

  const items: TooltipContent[] = ["Profile", "Chats", "Contacts", "Requests"];
  const themes: Theme[] = [
    "default",
    "orange",
    "green",
    "blue",
    "red",
    "yellow",
  ];

  useEffect(() => {
    const handleResize = () => {
      dispatch(
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );
    };

    window.addEventListener("resize", handleResize);

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
      window.removeEventListener("resize", handleResize);
    };
  }, [user, receivedRequests, dispatch]);

  return (
    <div className="h-screen flex p-4 overflow-hidden flex-col sm:flex-row">
      {isMobile ? (
        activeChatUser ? null : (
          <div className="flex bg-secondary/70 w-full h-20 rounded-md items-center p-4 shadow-lg border">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-12 h-12 cursor-pointer p-2 rounded-md flex items-center justify-center hover:brightness-110 transition-all bg-slate-500/20 hover:bg-slate-500/20">
                  <Logo size={36} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <SheetHeader>
                  <SheetTitle className="flex font-bold text-2xl mt-5">
                    <Logo
                      withText
                      className="flex flex-1 gap-3 items-center justify-center my-4"
                      size={48}
                    />
                  </SheetTitle>
                  <SheetDescription className="text-center">
                    Converse with your friends in a simple and fun way with
                    Chirpify
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-wrap px-10 items-center justify-center gap-4 mt-6">
                  {themes &&
                    themes.map((theme, index) => (
                      <SetTheme key={index} theme={theme} />
                    ))}
                </div>
                <SheetFooter className="flex flex-1 w-full items-center py-5">
                  <AlertDialog>
                    <AlertDialogTrigger className="text-red-500 hover:text-red-500 w-full justify-center p-5 flex gap-3 font-semibold border border-input bg-transparent shadow-md hover:bg-accent hover:text-accent-foreground h-3 items-center rounded-sm">
                      Log Out <LogOut size={18} />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-[80%]">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to logout?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          No, Stay Logged In
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogOut}>
                          Yes, Logout
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <SideBar />
          </div>
        )
      ) : (
        <div className="flex flex-col bg-secondary/70 w-24 h-full rounded-md items-center p-4 shadow-lg border">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-16 h-16 cursor-pointer p-2 rounded-md flex items-center justify-center hover:brightness-110 transition-all bg-slate-500/20 hover:bg-slate-500/20">
                <Logo size={48} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SheetHeader className="space-y-3">
                <SheetTitle className="flex font-bold text-3xl mt-10">
                  <Logo
                    withText
                    className="flex gap-3 w-12 h-12 flex-1 justify-center items-center my-4"
                    size={64}
                  />
                </SheetTitle>
                <SheetDescription className="text-center">
                  Converse with your friends in a simple and fun way with
                  Chirpify
                </SheetDescription>
              </SheetHeader>
              <div className="w-52 p-3 my-6 flex gap-5 flex-wrap m-auto">
                {themes &&
                  themes.map((theme, index) => (
                    <SetTheme key={index} theme={theme} />
                  ))}
              </div>
              <SheetFooter className="flex flex-1 w-full items-end py-5">
                <AlertDialog>
                  <AlertDialogTrigger className="text-red-500 hover:text-red-500 w-full justify-center p-5 flex gap-3 font-semibold border border-input bg-transparent shadow-md hover:bg-accent hover:text-accent-foreground h-3 items-center rounded-sm">
                    Log Out <LogOut size={18} />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No, Stay Logged In</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogOut}>
                        Yes, Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <SideBar />
        </div>
      )}

      {isMobile ? (
        <main
          className={`flex flex-col flex-1 rounded-sm overflow-hidden ${
            activeChatUser ? "" : "bg-muted mt-4"
          }`}
        >
          {activeChatUser === null && (
            <div className="flex">
              {items.map((item, index) => (
                <MobileBar
                  key={index}
                  tooltip={item}
                  onSelect={() => dispatch(setActivePanel(item))}
                />
              ))}
            </div>
          )}

          {activePanel === "Chats" && activeChatUser === null && (
            <ChatsMPanel />
          )}
          {activePanel === "Contacts" && activeChatUser === null && (
            <ContactMPanel />
          )}
          {activePanel === "Requests" && activeChatUser === null && (
            <RequestMPanel
              receivedRequests={receivedRequests}
              sentRequests={sentRequests}
            />
          )}
          {activePanel === "Profile" && activeChatUser === null && (
            <ProfileMPanel />
          )}
          {activeChatUser && <MessageMPanel />}
        </main>
      ) : (
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
      )}
    </div>
  );
}
