"use client";

import React, { FormEvent } from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const router = useRouter();
  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError("Please enter your name");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!/^[a-zA-Z\s]*$/.test(name)) {
      setNameError("Name can only contain letters and spaces");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Please enter a password");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!/(?=.*\d)(?=.*[A-Z]).{6,}/.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and contain at least one capital letter and one number"
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    
    if (res.ok) {
      // Registration successful
      const { token } = data;
      // Store the token in localStorage or session storage
      localStorage.setItem("token", token); // Alternatively, you can use sessionStorage

      // Redirect to the authenticated area or perform other actions
      // e.g., redirect to the user's dashboard
      router.push("/dashboard");
    } else {
      // Registration failed
      // Handle the error or display an error message
      console.error(data.message);
      setApiResponse(data.message);
    }
  };
  return (
    <div className="w-[100%] h-screen flex items-center justify-center">
      <div className="m-auto w-[35%]">
        <div className="bg-white rounded-[5px]">
          <div className="text-center w-[100%] px-[20px]">
            <h1 className="text-[30px] p-4">Sign Up</h1>
            <form onSubmit={handleSubmit}>
              {apiResponse && (
                <div className="alert alert-danger" role="alert">
                  {apiResponse}
                </div>
              )}
              <div className="mb-3">
                <input
                  type="text"
                  className={`border mt-[5px] border-gray-300 rounded-[5px] p-1 m-auto min-[950px]:w-[60%] max-[950px]:w-[100%] ${
                    nameError ? "is-invalid" : ""
                  }`}
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {nameError && (
                  <div className="invalid-feedback">{nameError}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className={`border mt-[5px] border-gray-300 rounded-[5px] p-1 m-auto min-[950px]:w-[60%] max-[950px]:w-[100%] ${
                    emailError ? "is-invalid" : ""
                  }`}
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && (
                  <div className="invalid-feedback">{emailError}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className={`border mt-[5px] border-gray-300 rounded-[5px] p-1 m-auto min-[950px]:w-[60%] max-[950px]:w-[100%] ${
                    passwordError ? "is-invalid" : ""
                  }`}
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordError && (
                  <div className="invalid-feedback">{passwordError}</div>
                )}
              </div>
              <div className=" mb-3">
                <input
                  type="password"
                  className={`border mt-[5px] border-gray-300 rounded-[5px] p-1 m-auto min-[950px]:w-[60%] max-[950px]:w-[100%] ${
                    confirmPasswordError ? "is-invalid" : ""
                  }`}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPasswordError && (
                  <div className="invalid-feedback">{confirmPasswordError}</div>
                )}
              </div>
              <div className="flex gap-2">
                <button className="mt-2 bg-secondaryLight min-[950px]:w-[60%] max-[950px]:w-[100%] m-auto rounded-[5px] text-white p-1 transition-all duration-300 hover:bg-secondary" type="submit">
                  Sign Up
                </button>
                <Link className="mt-2 bg-secondaryLight min-[950px]:w-[60%] max-[950px]:w-[100%] m-auto rounded-[5px] text-white p-1 transition-all duration-300 hover:bg-secondary" href="/">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
