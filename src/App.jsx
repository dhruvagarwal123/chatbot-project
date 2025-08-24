import { useEffect, useState, } from 'react'
import { Chatbot } from 'supersimpledev'
import { ChatInput } from './componets/ChatInput'
import { ChatMessage } from './componets/ChatMessage'
import { ChatMessages } from './componets/ChatMessages'
import './App.css'

     function App(){
       const [chatMessages,setChatMessages] =useState(JSON.parse(localStorage.getItem('messages')) || []);
       useEffect(()=>{
          localStorage.setItem('messages',JSON.stringify(chatMessages));
            Chatbot.addResponses({
                'goodbye':'Goodbye.Have a great day!',
                 'give me a unique id': function() {
                   return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
                 }  
            });
       },[chatMessages]);
        return (
            <div className="app-container">
             {chatMessages.length===0 && (<p className="welcome-text" > Welcome to the chatbot project! Send a message using the textbox below.</p>)}
                <ChatMessages 
                 chatMessages={chatMessages}
                />
                <ChatInput 
                 chatMessages={chatMessages}
                 setChatMessages={setChatMessages}
                />
            </div>
     ); 
     }

export default App
