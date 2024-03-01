import React, { useEffect, useState } from "react";

import { socket } from "@/services/socket";

import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import { useAppSelector } from "@/redux/hooks";
import { selectWindow } from "@/redux/window/slice";

import { useTheme } from "@/components/theme-provider";

import { Paperclip, SendHorizonal, Smile } from "lucide-react";

interface SendInputProp {
  userId: string;
  chatId: string;
}

export function SendInput({ userId, chatId }: SendInputProp) {
  const [message, setMessage] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState<EmojiClickData | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { theme } = useTheme();
  const { isMobile } = useAppSelector(selectWindow);

  const hanldeSubmitMessage = (message: string) => {
    if (chatId && userId && message.trim() !== "") {
      socket.emit("message", message, userId, chatId);
      setMessage("");
      setChosenEmoji(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      hanldeSubmitMessage(message);
    }
  };

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setChosenEmoji(emojiObject);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  useEffect(() => {
    if (chosenEmoji !== null) {
      const messageWithEmoji = message + chosenEmoji.emoji;
      setMessage(messageWithEmoji);
      setChosenEmoji(null);
    }
  }, [chosenEmoji, theme, message]);

  return (
    <div className="relative flex items-center gap-3 border border-primary/70 px-4 flex-1 min-h-16">
      <input
        type="text"
        value={message}
        className="w-full bg-transparent outline-none py-5 px-2 text-lg font-semibold"
        placeholder="Write a message..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        autoFocus
      />
      <Paperclip className="cursor-pointer hover:bg-accent w-10 h-10 p-1 rounded-full transition-colors" />
      <button onClick={toggleEmojiPicker} className="relative">
        <h1 className="text-center">
          <Smile />
        </h1>
      </button>
      {showEmojiPicker && !isMobile && (
        <div className="absolute bottom-14 right-10">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
      <div className="cursor-pointer bg-logo rounded-sm transition-colors w-14 h-12 flex items-center justify-center hover:brightness-110">
        <SendHorizonal size={30} onClick={() => hanldeSubmitMessage(message)} />
      </div>
    </div>
  );
}
