import { Paperclip, SendHorizonal, Smile } from "lucide-react";

export function SendInput() {
  return (
    <div className="flex items-center gap-3 border border-white/70 m-6 px-4">
      <input
        type="text"
        className="w-full bg-transparent outline-none py-5 px-2 text-lg font-semibold"
        placeholder="Write a message..."
      />
      <Paperclip className="cursor-pointer hover:bg-accent w-10 h-10 p-1 rounded-full transition-colors" />
      <Smile className="cursor-pointer hover:bg-accent w-10 h-10 p-1 rounded-full transition-colors" />
      <div className="cursor-pointer bg-logo rounded-sm transition-colors w-14 h-12 flex items-center justify-center hover:brightness-110">
        <SendHorizonal size={30}/>
      </div>
    </div>
  );
}
