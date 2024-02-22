import { useEffect, useState } from "react";

import { socket } from "@/services/socket";
import { api } from "@/services/api";

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
import { ContactCard } from "@/components/contact-card";
import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveChatUser } from "@/redux/chat/slice";
import { selectAuth } from "@/redux/auth/slice";

import { Plus, Search } from "lucide-react";

import { UserChats, UserType } from "../chats-panel";

export function ChatsMPanel() {
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
    <div className="bg-secondary/70 rounded-md flex flex-col border h-full">
      <div className="flex flex-col p-4 max-h-[90%] overflow-hidden">
        <div className="flex items-center gap-2 mt-2 mb-6">
          <div className="flex flex-1 items-center gap-3 h-12 border-none bg-accent/30 px-4 rounded-md text-lg">
            <Search />
            <input
              type="text"
              className="bg-transparent outline-none"
              placeholder="Search chats..."
            />
          </div>
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
                                      {contact.username[0] +
                                        contact.username[1]}
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
        </div>

        <ScrollArea className="flex flex-col">
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
