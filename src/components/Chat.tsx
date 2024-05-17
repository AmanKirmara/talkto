import React from "react";
import Image from "next/image";
import exampleProfile from "@/../public/images/profile2.jpg";
import aiImage from "@/../public/images/aipng.png";
import FormatResponse from "./FormatResponse";

// Define the ChatProps interface for the Chat component
interface ChatProps {
  isYours: boolean;
  content: string;
  setResponseComplete: (complete: boolean) => void;
}

const Chat: React.FC<ChatProps> = ({ isYours, content, setResponseComplete }) => {
  return (
    <section className="w-full mb-10 flex flex-row items-start">
      <Image
        src={isYours ? exampleProfile : aiImage}
        alt=""
        className="rounded-full h-8 w-8 min-h-8 min-w-8 object-cover"

      />
      <div className="warp ml-3 w-full">
        <p className="font-bold text-lg">{isYours ? "You" : "Gemini"}</p>
        <div className="w-[90%] break-keep">
          {isYours ? (
            <>{content}</>
          ) : (
                <FormatResponse content={content} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Chat;
