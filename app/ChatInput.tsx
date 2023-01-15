"use client";
import React, { useState } from "react";
import { v4 as uuid } from 'uuid'
import { Message } from "../typings";
import useSWR from 'swr'
import fetcher from "../utils/fetchMessages";
function ChatInput({ session }: any) {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher)
  
  
  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !session) {return;}
    const messageToSend = input;
    setInput('');
    const id = uuid();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: "https://images4.fanpop.com/image/photos/23600000/Pokemon-pokemon-23658952-1024-768.jpg",
      email: session?.user?.email!
    }
    const uploadMessageToUpstash = async () => {
      const data = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      }).then((res) => res.json());   

      return [data.messagem, ...messages!]
    };
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  }
  return (
    <form onSubmit={addMessage} className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 bg-white  border-t border-gray-100">
      <input
        type="text"
        disabled={!session}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3 disabled:opacity-50 disabled:cursor-not-allowed "
      />
     
      <button
        disabled={!input}
        type="submit"
        className="button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
