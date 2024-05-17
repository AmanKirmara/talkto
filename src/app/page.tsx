"use client";
import { useState } from "react";
import LeftContainer from "../components/LeftContainer";
import MainContainer from "../components/MainContainer";
export default function Home() {
  const [aiResponse, setAiResponse] = useState("");
  const [userInput, setUserInput] = useState('')
 
  return (
    <main className="h-screen w-full dark:bg-gray-900 bg-white   relative flex flex-row items-center justify-center">
      <LeftContainer />
      <MainContainer />
    </main>
  );
}
