import { useEffect, useState } from "react";

import { selectActiveChatUser, setActiveChatUser } from "@/redux/chat/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/auth/slice";

import { MessageBubble } from "@/components/message-bubble";
import { SendInput } from "@/components/send-input";
import { Messages } from "@/components/message-panel";
import { useTheme } from "@/components/theme-provider";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import emptyInbox from "@/assets/empty-inbox-outline.svg";

import { socket } from "@/services/socket";
import { api } from "@/services/api";

import { ArrowLeft, MoreVertical } from "lucide-react";

export function MessageMPanel() {
  const [chatId, setChatId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [emitted, setEmitted] = useState<boolean>(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const { theme } = useTheme();

  const user = useAppSelector(selectAuth);
  const { activeChatUser } = useAppSelector(selectActiveChatUser);

  const dispatch = useAppDispatch();

  const cleanActiveChatUser = () => {
    dispatch(setActiveChatUser(null));
  };

  useEffect(() => {
    const handleGetChatId = (receivedChatId: string) => {
      setChatId(receivedChatId);
      setEmitted(false);
    };

    const handleGetMessages = (messages: Messages[]) => {
      if (messages) {
        const messagesWithDate = messages.map((message) => ({
          ...message,
          createdAt: new Date(message.createdAt),
        }));

        setMessages(messagesWithDate);
      }
    };

    if (user && user.id) {
      setUserId(user.id);
    }

    if (activeChatUser && userId) {
      if (!emitted) {
        socket.emit("getChatId", userId, activeChatUser.id);
        setEmitted(true);
      }
    }

    if (user && chatId) {
      socket.emit("getMessages", chatId);
    }

    socket.on("getMessages", handleGetMessages);
    socket.on("getChatId", handleGetChatId);

    return () => {
      socket.off("getChatId", handleGetChatId);
      socket.off("getMessages", handleGetMessages);
    };
  }, [activeChatUser, user, chatId, messages, emitted, userId]);

  return (
    <div className="flex flex-col bg-secondary/70 flex-1 rounded-md border justify-between relative">
      {activeChatUser ? (
        <>
          <header className="flex items-center justify-between h-24 border-b border-muted px-4 bg-slate-500/10 rounded-t-md absolute inset-0 z-50">
            <div className="flex py-5 gap-5">
              <button
                className="relative flex items-center p-1.5 rounded-full active:bg-slate-400/40 transition-colors"
                onClick={cleanActiveChatUser}
              >
                <ArrowLeft className="w-5 h-5" />
                <Avatar className="w-11 h-11">
                  <AvatarImage
                    src={
                      activeChatUser.avatar
                        ? `${api.defaults.baseURL}/files/${activeChatUser.avatar}`
                        : ""
                    }
                  />
                  <AvatarFallback>
                    {activeChatUser.username[0] + activeChatUser.username[1]}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`${
                    activeChatUser.isOnline ? "bg-green-500" : "bg-red-500"
                  } h-2.5 w-2.5 rounded-full absolute bottom-1 right-1 z-10`}
                ></div>
              </button>

              <div className="flex flex-col items-start font-semibold justify-center">
                <h1 className="text-lg">@{activeChatUser.username}</h1>
                <h2 className="text-sm text-primary/60 font-light ">
                  {activeChatUser.fullname}
                </h2>
              </div>
            </div>
            <div>
              <MoreVertical className="cursor-pointer hover:bg-accent transition-colors w-10 h-10 rounded-full p-2" />
            </div>
          </header>
          <div className="flex flex-col my-24 h-full w-full">
            <ScrollArea
              className={`p-6 h-full w-full ${
                theme === "dark" ? "bg-dark-pattern" : "bg-light-pattern"
              }`}
              style={{ height: "calc(100vh - 220px)" }}
            >
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  text={message.content}
                  sendAt={message.createdAt}
                  isUser={message.userId === userId}
                />
              ))}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
          <footer className="bg-slate-500/10 h-24 flex items-center justify-center rounded-b-md py-8 px-3 absolute bottom-0 w-full z-50">
            <SendInput userId={userId} chatId={chatId} />
          </footer>
        </>
      ) : (
        <div className="h-full flex flex-col items-center justify-center gap-3 p-5">
          <img src={emptyInbox} alt="empty" className="max-w-sm" />
        </div>
      )}
    </div>
  );
}
