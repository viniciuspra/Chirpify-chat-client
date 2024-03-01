import { useEffect, useState } from "react";

import { api } from "@/services/api";
import { socket } from "@/services/socket";

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { Messages } from "@/components/message-panel";
import { ContactCard } from "@/components/contact-card";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveChatUser } from "@/redux/chat/slice";
import { selectAuth } from "@/redux/auth/slice";

import { Plus, Search } from "lucide-react";

export type UserType = {
  id: string;
  fullname?: string;
  username: string;
  isOnline?: boolean;
  avatar?: string;
};

export type UserChats = {
  id: string;
  name: string;
  image: string;
  lastMessage: Messages;
  isGroup: boolean;
  users: UserType[];
};

export function ChatsPanel() {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState<UserType[]>([]);
  const [userChats, setUserChats] = useState<UserChats[]>([]);
  const [newSearch, setNewSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuth);

  const handleUserContactClick = (user: UserType) => {
    dispatch(setActiveChatUser(user));
    setOpen(false);
  };

  const handleInputChange = (newSearch: string) => {
    setLoading(true);
    setNewSearch(newSearch);
  };

  const handleSetChatId = (username: string) => {
    socket.emit("getUser", username);
  };

  useEffect(() => {
    const handleSearch = (result: UserType[]) => {
      setLoading(false);
      setContacts(result);
    };

    const getUserChats = (result: UserChats[]) => {
      setUserChats(result);
    };

    const getUser = (user: UserType) => {
      dispatch(setActiveChatUser(user));
    };

    socket.emit("searchUserContacts", newSearch, user?.id);

    socket.emit("getUserChats", user?.id);

    socket.on("searchUserContacts", handleSearch);
    socket.on("getUserChats", getUserChats);
    socket.on("getUser", getUser);

    return () => {
      socket.off("searchUserContacts", handleSearch);
      socket.off("getUserChats", getUserChats);
      socket.off("getUser", getUser);
    };
  }, [newSearch, user, dispatch, userChats, open]);

  return (
    <div className="bg-secondary/70 min-w-[192px] sm:w-[349px] ml-2 rounded-md shadow-lg flex flex-col border">
      <header className="flex items-center justify-between h-24 border-b border-muted px-4 bg-slate-500/10">
        <h1 className="flex items-start gap-2 font-semibold text-3xl">Chats</h1>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              className="rounded-full p-1 w-9 h-9 bg-logo"
              variant={"outline"}
            >
              <Plus />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="left" align="start">
            <Command>
              <div className="animate-slideLeft transition-transform">
                <h2 className="text-2xl font-bold p-3">New Chat</h2>
                <CommandInput
                  placeholder="search contacts..."
                  onValueChange={handleInputChange}
                />
                <CommandList>
                  <CommandEmpty>
                    {loading ? "loading..." : "No contacts found."}
                  </CommandEmpty>
                  <CommandGroup heading="All contatcts">
                    {contacts.length > 0 &&
                      contacts.map((contact) => (
                        <CommandItem
                          key={contact.username}
                          value={contact.username}
                          className="cursor-pointer p-0"
                        >
                          <button
                            type="button"
                            className="w-full px-2 py-1.5"
                            onClick={() => handleUserContactClick(contact)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div
                                  className={`${
                                    contact.isOnline
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  } h-2 w-2 rounded-full absolute bottom-0 right-0 z-10`}
                                ></div>
                                <Avatar>
                                  <AvatarImage
                                    src={
                                      contact.avatar
                                        ? `${api.defaults.baseURL}/files/${contact.avatar}`
                                        : ""
                                    }
                                  />
                                  <AvatarFallback className="uppercase">
                                    {contact.username[0] + contact.username[1]}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <span className="font-semibold text-base">
                                {contact.username}
                              </span>
                            </div>
                          </button>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </div>
            </Command>
          </PopoverContent>
        </Popover>
      </header>
      <div className="flex flex-col p-4 max-h-[90%] overflow-hidden">
        <div className="flex items-center gap-3 h-12 border-none bg-accent/30 px-4 rounded-md text-lg mt-2 mb-6">
          <Search />
          <input
            type="text"
            className="bg-transparent outline-none"
            placeholder="Search chats..."
          />
        </div>
        <ScrollArea className="flex flex-col flex-1">
          {userChats ? (
            userChats.map((chat) => (
              <ContactCard
                key={chat.id}
                username={chat.name}
                imageUrl={chat.image}
                lastMessage={chat.lastMessage}
                onClick={() => handleSetChatId(chat.name)}
              />
            ))
          ) : (
            <div>
              <p>Not Found</p>
            </div>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
}
