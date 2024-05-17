import React, { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import { aiCall } from "@/app/api/GoogleGenerativeAI";
import {apiCall} from "@/app/api/ChatGptAI";
import { ExampleQuestions } from "./ExampleQuestions";

function MainContainer() {
  const [chatMessages, setChatMessages] = useState<{ isYours: boolean; content: string }[]>([]);
  const [selectedSuggestionQuestion, setSelectedSuggestionQuestion] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [responseLoading, setResponseLoading] = useState<boolean>(false);
  const [responseComplete, setResponseComplete] = useState<boolean>(false)

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to add a new chat message
  const addNewChatMsg = (isYours: boolean, content: string) => {
    if (content.trim()) {
      setChatMessages((prevMessages) => [...prevMessages, { isYours, content }]);
    }
  };

  // Function to handle the user input change
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // Function to handle the user input submission
  const handleUserInputSubmit = (e?: React.KeyboardEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (!userInput.trim()) return;

    addNewChatMsg(true, userInput);
    handleAICall(userInput);
  };

  const handleAICall = async (input: string) => {
    setResponseLoading(true);
    try {
      setUserInput("");
      const result = await aiCall(input);
      addNewChatMsg(false, result);
    } catch (error) {
      console.error("AI call error:", error);
    } finally {
      setResponseLoading(false);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (selectedSuggestionQuestion) {
      addNewChatMsg(true, selectedSuggestionQuestion);
      handleAICall(selectedSuggestionQuestion);
    }
    
    
  }, [selectedSuggestionQuestion]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-950 w-full">
      <section
        className={`w-[90%] pt-10 h-full max-h-screen overflow-y-scroll flex flex-col  ${!(chatMessages.length > 0) ? 'justify-end' : 'justify-center'} items-center mb-5 `}
        ref={chatContainerRef}
      >
        {chatMessages.length > 0 ? (
          chatMessages.map((message, index) => (
            <Chat key={index} isYours={message.isYours} content={message.content}  setResponseComplete={setResponseComplete} />
          ))
        ) : (
          <ExampleQuestions setSelectedSuggestionQuestion={setSelectedSuggestionQuestion} />
        )}
      </section>

      <div className="w-[90%] rounded-lg outline-none text-lg my-1 mb-5 bg-gray-400/40 flex justify-between items-center text-black">
        <input
          type="text"
          name="userinput"
          id="userinput"
          placeholder="Type something"
          className="w-full mr-2 px-5 py-3 rounded-lg outline-none bg-transparent text-lg text-white"
          value={userInput}
          onChange={handleUserInputChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleUserInputSubmit();
            }
          }}
        />
        <button
          disabled={responseLoading}
          className="bg-gray-950 text-white m-1 px-5 py-3 rounded-lg"
          onClick={handleUserInputSubmit}
        >
          {responseLoading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default MainContainer;
