import { useEffect, useState } from "react";

import { socket } from "@/services/socket";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ContactCard } from "@/components/contact-card";
import { UserType } from "@/components/chats-panel";

import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/auth/slice";

import { Search } from "lucide-react";

export function ContactPanel() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser = useAppSelector(selectAuth);

  const handleInputChange = (newSearch: string) => {
    setLoading(true);
    socket.emit("searchUser", newSearch, currentUser?.id);
  };

  useEffect(() => {
    const handleSearch = (result: UserType[]) => {
      setUsers(result);
      setLoading(false);
    };

    socket.emit("searchUser", "", currentUser?.id);

    socket.on("searchUser", handleSearch);

    return () => {
      socket.off("searchUser", handleSearch);
    };
  }, [currentUser]);

  return (
    <div className="bg-secondary/70 min-w-[192px] sm:w-[349px] ml-2 rounded-md shadow-lg flex flex-col border">
      <header className="flex items-center justify-between h-24 border-b border-muted px-4 bg-slate-500/10">
        <h1 className="flex items-start gap-2 font-semibold text-3xl">
          Contacts
        </h1>
      </header>
      <div className="flex flex-col p-4 max-h-[85%] overflow-hidden">
        <div className="flex items-center gap-3 h-12 border-none bg-accent/30 px-4 rounded-md text-lg mt-2 mb-6">
          <Search />
          <input
            type="text"
            className="bg-transparent outline-none"
            placeholder="Search contacts..."
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
        <ScrollArea className="flex flex-col flex-1">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center h-40">
              <div className="w-12 h-12 animate-spin border-t-3 border-primary rounded-full" />
            </div>
          ) : users && users.length > 0 ? (
            users.map((user) => {
              if (user.id !== currentUser?.id) {
                return (
                  <ContactCard
                    key={user.id}
                    id={user.id}
                    username={user.username}
                    imageUrl={user.avatar}
                    onAddClick={() => {}}
                  />
                );
              } else {
                return;
              }
            })
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center h-40">
              <p className="text-lg">Contact not found!</p>
            </div>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
}
