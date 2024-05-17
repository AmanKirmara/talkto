import React, {  useEffect, useState } from "react";
import exampleUserImage from "@/../public/images/profile2.jpg";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserData {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
  __v: number;
}

function LeftContainer() {
  const chatList = [
    {
      name: "Family Group Chat",
      id: 1,
    },
    {
      name: "Work Project",
      id: 2,
    },
    {
      name: "Gym Buddies",
      id: 3,
    },
    {
      name: "Travel Plans",
      id: 4,
    },
    {
      name: "Book Club",
      id: 5,
    },
    {
      name: "Old School Friends",
      id: 6,
    },
    {
      name: "Coding Buddies",
      id: 7,
    },
    {
      name: "Photography Enthusiasts",
      id: 8,
    },
    {
      name: "Local Community",
      id: 9,
    },
    {
      name: "Gamer's Guild",
      id: 10,
    },
    {
      name: "Sports Fanatics",
      id: 11,
    },
    {
      name: "Movie Buffs",
      id: 12,
    },
    {
      name: "Artists",
      id: 13,
    },
  ];

  const [data, setData] = useState<UserData | null>(null)


  const getUserDetails = async () => {
    try {
      const response = await axios.get('/api/users/me');
      setData(response.data.data);
  } catch (error) {
      console.error('Error fetching user details:', error);
  }
  }
  

  useEffect(() => {
      getUserDetails();
  }, [])

  const router = useRouter();
  return (
    <div className="h-screen flex flex-col items-center justify-between bg-gray-900/80 w-[400px]">
      <button
        className="bg-gray-950 mx-auto my-5 px-5 py-3 rounded-[7px] w-[90%] hover:bg-gray-800 flex flex-row justify-around items-center"
        aria-label="Create a new chat"
      >
        <EditNoteIcon className="text-white text-3xl" /> New Chat
      </button>

      <ul className="mb-5 h-full flex flex-col w-[90%] overflow-scroll items-center justify-start">
        {chatList.map((chatItem) => (
          <li
            className=" hover:bg-gray-800 cursor-pointer my-1  px-5 py-3 rounded-[7px] w-full"
            key={chatItem.id}
          >
            <span className="text-white">{chatItem.name}</span>
          </li>
        ))}
      </ul>

      <div
        className=" cursor-pointer bg-gray-950 mx-auto my-5 px-5 py-2 rounded-[7px] w-[90%] hover:bg-gray-800 flex flex-row justify-start items-center"
        aria-label="User account"
        onClick={() => {router.push('/profile')}}
      >
        <Image
          src={exampleUserImage}
          alt={""}
          className="max-h-10 max-w-10 rounded-full object-cover bg-center"
        />
        <p className="ml-5 capitalize">{data ? data?.username : "user"}</p>
      </div>
    </div>
  );
}

export default LeftContainer;
