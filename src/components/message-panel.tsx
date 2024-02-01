import { useEffect, useState } from "react";
import { selectActiveChatUser } from "@/redux/chat/slice";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/auth/slice";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTheme } from "@/components/theme-provider";

import { SendInput } from "./send-input";
import { MessageBubble } from "./message-bubble";

import { socket } from "@/services/socket";

import { MoreVertical } from "lucide-react";
import emptyInbox from "../assets/empty-inbox-outline.svg";

export interface Messages {
  id: string;
  content: string;
  userId: string;
  chatId: string;
  createdAt: Date;
}

export function MessagePanel() {
  const [chatId, setChatId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);

  const { theme } = useTheme();

  const user = useAppSelector(selectAuth);
  const { activeChatUser } = useAppSelector(selectActiveChatUser);

  useEffect(() => {
    const handleGetChatId = (receivedChatId: string) => {
      setChatId(receivedChatId);
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

    if (user) {
      setUserId(user.id);
    }

    if (activeChatUser && user) {
      socket.emit("getChatId", user.id, activeChatUser.id);
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
  }, [activeChatUser, user, chatId, messages]);

  return (
    <div className="flex flex-col bg-secondary/70 flex-1 rounded-md shadow-lg border ml-2 justify-between relative">
      {activeChatUser ? (
        <>
          <header className="flex items-center justify-between h-24 border-b border-muted px-4 bg-slate-500/10 rounded-t-md absolute inset-0 z-50">
            <div className="flex px-6 py-5 gap-5">
              <div className="relative">
                <div
                  className={`${
                    activeChatUser.isOnline ? "bg-green-500" : "bg--500"
                  } h-2.5 w-2.5 rounded-full absolute bottom-1 right-1 z-10`}
                ></div>
                <Avatar className="w-14 h-14">
                  <AvatarImage src={activeChatUser.avatar} />
                  <AvatarFallback>
                    {activeChatUser.username[0] + activeChatUser.username[1]}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex flex-col items-start font-semibold">
                <h1 className="text-xl ">@{activeChatUser.username}</h1>
                <h2 className="text-md text-primary/60 font-light ">
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
