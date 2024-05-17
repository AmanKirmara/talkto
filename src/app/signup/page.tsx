"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              username
            </label>
            <input
              id="username"
              type="text"
              // value={email}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="mt-1 p-2 w-full text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              // value={email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="mt-1 p-2 w-full text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              // value={password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="mt-1 p-2 w-full border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700 focus:outline-none"
            disabled={buttonDisabled}
            onClick={onSignup}
          >
            {buttonDisabled ? "Loading..." : "Sign up"}
          </button>
          <Link href="/login" className="block text-sm underline font-medium text-gray-700 text-right mt-5">Login</Link>
        </form>
      </div>
    </div>
  );
}
