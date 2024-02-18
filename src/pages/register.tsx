import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LabelInput } from "@/components/label-input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "@/configs/toastOptions";
import "react-toastify/dist/ReactToastify.css";

import { api } from "@/services/api";

export function Register() {
  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const formValidation = () => {
    if (
      username.trim() === "" ||
      fullname.trim() === "" ||
      password.trim() === ""
    ) {
      toast.error(
        "All fields are required. Please fill them in before proceeding.",
        toastOptions
      );
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be at least 3 characters long.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValidation()) return;
    api
      .post("/api/auth/register", {
        fullname,
        username,
        password,
      })
      .then(() => {
        toast.success("User successfully registered.", toastOptions);
        localStorage.setItem("regSuccess", "true");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message, toastOptions);
        } else {
          toast.error("Registration failed. Please try again.", toastOptions);
        }
      });
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center md:px-14">
      <div className="bg-secondary w-full sm:max-w-[600px] sm:max-h-[690px] rounded-lg sm:py-16 px-10 flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:h-full p-5 space-y-10 flex-1"
        >
          <Logo />
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <LabelInput
              type="text"
              label="FullName"
              placeholder="Ex: Chirpify Chat"
              name="fullname"
              onChange={(e) => setFullname(e.target.value)}
            />
            <LabelInput
              type="text"
              label="Username"
              placeholder="Ex: @Chirpify"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <LabelInput
              type="password"
              label="Password"
              placeholder="********"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="text-base h-11" type="submit">
            Register
          </Button>
          <p className="text-center my-5">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 font-medium uppercase">
              login
            </a>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
