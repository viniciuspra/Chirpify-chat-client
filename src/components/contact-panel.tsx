import { useEffect, useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ContactCard } from "@/components/contact-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Plus, Search } from "lucide-react";
import { socket } from "@/services/socket";

type UserType = {
  id: string;
  username: string;
  isOnline: boolean;
  avatar?: string;
};

export function ContactPanel() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [newChat, setNewChat] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  console.log(newChat);

  const handleUserClick = (user: UserType) => {
    setNewChat(user);
  };

  const handleInputChange = (newSearch: string) => {
    socket.emit("search", newSearch);
  };

  useEffect(() => {
    const handleSearch = (result: UserType[]) => {
      setUsers(result);
      setLoading(false);
    };

    const handleLoading = () => {
      setLoading(true);
    };

    socket.on("search", handleSearch);
    socket.on("loading", handleLoading);

    return () => {
      socket.off("search", handleSearch);
      socket.off("loading", handleLoading);
    };
  }, []);

  return (
    <div className="bg-secondary/70 min-w-[192px] sm:w-[349px] ml-2 rounded-md shadow-lg flex flex-col border">
      <header className="flex items-center justify-between h-24 border-b border-muted px-4">
        <h1 className="flex items-start gap-2 font-semibold text-3xl">Chat</h1>
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
              <CommandInput
                placeholder="search contacts..."
                onValueChange={handleInputChange}
              />
              <CommandList>
                <CommandEmpty>
                  {loading ? "loading..." : "No contacts found."}
                </CommandEmpty>
                <CommandGroup>
                  {users.map((user) => (
                    <button
                      className="w-full"
                      key={user.id}
                      onClick={() => handleUserClick(user)}
                    >
                      <CommandItem
                        value={user.username}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div
                              className={`${
                                user.isOnline ? "bg-green-500" : "bg-red-500"
                              } h-2 w-2 rounded-full absolute bottom-0 right-0 z-10`}
                            ></div>
                            <Avatar>
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback className="uppercase">
                                {user.username[0] + user.username[1]}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <span className="font-semibold text-base">
                            {user.username}
                          </span>
                        </div>
                      </CommandItem>
                    </button>
                  ))}
                </CommandGroup>
              </CommandList>
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
            placeholder="Search messages"
          />
        </div>
        <ScrollArea className="flex flex-col flex-1">
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
}
