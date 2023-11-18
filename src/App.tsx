import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SideBar } from "./components/side-bar";
import { ChatPanel } from "./components/chat-panel";
import { MessagesPanel } from "./components/messages-panel";

import Logo from "@/assets/logo.svg";

export function App() {
  return (
    <div className="h-screen flex p-4 overflow-hidden">
      <div className="flex flex-col bg-secondary/70 w-24 rounded-md items-center p-4 shadow-lg">
        <Sheet>
          <SheetTrigger asChild>
            <div className="w-16 cursor-pointer bg-primary/90 p-2 rounded-md flex items-center justify-center hover:bg-primary/80 transition-colors">
              <img src={Logo} alt="logo chirpify" className="w-10" />
            </div>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-4 font-bold text-3xl m-auto my-4">
                <img src={Logo} alt="logo chirpify" className="w-12" /> Chirpify
              </SheetTitle>
              <SheetDescription className="text-center">
                Converse with your friends in a simple and fun way with Chirpify
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-6 my-6 mx-3">
              <div className="flex flex-col justify-center gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  defaultValue="Vinicius"
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col justify-center gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  defaultValue="@viniciuspra"
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter className="mx-3">
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
            <p className="text-white/50 text-center w-fit px-5 py-2 bg-accent/30 rounded-full m-auto mt-10 cursor-not-allowed">
              ...em breve
            </p>
          </SheetContent>
        </Sheet>
        <SideBar />
      </div>

      <main className="flex flex-1 space-x-2 overflow-hidden">
        <MessagesPanel />
        <ChatPanel />
      </main>
    </div>
  );
}
