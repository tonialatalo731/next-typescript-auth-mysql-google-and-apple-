"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to the login page if token is not found
          router.push("/");
        } else {
          const response = await fetch("/api/auth/check-auth", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (!response.ok) {
            // Redirect to the login page if the token is invalid
            router.push("/");
          } else {
            router.push("/dashboard");
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    checkAuthentication();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/dashborad",
    });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      const { token } = data;
      // Save the token to localStorage or a cookie
      localStorage.setItem("token", token);

      if (res.ok) {
        setApiResponse("Redirecting...");
        router.push("/dashboard");
      } else {
        setApiResponse(data.message);
      }
    } catch (error) {
      setApiResponse("Server error");
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center box-border w-[100%] h-screen bg-gray-300 p-[20px]">
      <div className="w-[35%] h-[90%] rounded-lg flex flex-col bg-white">
        <div className="w-[100%] p-[30px] pt-[50px]">
          <img src="./img/favicon.png" className="m-auto w-[70px]" alt="" />
          <h1 className="text-[40px] font-chakra font-bold text-center">
            Welcome
          </h1>
        </div>

        <div className="w-[100%] max-[950px]:px-5">
          <div className="min-[950px]:w-[60%] max-[950px]:w-[100%] border border-gray-300 rounded-[5px] m-auto text-center flex flex-row justify-center items-center py-1 transition-all duration-300 hover:bg-gray-200">
            <img src="./img/google.png" className="w-[20px]" alt="" />
            <button
              className="ml-[5px] text-gray-500"
              onClick={() => signIn("google")}
            >
              Continue with Google
            </button>
          </div>
          <div className="min-[950px]:w-[60%] max-[950px]:w-[100%] border border-gray-300 rounded-[5px] m-auto text-center flex flex-row justify-center items-center py-1 mt-[5px] transition-all duration-300 hover:bg-gray-200">
            <img src="./img/apple.png" className="w-[20px]" alt="" />
            <button
              className="ml-[5px] text-gray-500"
              onClick={() => signIn("apple")}
            >
              Continue with Apple
            </button>
          </div>
        </div>

        <div className="min-[950px]:w-[60%] max-[950px]:w-[100%] max-[950px]:px-5 my-5 flex justify-center items-center mx-auto">
          <div className="w-[50%] h-2 border border-white border-t-gray-300 mt-[7px]"></div>
          <span className="mx-[5px]">or</span>
          <div className="w-[50%] h-2 border border-white border-t-gray-300 mt-[7px]"></div>
        </div>

        <form onSubmit={handleSubmit} className="was-validated">
          {apiResponse && (
            <div className="alert alert-danger" role="alert">
              {apiResponse}
            </div>
          )}
          <div className="w-[100%] text-center flex flex-col max-[950px]:px-5">
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-[5px] p-1 m-auto min-[950px]:w-[60%] max-[950px]:w-[100%]"
            />
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border mt-[5px] border-gray-300 rounded-[5px] p-1 m-auto min-[950px]:w-[60%] max-[950px]:w-[100%]"
            />
            <button className="mt-2 bg-secondaryLight min-[950px]:w-[60%] max-[950px]:w-[100%] m-auto rounded-[5px] text-white p-1 transition-all duration-300 hover:bg-secondary">
              Continue
            </button>
            <Link href="/register">
              <h3 className="mt-5 text-secondaryLight transition-all duration-300 hover:text-secondary cursor-pointer hover:underline">
                Create account
              </h3>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
