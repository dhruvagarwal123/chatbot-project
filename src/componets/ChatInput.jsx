import {useState} from 'react'
import { Chatbot} from 'supersimpledev'
import LoadingSpinnerImage from '../assets/loading-spinner.gif'
import dayjs from 'dayjs' 
import './ChatInput.css';
export function ChatInput({chatMessages,setChatMessages}){
       const [inputText,setInputText]=useState('');
       const [isLoding,setLoding] = useState(false);
          function saveInputText(event){
            setInputText(event.target.value);
          }
          async function sendMessage(){
            if(isLoding || inputText === ''){
              return;
            }
            setLoding(true);
            const newChatMessages=[
              ...chatMessages,
              {
                message:inputText,
                sender:'user',
                id:crypto.randomUUID(),
                time:dayjs().valueOf()
              }
            ];
          setChatMessages([
             ...newChatMessages,
            {
              message:<img src={LoadingSpinnerImage} className="loading-spinner" />,
              sender:'robot',
              id:crypto.randomUUID(),
              time:dayjs().valueOf()
            }
          ]);
          setInputText(''); 
          const response = await Chatbot.getResponseAsync(inputText);
          setChatMessages([
            ...newChatMessages,
            {
              message:response,
              sender:'robot',
              id:crypto.randomUUID(),
              time:dayjs().valueOf()
            }
         ]);
        setLoding(false);
        } 
        function checkEvent(event){
           if(event.key === 'Enter'){
            return sendMessage();
           }else if(event.key === 'Escape'){
            return setInputText('');
           }
        }  
        function clearMessages(){
          setChatMessages([]);
        }
          return (
            <div
              className="chat-input-container"
            >
              <input 
                placeholder="Send a message to Chatbot" 
                size="30"
                onChange={saveInputText}
                value={inputText}
                onKeyDown={checkEvent}
                className="chat-input"
              />
              <button
               onClick={sendMessage}
               className="send-button"
              >Send</button>
              <button
              onClick={clearMessages}
              className="clear-button"
              >Clear</button>
            </div>
          ); 
     }