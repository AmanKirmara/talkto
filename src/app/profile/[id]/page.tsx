import React from "react";

export default function page({ params }: any) {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h1 className="text-2xl font-semibold mb-6 text-black">Profile Page</h1>
        <h2 className="text-2xl text-black">{params.id}</h2>
      </div>
    </div>
  );
}
