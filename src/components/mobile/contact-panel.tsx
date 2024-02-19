import { useEffect, useState } from "react";

import { socket } from "@/services/socket";

import { ContactCard } from "@/components/contact-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/auth/slice";

import { UserType } from "../chats-panel";

import { Search } from "lucide-react";

export function ContactMPanel() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser = useAppSelector(selectAuth);

  const handleInputChange = (newSearch: string) => {
    setLoading(true);
    socket.emit("searchUser", newSearch, currentUser?.id);
  };

  const handleBlur = () => {
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }
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
    <div className="bg-secondary/70 rounded-md flex flex-col border">
      <div className="flex flex-col p-4 max-h-[85%] overflow-hidden">
        <div className="flex items-center gap-3 h-12 border-none bg-accent/30 px-4 rounded-md text-lg mt-2 mb-6">
          <Search />
          <input
            type="text"
            className="bg-transparent outline-none"
            placeholder="Search contacts..."
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleBlur}
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
