import { Routes, Route } from "react-router-dom";

import { Chat } from "@/pages/chat";

export default function ChatRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
    </Routes>
  );
}
