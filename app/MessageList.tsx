"use client";
import React, { useEffect } from 'react'
import useSWR from 'swr'
import { clientPusher } from '../pusher';
import { Message } from '../typings';
import fetcher from '../utils/fetchMessages';
import MessageComponent from './MessageComponent';

interface Props {
  initialMessages: Message[],
  session: any
}

function MessageList({initialMessages, session}: Props) {
  const { data: messages, error, mutate } = useSWR<Message[]>("/api/getMessages", fetcher)

  useEffect(() => {
    const channel = clientPusher.subscribe('messages')
    channel.bind('new-message', async (data: Message) => {
      // if you send the message no need to update
      if(messages?.find((messages) => messages.id === data.id))return;
      if (!messages) {
        mutate(fetcher)
      }else{
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        })
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages, clientPusher, mutate])
  
  return (
    <div className='space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto'>
        {(messages)?.map((message,i) => (
           <MessageComponent key={i} message={message}/>
        ))}
    </div>
  )
}

export default MessageList