  import { useRef,useEffect } from 'react'
  import { ChatMessage } from './ChatMessage';
  import './ChatMessages.css';
  function useAutoScroll(dependencies){
                const containerRef=useRef(null)
                useEffect(()=>{
                    const containerElem=containerRef.current;
                    if(containerElem){
                      containerElem.scrollTop=containerElem.scrollHeight;
                    }
                  // eslint-disable-next-line react-hooks/exhaustive-deps
                  },dependencies);
            return containerRef;
          }
  export function ChatMessages({chatMessages}){
        //const [chatMessages,setChatMessages]=array;
        //const chatMessages=array[0];
        //const setChatMessages=array[1];
        const chatMessagesRef=useAutoScroll([chatMessages]);
      return (
        <div className="chat-messages-container"
         ref={chatMessagesRef}
        >
          {chatMessages.map((chatMessage) => {
            return (
              <ChatMessage
                message={chatMessage.message}
                sender={chatMessage.sender}
                key={chatMessage.id}
                time={chatMessage.time}
              />
            );
          })}
        </div>
      );  
     }